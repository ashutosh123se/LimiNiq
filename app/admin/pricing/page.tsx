"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, X, Tag } from "lucide-react";
import { PlanData } from "@/components/sections/pricing/PricingSectionClient";

export default function PricingManager() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Basic fetch
  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load plans", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div style={{ padding: "2rem" }}>Loading Pricing Manager...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 700 }}>
          Pricing Manager
        </h1>
        <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Plus size={16} /> Add New Plan
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        
        {/* Web Dev Category */}
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem", color: "var(--accent-primary)" }}>
            Web Development
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {plans.filter(p => p.type === "WEB_DEV").map(plan => (
              <AdminPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* SEO Category */}
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem", color: "var(--accent-primary)" }}>
            SEO & Marketing
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {plans.filter(p => p.type === "SEO_MARKETING").map(plan => (
              <AdminPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function AdminPlanCard({ plan }: { plan: PlanData }) {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: plan.elevated ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: "1.5rem",
        position: "relative"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {plan.name}
            {plan.badge && <span style={{ fontSize: "0.7rem", background: "var(--accent-primary)", color: "white", padding: "2px 8px", borderRadius: 100 }}>{plan.badge}</span>}
          </h3>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginTop: "0.25rem" }}>
            {plan.price} <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", fontWeight: 400 }}>{plan.priceSuffix}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 4 }} title="Edit">
            <Edit2 size={16} />
          </button>
          <button style={{ background: "transparent", border: "none", color: "#EF4444", cursor: "pointer", padding: 4 }} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.4 }}>
        {plan.tagline}
      </p>

      <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem", marginTop: "1rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "0.5rem", fontWeight: 600 }}>
          Features ({plan.features.length})
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {plan.features.slice(0, 4).map((f: any, i: number) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {f.included ? <Check size={14} color="var(--accent-teal)" /> : <X size={14} color="var(--text-tertiary)" />}
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.text}</span>
            </li>
          ))}
          {plan.features.length > 4 && (
            <li style={{ color: "var(--text-tertiary)", fontStyle: "italic", marginTop: "0.25rem" }}>
              + {plan.features.length - 4} more...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
