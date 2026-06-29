"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Mail, MessageSquare, FileText, TrendingUp } from "lucide-react";

type AnalyticsData = {
  overview: {
    totalLeads: number;
    newToday: number;
    conversionRate: number;
    monthlyGrowth: number;
    estimatedRevenue: string;
  };
  byStatus: { status: string; count: number }[];
  overTime: { date: string; total: number; converted: number }[];
  topPages: { page: string; views: number }[];
  bySource: { source: string; count: number }[];
  subscribers: number;
  campaigns: number;
  chatSessions: number;
  blogPosts: number;
};

export function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/overview")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: "2rem", color: "white" }}>Loading analytics…</div>;
  if (!data) return <div style={{ padding: "2rem", color: "#ef4444" }}>Failed to load analytics.</div>;

  const cards = [
    { label: "Total Leads", value: data.overview.totalLeads, icon: Users },
    { label: "New Today", value: data.overview.newToday, icon: TrendingUp },
    { label: "Conversion Rate", value: `${data.overview.conversionRate}%`, icon: BarChart3 },
    { label: "Newsletter Subs", value: data.subscribers, icon: Mail },
    { label: "AI Chat Sessions", value: data.chatSessions, icon: MessageSquare },
    { label: "Live Blog Posts", value: data.blogPosts, icon: FileText },
  ];

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
        Analytics
      </h1>
      <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "2rem" }}>
        Leads, traffic, content, and engagement — last 30 days where applicable.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {cards.map((c) => (
          <div key={c.label} style={cardStyle}>
            <c.icon size={18} style={{ color: "var(--accent-primary)", marginBottom: 8 }} />
            <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{c.value}</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <Panel title="Leads by status">
          {data.byStatus.map((s) => (
            <Row key={s.status} label={s.status.replace(/_/g, " ")} value={s.count} />
          ))}
        </Panel>
        <Panel title="Leads by source">
          {data.bySource.map((s) => (
            <Row key={s.source} label={s.source} value={s.count} />
          ))}
        </Panel>
        <Panel title="Top pages (30d)">
          {data.topPages.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>No page views yet — browsing the site will populate this.</p>
          ) : (
            data.topPages.map((p) => <Row key={p.page} label={p.page} value={p.views} />)
          )}
        </Panel>
        <Panel title="Lead trend (30d)">
          {data.overTime.slice(-7).map((d) => (
            <Row key={d.date} label={d.date} value={`${d.total} (${d.converted} won)`} />
          ))}
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ ...cardStyle, padding: "1.25rem" }}>
      <h2 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "0.85rem" }}>
      <span style={{ color: "rgba(255,255,255,0.65)" }}>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 14,
  padding: "1rem",
};
