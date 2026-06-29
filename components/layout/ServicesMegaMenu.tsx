"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SERVICES, type ServiceData } from "@/lib/data/services";
import { TIER_1_SLUGS } from "@/lib/data/serviceExtensions";

const PILLARS = TIER_1_SLUGS.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(
  Boolean
) as ServiceData[];

const SUPPORTING = SERVICES.filter((s) => !TIER_1_SLUGS.includes(s.slug as (typeof TIER_1_SLUGS)[number]));

interface ServicesMegaMenuProps {
  onConsultClick: () => void;
}

export function ServicesMegaMenu({ onConsultClick }: ServicesMegaMenuProps) {
  const [hovered, setHovered] = useState<ServiceData | null>(null);
  const active = hovered ?? PILLARS[0];

  return (
    <div className="mega-menu glass-card-premium">
      <div
        className="mega-menu-accent-glow"
        style={{ "--mega-accent": active.color } as React.CSSProperties}
      />
      <div className="mega-menu-grid-bg" aria-hidden />

      <div className="mega-menu-inner">
        <div className="mega-menu-left">
          <div className="mega-menu-head">
            <div>
              <span className="mega-menu-kicker">
                <Sparkles size={12} />
                Capability deck
              </span>
              <p className="mega-menu-headline">Nine disciplines. One delivery team.</p>
            </div>
            <Link href="/services" className="mega-menu-all-link">
              All services
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mega-pillars">
            <span className="mega-section-label">Core pillars</span>
            <div className="mega-pillars-row">
              {PILLARS.map((service, i) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className={`mega-pillar ${active.id === service.id ? "mega-pillar--active" : ""}`}
                  style={{ "--svc-color": service.color } as React.CSSProperties}
                  onMouseEnter={() => setHovered(service)}
                >
                  <span className="mega-pillar-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mega-pillar-icon">
                    {React.cloneElement(service.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, {
                      size: 18,
                      strokeWidth: 1.6,
                    })}
                  </span>
                  <span className="mega-pillar-title">{service.shortTitle}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mega-support">
            <span className="mega-section-label">Supporting craft</span>
            <div className="mega-support-grid">
              {SUPPORTING.map((service, i) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className={`mega-support-item ${active.id === service.id ? "mega-support-item--active" : ""}`}
                  style={{ "--svc-color": service.color } as React.CSSProperties}
                  onMouseEnter={() => setHovered(service)}
                >
                  <span className="mega-support-accent" />
                  <span className="mega-support-icon">
                    {React.cloneElement(service.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, {
                      size: 15,
                      strokeWidth: 1.6,
                    })}
                  </span>
                  <span className="mega-support-text">
                    <strong>{service.shortTitle}</strong>
                    <em>{service.features[0]}</em>
                  </span>
                  <ArrowUpRight size={14} className="mega-support-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside
          className="mega-preview"
          style={{ "--mega-accent": active.color } as React.CSSProperties}
        >
          <div className="mega-preview-glow" />
          <span className="mega-preview-watermark">
            {String(SERVICES.findIndex((s) => s.id === active.id) + 1).padStart(2, "0")}
          </span>

          <div className="mega-preview-body">
            <span className="mega-preview-label">Preview</span>
            <div className="mega-preview-icon">
              {React.cloneElement(active.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, {
                size: 22,
                strokeWidth: 1.5,
              })}
            </div>
            <h4 className="mega-preview-title">{active.title}</h4>
            <p className="mega-preview-desc">{active.subtitle}</p>

            <ul className="mega-preview-tags">
              {active.features.slice(0, 3).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <div className="mega-preview-stats">
              <span><strong>150+</strong> projects</span>
              <span><strong>4.9</strong> client rating</span>
            </div>

            <div className="mega-preview-actions">
              <Link href={`/services/${active.slug}`} className="mega-preview-explore">
                Explore {active.shortTitle}
                <ArrowUpRight size={16} />
              </Link>
              <button type="button" className="mega-preview-cta" onClick={onConsultClick}>
                Book consultation
              </button>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .mega-menu {
          position: relative;
          width: min(920px, calc(100vw - 2rem));
          overflow: hidden;
          border-radius: 22px;
          padding: 0;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        .mega-menu-accent-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse 55% 70% at 85% 40%,
            color-mix(in srgb, var(--mega-accent) 16%, transparent),
            transparent 60%
          );
          transition: background 0.35s ease;
        }

        .mega-menu-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 90% 80% at 30% 20%, black, transparent);
        }

        .mega-menu-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          min-height: 420px;
        }

        .mega-menu-left {
          padding: 1.35rem 1.35rem 1.25rem;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mega-menu-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .mega-menu-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-teal);
          margin-bottom: 0.35rem;
        }

        .mega-menu-headline {
          margin: 0;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .mega-menu-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-decoration: none;
          white-space: nowrap;
          padding-top: 0.15rem;
        }

        .mega-menu-all-link:hover {
          opacity: 0.85;
        }

        .mega-section-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.55rem;
        }

        .mega-pillars-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.5rem;
        }

        .mega-pillar {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0.75rem 0.8rem;
          border-radius: 14px;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .mega-pillar::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--svc-color);
          opacity: 0.5;
          transition: opacity 0.25s ease;
        }

        .mega-pillar:hover,
        .mega-pillar--active {
          background: color-mix(in srgb, var(--svc-color) 8%, rgba(255,255,255,0.03));
          border-color: color-mix(in srgb, var(--svc-color) 30%, rgba(255,255,255,0.08));
          transform: translateY(-2px);
        }

        .mega-pillar--active::before,
        .mega-pillar:hover::before {
          opacity: 1;
        }

        .mega-pillar-num {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          color: var(--svc-color);
          letter-spacing: 0.06em;
        }

        .mega-pillar-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--svc-color);
          background: color-mix(in srgb, var(--svc-color) 14%, transparent);
          border: 1px solid color-mix(in srgb, var(--svc-color) 28%, transparent);
        }

        .mega-pillar-title {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .mega-support-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.45rem;
        }

        .mega-support-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.55rem;
          padding: 0.6rem 0.65rem;
          border-radius: 12px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
          transition: all 0.22s ease;
        }

        .mega-support-item:hover,
        .mega-support-item--active {
          background: rgba(255, 255, 255, 0.03);
          border-color: color-mix(in srgb, var(--svc-color) 22%, rgba(255,255,255,0.06));
        }

        .mega-support-accent {
          position: absolute;
          left: 0;
          top: 18%;
          bottom: 18%;
          width: 2px;
          border-radius: 4px;
          background: var(--svc-color);
          opacity: 0;
          transition: opacity 0.22s ease;
        }

        .mega-support-item:hover .mega-support-accent,
        .mega-support-item--active .mega-support-accent {
          opacity: 1;
        }

        .mega-support-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--svc-color);
          background: color-mix(in srgb, var(--svc-color) 12%, transparent);
          flex-shrink: 0;
        }

        .mega-support-text {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }

        .mega-support-text strong {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mega-support-text em {
          font-style: normal;
          font-size: 0.68rem;
          color: var(--text-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mega-support-arrow {
          color: var(--text-tertiary);
          flex-shrink: 0;
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.22s ease;
        }

        .mega-support-item:hover .mega-support-arrow,
        .mega-support-item--active .mega-support-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: var(--svc-color);
        }

        .mega-preview {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            165deg,
            color-mix(in srgb, var(--mega-accent) 12%, rgba(0,0,0,0.35)),
            rgba(0, 0, 0, 0.45)
          );
        }

        .mega-preview-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          top: -40px;
          right: -40px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--mega-accent) 25%, transparent);
          filter: blur(50px);
          pointer-events: none;
          transition: background 0.35s ease;
        }

        .mega-preview-watermark {
          position: absolute;
          right: 0.5rem;
          bottom: -0.5rem;
          font-family: var(--font-heading);
          font-size: 5rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.06em;
          color: color-mix(in srgb, var(--mega-accent) 10%, transparent);
          pointer-events: none;
          user-select: none;
        }

        .mega-preview-body {
          position: relative;
          z-index: 1;
          padding: 1.35rem 1.25rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .mega-preview-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.85rem;
        }

        .mega-preview-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--mega-accent);
          background: color-mix(in srgb, var(--mega-accent) 15%, transparent);
          border: 1px solid color-mix(in srgb, var(--mega-accent) 30%, transparent);
          margin-bottom: 0.85rem;
        }

        .mega-preview-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .mega-preview-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .mega-preview-tags {
          list-style: none;
          margin: 0 0 0.85rem;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .mega-preview-tags li {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 100px;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .mega-preview-stats {
          display: flex;
          gap: 1rem;
          margin-top: auto;
          padding-top: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }

        .mega-preview-stats strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .mega-preview-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .mega-preview-explore {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.65rem 1rem;
          border-radius: 10px;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.22s ease;
        }

        .mega-preview-explore:hover {
          border-color: color-mix(in srgb, var(--mega-accent) 40%, transparent);
          background: color-mix(in srgb, var(--mega-accent) 10%, rgba(255,255,255,0.04));
        }

        .mega-preview-cta {
          padding: 0.7rem 1rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, var(--mega-accent), color-mix(in srgb, var(--mega-accent) 60%, #7B61FF));
          box-shadow: 0 8px 24px color-mix(in srgb, var(--mega-accent) 25%, transparent);
          transition: transform 0.2s ease;
        }

        .mega-preview-cta:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
