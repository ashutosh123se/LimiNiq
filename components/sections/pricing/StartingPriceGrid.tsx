"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { STARTING_PRICES, type StartingPriceItem } from "@/lib/data/startingPrices";
import { contactServicePath } from "@/lib/contactServices";
import { PricingFAQ } from "./PricingFAQ";
import { PricingCTA } from "./PricingCTA";

interface StartingPriceGridProps {
  showFAQ?: boolean;
  compact?: boolean;
}

function PriceCard({
  item,
  index,
  isInView,
  featured = false,
  compact = false,
}: {
  item: StartingPriceItem;
  index: number;
  isInView: boolean;
  featured?: boolean;
  compact?: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
      className={`price-card glass-card-premium ${featured ? "price-card--featured" : ""} ${compact ? "price-card--compact" : ""}`}
      style={{ "--accent": item.color } as React.CSSProperties}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }}
    >
      <div className="price-card-glow" />

      <div className="price-card-top">
        {featured ? (
          <span className="price-card-badge">
            <Sparkles size={12} />
            Primary Focus
          </span>
        ) : (
          <span className="price-card-index">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>

      <div className={featured ? "price-card-mid" : undefined}>
        <div
          className="price-card-icon"
          style={{
            color: item.color,
            borderColor: `${item.color}35`,
            background: `linear-gradient(135deg, ${item.color}22, transparent)`,
          }}
        >
          <Icon size={featured ? 26 : 22} strokeWidth={1.5} />
        </div>

        <div className="price-card-body">
          <span className="price-card-label">{item.shortLabel}</span>
          <h3 className="price-card-title">{item.title}</h3>
          {!compact && <p className="price-card-summary">{item.summary}</p>}
          <ul className="price-card-tags">
            {item.highlights.slice(0, compact ? 2 : 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="price-card-footer">
        <div className="price-card-price">
          <span className="price-card-from">Starting from</span>
          <span className="price-card-value">{item.startingPrice}</span>
          <span className="price-card-note">{item.priceNote}</span>
        </div>
        <Link href={contactServicePath(item.slug)} className="price-card-cta">
          <span>Get Details</span>
          <ArrowUpRight size={18} strokeWidth={2} />
        </Link>
      </div>
    </motion.article>
  );
}

export function StartingPriceGrid({ showFAQ = false, compact = false }: StartingPriceGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [featured, ...rest] = STARTING_PRICES;

  return (
    <section ref={ref} className="pricing-section section-padding">
      <div className="pricing-bg-glow pricing-bg-glow--left" />
      <div className="pricing-bg-glow pricing-bg-glow--right" />
      <div className="pricing-dot-grid" />

      <div className="section-container pricing-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="pricing-intro"
          style={{ textAlign: compact ? "center" : "center" }}
        >
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Investment
          </div>
          <h2 className="section-h2" style={{ marginBottom: "0.75rem" }}>
            Transparent <span className="text-gradient">Starting Rates</span>
          </h2>
          <p className="pricing-intro-copy">
            Every project is scoped individually. These are entry points — reach out for a quote tailored to your
            goals and timeline.
          </p>
        </motion.div>

        <div className={`pricing-grid ${compact ? "pricing-grid--compact" : ""}`}>
          {featured && (
            <PriceCard item={featured} index={0} isInView={isInView} featured compact={compact} />
          )}
          {rest.map((item, i) => (
            <PriceCard key={item.id} item={item} index={i + 1} isInView={isInView} compact={compact} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="pricing-trust"
        >
          <span>No hidden fees</span>
          <span className="pricing-trust-dot">·</span>
          <span>Milestone billing available</span>
          <span className="pricing-trust-dot">·</span>
          <span>You own the code</span>
        </motion.div>

        {!compact && (
          <>
            <PricingCTA />
            {showFAQ && <PricingFAQ />}
          </>
        )}

        {compact && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/pricing" className="btn-secondary">
              View Full Pricing Details
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .pricing-section {
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .pricing-inner {
          position: relative;
          z-index: 1;
        }

        .pricing-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .pricing-bg-glow--left {
          width: 480px;
          height: 480px;
          top: 8%;
          left: -160px;
          background: rgba(123, 97, 255, 0.14);
        }
        .pricing-bg-glow--right {
          width: 420px;
          height: 420px;
          bottom: 5%;
          right: -120px;
          background: rgba(59, 91, 255, 0.1);
        }

        .pricing-dot-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.3;
          background-image: radial-gradient(rgba(59, 91, 255, 0.22) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 75% 65% at 50% 35%, black, transparent);
        }

        .pricing-intro {
          max-width: 640px;
          margin: 0 auto 3rem;
        }

        .pricing-intro-copy {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .pricing-grid > .price-card--featured {
          grid-column: 1 / -1;
        }

        .pricing-grid--compact {
          grid-template-columns: repeat(2, 1fr);
        }

        .pricing-grid--compact > .price-card--featured {
          grid-column: 1 / -1;
        }

        .price-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 1.75rem;
          border-radius: 24px;
          overflow: hidden;
          min-height: 100%;
          transition: transform 0.35s ease, border-color 0.35s ease;
        }

        .price-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .price-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            420px circle at var(--mouse-x) var(--mouse-y),
            color-mix(in srgb, var(--accent) 18%, transparent),
            transparent 45%
          );
        }

        .price-card:hover .price-card-glow {
          opacity: 1;
        }

        .price-card--featured {
          padding: 2rem 2.25rem;
          border-color: color-mix(in srgb, var(--accent) 30%, rgba(255,255,255,0.08));
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--accent) 8%, rgba(255,255,255,0.02)),
            rgba(255,255,255,0.02)
          );
        }

        .price-card--featured .price-card-mid {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .price-card--featured .price-card-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .price-card--featured .price-card-tags {
          margin-bottom: 0;
        }

        .price-card--featured .price-card-footer {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.75rem;
        }

        .price-card--featured .price-card-value {
          font-size: 2.25rem;
          background: linear-gradient(135deg, #fff 30%, color-mix(in srgb, var(--accent) 80%, #fff));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .price-card--compact {
          padding: 1.35rem;
          border-radius: 20px;
        }

        .price-card--compact .price-card-title {
          font-size: 1.05rem;
        }

        .price-card--compact .price-card-value {
          font-size: 1.35rem;
        }

        .price-card--compact.price-card--featured {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .price-card--compact.price-card--featured .price-card-footer {
          flex-direction: column;
          align-items: stretch;
          gap: 1rem;
        }

        .price-card--compact.price-card--featured .price-card-price {
          text-align: left;
        }

        .price-card-top {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
          min-height: 24px;
        }

        .price-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-violet);
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(123, 97, 255, 0.12);
          border: 1px solid rgba(123, 97, 255, 0.22);
        }

        .price-card-index {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
        }

        .price-card-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .price-card--compact .price-card-icon {
          width: 44px;
          height: 44px;
          margin-bottom: 1rem;
        }

        .price-card-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.35rem;
        }

        .price-card-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.6rem;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        .price-card-summary {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 1rem;
        }

        .price-card-tags {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .price-card-tags li {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 100px;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .price-card-body {
          flex: 1;
        }

        .price-card-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .price-card-price {
          text-align: left;
        }

        .price-card-from {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.25rem;
        }

        .price-card-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .price-card-note {
          display: block;
          font-size: 0.78rem;
          color: var(--text-tertiary);
          margin-top: 0.35rem;
        }

        .price-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          color: var(--text-primary);
          background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 25%, transparent), rgba(255,255,255,0.04));
          border: 1px solid color-mix(in srgb, var(--accent) 35%, rgba(255,255,255,0.1));
          transition: all 0.3s ease;
        }

        .price-card-cta:hover {
          background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 40%, transparent), rgba(255,255,255,0.06));
          border-color: color-mix(in srgb, var(--accent) 55%, transparent);
          transform: translateY(-1px);
        }

        .price-card-cta span {
          flex: 1;
        }

        .pricing-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem 0.85rem;
          margin-top: 2.5rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-tertiary);
        }

        .pricing-trust-dot {
          opacity: 0.35;
        }

        @media (max-width: 960px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .price-card--featured .price-card-footer {
            flex-direction: column;
            align-items: stretch;
          }
        }

        @media (max-width: 640px) {
          .pricing-grid--compact {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
