"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_FILTERS,
  getFeaturedProjects,
  type PortfolioProject,
} from "@/lib/data/portfolioProjects";

interface PortfolioSectionProps {
  showAll?: boolean;
  limit?: number;
  hideViewAll?: boolean;
  hideHeader?: boolean;
}

function ManifestFeatured({
  project,
  index,
  isInView,
}: {
  project: PortfolioProject;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.06 }}
      className="manifest-featured glass-card-premium"
      style={{ "--work-accent": project.accent } as React.CSSProperties}
    >
      <div className="manifest-featured-glow" />
      <span className="manifest-watermark">{String(index + 1).padStart(2, "0")}</span>
      <div className="manifest-featured-inner">
        <div className="manifest-featured-top">
          <span className="manifest-category">{project.category}</span>
          <span className="manifest-year">{project.year}</span>
        </div>
        <h3 className="manifest-featured-title">{project.title}</h3>
        <p className="manifest-featured-desc">{project.description}</p>
        <ul className="manifest-chips">
          {project.deliverables.slice(0, 3).map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <span className="manifest-slug">{project.previewLabel}</span>
      </div>
    </motion.article>
  );
}

function ManifestTile({
  project,
  index,
  isInView,
  spanWide = false,
}: {
  project: PortfolioProject;
  index: number;
  isInView: boolean;
  spanWide?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.04 }}
      className={`manifest-tile glass-card-premium ${spanWide ? "manifest-tile--wide" : ""}`}
      style={{ "--work-accent": project.accent } as React.CSSProperties}
    >
      <div className="manifest-tile-accent" />
      <span className="manifest-tile-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="manifest-tile-body">
        <span className="manifest-category">{project.category}</span>
        <h3 className="manifest-tile-title">{project.title}</h3>
        <span className="manifest-tile-chip">{project.deliverables[0]}</span>
      </div>
      <span className="manifest-year manifest-year--tile">{project.year}</span>
    </motion.article>
  );
}

