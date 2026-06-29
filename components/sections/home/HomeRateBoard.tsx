"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { STARTING_PRICES, type StartingPriceItem } from "@/lib/data/startingPrices";

function RateRow({
  item,
  index,
  isInView,
  featured = false,
}: {
  item: StartingPriceItem;
  index: number;
  isInView: boolean;
  featured?: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.08 + index * 0.06 }}
      className={`rate-row ${featured ? "rate-row--featured" : ""}`}
      style={{ "--rate-accent": item.color } as React.CSSProperties}
    >
      <Link href={`/contact?service=${item.slug}`} className="rate-row-link" data-cursor="view">
        <span className="rate-row-accent" />
        <span className="rate-row-index">{String(index + 1).padStart(2, "0")}</span>

        <span
          className="rate-row-icon"
          style={{
            color: item.color,
            borderColor: `${item.color}35`,
            background: `linear-gradient(135deg, ${item.color}18, transparent)`,
          }}
        >
          <Icon size={18} strokeWidth={1.6} />
        </span>

        <span className="rate-row-info">
          <span className="rate-row-label">{item.shortLabel}</span>
          <span className="rate-row-title">{item.title}</span>
          <span className="rate-row-tags">
            {item.highlights.slice(0, 2).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </span>

        <span className="rate-row-price-block">
          <span className="rate-row-from">From</span>
          <span className="rate-row-price">{item.startingPrice}</span>
          <span className="rate-row-note">{item.priceNote}</span>
        </span>

        <span className="rate-row-arrow" aria-hidden>
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      </Link>
    </motion.li>
  );
}

