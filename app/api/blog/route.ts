import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { blogPostSchema } from "@/lib/validations";
import slugify from "slugify";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const published = searchParams.get("published");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);

  const where: Prisma.BlogPostWhereInput = {};
  if (category) where.category = category;
  if (published !== null) where.published = published === "true";
  else where.published = true; // Default: only published

  try {
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, title: true, slug: true, excerpt: true, category: true,
          coverImage: true, author: true, published: true, publishedAt: true,
          views: true, tags: true, createdAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 422 });

  const slug = slugify(parsed.data.title, { lower: true, strict: true });

  try {
    const post = await prisma.blogPost.create({
      data: {
        ...parsed.data,
        slug,
        tags: parsed.data.tags || [],
        publishedAt: parsed.data.published ? new Date() : null,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug already exists or internal error" }, { status: 500 });
  }
}
