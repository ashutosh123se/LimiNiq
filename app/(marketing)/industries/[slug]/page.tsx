import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQAccordion } from "@/components/sections/services/FAQAccordion";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { SERVICES } from "@/data/services";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { getTestimonialById } from "@/data/testimonials";
import { faqsForPage } from "@/data/faqs";
import { getIcon } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

const INDUSTRY_ICONS: Record<string, string> = {
  "saas-startups": "Rocket",
  "healthcare-wellness": "HeartPulse",
  edtech: "GraduationCap",
  "real-estate-proptech": "Building2",
  "ecommerce-d2c": "ShoppingBag",
  fintech: "Landmark",
  "hospitality-food": "UtensilsCrossed",
  "professional-services-b2b": "Briefcase",
};

const WHY_POINTS = [
  "Senior team end to end — no junior handoffs mid-project.",
  "Transparent, milestone-based delivery with weekly visibility.",
  "Pricing scoped to your stage, not a one-size-fits-all retainer.",
  "You own the code and the data — always.",
];

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found" };

  return buildPageMetadata({
    title: `${industry.name} Solutions`,
    description: industry.heroCopy,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const Icon = getIcon(INDUSTRY_ICONS[slug]);
  const relevantServices = industry.relevantServiceSlugs
    .map((s) => SERVICES.find((service) => service.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedCaseStudy = industry.relatedCaseStudySlug ? getCaseStudyBySlug(industry.relatedCaseStudySlug) : undefined;
  const relatedTestimonial = industry.relatedTestimonialId ? getTestimonialById(industry.relatedTestimonialId) : undefined;
  const faqs = faqsForPage("industries");

  return (
    <div className="ind-detail">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${slug}` },
        ])}
      />

      <PageHero
        eyebrow="Industry"
        title={
          <>
            Software & growth for
            <br />
            <span className="text-gradient">{industry.name}</span>
          </>
        }
        description={industry.heroCopy}
      >
        <Link href="/contact" className="btn-primary">
          Book free consultation
          <ArrowRight size={16} />
        </Link>
        <a href="#services" className="btn-secondary">
          See relevant services
        </a>
      </PageHero>

      <section className="section-container ind-detail-intro">
        <div className="ind-detail-intro-icon glass-card">
          <Icon size={26} strokeWidth={1.6} />
        </div>
        <p className="ind-detail-intro-copy">
          {industry.name} companies move fast and can't afford generic execution. We pair engineering and growth
          expertise built specifically around this sector's buyer behavior, workflows, and conversion levers.
        </p>
      </section>

      <section className="section-padding ind-detail-why">
        <div className="section-container">
          <div className="ind-detail-section-head">
            <span className="ind-detail-kicker">Why LIMINIQ</span>
            <h2 className="ind-detail-headline">
              Built for <span className="text-gradient">{industry.name}</span>
            </h2>
          </div>
          <div className="ind-detail-why-grid">
            {WHY_POINTS.map((point) => (
              <div key={point} className="ind-detail-why-item glass-card">
                <CheckCircle2 size={18} className="ind-detail-why-icon" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relevantServices.length > 0 && (
        <section id="services" className="section-padding ind-detail-services">
          <div className="section-container">
            <div className="ind-detail-section-head">
              <span className="ind-detail-kicker">Relevant services</span>
              <h2 className="ind-detail-headline">
                What we typically <span className="text-gradient">deliver</span>
              </h2>
            </div>
            <div className="ind-detail-services-grid">
              {relevantServices.map((service) => {
                const ServiceIcon = getIcon(service.icon);
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="ind-detail-service-card glass-card-premium"
                  >
                    <div className="ind-detail-service-icon">
                      <ServiceIcon size={20} strokeWidth={1.6} />
                    </div>
                    <div>
                      <strong>{service.name}</strong>
                      <p>{service.tagline}</p>
                    </div>
                    <ArrowRight size={16} className="ind-detail-service-arrow" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {(relatedCaseStudy || relatedTestimonial) && (
        <section className="section-padding ind-detail-proof">
          <div className="section-container ind-detail-proof-grid">
            {relatedCaseStudy && (
              <div className="ind-detail-case glass-card-premium">
                <span className="ind-detail-kicker">Related delivery</span>
                <h3 className="ind-detail-case-title">{relatedCaseStudy.title}</h3>
                <p className="ind-detail-case-summary">{relatedCaseStudy.summary}</p>
                <div className="ind-detail-case-results">
                  {relatedCaseStudy.results.slice(0, 3).map((r) => (
                    <div key={r.label}>
                      <strong>{r.value}</strong>
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/portfolio" className="ind-detail-case-link">
                  View our work <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {relatedTestimonial && (
              <div className={`ind-detail-testimonial glass-card-premium ${relatedCaseStudy ? "" : "ind-detail-testimonial--solo"}`}>
                <span className="ind-detail-kicker">Client feedback</span>
                <p className="ind-detail-testimonial-quote">&ldquo;{relatedTestimonial.quote}&rdquo;</p>
                <div className="ind-detail-testimonial-author">
                  <div className="ind-detail-testimonial-avatar">{relatedTestimonial.name.charAt(0)}</div>
                  <div>
                    <strong>{relatedTestimonial.name}</strong>
                    <span>{relatedTestimonial.roleCompany}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="section-padding ind-detail-faq">
          <div className="section-container">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      )}

      <FinalCTA />

      <style>{`
        .ind-detail {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .ind-detail-intro {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding-bottom: clamp(2rem, 4vw, 3rem);
        }
        .ind-detail-intro-icon {
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
        .ind-detail-intro-copy {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 56rem;
          margin: 0.4rem 0 0;
        }
        .ind-detail-section-head {
          margin-bottom: 2rem;
        }
        .ind-detail-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.65rem;
        }
        .ind-detail-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
        }
        .ind-detail-why {
          padding-top: 0;
        }
        .ind-detail-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 0.85rem;
        }
        .ind-detail-why-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.1rem 1.25rem;
          border-radius: 14px;
        }
        .ind-detail-why-item span {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .ind-detail-why-icon {
          flex-shrink: 0;
          color: var(--success, #22c55e);
        }
        .ind-detail-services {
          padding-top: 0;
        }
        .ind-detail-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 0.85rem;
        }
        .ind-detail-service-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.9rem;
          padding: 1.1rem 1.25rem;
          border-radius: 16px;
          text-decoration: none;
          transition: border-color 0.22s ease, transform 0.22s ease;
        }
        .ind-detail-service-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-hover, var(--accent));
        }
        .ind-detail-service-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-muted);
          flex-shrink: 0;
        }
        .ind-detail-service-card strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .ind-detail-service-card p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          line-height: 1.45;
        }
        .ind-detail-service-arrow {
          color: var(--text-tertiary);
        }
        .ind-detail-proof {
          padding-top: 0;
        }
        .ind-detail-proof-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .ind-detail-case,
        .ind-detail-testimonial {
          padding: clamp(1.75rem, 3vw, 2.25rem);
          border-radius: 22px;
        }
        .ind-detail-case-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.65rem;
        }
        .ind-detail-case-summary {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0 0 1.25rem;
        }
        .ind-detail-case-results {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .ind-detail-case-results strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .ind-detail-case-results span {
          font-size: 0.68rem;
          color: var(--text-tertiary);
        }
        .ind-detail-case-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--accent);
          text-decoration: none;
        }
        .ind-detail-testimonial--solo {
          grid-column: 1 / -1;
          max-width: 640px;
        }
        .ind-detail-testimonial-quote {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          color: var(--text-primary);
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        .ind-detail-testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .ind-detail-testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: var(--gradient-signature);
          color: #fff;
          font-family: var(--font-heading);
          font-weight: 800;
        }
        .ind-detail-testimonial-author strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .ind-detail-testimonial-author span {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .ind-detail-faq {
          padding-top: 0;
        }

        @media (min-width: 900px) {
          .ind-detail-proof-grid {
            grid-template-columns: 1fr 1fr;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
