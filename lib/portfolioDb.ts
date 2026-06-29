import type { PortfolioItem } from "@prisma/client";
import type { PortfolioProject } from "@/lib/data/portfolioProjects";
import { PORTFOLIO_PROJECTS } from "@/lib/data/portfolioProjects";
import { mapPortfolioItem as mapItem } from "@/lib/portfolioMap";
import { prisma } from "@/lib/prisma";

export { mapPortfolioItem } from "@/lib/portfolioMap";

function mapPortfolioItem(item: PortfolioItem, index: number): PortfolioProject {
  return mapItem(item, index);
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });
    if (items.length > 0) return items.map(mapPortfolioItem);
  } catch {
    // fallback
  }
  return PORTFOLIO_PROJECTS;
}

export async function getFeaturedPortfolioProjects(): Promise<PortfolioProject[]> {
  const all = await getPortfolioProjects();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 4);
}
