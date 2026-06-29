"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { STARTING_PRICES } from "@/lib/data/startingPrices";
import { PricingFAQ } from "./PricingFAQ";
import { PricingCTA } from "./PricingCTA";

interface StartingPriceGridProps {
  showFAQ?: boolean;
  compact?: boolean;
}

export function StartingPriceGrid({ showFAQ = false, compact = false }: StartingPriceGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="sp-header"
          style={{ textAlign: compact ? "center" : "left", maxWidth: compact ? 640 : 560, margin: compact ? "0 auto 2.5rem" : "0 0 2.5rem" }}
        >
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Investment
          </div>
          <h2 className="section-h2" style={{ marginBottom: "0.75rem" }}>
            Starting Points,{" "}
            <span className="text-gradient">Not Ceiling Prices</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            Every engagement is scoped after discovery. These are where projects typically begin — contact us for
            a tailored quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="sp-sheet glass-card-premium"
        >
          <div className="sp-sheet-bar">
            <span className="sp-sheet-label">LIMINIQ — service rate card</span>
            <span className="sp-sheet-meta">INR · 2026</span>
          </div>

          <div className="sp-rows">
            {STARTING_PRICES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className={`sp-row ${item.featured ? "sp-row--featured" : ""}`}
                  style={{ "--row-accent": item.color } as React.CSSProperties}
                >
                  {item.featured && (
                    <div className="sp-row-badge">
                      <Sparkles size={12} />
                      Primary Focus
                    </div>
                  )}

                  <div className="sp-row-left">
                    <div className="sp-row-icon" style={{ color: item.color, borderColor: `${item.color}40`, background: `${item.color}15` }}>
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="sp-row-label">{item.shortLabel}</div>
                      <h3 className="sp-row-title">{item.title}</h3>
                      {!compact && <p className="sp-row-summary">{item.summary}</p>}
                      <div className="sp-row-tags">
                        {item.highlights.slice(0, compact ? 2 : 3).map((tag) => (
                          <span key={tag} className="sp-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="sp-row-right">
                    <div className="sp-price-block">
                      <span className="sp-price-from">Starting from</span>
                      <span className="sp-price-value">{item.startingPrice}</span>
                      <span className="sp-price-note">{item.priceNote}</span>
                    </div>
                    <Link
                      href={`/contact?service=${item.slug}`}
                      className="sp-cta-btn"
                      style={{ borderColor: `${item.color}50`, color: item.color }}
                    >
                      Get Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="sp-sheet-footer">
            <span>Custom enterprise scopes quoted individually</span>
            <span className="sp-sheet-footer-dot">·</span>
            <span>No hidden fees</span>
            <span className="sp-sheet-footer-dot">·</span>
            <span>Source code & assets yours to keep</span>
          </div>
        </motion.div>

        {!compact && (
          <>
            <PricingCTA />
            {showFAQ && <PricingFAQ />}
          </>
        )}

        {compact && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/pricing" className="btn-secondary">
              View Full Pricing Details
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .sp-sheet {
          border-radius: 28px;
          overflow: hidden;
          padding: 0;
        }

        .sp-sheet-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.5rem;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .sp-sheet-label {
          color: var(--text-secondary);
        }

        .sp-sheet-meta {
          color: var(--text-tertiary);
        }

        .sp-rows {
          display: flex;
          flex-direction: column;
        }

        .sp-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1.5rem;
          align-items: center;
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          transition: background 0.25s ease;
        }

        .sp-row:last-of-type {
          border-bottom: none;
        }

        .sp-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .sp-row--featured {
          background: rgba(123, 97, 255, 0.04);
          border-left: 3px solid var(--row-accent);
        }

        .sp-row-badge {
          position: absolute;
          top: 0.75rem;
          right: 1.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-violet);
          padding: 3px 8px;
          border-radius: 100px;
          background: rgba(123, 97, 255, 0.12);
          border: 1px solid rgba(123, 97, 255, 0.25);
        }

        .sp-row-left {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          min-width: 0;
        }

        .sp-row-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sp-row-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.25rem;
        }

        .sp-row-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
          line-height: 1.25;
        }

        .sp-row-summary {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 0.75rem;
          max-width: 480px;
        }

        .sp-row-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .sp-tag {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .sp-row-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.85rem;
          flex-shrink: 0;
        }

        .sp-price-block {
          text-align: right;
        }

        .sp-price-from {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.2rem;
        }

        .sp-price-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .sp-row--featured .sp-price-value {
          background: linear-gradient(135deg, #fff, #a0b4ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sp-price-note {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-tertiary);
          margin-top: 0.35rem;
        }

        .sp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 1.1rem;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .sp-cta-btn:hover {
          background: rgba(255, 255, 255, 0.07);
          transform: translateX(3px);
        }

        .sp-sheet-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.25);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .sp-sheet-footer-dot {
          opacity: 0.4;
        }

        @media (max-width: 768px) {
          .sp-row {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            padding: 1.25rem;
          }
          .sp-row-badge {
            position: static;
            align-self: flex-start;
            margin-bottom: 0.5rem;
            order: -1;
          }
          .sp-row--featured {
            display: flex;
            flex-direction: column;
          }
          .sp-row-right {
            align-items: flex-start;
            width: 100%;
          }
          .sp-price-block {
            text-align: left;
          }
          .sp-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
