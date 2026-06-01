import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured");

  try {
    const items = await prisma.portfolioItem.findMany({
      where: featured === "true" ? { featured: true } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  try {
    const item = await prisma.portfolioItem.create({
      data: {
        title: body.title,
        client: body.client,
        category: body.category,
        description: body.description,
        metrics: body.metrics || [],
        coverImage: body.coverImage || null,
        liveUrl: body.liveUrl || null,
        tags: body.tags || [],
        featured: body.featured || false,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}
