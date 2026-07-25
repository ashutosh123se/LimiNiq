"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

export function RoasCalculator() {
  const [adSpend, setAdSpend] = useState("1000");
  const [revenue, setRevenue] = useState("3500");
  const [margin, setMargin] = useState("40");

  const results = useMemo(() => {
    const spend = parseFloat(adSpend) || 0;
    const rev = parseFloat(revenue) || 0;
    const marginPct = parseFloat(margin) || 0;

    const roas = spend > 0 ? rev / spend : 0;
    const profit = rev * (marginPct / 100) - spend;
    const roi = spend > 0 ? (profit / spend) * 100 : 0;
    const breakEvenRoas = marginPct > 0 ? 100 / marginPct : 0;

    return { roas, profit, roi, breakEvenRoas };
  }, [adSpend, revenue, margin]);

  const verdict =
    results.breakEvenRoas > 0 && results.roas >= results.breakEvenRoas
      ? { label: "Profitable", color: "var(--signal)" }
      : { label: "Below break-even", color: "#f87171" };

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            ROAS <span className="text-gradient">Calculator</span>
          </>
        }
        description="Calculate your return on ad spend and the break-even ROAS you need to hit before a campaign is actually profitable."
      />

      <div className="tool-grid-2">
        <div className="tool-panel glass-card-premium">
          <div className="tool-field">
            <label htmlFor="ad-spend">Ad Spend (₹)</label>
            <input
              id="ad-spend"
              type="number"
              min="0"
              className="form-input"
              value={adSpend}
              onChange={(e) => setAdSpend(e.target.value)}
            />
          </div>
          <div className="tool-field">
            <label htmlFor="revenue">Revenue Generated (₹)</label>
            <input
              id="revenue"
              type="number"
              min="0"
              className="form-input"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>
          <div className="tool-field">
            <label htmlFor="margin">Profit Margin (%)</label>
            <input
              id="margin"
              type="number"
              min="0"
              max="100"
              className="form-input"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
            />
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Profit margin is your product/service margin before ad spend — used to calculate break-even ROAS.
          </p>
        </div>

        <div className="tool-panel glass-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <Calculator size={18} style={{ color: "var(--accent)" }} />
            <span className="font-heading" style={{ fontWeight: 700, color: "var(--text-primary)" }}>
              Results
            </span>
          </div>

          <div className="tool-result-row">
            <span>ROAS</span>
            <strong>{results.roas.toFixed(2)}x</strong>
          </div>
          <div className="tool-result-row">
            <span>Break-even ROAS</span>
            <strong>{results.breakEvenRoas.toFixed(2)}x</strong>
          </div>
          <div className="tool-result-row">
            <span>Estimated profit</span>
            <strong>₹{results.profit.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong>
          </div>
          <div className="tool-result-row">
            <span>ROI</span>
            <strong>{results.roi.toFixed(1)}%</strong>
          </div>

          <div
            style={{
              marginTop: "1.5rem",
              padding: "0.85rem 1rem",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: verdict.color,
              fontFamily: "var(--font-heading)",
            }}
          >
            {verdict.label} — your ROAS is {results.roas >= results.breakEvenRoas ? "above" : "below"} break-even.
          </div>
        </div>
      </div>
    </div>
  );
}
