"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { PlanData } from "@/components/sections/pricing/PricingSectionClient";

type Tab = "starting" | "tiers";

type StartingPriceRow = {
  id: string;
  slug: string;
  title: string;
  shortLabel: string;
  startingPrice: string;
  priceNote: string;
  summary: string;
  highlights: string[];
  color: string;
  iconKey: string;
  featured: boolean;
  sortOrder: number;
  active: boolean;
};

const emptyStarting = {
  slug: "",
  title: "",
  shortLabel: "",
  startingPrice: "",
  priceNote: "",
  summary: "",
  highlights: "",
  color: "#3B5BFF",
  iconKey: "Code2",
  featured: false,
  sortOrder: 0,
  active: true,
};

export function AdminPricingManager() {
  const [tab, setTab] = useState<Tab>("starting");
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [starting, setStarting] = useState<StartingPriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStarting, setEditingStarting] = useState<StartingPriceRow | null>(null);
  const [startingForm, setStartingForm] = useState(emptyStarting);
  const [showStartingForm, setShowStartingForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    Promise.all([
      fetch("/api/admin/pricing").then((r) => r.json()),
      fetch("/api/admin/starting-prices").then((r) => r.json()),
    ])
      .then(([p, s]) => {
        setPlans(Array.isArray(p) ? p : []);
        setStarting(Array.isArray(s) ? s : []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const saveStarting = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...startingForm,
      highlights: startingForm.highlights.split(",").map((h) => h.trim()).filter(Boolean),
    };
    const res = editingStarting
      ? await fetch(`/api/admin/starting-prices/${editingStarting.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/starting-prices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    if (res.ok) {
      setEditingStarting(null);
      setStartingForm(emptyStarting);
      setShowStartingForm(false);
      load();
    }
    setSaving(false);
  };

  const deleteStarting = async (id: string) => {
    if (!confirm("Delete this starting price?")) return;
    await fetch(`/api/admin/starting-prices/${id}`, { method: "DELETE" });
    load();
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading pricing…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Pricing Manager
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
        Starting rates on homepage &amp; /pricing. Tier plans for detailed comparison cards.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {(["starting", "tiers"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              padding: "8px 18px",
              borderRadius: 100,
              border: tab === t ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
              background: tab === t ? "rgba(59,91,255,0.15)" : "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            {t === "starting" ? "Starting Rates (live on site)" : "Tier Plans"}
          </button>
        ))}
      </div>

      {tab === "starting" && (
        <>
          <button
            type="button"
            className="btn-primary"
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}
            onClick={() => {
              setEditingStarting(null);
              setStartingForm(emptyStarting);
              setShowStartingForm(true);
            }}
          >
            <Plus size={16} /> Add starting rate
          </button>

          {(showStartingForm || editingStarting) && (
            <form onSubmit={saveStarting} style={{ ...card, marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "1rem" }}>{editingStarting ? "Edit" : "New"} starting rate</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <input required placeholder="Title" value={startingForm.title} onChange={(e) => setStartingForm({ ...startingForm, title: e.target.value })} style={input} />
                <input required placeholder="Slug" value={startingForm.slug} onChange={(e) => setStartingForm({ ...startingForm, slug: e.target.value })} style={input} />
                <input required placeholder="Price e.g. ₹75,000" value={startingForm.startingPrice} onChange={(e) => setStartingForm({ ...startingForm, startingPrice: e.target.value })} style={input} />
                <input required placeholder="Price note" value={startingForm.priceNote} onChange={(e) => setStartingForm({ ...startingForm, priceNote: e.target.value })} style={input} />
                <input required placeholder="Short label" value={startingForm.shortLabel} onChange={(e) => setStartingForm({ ...startingForm, shortLabel: e.target.value })} style={input} />
                <input placeholder="Highlights (comma separated)" value={startingForm.highlights} onChange={(e) => setStartingForm({ ...startingForm, highlights: e.target.value })} style={input} />
              </div>
              <textarea required placeholder="Summary" value={startingForm.summary} onChange={(e) => setStartingForm({ ...startingForm, summary: e.target.value })} style={{ ...input, minHeight: 70, marginTop: 8, width: "100%" }} />
              <div style={{ display: "flex", gap: "1rem", marginTop: 8 }}>
                <label><input type="checkbox" checked={startingForm.featured} onChange={(e) => setStartingForm({ ...startingForm, featured: e.target.checked })} /> Featured</label>
                <label><input type="checkbox" checked={startingForm.active} onChange={(e) => setStartingForm({ ...startingForm, active: e.target.checked })} /> Active on site</label>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: 12 }} disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
            </form>
          )}

          <div style={{ display: "grid", gap: "1rem" }}>
            {starting.map((row) => (
              <div key={row.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong>{row.title}</strong> — <span style={{ color: "var(--accent-primary)" }}>{row.startingPrice}</span>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{row.summary}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" onClick={() => { setEditingStarting(row); setStartingForm({ ...row, highlights: row.highlights.join(", ") }); setShowStartingForm(true); }} style={iconBtn}><Edit2 size={16} /></button>
                    <button type="button" onClick={() => deleteStarting(row.id)} style={{ ...iconBtn, color: "#ef4444" }}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "tiers" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {plans.map((plan) => (
            <div key={plan.id} style={card}>
              <h3>{plan.name}</h3>
              <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{plan.price} <span style={{ fontSize: "0.8rem" }}>{plan.priceSuffix}</span></div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{plan.tagline}</p>
              <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 8 }}>{plan.type} · {plan.features?.length ?? 0} features</div>
            </div>
          ))}
          {plans.length === 0 && <p style={{ color: "var(--text-secondary)" }}>No tier plans in database. Run seed or add via API.</p>}
        </div>
      )}
    </div>
  );
}

const card: React.CSSProperties = {
  background: "var(--bg-surface)",
  border: "1px solid var(--border-subtle)",
  borderRadius: 14,
  padding: "1.25rem",
};

const input: React.CSSProperties = {
  padding: "0.6rem 0.8rem",
  borderRadius: 8,
  border: "1px solid var(--border-subtle)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
};

const iconBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "var(--text-secondary)",
  cursor: "pointer",
};
