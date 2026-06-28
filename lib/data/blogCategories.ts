export const BLOG_CATEGORY_FILTERS = [
  { slug: "software", label: "Software", aliases: ["Web Dev", "Engineering", "Technology", "Software"] },
  { slug: "seo", label: "SEO", aliases: ["SEO"] },
  { slug: "marketing", label: "Marketing", aliases: ["Digital Marketing", "Marketing"] },
] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORY_FILTERS)[number]["slug"];

export function getCategoryFilterLabel(slug: string | null | undefined): string {
  if (!slug) return "All";
  return BLOG_CATEGORY_FILTERS.find((c) => c.slug === slug)?.label ?? slug;
}

export function getCategoryAliases(slug: string): string[] {
  const filter = BLOG_CATEGORY_FILTERS.find((c) => c.slug === slug);
  return filter ? [...filter.aliases] : [slug];
}
