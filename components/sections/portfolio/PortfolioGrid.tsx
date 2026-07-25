"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Software", "Web", "Marketing"] as const;
type Filter = (typeof FILTERS)[number];

/** Total real deliveries — public case studies are a curated subset of this. */
const TOTAL_PROJECTS_DELIVERED = 23;

function PortfolioCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link href={`/portfolio/${study.slug}`} className="pf-card glass-card group">
        <div className="pf-card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={study.imageSrc} alt={study.title} loading="lazy" />
          <span className="pf-card-badge">{study.category}</span>
          <span className="pf-card-year">{study.year}</span>
        </div>

        <div className="pf-card-body">
          <h3 className="pf-card-title">{study.title}</h3>
          <p className="pf-card-summary">{study.summary}</p>

          <ul className="pf-card-tags">
            {study.tags.slice(0, 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <div className="pf-card-footer">
            <div className="pf-card-results">
              {study.results.slice(0, 2).map((r) => (
                <div key={r.label}>
                  <strong>{r.value}</strong>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
            <span className="pf-card-link">
              View case study <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.category === filter);
  const moreCount = Math.max(TOTAL_PROJECTS_DELIVERED - CASE_STUDIES.length, 0);

  return (
    <section className="section-container pf-grid-section">
      <div className="pf-filter-row">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn("pf-filter-btn", filter === f && "pf-filter-btn--active")}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="pf-grid">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((study, i) => <PortfolioCard key={study.slug} study={study} index={i} />)
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pf-grid-empty"
            >
              More {filter.toLowerCase()} case studies are on the way — check back soon.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {moreCount > 0 && (
        <div className="pf-archive-note glass-card">
          <span className="pf-archive-count">+{moreCount} more</span>
          <p>
            Additional software, web, and marketing deliveries live in our private archive —
            shareable on request during a discovery call.
          </p>
        </div>
      )}

      <style>{`
        .pf-grid-section {
          padding-bottom: clamp(3rem, 6vw, 5rem);
        }
        .pf-filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2.5rem;
        }
        .pf-filter-btn {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.55rem 1.2rem;
          border-radius: 100px;
          border: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .pf-filter-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }
        .pf-filter-btn--active {
          border-color: transparent;
          background: var(--gradient-signature);
          color: #fff;
          box-shadow: 0 4px 20px rgba(108, 92, 231, 0.35);
        }
        .pf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .pf-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .pf-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .pf-grid-empty {
          grid-column: 1 / -1;
          padding: 4rem 0;
          text-align: center;
          color: var(--text-secondary);
        }
        .pf-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .pf-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
        }
        .pf-card-media {
          position: relative;
          height: 190px;
          border-bottom: 1px solid var(--border-subtle);
          overflow: hidden;
        }
        .pf-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .pf-card:hover .pf-card-media img {
          transform: scale(1.06);
        }
        .pf-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
        }
        .pf-card-year {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.75);
        }
        .pf-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.5rem;
        }
        .pf-card-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }
        .pf-card-summary {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pf-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .pf-card-tags li {
          font-size: 0.68rem;
          font-weight: 500;
          padding: 4px 9px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        .pf-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }
        .pf-card-results {
          display: flex;
          gap: 1rem;
        }
        .pf-card-results strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--signal);
        }
        .pf-card-results span {
          display: block;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-tertiary);
        }
        .pf-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent);
          white-space: nowrap;
        }
        .pf-archive-note {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          text-align: center;
          padding: 2rem;
          border-radius: 20px;
        }
        .pf-archive-count {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          background: var(--gradient-signature);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .pf-archive-note p {
          max-width: 480px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
