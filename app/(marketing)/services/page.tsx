import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQAccordion } from "@/components/sections/services/FAQAccordion";
import { SERVICES, type Service } from "@/data/services";
import { faqsForPage } from "@/data/faqs";
import { getIcon } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Services",
  description:
    "Custom software & SaaS, websites & e-commerce, mobile apps, UI/UX & branding, plus SEO, digital marketing, content, and AI/automation/cloud solutions — all under one delivery team.",
  path: "/services",
});

const CATEGORIES: Service["category"][] = [
  "Software & SaaS",
  "Web & Commerce",
  "Mobile & Design",
  "Marketing & Growth",
];

export default function ServicesPage() {
  const faqs = faqsForPage("services");

  return (
    <div className="svc-index">
      <PageHero
        eyebrow="Capability deck"
        title={
          <>
            Services engineered
            <br />
            <span className="text-gradient">to move the needle.</span>
          </>
        }
        description="From custom software and SaaS to SEO and performance marketing — every discipline is delivered by one senior team, with transparent pricing and no agency bloat."
      >
        <Link href="/contact" className="btn-primary">
          Book a free consultation
        </Link>
        <Link href="/pricing" className="btn-secondary">
          View pricing
        </Link>
      </PageHero>

      {CATEGORIES.map((category) => {
        const services = SERVICES.filter((s) => s.category === category);
        if (!services.length) return null;

        return (
          <section key={category} className="section-container svc-index-category">
            <div className="svc-index-label">{category}</div>
            <div className="svc-index-grid">
              {services.map((service) => {
                const Icon = getIcon(service.icon);
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="svc-index-card glass-card-premium"
                  >
                    <div className="svc-index-card-icon">
                      <Icon size={22} strokeWidth={1.6} />
                    </div>

                    {service.isCorePillar && <span className="svc-index-core-tag">Core</span>}

                    <h2 className="svc-index-card-title">{service.name}</h2>
                    <p className="svc-index-card-tagline">{service.tagline}</p>

                    <div className="svc-index-card-footer">
                      {service.priceFrom ? (
                        <span className="svc-index-card-price">
                          From {service.priceFrom.amount}
                          <em> / {service.priceFrom.unit}</em>
                        </span>
                      ) : (
                        <span className="svc-index-card-price svc-index-card-price--quote">Custom quote</span>
                      )}
                      <span className="svc-index-card-link">
                        Learn more <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {faqs.length > 0 && (
        <section className="section-padding section-container svc-index-faq">
          <FAQAccordion items={faqs} />
        </section>
      )}

      <FinalCTA />

      <style>{`
        .svc-index {
          padding-top: 0;
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .svc-index-category {
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
        }
        .svc-index-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 1.1rem;
        }
        .svc-index-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1rem;
        }
        .svc-index-card {
          position: relative;
          padding: 1.5rem;
          border-radius: 20px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          min-height: 220px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .svc-index-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover, var(--accent));
        }
        .svc-index-card-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-muted);
          border: 1px solid var(--border-subtle);
          margin-bottom: 0.25rem;
        }
        .svc-index-core-tag {
          position: absolute;
          top: 1.4rem;
          right: 1.4rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          padding: 3px 8px;
          border-radius: 100px;
          background: var(--accent-muted);
          border: 1px solid var(--border-subtle);
        }
        .svc-index-card-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }
        .svc-index-card-tagline {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
          flex: 1;
        }
        .svc-index-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 0.85rem;
          margin-top: 0.35rem;
          border-top: 1px dashed var(--border-subtle);
        }
        .svc-index-card-price {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .svc-index-card-price em {
          font-style: normal;
          font-weight: 500;
          color: var(--text-tertiary);
        }
        .svc-index-card-price--quote {
          color: var(--text-tertiary);
          font-weight: 600;
        }
        .svc-index-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent);
          white-space: nowrap;
        }
        .svc-index-faq {
          padding-top: 0;
        }
      `}</style>
    </div>
  );
}
