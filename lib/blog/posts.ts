import { prisma } from "@/lib/prisma";
import { getAllMdxPosts, getMdxPostBySlug, type MdxPost } from "@/lib/blog/mdx";

export type BlogSource = "db" | "mdx";

/** Normalized shape used by listing/grid/related-post UI regardless of origin. */
export interface UnifiedPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  topic: string;
  image: string | null;
  readingTime: string;
  publishedAt: Date;
  updatedAt: Date | null;
  tags: string[];
  source: BlogSource;
  metaTitle: string | null;
  metaDesc: string | null;
  ogImage: string | null;
  views: number | null;
}

type DbBlogPost = NonNullable<Awaited<ReturnType<typeof prisma.blogPost.findUnique>>>;

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function fromDb(post: DbBlogPost): UnifiedPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    topic: post.category,
    image: post.coverImage ?? null,
    readingTime: estimateReadingTime(post.content || post.excerpt),
    publishedAt: post.publishedAt ?? post.createdAt,
    updatedAt: post.updatedAt ?? null,
    tags: post.tags ?? [],
    source: "db",
    metaTitle: post.metaTitle ?? null,
    metaDesc: post.metaDesc ?? null,
    ogImage: post.ogImage ?? null,
    views: post.views ?? 0,
  };
}

function fromMdx(post: MdxPost): UnifiedPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    author: post.author,
    topic: post.topic,
    image: post.image ?? null,
    readingTime: post.readingTime,
    publishedAt: new Date(post.date),
    updatedAt: null,
    tags: [],
    source: "mdx",
    metaTitle: null,
    metaDesc: post.description,
    ogImage: post.image ?? null,
    views: null,
  };
}

/** Published, article-type posts from Prisma. Empty array if the DB is unreachable. */
export async function getPublishedDbPosts(): Promise<DbBlogPost[]> {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true, postType: "ARTICLE" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

/** Merged, sorted list of Prisma + MDX posts for listing pages. */
export async function getAllUnifiedPosts(): Promise<UnifiedPost[]> {
  const dbPosts = await getPublishedDbPosts();
  const mdxPosts = getAllMdxPosts();

  const merged = [...dbPosts.map(fromDb), ...mdxPosts.map(fromMdx)];
  merged.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return merged;
}

export interface ResolvedPost {
  post: UnifiedPost;
  source: BlogSource;
  db: DbBlogPost | null;
  mdx: MdxPost | null;
}

/** Look up a single post by slug — tries Prisma first, then falls back to MDX. */
export async function getUnifiedPostBySlug(slug: string): Promise<ResolvedPost | null> {
  try {
    const dbPost = await prisma.blogPost.findUnique({ where: { slug } });
    if (dbPost && dbPost.published && dbPost.postType === "ARTICLE") {
      return { post: fromDb(dbPost), source: "db", db: dbPost, mdx: null };
    }
  } catch {
    // fall through to MDX lookup
  }

  const mdxPost = getMdxPostBySlug(slug);
  if (mdxPost) {
    return { post: fromMdx(mdxPost), source: "mdx", db: null, mdx: mdxPost };
  }

  return null;
}

/** Unique, alphabetized list of topics present across all posts. */
export function getTopics(posts: UnifiedPost[]): string[] {
  return Array.from(new Set(posts.map((post) => post.topic))).sort((a, b) => a.localeCompare(b));
}

/** Posts sharing a topic with `current`, most recent first, excluding `current` itself. */
export function getRelatedPosts(posts: UnifiedPost[], current: UnifiedPost, limit = 3): UnifiedPost[] {
  return [...posts]
    .filter((post) => post.slug !== current.slug)
    .sort((a, b) => {
      const aMatch = a.topic === current.topic ? 1 : 0;
      const bMatch = b.topic === current.topic ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    })
    .slice(0, limit);
}
