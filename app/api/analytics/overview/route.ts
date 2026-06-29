import { NextRequest, NextResponse } from "next/server";
import { getOverviewStats, getLeadsByStatus, getLeadsOverTime, getTopPages, getLeadsBySource } from "@/lib/analytics";
import { requireAdmin } from "@/lib/requireAdmin";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const [overview, byStatus, overTime, topPages, bySource, subscribers, campaigns, chatSessions, blogPosts] =
      await Promise.all([
      getOverviewStats(),
      getLeadsByStatus(),
      getLeadsOverTime(30),
      getTopPages(10),
      getLeadsBySource(),
      prisma.newsletterSubscriber.count({ where: { subscribed: true } }),
      prisma.newsletterCampaign.count(),
      prisma.aIChatSession.count(),
      prisma.blogPost.count({ where: { published: true } }),
    ]);
    return NextResponse.json({
      overview,
      byStatus,
      overTime,
      topPages,
      bySource,
      subscribers,
      campaigns,
      chatSessions,
      blogPosts,
    });
  } catch (err) {
    console.error("[Analytics Overview]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
