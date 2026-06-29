import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioSection } from "@/components/sections/home/PortfolioSection";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { getFeaturedProject } from "@/lib/data/portfolioProjects";

export const metadata: Metadata = {
  title: "Our Work & Deliveries",
  description:
    "Software platforms, web products, and marketing systems built by LIMINIQ for clients across India.",
  alternates: { canonical: "https://liminiq.com/portfolio" },
};

export default function PortfolioPage() {
  const featured = getFeaturedProject();

  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      <section style={{ padding: "6rem 0 3rem", textAlign: "center", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            background: "rgba(123, 97, 255, 0.06)",
            borderRadius: "50%",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill-badge shimmer" style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Delivery Archive
          </div>
          <h1 className="text-hero" style={{ marginBottom: "1.25rem", letterSpacing: "-0.04em" }}>
            Work That <span className="text-gradient">Ships</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every project below represents a real delivery from our studio — software, web, and growth systems built end to end.
          </p>
        </div>
      </section>

      <section className="section-container" style={{ paddingBottom: "3rem" }}>
        <div
          className="glass-card-premium featured-delivery"
          style={{ "--featured-accent": featured.accent } as React.CSSProperties}
        >
          <div className="featured-delivery-glow" />
          <div className="featured-delivery-grid">
            <div className="featured-delivery-copy">
              <span className="featured-delivery-label">Featured Delivery</span>
              <h2 className="featured-delivery-title">{featured.title}</h2>
              <p className="featured-delivery-desc">{featured.description}</p>

              <ul className="featured-delivery-list">
                {featured.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <div className="featured-delivery-tags">
                {featured.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="featured-delivery-actions">
                <Link href="/contact" className="btn-primary" style={{ borderRadius: 100, padding: "12px 22px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  Start a Project
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="featured-delivery-visual">
              <div className="featured-browser">
                <div className="featured-browser-bar">
                  <div className="featured-browser-dots"><span /><span /><span /></div>
                  <div className="featured-browser-url">
                    {featured.previewLabel}
                  </div>
                </div>
                <div className="featured-browser-body">
                  <span className="featured-browser-badge">{featured.category}</span>
                  <h3>{featured.title}</h3>
                  <p>{featured.client}</p>
                  <div className="featured-browser-stack">
                    {featured.tags.slice(0, 3).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection showAll hideViewAll hideHeader />

      <div style={{ padding: "3rem 0" }} />
      <LeadCTASection />

      <style>{`
        .featured-delivery {
          position: relative;
          border-radius: 28px;
          padding: 2rem;
          overflow: hidden;
          border-color: color-mix(in srgb, var(--featured-accent) 25%, rgba(255,255,255,0.08));
        }

        .featured-delivery-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 70% 80% at 80% 50%,
            color-mix(in srgb, var(--featured-accent) 12%, transparent),
            transparent 65%
          );
          pointer-events: none;
        }

        .featured-delivery-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 900px) {
          .featured-delivery-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
          .featured-delivery { padding: 2.5rem 3rem; }
        }

        .featured-delivery-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--featured-accent);
        }

        .featured-delivery-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 800;
          color: var(--text-primary);
          margin: 0.75rem 0;
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .featured-delivery-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 1.5rem;
          max-width: 480px;
        }

        .featured-delivery-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .featured-delivery-list li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          padding-left: 1rem;
          border-left: 2px solid color-mix(in srgb, var(--featured-accent) 50%, transparent);
        }

        .featured-delivery-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.75rem;
        }

        .featured-delivery-tags span {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--text-secondary);
        }

        .featured-delivery-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .featured-browser {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 24px 48px rgba(0,0,0,0.35);
        }

        .featured-browser-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1rem;
          background: rgba(0,0,0,0.5);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .featured-browser-dots {
          display: flex;
          gap: 5px;
        }

        .featured-browser-dots span {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
        }

        .featured-browser-url {
          flex: 1;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-tertiary);
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .featured-browser-body {
          min-height: 280px;
          padding: 2rem;
          background: linear-gradient(
            155deg,
            color-mix(in srgb, var(--featured-accent) 16%, #080910),
            #050608
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .featured-browser-badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--featured-accent);
          margin-bottom: 0.5rem;
        }

        .featured-browser-body h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .featured-browser-body p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0 0 1rem;
        }

        .featured-browser-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .featured-browser-stack span {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
