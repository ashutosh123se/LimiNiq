import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    const session = await auth();
    // if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const data = await req.json();
    const { id } = await params;
    const plan = await prisma.pricingPlan.update({
      where: { id },
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
    return NextResponse.json({ error: "Failed to update pricing plan" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    const session = await auth();
    // if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = await params;
    await prisma.pricingPlan.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete pricing plan" }, { status: 500 });
  }
}
