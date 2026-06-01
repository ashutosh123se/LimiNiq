import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validations";

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

        try {
          const admin = await prisma.admin.findUnique({
            where: { email: parsed.data.email },
          });

          if (admin) {
            const isValid = await bcrypt.compare(parsed.data.password, admin.password);
            if (isValid) return { id: admin.id, email: admin.email, name: admin.name, role: admin.role };
          }
        } catch (error) {
          console.warn("Database connection failed during login.");
        }

        // 🚀 Local Dev Bypass: If DB isn't connected or seeded, allow the default credentials through
        if (
          process.env.NODE_ENV === "development" &&
          parsed.data.email === "admin@liminiq.com" &&
          parsed.data.password === "LiminiqAdmin123!"
        ) {
          console.log("Using Development Bypass for Admin Login");
          return { id: "dev-admin", email: "admin@liminiq.com", name: "Development Admin", role: "SUPER_ADMIN" };
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
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
