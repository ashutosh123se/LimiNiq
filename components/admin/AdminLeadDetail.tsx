"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2 } from "lucide-react";

type LeadDetail = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  services: string[];
  budget: string | null;
  timeline: string | null;
  source: string | null;
  message: string | null;
  status: string;
  priority: string;
  score: number;
  notes: string | null;
  createdAt: string;
  activities: { id: string; type: string; note: string; createdAt: string }[];
  emailsSent: { id: string; subject: string; sentAt: string; type: string }[];
};

export function AdminLeadDetail({ id }: { id: string }) {
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/leads/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setLead(data);
        setStatus(data.status);
        setNotes(data.notes ?? "");
      });
  }, [id]);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    setSaving(false);
  };

  if (!lead) return <div style={{ padding: "2rem", color: "white" }}>Loading lead…</div>;

  return (
    <div style={{ padding: "2rem", color: "white", maxWidth: 900 }}>
      <Link href="/admin/leads" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "1.5rem" }}>
        <ArrowLeft size={16} /> Back to leads
      </Link>

      <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem" }}>{lead.name}</h1>
      <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
        Score {lead.score} · {new Date(lead.createdAt).toLocaleString()}
      </p>

      <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
        <Info icon={<Mail size={16} />} label="Email" value={lead.email} />
        {lead.phone && <Info icon={<Phone size={16} />} label="Phone" value={lead.phone} />}
        {lead.company && <Info icon={<Building2 size={16} />} label="Company" value={lead.company} />}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Services:</strong> {lead.services.join(", ")}
      </div>
      {lead.message && (
        <div style={{ marginBottom: "1.5rem", padding: "1rem", borderRadius: 12, background: "rgba(255,255,255,0.04)" }}>
          {lead.message}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <label>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
            {["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "CONVERTED", "LOST"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Priority</span>
          <input readOnly value={lead.priority} style={inputStyle} />
        </label>
      </div>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Internal notes</span>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, minHeight: 100 }} />
      </label>

      <button onClick={save} disabled={saving} className="btn-primary" style={{ marginBottom: "2rem" }}>
        {saving ? "Saving…" : "Save changes"}
      </button>

      <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Activity</h2>
      {lead.activities.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.45)" }}>No activity logged yet.</p>
      ) : (
        lead.activities.map((a) => (
          <div key={a.id} style={{ padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "0.88rem" }}>
            <strong>{a.type}</strong> — {a.note}
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{new Date(a.createdAt).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <span style={{ color: "var(--accent-primary)" }}>{icon}</span>
      <div>
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>{label}</div>
        <div>{value}</div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: "0.65rem 0.85rem",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
};
