import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/data/services";
import { TIER_1_SLUGS } from "@/lib/data/serviceExtensions";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Services",
  description:
    "Nine delivery disciplines under one team: custom software & SaaS, digital marketing, SEO, web development, mobile apps, UI/UX, creative, content, and AI/cloud solutions.",
  path: "/services",
});

export default function ServicesPage() {
  const tier1 = TIER_1_SLUGS.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(Boolean) as typeof SERVICES;
  const tier2 = SERVICES.filter((s) => !TIER_1_SLUGS.includes(s.slug as (typeof TIER_1_SLUGS)[number]));

  return (
    <div className="svc-index">
      <section className="svc-index-hero">
        <div className="svc-index-glow" />
        <div className="section-container svc-index-hero-inner">
          <div className="pill-badge shimmer">
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Capability deck
          </div>
          <h1 className="section-h2 svc-index-title">
            Nine disciplines.
            <span className="text-gradient"> One delivery team.</span>
          </h1>
          <p className="svc-index-lede">
            From custom software and SaaS to SEO and performance marketing — engineered to scale your product and your pipeline.
          </p>
        </div>
      </section>

      <section className="section-padding section-container">
        <div className="svc-index-label">Core pillars</div>
        <div className="svc-index-pillars">
          {tier1.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="svc-index-pillar glass-card-premium"
              style={{ "--svc-color": service.color } as React.CSSProperties}
            >
              <span className="svc-index-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="svc-index-pillar-icon">{service.icon}</div>
              <h2>{service.shortTitle}</h2>
              <p>{service.subtitle}</p>
              <span className="svc-index-link">
                Explore <ArrowUpRight size={15} />
              </span>
              <div className="svc-index-pillar-cover">
                {service.coverImage && (
                  <Image src={service.coverImage} alt="" fill sizes="400px" style={{ objectFit: "cover" }} />
                )}
                <div className="svc-index-pillar-cover-fade" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-padding section-container svc-index-support-wrap">
        <div className="svc-index-label">Supporting craft</div>
        <div className="svc-index-support">
          {tier2.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="svc-index-support-card glass-card"
              style={{ "--svc-color": service.color } as React.CSSProperties}
            >
              <span className="svc-index-support-accent" />
              <div className="svc-index-support-icon">{service.icon}</div>
              <div>
                <strong>{service.shortTitle}</strong>
                <em>{service.features[0]}</em>
              </div>
              <ArrowUpRight size={16} className="svc-index-support-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <LeadCTASection />

      <style>{`
        .svc-index {
          padding-top: 5rem;
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .svc-index-hero {
          position: relative;
          padding: clamp(3rem, 7vw, 5rem) 0 2rem;
          overflow: hidden;
        }
        .svc-index-glow {
          position: absolute;
          width: 500px; height: 300px;
          top: 0; left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(59,91,255,0.15), transparent 70%);
          pointer-events: none;
        }
        .svc-index-hero-inner {
          position: relative;
          text-align: center;
          max-width: 720px;
        }
        .svc-index-title { margin: 1rem 0; }
        .svc-index-lede {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }
        .svc-index-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 1rem;
        }
        .svc-index-pillars {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        .svc-index-pillar {
          position: relative;
          padding: 1.5rem;
          border-radius: 22px;
          text-decoration: none;
          overflow: hidden;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          border-color: color-mix(in srgb, var(--svc-color) 20%, rgba(255,255,255,0.08)) !important;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .svc-index-pillar:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--svc-color) 40%, rgba(255,255,255,0.1)) !important;
        }
        .svc-index-num {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--svc-color);
          letter-spacing: 0.08em;
        }
        .svc-index-pillar-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.75rem 0;
          color: var(--svc-color);
          background: color-mix(in srgb, var(--svc-color) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--svc-color) 28%, transparent);
        }
        .svc-index-pillar h2 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .svc-index-pillar p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 1rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .svc-index-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--svc-color);
        }
        .svc-index-pillar-cover {
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.18;
        }
        .svc-index-pillar-cover-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, var(--bg-primary) 20%, transparent 70%);
        }
        .svc-index-support-wrap { padding-top: 0; }
        .svc-index-support {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.65rem;
        }
        .svc-index-support-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.22s ease;
        }
        .svc-index-support-card:hover {
          border-color: color-mix(in srgb, var(--svc-color) 30%, rgba(255,255,255,0.08));
          background: color-mix(in srgb, var(--svc-color) 6%, rgba(255,255,255,0.03));
        }
        .svc-index-support-accent {
          position: absolute;
          left: 0; top: 18%; bottom: 18%;
          width: 3px;
          border-radius: 4px;
          background: var(--svc-color);
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .svc-index-support-card:hover .svc-index-support-accent { opacity: 1; }
        .svc-index-support-icon {
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--svc-color);
          background: color-mix(in srgb, var(--svc-color) 12%, transparent);
        }
        .svc-index-support-card strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .svc-index-support-card em {
          font-style: normal;
          font-size: 0.72rem;
          color: var(--text-tertiary);
        }
        .svc-index-support-arrow {
          color: var(--text-tertiary);
          transition: all 0.22s ease;
        }
        .svc-index-support-card:hover .svc-index-support-arrow {
          color: var(--svc-color);
          transform: translate(2px, -2px);
        }
        @media (max-width: 960px) {
          .svc-index-pillars { grid-template-columns: 1fr; }
          .svc-index-support { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 560px) {
          .svc-index-support { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
