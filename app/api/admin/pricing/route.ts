import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const plans = await prisma.pricingPlan.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pricing plans" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    // Add auth check back later if needed: if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const data = await req.json();
    const plan = await prisma.pricingPlan.create({
      data: {
        type: data.type,
        name: data.name,
        price: data.price,
        priceSuffix: data.priceSuffix,
        tagline: data.tagline,
        features: data.features,
        ctaText: data.ctaText,
        badge: data.badge,
        delivery: data.delivery,
        elevated: data.elevated,
        sortOrder: data.sortOrder,
        active: data.active,
      },
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create pricing plan" }, { status: 500 });
  }
}
