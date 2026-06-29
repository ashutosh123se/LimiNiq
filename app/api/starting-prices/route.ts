import { NextResponse } from "next/server";
import { getStartingPricesFromDb, seedStartingPricesIfEmpty } from "@/lib/startingPricesDb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await seedStartingPricesIfEmpty();
    const prices = await getStartingPricesFromDb();
    return NextResponse.json(prices);
  } catch {
    return NextResponse.json({ error: "Failed to load prices" }, { status: 500 });
  }
}