export function HomeRateBoard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="rate-board section-padding">
      <div className="rate-board-glow" />

      <div className="section-container rate-board-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="rate-board-header"
        >
          <div>
            <div className="pill-badge shimmer" style={{ marginBottom: "0.65rem", display: "inline-flex" }}>
              <span style={{ color: "var(--accent-primary)" }}>✦</span> Investment
            </div>
            <h2 className="section-h2 rate-board-h2">
              Transparent <span className="text-gradient">Starting Rates</span>
            </h2>
            <p className="rate-board-sub">
              Entry points for every discipline — final quotes are scoped after discovery.
            </p>
          </div>

          <div className="rate-board-trust">
            <span>No hidden fees</span>
            <span className="rate-board-trust-dot">·</span>
            <span>Milestone billing</span>
            <span className="rate-board-trust-dot">·</span>
            <span>You own the code</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rate-ledger glass-card-premium"
        >
          <div className="rate-ledger-watermark" aria-hidden>₹</div>
          <div className="rate-ledger-head">
            <div className="rate-ledger-head-left">
              <span className="rate-ledger-kicker">Rate Sheet</span>
              <span className="rate-ledger-meta">LIMINIQ · India</span>
            </div>
            <span className="rate-ledger-ref">Q-{new Date().getFullYear()}</span>
          </div>

          <ul className="rate-ledger-list">
            {STARTING_PRICES.map((item, i) => (
              <RateRow
                key={item.id}
                item={item}
                index={i}
                isInView={isInView}
                featured={item.featured}
              />
            ))}
          </ul>

          <div className="rate-ledger-foot">
            <span>All prices exclude GST unless stated · Custom scope on request</span>
            <Link href="/pricing" className="rate-ledger-link">
              Full pricing breakdown
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="rate-board-cta"
        >
          <Link href="/contact" className="btn-primary">
            Request a Custom Quote
            <ArrowUpRight size={18} style={{ marginLeft: 6, verticalAlign: "middle" }} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        .rate-board {
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
          padding-top: 48px !important;
          padding-bottom: 48px !important;
        }

        @media (min-width: 768px) {
          .rate-board {
            padding-top: 72px !important;
            padding-bottom: 72px !important;
          }
        }

        .rate-board-glow {
          position: absolute;
          width: 520px;
          height: 320px;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          background: rgba(123, 97, 255, 0.12);
        }

        .rate-board-inner {
          position: relative;
          z-index: 1;
        }

        .rate-board-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .rate-board-h2 {
          margin-bottom: 0.35rem !important;
          font-size: clamp(1.65rem, 3vw, 2.25rem) !important;
        }

        .rate-board-sub {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
          max-width: 28rem;
        }

        .rate-board-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.35rem 0.65rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--text-tertiary);
          text-align: right;
          max-width: 16rem;
        }

        .rate-board-trust-dot {
          opacity: 0.35;
        }

        .rate-ledger {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          padding: 0;
        }

        .rate-ledger-watermark {
          position: absolute;
          right: 4%;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-heading);
          font-size: clamp(8rem, 18vw, 12rem);
          font-weight: 800;
          line-height: 1;
          color: rgba(123, 97, 255, 0.04);
          pointer-events: none;
          user-select: none;
        }

        .rate-ledger-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px dashed rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
        }

        .rate-ledger-head-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .rate-ledger-kicker {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-violet);
        }

        .rate-ledger-meta {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
        }

        .rate-ledger-ref {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
        }

        .rate-ledger-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .rate-row {
          border-bottom: 1px dashed rgba(255,255,255,0.07);
        }

        .rate-row:last-child {
          border-bottom: none;
        }

        .rate-row-link {
          display: grid;
          grid-template-columns: auto auto 1fr auto auto;
          align-items: center;
          gap: 0.85rem 1rem;
          padding: 0.95rem 1.25rem;
          text-decoration: none;
          position: relative;
          transition: background 0.28s ease;
        }

        .rate-row-link:hover {
          background: rgba(255,255,255,0.03);
        }

        .rate-row--featured .rate-row-link {
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--rate-accent) 10%, transparent),
            transparent 55%
          );
        }

        .rate-row--featured .rate-row-link:hover {
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--rate-accent) 14%, transparent),
            rgba(255,255,255,0.02) 55%
          );
        }

        .rate-row-accent {
          position: absolute;
          left: 0;
          top: 18%;
          bottom: 18%;
          width: 3px;
          border-radius: 4px;
          background: var(--rate-accent);
          opacity: 0;
          transition: opacity 0.28s ease;
        }

        .rate-row--featured .rate-row-accent,
        .rate-row-link:hover .rate-row-accent {
          opacity: 1;
        }

        .rate-row-index {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
          width: 1.25rem;
        }

        .rate-row-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rate-row-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .rate-row-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .rate-row-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        .rate-row-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          margin-top: 0.2rem;
        }

        .rate-row-tags span {
          font-size: 0.64rem;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 100px;
          color: var(--text-tertiary);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .rate-row-price-block {
          text-align: right;
          flex-shrink: 0;
        }

        .rate-row-from {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .rate-row-price {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-top: 0.1rem;
        }

        .rate-row--featured .rate-row-price {
          font-size: 1.35rem;
          background: linear-gradient(135deg, #fff 20%, color-mix(in srgb, var(--rate-accent) 75%, #fff));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .rate-row-note {
          display: block;
          font-size: 0.62rem;
          color: var(--text-tertiary);
          margin-top: 0.15rem;
          white-space: nowrap;
        }

        .rate-row-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
          transition: all 0.28s ease;
        }

        .rate-row-link:hover .rate-row-arrow {
          color: #fff;
          background: var(--rate-accent);
          border-color: transparent;
          transform: rotate(45deg);
        }

        .rate-ledger-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 0.75rem 1.25rem;
          border-top: 1px dashed rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.2);
          font-size: 0.68rem;
          color: var(--text-tertiary);
        }

        .rate-ledger-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .rate-ledger-link:hover {
          opacity: 0.85;
        }

        .rate-board-cta {
          text-align: center;
          margin-top: 1.75rem;
        }

        @media (max-width: 860px) {
          .rate-board-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .rate-board-trust {
            justify-content: flex-start;
            text-align: left;
            max-width: none;
          }

          .rate-row-link {
            grid-template-columns: auto auto 1fr auto;
            grid-template-rows: auto auto;
            gap: 0.65rem 0.75rem;
          }

          .rate-row-index {
            grid-row: 1;
            grid-column: 1;
          }

          .rate-row-icon {
            grid-row: 1;
            grid-column: 2;
          }

          .rate-row-info {
            grid-row: 1 / 3;
            grid-column: 3;
          }

          .rate-row-price-block {
            grid-row: 1;
            grid-column: 4;
          }

          .rate-row-arrow {
            grid-row: 2;
            grid-column: 4;
            justify-self: end;
          }

          .rate-row-note {
            white-space: normal;
          }
        }

        @media (max-width: 520px) {
          .rate-row-link {
            grid-template-columns: auto 1fr auto;
            padding: 0.85rem 1rem;
          }

          .rate-row-index {
            display: none;
          }

          .rate-row-icon {
            grid-column: 1;
          }

          .rate-row-info {
            grid-column: 2;
          }

          .rate-row-price-block {
            grid-column: 1 / -1;
            grid-row: 2;
            text-align: left;
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .rate-row-from {
            display: inline;
          }

          .rate-row-price {
            display: inline;
          }

          .rate-row-note {
            display: inline;
            margin-top: 0;
          }

          .rate-row-arrow {
            grid-row: 1;
            grid-column: 3;
          }
        }
      `}</style>
    </section>
  );
}
