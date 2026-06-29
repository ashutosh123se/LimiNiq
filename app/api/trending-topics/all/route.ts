import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

/** Admin-only: all topics including inactive */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const topics = await prisma.trendingTopic.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json({ topics });
  } catch {
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
  }
}
