import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';


export async function GET() {
  // Only allow in development or if explicitly enabled
  if (process.env.NODE_ENV !== "development" && process.env.ENABLE_SEED !== "true") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // 1. Create Super Admin
    const adminEmail = process.env.EMAIL_ADMIN || "admin@liminiq.com";
    const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("LiminiqAdmin123!", 10);
      await prisma.admin.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: "Liminiq Admin",
          role: "SUPER_ADMIN",
        },
      });
    }

    // 2. Create Dummy Leads (if none exist)
    const leadCount = await prisma.lead.count();
    if (leadCount === 0) {
      await prisma.lead.createMany({
        data: [
          {
            name: "Rajesh Kumar",
            email: "rajesh@example.com",
            phone: "+91 9876543210",
            company: "TechCorp India",
            services: ["Website Development", "SEO"],
            budget: "₹75K–₹2L",
            status: "NEW",
            priority: "HIGH",
            score: 75,
            source: "Google Search",
          },
          {
            name: "Priya Sharma",
            email: "priya@example.com",
            services: ["Digital Marketing"],
            budget: "₹10K–₹30K",
            status: "CONTACTED",
            priority: "MEDIUM",
            score: 40,
            source: "LinkedIn",
          },
          {
            name: "Amit Patel",
            email: "amit@example.com",
            company: "Patel Logistics",
            services: ["Website Development", "SEO", "Digital Marketing"],
            budget: "₹2L+",
            status: "CONVERTED",
            priority: "URGENT",
            score: 95,
            source: "Referral",
          },
          {
            name: "Sneha Desai",
            email: "sneha@example.com",
            services: ["SEO"],
            budget: "Under ₹10K",
            status: "NEW",
            priority: "LOW",
            score: 20,
            source: "Instagram",
          }
        ],
      });
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (err) {
    console.error("[Seed API] Error:", err);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
