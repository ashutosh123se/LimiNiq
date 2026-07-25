import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQAccordion } from "@/components/sections/services/FAQAccordion";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { faqsForPage } from "@/data/faqs";
import { getIcon } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { contactServicePath, isContactServiceSlug } from "@/lib/contactServices";

type Params = Promise<{ slug: string }>;

const PROCESS_STEPS = [
  {
    title: "Discover",
    desc: "A focused kickoff to map goals, constraints, and what success looks like — no generic templates.",
  },
  {
    title: "Plan & Design",
    desc: "Scope, architecture, and design decisions locked in before a single line of production code ships.",
  },
  {
    title: "Build & Ship",
    desc: "Iterative delivery with weekly visibility — you see progress, not just a big reveal at the end.",
  },
  {
    title: "Support & Scale",
    desc: "Post-launch monitoring, fixes, and optimization so the work keeps compounding after go-live.",
  },
];

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return buildPageMetadata({
    title: service.name,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);
  const relatedCaseStudy = service.relatedCaseStudySlugs
    .map((cs) => getCaseStudyBySlug(cs))
    .find((cs): cs is NonNullable<typeof cs> => Boolean(cs));
  const faqs = faqsForPage("services");
  const contactHref = isContactServiceSlug(slug) ? contactServicePath(slug) : "/contact";

  return (
    <div className="svc-detail">
      <JsonLd
        data={serviceSchema({
          name: service.name,
          slug: service.slug,
          serviceType: service.category,
          description: service.description,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${slug}` },
        ])}
      />

      <PageHero
        eyebrow={service.category}
        title={
          <>
            {service.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{service.name.split(" ").slice(-1)}</span>
          </>
        }
        description={service.tagline}
      >
        <Link href={contactHref} className="btn-primary">
          Book free consultation
          <ArrowRight size={16} />
        </Link>
        <a href="#features" className="btn-secondary">
          See what's included
        </a>
      </PageHero>

      <section className="section-container svc-detail-intro">
        <div className="svc-detail-intro-icon glass-card">
          <Icon size={26} strokeWidth={1.6} />
        </div>
        <p className="svc-detail-intro-copy">{service.description}</p>
      </section>

      <section id="features" className="section-padding svc-detail-features">
        <div className="section-container">
          <div className="svc-detail-section-head">
            <span className="svc-detail-kicker">What's included</span>
            <h2 className="svc-detail-headline">
              Built around <span className="text-gradient">{service.name}</span>
            </h2>
          </div>
          <div className="svc-detail-checklist">
            {service.features.map((feature) => (
              <div key={feature} className="svc-detail-check-item glass-card">
                <CheckCircle2 size={18} className="svc-detail-check-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding svc-detail-process">
        <div className="section-container">
          <div className="svc-detail-section-head">
            <span className="svc-detail-kicker">Process</span>
            <h2 className="svc-detail-headline">
              How we <span className="text-gradient">execute</span>
            </h2>
          </div>
          <div className="svc-detail-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="svc-detail-process-card glass-card-premium">
                <span className="svc-detail-process-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding svc-detail-split">
        <div className="section-container svc-detail-split-grid">
          {relatedCaseStudy && (
            <div className="svc-detail-case glass-card-premium">
              <span className="svc-detail-kicker">Related delivery</span>
              <h3 className="svc-detail-case-title">{relatedCaseStudy.title}</h3>
              <p className="svc-detail-case-summary">{relatedCaseStudy.summary}</p>
              <div className="svc-detail-case-tags">
                {relatedCaseStudy.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="svc-detail-case-results">
                {relatedCaseStudy.results.slice(0, 3).map((r) => (
                  <div key={r.label}>
                    <strong>{r.value}</strong>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/portfolio" className="svc-detail-case-link">
                View our work <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <div className={`svc-detail-pricing glass-card-premium ${relatedCaseStudy ? "" : "svc-detail-pricing--solo"}`}>
            <span className="svc-detail-kicker">Pricing</span>
            <h3 className="svc-detail-pricing-title">Investment</h3>
            {service.priceFrom ? (
              <div className="svc-detail-pricing-value">
                <span>Starting from</span>
                <strong>
                  {service.priceFrom.amount}
                  <em> / {service.priceFrom.unit}</em>
                </strong>
              </div>
            ) : (
              <div className="svc-detail-pricing-value">
                <span>Every engagement is scoped individually</span>
                <strong>Custom quote</strong>
              </div>
            )}
            <p className="svc-detail-pricing-note">
              Final pricing is scoped after a free discovery call based on complexity, integrations, and timeline.
            </p>
            <Link href={contactHref} className="btn-primary svc-detail-pricing-cta">
              Get a tailored quote
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section-padding svc-detail-faq">
          <div className="section-container">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      )}

      <FinalCTA />

      <style>{`
        .svc-detail {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .svc-detail-intro {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding-bottom: clamp(2rem, 4vw, 3rem);
        }
        .svc-detail-intro-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-muted);
        }
        .svc-detail-intro-copy {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 56rem;
          margin: 0.4rem 0 0;
        }
        .svc-detail-section-head {
          margin-bottom: 2rem;
        }
        .svc-detail-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.65rem;
        }
        .svc-detail-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
        }
        .svc-detail-features {
          padding-top: 0;
        }
        .svc-detail-checklist {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 0.85rem;
        }
        .svc-detail-check-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.1rem 1.25rem;
          border-radius: 14px;
        }
        .svc-detail-check-item span {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .svc-detail-check-icon {
          flex-shrink: 0;
          color: var(--success, #22c55e);
        }
        .svc-detail-process {
          padding-top: 0;
        }
        .svc-detail-process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }
        .svc-detail-process-card {
          padding: 1.5rem;
          border-radius: 18px;
        }
        .svc-detail-process-num {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .svc-detail-process-card h3 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .svc-detail-process-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .svc-detail-split {
          padding-top: 0;
        }
        .svc-detail-split-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .svc-detail-case,
        .svc-detail-pricing {
          padding: clamp(1.75rem, 3vw, 2.25rem);
          border-radius: 22px;
        }
        .svc-detail-case-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.65rem;
        }
        .svc-detail-case-summary {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0 0 1.1rem;
        }
        .svc-detail-case-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .svc-detail-case-tags span {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 100px;
          background: var(--glass-2);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        .svc-detail-case-results {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .svc-detail-case-results strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .svc-detail-case-results span {
          font-size: 0.68rem;
          color: var(--text-tertiary);
        }
        .svc-detail-case-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--accent);
          text-decoration: none;
        }
        .svc-detail-pricing--solo {
          grid-column: 1 / -1;
          max-width: 520px;
        }
        .svc-detail-pricing-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 1rem;
        }
        .svc-detail-pricing-value {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 1.1rem 1.25rem;
          border-radius: 14px;
          background: var(--glass-2);
          border: 1px solid var(--border-subtle);
          margin-bottom: 1.1rem;
        }
        .svc-detail-pricing-value span {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .svc-detail-pricing-value strong {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .svc-detail-pricing-value strong em {
          font-style: normal;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-tertiary);
        }
        .svc-detail-pricing-note {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        .svc-detail-pricing-cta {
          width: 100%;
        }
        .svc-detail-faq {
          padding-top: 0;
        }

        @media (min-width: 900px) {
          .svc-detail-split-grid {
            grid-template-columns: 1.15fr 0.85fr;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
