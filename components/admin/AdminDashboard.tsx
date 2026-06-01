"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface OverviewData {
  overview: {
    totalLeads: number;
    newToday: number;
    conversionRate: number;
    monthlyGrowth: number;
    estimatedRevenue: string;
  };
  byStatus: { status: string; count: number }[];
  overTime: { date: string; total: number; converted: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "#3B5BFF",
  CONTACTED: "#FBB034",
  QUALIFIED: "#00C8A0",
  PROPOSAL_SENT: "#7B61FF",
  NEGOTIATION: "#FF6B6B",
  CONVERTED: "#22c55e",
  LOST: "#ef4444",
};

const KPI_CARDS = (d: OverviewData["overview"]) => [
  { label: "Total Leads", value: d.totalLeads.toString(), change: `+${d.monthlyGrowth}% MoM`, icon: "👤", color: "#3B5BFF" },
  { label: "New Today", value: d.newToday.toString(), change: "Today", icon: "⚡", color: "#00C8A0" },
  { label: "Conversion Rate", value: `${d.conversionRate}%`, change: "All time", icon: "🎯", color: "#7B61FF" },
  { label: "Est. Revenue", value: d.estimatedRevenue, change: "Converted deals", icon: "💰", color: "#FBB034" },
];

export function AdminDashboard() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState<{ id: string; name: string; email: string; status: string; score: number; services: string[]; createdAt: string }[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/analytics/overview")
        .then((r) => r.json().catch(() => ({})))
        .catch(() => ({})),
      fetch("/api/leads?limit=8")
        .then((r) => r.json().catch(() => ({})))
        .catch(() => ({})),
    ]).then(([analytics, leadsData]) => {
      // Provide fallback defaults if APIs return errors (e.g. DB not connected)
      setData(analytics.overview ? analytics : {
        overview: { totalLeads: 0, newToday: 0, conversionRate: 0, monthlyGrowth: 0, estimatedRevenue: "₹0" },
        byStatus: [],
        overTime: []
      });
      setRecentLeads(leadsData.leads || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid rgba(59,91,255,0.3)", borderTopColor: "#3B5BFF", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
          <p style={{ fontFamily: "var(--font-heading)" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "white", margin: "0 0 0.25rem" }}>
          Dashboard
        </h1>
        <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {KPI_CARDS(data.overview).map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "1.25rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{kpi.label}</span>
              <span style={{ fontSize: "1.2rem" }}>{kpi.icon}</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "white", marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
              {kpi.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: kpi.color }}>
              {kpi.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="charts-grid">
        {/* Bar chart — leads over time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem" }}
        >
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "white", margin: "0 0 1.25rem", fontSize: "0.95rem" }}>Leads — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.overTime}>
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1a1440", border: "1px solid rgba(59,91,255,0.25)", borderRadius: 10, fontFamily: "DM Sans" }}
                labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                itemStyle={{ color: "#3B5BFF" }}
              />
              <Bar dataKey="total" fill="#3B5BFF" radius={[4, 4, 0, 0]} name="Leads" />
              <Bar dataKey="converted" fill="#00C8A0" radius={[4, 4, 0, 0]} name="Converted" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart — by status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem" }}
        >
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "white", margin: "0 0 1.25rem", fontSize: "0.95rem" }}>Leads by Status</h3>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={data.byStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={50} outerRadius={75} strokeWidth={0}>
                  {data.byStatus.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.status] || "#3B5BFF"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
              {data.byStatus.map((entry) => (
                <div key={entry.status} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[entry.status] || "#3B5BFF", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", flex: 1 }}>{entry.status}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "white", fontWeight: 600 }}>{entry.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent leads table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}
      >
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "white", margin: 0, fontSize: "0.95rem" }}>Recent Leads</h3>
          <a href="/admin/leads" style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", color: "#3B5BFF", textDecoration: "none", fontWeight: 600 }}>View all →</a>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Name", "Email", "Services", "Status", "Score", "Date"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1.5rem", textAlign: "left", fontFamily: "var(--font-heading)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  style={{ cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  onClick={() => window.location.href = `/admin/leads/${lead.id}`}
                >
                  <td style={{ padding: "0.9rem 1.5rem", fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 600, color: "white" }}>{lead.name}</td>
                  <td style={{ padding: "0.9rem 1.5rem", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{lead.email}</td>
                  <td style={{ padding: "0.9rem 1.5rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>{lead.services.join(", ")}</td>
                  <td style={{ padding: "0.9rem 1.5rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: `${STATUS_COLORS[lead.status] || "#3B5BFF"}22`, color: STATUS_COLORS[lead.status] || "#3B5BFF", letterSpacing: "0.05em" }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.9rem 1.5rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, color: lead.score >= 75 ? "#00C8A0" : lead.score >= 50 ? "#FBB034" : "#ef4444" }}>
                      {lead.score}/100
                    </span>
                  </td>
                  <td style={{ padding: "0.9rem 1.5rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 900px) {
          .charts-grid { grid-template-columns: 1.8fr 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
