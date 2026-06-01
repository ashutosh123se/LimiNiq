import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = new PrismaClient();
    
    const admin = await prisma.admin.findUnique({
      where: { email: "admin@liminiq.com" }
    });

    const envVars = {
      hasDbUrl: !!process.env.DATABASE_URL,
      hasDirectUrl: !!process.env.DIRECT_URL,
      dbUrlStartsWith: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) : "none",
      dbUrlContainsAt: process.env.DATABASE_URL ? process.env.DATABASE_URL.includes("@") : false,
      dbUrlContainsPercent40: process.env.DATABASE_URL ? process.env.DATABASE_URL.includes("%40") : false,
    };

    return NextResponse.json({
      status: "SUCCESS",
      message: "Connected to database!",
      adminFound: !!admin,
      adminEmail: admin?.email,
      envVars,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "ERROR",
      message: "Database connection failed",
      error: String(error),
      envVars: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasDirectUrl: !!process.env.DIRECT_URL,
        dbUrlStartsWith: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) : "none",
        dbUrlContainsAt: process.env.DATABASE_URL ? process.env.DATABASE_URL.includes("@") : false,
        dbUrlContainsPercent40: process.env.DATABASE_URL ? process.env.DATABASE_URL.includes("%40") : false,
      }
    });
  }
}
