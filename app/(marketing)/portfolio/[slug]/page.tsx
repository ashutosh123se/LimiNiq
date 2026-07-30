import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, CalendarDays, Tag } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CaseStudyResults } from "@/components/sections/portfolio/CaseStudyResults";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/caseStudies";
import { getTestimonialById } from "@/data/testimonials";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };

  return buildPageMetadata({
    title: `${study.title} — Case Study`,
    description: study.summary,
    path: `/portfolio/${slug}`,
    ogImage: study.imageSrc,
  });
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const quote = study.clientQuoteTestimonialId ? getTestimonialById(study.clientQuoteTestimonialId) : undefined;

  const currentIndex = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const next = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <div className="cs-detail">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: study.title, path: `/portfolio/${slug}` },
        ])}
      />

      <PageHero
        eyebrow={study.category}
        title={study.title}
        description={study.summary}
      >
        <Link href="/portfolio" className="btn-secondary">
          <ArrowLeft size={16} />
          All work
        </Link>
        {study.liveUrl && (
          <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Visit live site
            <ExternalLink size={16} />
          </a>
        )}
      </PageHero>

      <section className="section-container cs-hero-media">
        <div className="cs-hero-frame glass-card-premium">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={study.imageSrc} alt={study.title} />
        </div>
      </section>

      <section className="section-container cs-meta-row">
        <div className="cs-meta-item glass-card">
          <Tag size={16} />
          <span>{study.category}</span>
        </div>
        <div className="cs-meta-item glass-card">
          <CalendarDays size={16} />
          <span>{study.year}</span>
        </div>
        {study.liveUrl && (
          <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="cs-meta-item cs-meta-item--link glass-card">
            <ExternalLink size={16} />
            <span>{study.liveUrl.replace(/^https?:\/\//, "")}</span>
          </a>
        )}
      </section>

      <section className="section-padding cs-narrative">
        <div className="section-container cs-narrative-grid">
          <div className="cs-narrative-card glass-card-premium">
            <span className="cs-kicker">Challenge</span>
            <p>{study.challenge}</p>
          </div>
          <div className="cs-narrative-card glass-card-premium">
            <span className="cs-kicker">Approach</span>
            <p>{study.approach}</p>
          </div>
          <div className="cs-narrative-card glass-card-premium">
            <span className="cs-kicker">Solution</span>
            <p>{study.solution}</p>
          </div>
        </div>
      </section>

      <section className="section-padding cs-results">
        <div className="section-container">
          <div className="cs-section-head">
            <span className="cs-kicker">Results</span>
            <h2 className="cs-headline">
              The <span className="text-gradient">impact</span>
            </h2>
          </div>
          <CaseStudyResults results={study.results} />
        </div>
      </section>

      <section className="section-container cs-stack">
        <div className="cs-section-head">
          <span className="cs-kicker">Tech stack</span>
          <h2 className="cs-headline">
            Built <span className="text-gradient">with</span>
          </h2>
        </div>
        <div className="cs-stack-badges">
          {study.techStack.map((tech) => (
            <span key={tech} className="cs-stack-badge">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {quote && (
        <section className="section-padding cs-quote">
          <div className="section-container">
            <div className="cs-quote-card glass-card-premium">
              <span className="cs-kicker">Client feedback</span>
              <p className="cs-quote-text">&ldquo;{quote.quote}&rdquo;</p>
              <div className="cs-quote-author">
                <div className="cs-quote-avatar">{quote.name.charAt(0)}</div>
                <div>
                  <strong>{quote.name}</strong>
                  <span>{quote.roleCompany}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-container cs-next">
        <Link href={`/portfolio/${next.slug}`} className="cs-next-card glass-card-premium">
          <span className="cs-kicker">Next project</span>
          <div className="cs-next-row">
            <h3>{next.title}</h3>
            <ArrowRight size={20} />
          </div>
          <p>{next.summary}</p>
        </Link>
      </section>

      <FinalCTA />

      <style>{`
        .cs-detail {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .cs-hero-media {
          padding-bottom: clamp(2rem, 4vw, 3rem);
        }
        .cs-hero-frame {
          padding: 0;
          overflow: hidden;
          border-radius: 26px;
          background: #eff6ff;
        }
        .cs-hero-frame img {
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 520px;
          object-fit: cover;
          display: block;
        }
        .cs-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
        }
        .cs-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .cs-meta-item svg { color: var(--accent); flex-shrink: 0; }
        .cs-meta-item--link {
          text-decoration: none;
          color: var(--text-primary);
          transition: border-color 0.2s ease;
        }
        .cs-meta-item--link:hover {
          border-color: var(--border-hover);
        }
        .cs-narrative { padding-top: 0; }
        .cs-narrative-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .cs-narrative-card {
          padding: 1.75rem;
          border-radius: 20px;
        }
        .cs-narrative-card p {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }
        .cs-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .cs-section-head { margin-bottom: 2rem; }
        .cs-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
        }
        .cs-results { padding-top: 0; }
        .cs-stack { padding-bottom: clamp(2.5rem, 5vw, 4rem); }
        .cs-stack-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cs-stack-badge {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.55rem 1.1rem;
          border-radius: 100px;
          background: var(--accent-muted);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }
        .cs-quote { padding-top: 0; }
        .cs-quote-card {
          padding: clamp(2rem, 4vw, 2.75rem);
          border-radius: 24px;
          max-width: 720px;
          margin: 0 auto;
        }
        .cs-quote-text {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        .cs-quote-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .cs-quote-avatar {
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
        .cs-quote-author strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cs-quote-author span {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .cs-next {
          padding-bottom: clamp(3rem, 6vw, 5rem);
        }
        .cs-next-card {
          display: block;
          padding: clamp(1.75rem, 3vw, 2.5rem);
          border-radius: 24px;
          text-decoration: none;
          transition: border-color 0.22s ease, transform 0.22s ease;
        }
        .cs-next-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-hover);
        }
        .cs-next-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .cs-next-row h3 {
          font-family: var(--font-heading);
          font-size: clamp(1.3rem, 2.5vw, 1.75rem);
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }
        .cs-next-row svg { color: var(--accent); flex-shrink: 0; }
        .cs-next-card p {
          margin: 0.75rem 0 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 640px;
        }

        @media (min-width: 700px) {
          .cs-narrative-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}
