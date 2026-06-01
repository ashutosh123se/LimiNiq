import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "1" } });
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "1",
          companyEmail: "hello@liminiq.com",
          companyPhone: "+91 9431471654",
          companyCity: "India",
          socialLinks: {},
          seoDefaults: {},
          emailSettings: {},
        }
      });
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const updated = await prisma.siteSettings.update({
      where: { id: "1" },
      data: {
        companyEmail: body.companyEmail,
        companyPhone: body.companyPhone,
        companyCity: body.companyCity,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
