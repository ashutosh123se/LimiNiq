"use client";

import { useEffect, useState, type ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  eyebrow: string;
  title: ReactNode;
  accentColor?: string;
  lastUpdated: string;
  sections: LegalSection[];
  children: ReactNode;
}

/** Shared long-form legal page shell with a sticky, scroll-spy table of contents. */
export function LegalLayout({
  eyebrow,
  title,
  accentColor = "var(--accent-primary)",
  lastUpdated,
  sections,
  children,
}: LegalLayoutProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="legal-page">
      <div className="section-container legal-inner">
        <div className="legal-header">
          <span className="pill-badge legal-badge">
            <span style={{ color: accentColor }}>✦</span> {eyebrow}
          </span>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-updated">Last updated: {lastUpdated}</p>
        </div>

        <div className="legal-grid">
          <aside className="legal-toc">
            <div className="legal-toc-sticky">
              <span className="legal-toc-label">On this page</span>
              <nav className="legal-toc-nav" aria-label="Table of contents">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`legal-toc-link${activeId === s.id ? " legal-toc-link--active" : ""}`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="legal-content">{children}</div>
        </div>
      </div>

      <style>{`
        .legal-page {
          padding: 8rem 0 6rem;
          background: var(--bg-primary);
          min-height: 100vh;
        }
        .legal-inner {
          max-width: 1080px;
        }
        .legal-header {
          margin-bottom: 3rem;
          max-width: 800px;
        }
        .legal-badge {
          margin-bottom: 1.5rem;
          display: inline-flex;
        }
        .legal-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5.5vw, 3.75rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        .legal-updated {
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-size: 0.85rem;
        }
        .legal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .legal-toc {
          order: 2;
        }
        .legal-toc-sticky {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.5rem;
          border-radius: 16px;
          background: var(--glass-1);
          border: 1px solid var(--border-subtle);
        }
        .legal-toc-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
        .legal-toc-nav {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .legal-toc-link {
          font-family: var(--font-body, var(--font-sans));
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          border-left: 2px solid transparent;
          transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .legal-toc-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.03);
        }
        .legal-toc-link--active {
          color: var(--accent-primary);
          background: var(--accent-muted);
          border-left-color: var(--accent-primary);
          font-weight: 600;
        }
        .legal-content {
          order: 1;
          color: var(--text-secondary);
          font-family: var(--font-body, var(--font-sans));
          line-height: 1.8;
          font-size: 1.05rem;
          min-width: 0;
        }
        .legal-content h2 {
          font-family: var(--font-heading);
          color: var(--text-primary);
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          scroll-margin-top: 6.5rem;
        }
        .legal-content h2:first-child {
          margin-top: 0;
        }
        .legal-content p {
          margin-bottom: 1.5rem;
        }
        .legal-content ul {
          list-style-type: circle;
          padding-left: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .legal-content li {
          margin-bottom: 0.5rem;
        }
        .legal-content a {
          color: var(--accent-primary);
          text-decoration: none;
        }
        .legal-content a:hover {
          text-decoration: underline;
        }

        @media (min-width: 960px) {
          .legal-grid {
            grid-template-columns: 260px 1fr;
            align-items: start;
          }
          .legal-toc {
            order: 1;
          }
          .legal-content {
            order: 2;
          }
          .legal-toc-sticky {
            position: sticky;
            top: 6.5rem;
          }
        }
      `}</style>
    </div>
  );
}
