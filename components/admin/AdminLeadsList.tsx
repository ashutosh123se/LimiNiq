"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  budget?: string;
  status: string;
  priority: string;
  score: number;
  source?: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  NEW: "#3B5BFF", CONTACTED: "#FBB034", QUALIFIED: "#00C8A0",
  PROPOSAL_SENT: "#7B61FF", NEGOTIATION: "#FF6B6B", CONVERTED: "#22c55e",
  LOST: "#ef4444", ARCHIVED: "#6b7280",
};
const PRIORITY_COLORS: Record<string, string> = {
  LOW: "#6b7280", MEDIUM: "#FBB034", HIGH: "#FF6B6B", URGENT: "#ef4444",
};

const STATUSES = ["", "NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "CONVERTED", "LOST"];
const PRIORITIES = ["", "LOW", "MEDIUM", "HIGH", "URGENT"];

export function AdminLeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "20",
      ...(search && { search }),
      ...(statusFilter && { status: statusFilter }),
      ...(priorityFilter && { priority: priorityFilter }),
    });
    const res = await fetch(`/api/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads || []);
    setTotal(data.total || 0);
    setPages(data.pages || 1);
    setLoading(false);
  }, [page, search, statusFilter, priorityFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
  };

  const handleExport = () => {
    const params = new URLSearchParams({
      ...(statusFilter && { status: statusFilter }),
    });
    window.open(`/api/leads/export?${params}`);
  };

  const toggleSelect = (id: string) => {
    setSelectedLeads((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "white", margin: 0 }}>Leads</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", margin: "4px 0 0" }}>
            {total} total leads
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={handleExport} style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 600, padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>
            📥 Export CSV
          </button>
          <button onClick={() => setViewMode(viewMode === "table" ? "kanban" : "table")} style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 600, padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>
            {viewMode === "table" ? "🗂 Kanban" : "📋 Table"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search name, email, company..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ flex: 1, minWidth: 200, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: "10px 14px", color: "white", fontFamily: "var(--font-body)", fontSize: "0.9rem", outline: "none" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: "10px 14px", color: "white", fontFamily: "var(--font-heading)", fontSize: "0.88rem", cursor: "pointer", outline: "none" }}
        >
          <option value="">All Statuses</option>
          {STATUSES.filter(Boolean).map((s) => <option key={s} value={s} style={{ background: "#0D1028" }}>{s}</option>)}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: "10px 14px", color: "white", fontFamily: "var(--font-heading)", fontSize: "0.88rem", cursor: "pointer", outline: "none" }}
        >
          <option value="">All Priorities</option>
          {PRIORITIES.filter(Boolean).map((p) => <option key={p} value={p} style={{ background: "#0D1028" }}>{p}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.4)" }}>
          <div style={{ width: 36, height: 36, border: "3px solid rgba(59,91,255,0.3)", borderTopColor: "#3B5BFF", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
          Loading leads...
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
              <thead>
                <tr>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <input type="checkbox" onChange={(e) => {
                      if (e.target.checked) setSelectedLeads(new Set(leads.map((l) => l.id)));
                      else setSelectedLeads(new Set());
                    }} />
                  </th>
                  {["Lead", "Services", "Budget", "Status", "Priority", "Score", "Date", ""].map((h) => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "var(--font-heading)", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <input type="checkbox" checked={selectedLeads.has(lead.id)} onChange={() => toggleSelect(lead.id)} />
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 700, color: "white", marginBottom: "2px" }}>{lead.name}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{lead.email}</div>
                      {lead.company && <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>{lead.company}</div>}
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      {lead.services.join(", ")}
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      {lead.budget || "—"}
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        style={{
                          background: `${STATUS_COLORS[lead.status] || "#3B5BFF"}18`,
                          border: `1px solid ${STATUS_COLORS[lead.status] || "#3B5BFF"}44`,
                          color: STATUS_COLORS[lead.status] || "#3B5BFF",
                          borderRadius: 8,
                          padding: "4px 8px",
                          fontFamily: "var(--font-heading)",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        {STATUSES.filter(Boolean).map((s) => <option key={s} value={s} style={{ background: "#0D1028", color: "white" }}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, color: PRIORITY_COLORS[lead.priority] }}>
                        {lead.priority}
                      </span>
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", fontWeight: 700, color: lead.score >= 75 ? "#00C8A0" : lead.score >= 50 ? "#FBB034" : "#ef4444" }}>
                        {lead.score}/100
                      </span>
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td style={{ padding: "0.8rem 1rem" }}>
                      <Link href={`/admin/leads/${lead.id}`} style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "#3B5BFF", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                width: 36, height: 36, borderRadius: 8,
                background: page === p ? "var(--gradient-hero)" : "rgba(255,255,255,0.05)",
                border: page === p ? "none" : "1px solid rgba(255,255,255,0.10)",
                color: page === p ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
