import { BLOG_CATEGORY_FILTERS, type BlogCategorySlug } from "@/lib/data/blogCategories";
import { FALLBACK_TRENDING_TOPICS } from "@/lib/data/blogEngagement";

export function blogCategoryPath(slug: string): string {
  return `/blog/category/${slug}`;
}

export function blogTopicPath(slug: string): string {
  return `/blog/topic/${slug}`;
}

export function isBlogCategorySlug(slug: string): boolean {
  return BLOG_CATEGORY_FILTERS.some((c) => c.slug === slug);
}

export function isBlogTopicSlug(slug: string): boolean {
  return FALLBACK_TRENDING_TOPICS.some((t) => t.slug === slug);
}

/** Map trending topic slugs to blog category filters where applicable. */
export function topicToCategory(slug: string): BlogCategorySlug | null {
  const map: Record<string, BlogCategorySlug> = {
    "custom-saas": "software",
    "nextjs-perf": "software",
    "headless-commerce": "software",
    "ai-marketing": "marketing",
    "technical-seo": "seo",
  };
  return map[slug] ?? null;
}

export function getTopicBySlug(slug: string) {
  return FALLBACK_TRENDING_TOPICS.find((t) => t.slug === slug);
}
