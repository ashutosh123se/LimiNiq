import { prisma } from "@/lib/prisma";
import { STARTING_PRICES } from "@/lib/data/startingPrices";
import type { StartingPriceRecord } from "@/lib/startingPriceTypes";

export type { StartingPriceRecord } from "@/lib/startingPriceTypes";

export async function getStartingPricesFromDb(): Promise<StartingPriceRecord[]> {
  try {
    const rows = await prisma.startingPrice.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length > 0) return rows;
  } catch {
    // table may not exist yet
  }

  return STARTING_PRICES.map((item, index) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    shortLabel: item.shortLabel,
    startingPrice: item.startingPrice,
    priceNote: item.priceNote,
    summary: item.summary,
    highlights: item.highlights,
    color: item.color,
    iconKey: ICON_BY_ID[item.id] ?? "Code2",
    featured: item.featured ?? false,
    sortOrder: index,
  }));
}

const ICON_BY_ID: Record<string, string> = {
  software: "Code2",
  web: "Globe",
  seo: "TrendingUp",
  marketing: "BarChart3",
};

export async function seedStartingPricesIfEmpty() {
  const count = await prisma.startingPrice.count();
  if (count > 0) return;

  await prisma.startingPrice.createMany({
    data: STARTING_PRICES.map((item, index) => ({
      slug: item.slug,
      title: item.title,
      shortLabel: item.shortLabel,
      startingPrice: item.startingPrice,
      priceNote: item.priceNote,
      summary: item.summary,
      highlights: item.highlights,
      color: item.color,
      iconKey: ICON_BY_ID[item.id] ?? "Code2",
      featured: item.featured ?? false,
      sortOrder: index,
      active: true,
    })),
  });
}
