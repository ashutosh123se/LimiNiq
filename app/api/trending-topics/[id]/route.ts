import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trendingTopicSchema } from "@/lib/validations";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const topics = await prisma.trendingTopic.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json({ topics });
  } catch {
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = trendingTopicSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed" }, { status: 422 });

  const updated = await prisma.trendingTopic.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.trendingTopic.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
