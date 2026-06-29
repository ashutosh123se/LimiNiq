import type { PortfolioItem } from "@prisma/client";
import type { PortfolioProject } from "@/lib/data/portfolioProjects";
import { PORTFOLIO_PROJECTS } from "@/lib/data/portfolioProjects";
import { prisma } from "@/lib/prisma";

const ACCENTS = ["#00C8A0", "#0EA5E9", "#10B981", "#F59E0B", "#7B61FF", "#EF4444"];

export function mapPortfolioItem(item: PortfolioItem, index: number): PortfolioProject {
  const metrics = item.metrics as unknown;
  let deliverables: string[] = [];
  if (Array.isArray(metrics)) {
    deliverables = metrics.map((m) =>
      typeof m === "string" ? m : (m as { label?: string; value?: string }).label ?? String(m)
    );
  }

  const category =
    item.category === "Software" || item.category === "Web" || item.category === "Marketing"
      ? item.category
      : "Software";

  return {
    id: item.id,
    title: item.title,
    client: item.client,
    category,
    description: item.description,
    tags: item.tags.length ? item.tags : deliverables.slice(0, 3),
    previewLabel: item.liveUrl?.replace(/^https?:\/\//, "") ?? item.client.toLowerCase().replace(/\s+/g, ""),
    featured: item.featured,
    accent: ACCENTS[index % ACCENTS.length],
    year: new Date(item.createdAt).getFullYear().toString(),
    deliverables: deliverables.length ? deliverables : item.tags.slice(0, 3),
  };
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
