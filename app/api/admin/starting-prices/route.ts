import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { seedStartingPricesIfEmpty } from "@/lib/startingPricesDb";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  await seedStartingPricesIfEmpty();
  const prices = await prisma.startingPrice.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(prices);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const price = await prisma.startingPrice.create({ data: body });
  return NextResponse.json(price, { status: 201 });
}
