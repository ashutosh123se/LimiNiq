import type { PortfolioProject } from "@/lib/data/portfolioProjects";

const ACCENTS = ["#00C8A0", "#0EA5E9", "#10B981", "#F59E0B", "#7B61FF", "#EF4444"];

export type PortfolioApiItem = {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string | null;
  featured: boolean;
  createdAt: string | Date;
  metrics?: unknown;
};

export function mapPortfolioItem(item: PortfolioApiItem, index: number): PortfolioProject {
  const metrics = item.metrics;
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