function ArchiveProjectCard({
  project,
  index,
  isInView,
  size = "default",
}: {
  project: PortfolioProject;
  index: number;
  isInView: boolean;
  size?: "default" | "compact";
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.06 }}
      className={`work-card glass-card-premium ${size === "compact" ? "work-card--compact" : ""}`}
      style={{ "--work-accent": project.accent } as React.CSSProperties}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }}
    >
      <div className="work-card-glow" />

      <div className="work-browser">
        <div className="work-browser-bar">
          <div className="work-browser-dots">
            <span /><span /><span />
          </div>
          <div className="work-browser-url">{project.previewLabel}</div>
          <span className="work-browser-year">{project.year}</span>
        </div>

        <div className="work-browser-screen">
          <div className="work-screen-grid" />
          <div className="work-screen-content">
            <span className="work-screen-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="work-screen-meta">
              <span className="work-screen-category">{project.category}</span>
              <h3 className="work-screen-title">{project.title}</h3>
              {size !== "compact" && (
                <p className="work-screen-desc">{project.description}</p>
              )}
            </div>
            <ul className="work-deliverables">
              {project.deliverables.slice(0, size === "compact" ? 2 : 3).map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="work-card-body">
        <div className="work-card-head">
          <div>
            <span className="work-client">{project.client}</span>
            <div className="work-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="work-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function PortfolioSection({
  showAll = false,
  limit = 6,
  hideViewAll = false,
  hideHeader = false,
}: PortfolioSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState<(typeof PORTFOLIO_FILTERS)[number]>("All");

  const source = showAll ? PORTFOLIO_PROJECTS : getFeaturedProjects(limit);
  const filtered =
    activeFilter === "All"
      ? source
      : source.filter((p) => p.category === activeFilter);

  const secondaryProjects = filtered.slice(1);
  const lastSecondaryIndex = secondaryProjects.length - 1;
  const spanLastTile =
    !showAll && secondaryProjects.length > 0 && secondaryProjects.length % 2 === 1;

  return (
    <section
      ref={ref}
      className={`work-section section-padding ${showAll ? "" : "work-section--home"}`}
    >
      {!showAll && <div className="work-bg-glow work-bg-glow--left" />}
      {showAll && (
        <>
          <div className="work-bg-glow work-bg-glow--left" />
          <div className="work-bg-glow work-bg-glow--right" />
          <div className="work-dot-grid" />
        </>
      )}

      <div className="section-container work-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className={`work-intro ${showAll ? "" : "work-intro--compact"}`}
          style={{ display: hideHeader ? "none" : undefined }}
        >
          <div className="work-intro-copy-block">
            <div className="pill-badge shimmer" style={{ marginBottom: "0.65rem", display: "inline-flex" }}>
              <span style={{ color: "var(--accent-primary)" }}>✦</span> Selected Work
            </div>
            <h2 className={`section-h2 ${showAll ? "" : "work-h2--compact"}`}>
              Products We&apos;ve <span className="text-gradient">Shipped</span>
            </h2>
            {!showAll && (
              <p className="work-intro-copy work-intro-copy--short">
                Software, web, and marketing builds delivered for production — not mockups.
              </p>
            )}
            {showAll && (
              <p className="work-intro-copy">
                A selection of software, web, and marketing work delivered by LIMINIQ — built for real clients and production use.
              </p>
            )}
          </div>

          <div className="work-filters">
            {PORTFOLIO_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`work-filter ${activeFilter === f ? "work-filter--active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {showAll ? (
          <div className="work-grid work-grid--full">
            {filtered.map((project, i) => (
              <ArchiveProjectCard
                key={project.id}
                project={project}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="manifest-bento">
            <ManifestFeatured
              project={filtered[0]}
              index={0}
              isInView={isInView}
            />
            {secondaryProjects.map((project, i) => (
              <ManifestTile
                key={project.id}
                project={project}
                index={i + 1}
                isInView={isInView}
                spanWide={spanLastTile && i === lastSecondaryIndex}
              />
            ))}
          </div>
        ) : null}

        {!hideViewAll && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="work-footer-cta"
          >
            <Link href="/portfolio" className="btn-secondary">
              View Full Delivery Archive
              <ArrowUpRight size={18} style={{ marginLeft: 6, verticalAlign: "middle" }} />
            </Link>
          </motion.div>
        )}
      </div>

      <style>{`
        .work-section {
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .work-section--home {
          padding-top: 48px !important;
          padding-bottom: 48px !important;
        }

        @media (min-width: 768px) {
          .work-section--home {
            padding-top: 72px !important;
            padding-bottom: 72px !important;
          }
        }

        .work-inner { position: relative; z-index: 1; }

        .work-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .work-bg-glow--left {
          width: 420px; height: 420px;
          top: 0; left: -120px;
          background: rgba(59, 91, 255, 0.1);
        }
        .work-bg-glow--right {
          width: 440px; height: 440px;
          bottom: 0; right: -120px;
          background: rgba(123, 97, 255, 0.1);
        }

        .work-dot-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.28;
          background-image: radial-gradient(rgba(59, 91, 255, 0.22) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 65% at 50% 30%, black, transparent);
        }

        .work-intro {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 2.5rem;
        }

        .work-intro--compact {
          max-width: none;
          margin: 0 0 1.5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.25rem;
          text-align: left;
        }

        .work-intro-copy-block {
          flex: 1;
          min-width: 0;
        }

        .work-h2--compact {
          margin-bottom: 0.35rem !important;
          font-size: clamp(1.65rem, 3vw, 2.25rem) !important;
        }

        .work-intro-copy {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        .work-intro-copy--short {
          font-size: 0.92rem;
          line-height: 1.55;
          max-width: 34rem;
        }

        .work-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .work-intro--compact .work-filters {
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .work-filter {
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.45rem 0.95rem;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .work-filter--active {
          background: var(--accent-primary);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 20px rgba(59, 91, 255, 0.35);
        }

        /* ── Homepage manifest bento ── */
        .manifest-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) repeat(2, minmax(0, 1fr));
          grid-auto-rows: minmax(78px, auto);
          gap: 0.6rem;
          align-items: stretch;
        }

        .manifest-featured {
          grid-row: 1 / -1;
          grid-column: 1;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          min-height: 260px;
        }

        .manifest-featured-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 90% 70% at 0% 100%, color-mix(in srgb, var(--work-accent) 22%, transparent), transparent 55%),
            linear-gradient(135deg, color-mix(in srgb, var(--work-accent) 8%, transparent), transparent 50%);
        }

        .manifest-watermark {
          position: absolute;
          right: -0.05em;
          bottom: -0.2em;
          font-family: var(--font-heading);
          font-size: clamp(5rem, 12vw, 7.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.06em;
          color: color-mix(in srgb, var(--work-accent) 12%, transparent);
          pointer-events: none;
          user-select: none;
        }

        .manifest-featured-inner {
          position: relative;
          z-index: 1;
          padding: 1.15rem 1.25rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          height: 100%;
        }

        .manifest-featured-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .manifest-category {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--work-accent);
        }

        .manifest-year {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
        }

        .manifest-featured-title {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
          max-width: 16rem;
        }

        .manifest-featured-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 18rem;
        }

        .manifest-chips {
          list-style: none;
          padding: 0;
          margin: auto 0 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .manifest-chips li {
          font-size: 0.66rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .manifest-slug {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--text-tertiary);
          letter-spacing: 0.04em;
          margin-top: 0.15rem;
        }

        .manifest-tile {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 0.85rem 0.75rem 0.95rem;
          border-radius: 14px;
          overflow: hidden;
          min-height: 78px;
          transition: transform 0.28s ease, border-color 0.28s ease;
        }

        .manifest-tile:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--work-accent) 30%, transparent);
        }

        .manifest-tile--wide {
          grid-column: span 2;
        }

        .manifest-tile-accent {
          position: absolute;
          left: 0;
          top: 14%;
          bottom: 14%;
          width: 3px;
          border-radius: 4px;
          background: var(--work-accent);
        }

        .manifest-tile-index {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: color-mix(in srgb, var(--work-accent) 75%, #fff);
          letter-spacing: 0.06em;
          flex-shrink: 0;
          width: 1.4rem;
        }

        .manifest-tile-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.12rem;
        }

        .manifest-tile-title {
          font-family: var(--font-heading);
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.35;
          min-height: calc(1.35em * 2);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .manifest-tile-chip {
          font-size: 0.64rem;
          font-weight: 600;
          color: var(--text-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .manifest-year--tile {
          flex-shrink: 0;
          align-self: flex-start;
          margin-top: 0.1rem;
        }

        /* ── Full archive browser cards ── */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .work-grid--full {
          grid-template-columns: repeat(3, 1fr);
        }

        .work-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s ease, border-color 0.35s ease;
        }

        .work-card:hover {
          transform: translateY(-5px);
          border-color: color-mix(in srgb, var(--work-accent) 35%, transparent);
        }

        .work-card-glow {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y),
            color-mix(in srgb, var(--work-accent) 16%, transparent),
            transparent 45%
          );
        }

        .work-card:hover .work-card-glow { opacity: 1; }

        .work-browser { flex: 1; }

        .work-browser-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1rem;
          background: rgba(0,0,0,0.45);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .work-browser-dots {
          display: flex;
          gap: 5px;
        }

        .work-browser-dots span {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
        }

        .work-browser-url {
          flex: 1;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-tertiary);
          letter-spacing: 0.03em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .work-browser-year {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
        }

        .work-browser-screen {
          position: relative;
          min-height: 200px;
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--work-accent) 14%, #0a0b10),
            #06070c 55%
          );
          overflow: hidden;
        }

        .work-card--compact .work-browser-screen { min-height: 170px; }

        .work-screen-grid {
          position: absolute; inset: 0; opacity: 0.35;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .work-screen-content {
          position: relative;
          z-index: 1;
          padding: 1.25rem 1.35rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          height: 100%;
        }

        .work-screen-index {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: color-mix(in srgb, var(--work-accent) 80%, #fff);
          letter-spacing: 0.08em;
        }

        .work-screen-category {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--work-accent);
          margin-bottom: 0.35rem;
        }

        .work-screen-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }

        .work-screen-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0.5rem 0 0;
        }

        .work-deliverables {
          list-style: none;
          padding: 0;
          margin: auto 0 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .work-deliverables li {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .work-card-body {
          padding: 1.15rem 1.25rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .work-client {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.5rem;
        }

        .work-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 0.85rem;
        }

        .work-tag {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 9px;
          border-radius: 100px;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .work-footer-cta {
          text-align: center;
          margin-top: 1.75rem;
        }

        @media (max-width: 960px) {
          .work-intro--compact {
            flex-direction: column;
            align-items: flex-start;
          }

          .work-intro--compact .work-filters {
            justify-content: flex-start;
          }

          .manifest-bento {
            grid-template-columns: 1fr 1fr;
          }

          .manifest-featured {
            grid-column: 1 / -1;
            grid-row: auto;
            min-height: 210px;
          }

          .manifest-tile--wide {
            grid-column: span 1;
          }
        }

        @media (max-width: 1024px) {
          .work-grid--full { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 560px) {
          .manifest-bento {
            grid-template-columns: 1fr;
          }

          .manifest-tile--wide {
            grid-column: span 1;
          }

          .work-grid,
          .work-grid--full { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
