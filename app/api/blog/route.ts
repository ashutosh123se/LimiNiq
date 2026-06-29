import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { blogPostSchema } from "@/lib/validations";
import slugify from "slugify";
import { auth } from "@/auth";
import { getCategoryAliases } from "@/lib/data/blogCategories";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const published = searchParams.get("published");
  const postType = searchParams.get("postType");
  const trending = searchParams.get("trending");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);

  const where: Prisma.BlogPostWhereInput = {};

  if (category) {
    const aliases = getCategoryAliases(category);
    where.category = aliases.length === 1 ? aliases[0] : { in: aliases };
  }

  if (published === "true") where.published = true;
  else if (published === "false") where.published = false;

  if (postType === "ARTICLE" || postType === "POLL") where.postType = postType;
  if (trending === "true") where.trending = true;

  try {
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [{ trending: "desc" }, { publishedAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          category: true,
          coverImage: true,
          author: true,
          published: true,
          publishedAt: true,
          views: true,
          tags: true,
          createdAt: true,
          content: true,
          postType: true,
          trending: true,
          pollOptions: true,
          pollEndsAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 422 });
  }

  if (parsed.data.postType === "POLL" && (!parsed.data.pollOptions || parsed.data.pollOptions.length < 2)) {
    return NextResponse.json({ error: "Polls require at least 2 options" }, { status: 422 });
  }

  const slug = slugify(parsed.data.title, { lower: true, strict: true });

  try {
    const post = await prisma.blogPost.create({
      data: {
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        category: parsed.data.category,
        coverImage: parsed.data.coverImage || null,
        author: parsed.data.author,
        published: parsed.data.published,
        tags: parsed.data.tags || [],
        metaTitle: parsed.data.metaTitle,
        metaDesc: parsed.data.metaDesc,
        postType: parsed.data.postType,
        trending: parsed.data.trending,
        pollOptions: parsed.data.pollOptions ?? undefined,
        pollEndsAt: parsed.data.pollEndsAt ? new Date(parsed.data.pollEndsAt) : null,
        slug,
        publishedAt: parsed.data.published ? new Date() : null,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug already exists or internal error" }, { status: 500 });
  }
}
