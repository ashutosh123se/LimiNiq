import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import slugify from "slugify";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface MdxPostFrontmatter {
  title: string;
  description: string;
  author: string;
  /** ISO date string, e.g. "2025-11-04" */
  date: string;
  /** Optional explicit reading time label (e.g. "8 min"). Falls back to a computed estimate. */
  readingTime?: string;
  topic: string;
  image?: string;
}

export interface MdxPost extends MdxPostFrontmatter {
  slug: string;
  /** Raw markdown/MDX body (frontmatter stripped). */
  content: string;
  /** Always populated — either the frontmatter override or a computed estimate. */
  readingTime: string;
}

export interface HeadingItem {
  text: string;
  slug: string;
}

/** Slugify a heading label consistently for TOC anchors and rendered heading ids. */
export function slugifyHeading(text: string): string {
  return slugify(text, { lower: true, strict: true });
}

function parseMdxFile(fileName: string): MdxPost {
  const filePath = path.join(BLOG_CONTENT_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<MdxPostFrontmatter>;
  const slug = fileName.replace(/\.mdx$/, "");
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title ?? slug,
    description: frontmatter.description ?? "",
    author: frontmatter.author ?? "LIMINIQ Team",
    date: frontmatter.date ?? new Date().toISOString(),
    topic: frontmatter.topic ?? "Insights",
    image: frontmatter.image,
    readingTime: frontmatter.readingTime ?? stats.text.replace("read", "").trim(),
    content: content.trim(),
  };
}

/** All MDX blog posts from content/blog, sorted by date descending. */
export function getAllMdxPosts(): MdxPost[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];

  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseMdxFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** A single MDX post by slug, or null if it doesn't exist. */
export function getMdxPostBySlug(slug: string): MdxPost | null {
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseMdxFile(`${slug}.mdx`);
}

/** Extract `## Heading` lines from raw MDX for a table-of-contents sidebar. */
export function extractHeadings(content: string): HeadingItem[] {
  const matches = [...content.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((match) => {
    const text = match[1].replace(/[*_`]/g, "").trim();
    return { text, slug: slugifyHeading(text) };
  });
}
