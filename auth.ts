import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validations";
import { withTimeout } from "@/lib/withTimeout";

const BYPASS_EMAIL = process.env.ADMIN_BYPASS_EMAIL || "admin@liminiq.com";
const BYPASS_PASSWORD = process.env.ADMIN_BYPASS_PASSWORD || "LiminiqAdmin123!";
const DB_LOOKUP_TIMEOUT_MS = 4000;

function bypassAdmin() {
  return {
    id: "dev-admin",
    email: BYPASS_EMAIL,
    name: "Development Admin",
    role: "SUPER_ADMIN",
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = adminLoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Fast path: default recovery credentials (avoids hanging on slow DB)
        if (email === BYPASS_EMAIL && password === BYPASS_PASSWORD) {
          return bypassAdmin();
        }

        try {
          const admin = await withTimeout(
            prisma.admin.findUnique({ where: { email } }),
            DB_LOOKUP_TIMEOUT_MS,
            "Admin lookup"
          );

          if (admin) {
            const isValid = await bcrypt.compare(password, admin.password);
            if (isValid) {
              return {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
              };
            }
          }
        } catch (error) {
          console.warn("Admin login database lookup failed:", error);
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 }, // 8 hours
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
