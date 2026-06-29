import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trendingTopicSchema } from "@/lib/validations";
import slugify from "slugify";
import { auth } from "@/auth";
import { FALLBACK_TRENDING_TOPICS } from "@/lib/data/blogEngagement";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const topics = await prisma.trendingTopic.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ topics: topics.length ? topics : FALLBACK_TRENDING_TOPICS });
  } catch {
    return NextResponse.json({ topics: FALLBACK_TRENDING_TOPICS });
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

  const parsed = trendingTopicSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 422 });
  }

  const slug = slugify(parsed.data.label, { lower: true, strict: true });

  try {
    const topic = await prisma.trendingTopic.create({
      data: {
        ...parsed.data,
        slug,
        href: parsed.data.href || null,
      },
    });
    return NextResponse.json(topic, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create topic" }, { status: 500 });
  }
}
