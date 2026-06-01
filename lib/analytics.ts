import { prisma } from "./prisma";

// ── Page View Tracking ───────────────────────────────────────
export async function logPageView(page: string): Promise<void> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.pageView.upsert({
      where: { page_date: { page, date: today } },
      update: { views: { increment: 1 } },
      create: { page, date: today, views: 1 },
    });
  } catch {
    // Non-critical — fail silently
  }
}

// ── Dashboard KPI Stats ──────────────────────────────────────
export async function getOverviewStats() {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    totalLeads,
    newToday,
    convertedTotal,
    lastMonthLeads,
    thisMonthLeads,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: { not: "ARCHIVED" } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.lead.count({ where: { status: "CONVERTED" } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfThisMonth } } }),
  ]);

  const conversionRate = totalLeads > 0 ? (convertedTotal / totalLeads) * 100 : 0;
  const monthlyGrowth = lastMonthLeads > 0
    ? ((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100
    : 0;

  return {
    totalLeads,
    newToday,
    conversionRate: Math.round(conversionRate * 10) / 10,
    monthlyGrowth: Math.round(monthlyGrowth * 10) / 10,
    // Estimate ₹50K average deal × conversion rate
    estimatedRevenue: `₹${Math.round(convertedTotal * 50000 / 100000)}L`,
  };
}

// ── Lead Analytics ────────────────────────────────────────────
export async function getLeadsByStatus() {
  const grouped = await prisma.lead.groupBy({
    by: ["status"],
    _count: { status: true },
  });
  return grouped.map((g) => ({ status: g.status, count: g._count.status }));
}

export async function getLeadsBySource() {
  const grouped = await prisma.lead.groupBy({
    by: ["source"],
    _count: { source: true },
    orderBy: { _count: { source: "desc" } },
    take: 10,
  });
  return grouped.map((g) => ({ source: g.source || "Direct", count: g._count.source }));
}

export async function getLeadsOverTime(days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const leads = await prisma.lead.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true, status: true },
    orderBy: { createdAt: "asc" },
  });

  // Group by date
  const byDate: Record<string, { total: number; converted: number }> = {};
  leads.forEach((lead) => {
    const date = lead.createdAt.toISOString().split("T")[0];
    if (!byDate[date]) byDate[date] = { total: 0, converted: 0 };
    byDate[date].total++;
    if (lead.status === "CONVERTED") byDate[date].converted++;
  });

  return Object.entries(byDate).map(([date, data]) => ({ date, ...data }));
}

// ── Traffic Analytics ─────────────────────────────────────────
export async function getTopPages(limit = 10) {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const views = await prisma.pageView.groupBy({
    by: ["page"],
    _sum: { views: true },
    where: { date: { gte: since } },
    orderBy: { _sum: { views: "desc" } },
    take: limit,
  });

  return views.map((v) => ({ page: v.page, views: v._sum.views || 0 }));
}
