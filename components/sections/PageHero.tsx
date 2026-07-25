import type { ReactNode } from "react";

interface PageHeroProps {
  /** Small label above the title, e.g. "Services" or "Industries". */
  eyebrow?: string;
  /** Title content — pass a <span className="text-gradient"> for the accent part. */
  title: ReactNode;
  description?: string;
  /** Optional slot for actions/buttons rendered below the description. */
  children?: ReactNode;
}

/** Reusable compact hero for inner marketing pages (services, industries, etc). */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-glow" />
      <div className="page-hero-grid-bg" aria-hidden />

      <div className="section-container page-hero-inner">
        {eyebrow && (
          <div className="pill-badge shimmer page-hero-badge">
            <span style={{ color: "var(--accent-primary, var(--accent))" }}>✦</span> {eyebrow}
          </div>
        )}

        <h1 className="page-hero-title">{title}</h1>

        {description && <p className="page-hero-desc">{description}</p>}

        {children && <div className="page-hero-actions">{children}</div>}
      </div>

      <style>{`
        .page-hero {
          position: relative;
          padding-top: 5rem;
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
          overflow: hidden;
          background: var(--bg-primary);
        }
        .page-hero-glow {
          position: absolute;
          width: 560px;
          height: 320px;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, var(--accent-muted, rgba(108, 92, 231, 0.16)), transparent 70%);
          pointer-events: none;
        }
        .page-hero-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          background-image: radial-gradient(rgba(108, 92, 231, 0.18) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent);
          pointer-events: none;
        }
        .page-hero-inner {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 760px;
          padding-top: clamp(2.5rem, 6vw, 4rem);
        }
        .page-hero-badge {
          display: inline-flex;
          margin-bottom: 1.5rem;
        }
        .page-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.1rem, 5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin: 0 0 1.1rem;
        }
        .page-hero-desc {
          font-family: var(--font-body, var(--font-sans));
          font-size: 1.08rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 640px;
          margin: 0 auto;
        }
        .page-hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }
      `}</style>
    </section>
  );
}
