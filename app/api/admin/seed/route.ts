import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // 1. Absolutely forbidden in production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Endpoint not available in production." }, { status: 404 });
  }

  // 2. In non-production, require an explicit seed secret token
  const seedSecret = process.env.ADMIN_SEED_SECRET;
  const authHeader = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const querySecret = req.nextUrl.searchParams.get("secret");

  if (!seedSecret || (authHeader !== seedSecret && querySecret !== seedSecret)) {
    return NextResponse.json({ error: "Unauthorized access to seed endpoint." }, { status: 401 });
  }

  const seedPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!seedPassword || seedPassword.length < 12) {
    return NextResponse.json(
      { error: "SEED_ADMIN_PASSWORD environment variable (min 12 chars) must be configured." },
      { status: 500 }
    );
  }

  try {
    const adminEmail = process.env.EMAIL_ADMIN || "admin@liminiq.com";
    const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(seedPassword, 12);
      await prisma.admin.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: "Liminiq Admin",
          role: "SUPER_ADMIN",
        },
      });
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (err) {
    console.error("[Seed API] Error:", err);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
