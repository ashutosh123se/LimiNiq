import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  try {
    const item = await prisma.portfolioItem.update({
      where: { id },
      data: {
        title: body.title,
        client: body.client,
        category: body.category,
        description: body.description,
        metrics: body.metrics,
        coverImage: body.coverImage,
        liveUrl: body.liveUrl,
        tags: body.tags,
        featured: body.featured,
      },
    });
    return NextResponse.json(item);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.portfolioItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 });
  }
}
