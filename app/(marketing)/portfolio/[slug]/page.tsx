import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CalendarDays,
  Tag,
  Clock,
  ShieldCheck,
  Video,
  Sparkles,
  Building2,
} from "lucide-react";
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
    title: `${study.title} — Case Study | LIMINIQ`,
    description: `${study.summary} Delivered with ${study.techStack.slice(0, 3).join(", ")}.`,
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
        eyebrow={`${study.projectType} · ${study.category}`}
        title={study.title}
        description={study.summary}
      >
        <Link href="/portfolio" className="btn-secondary">
          <ArrowLeft size={16} /> All Case Studies
        </Link>
        <Link
          href={`/contact?service=${encodeURIComponent(study.slug)}`}
          className="btn-primary"
        >
          {study.ctaText || "Scope Similar Project"} <ArrowRight size={16} />
        </Link>
      </PageHero>

      {/* Hero Media / Screenshot */}
      <section className="section-container cs-hero-media">
        <div className="cs-hero-frame glass-card-premium relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={study.imageSrc} alt={`${study.title} architecture screenshot`} />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
              {study.projectType}
            </span>
          </div>
        </div>
      </section>

      {/* Meta Row: Context, Timeline, Category, Stack */}
      <section className="section-container cs-meta-row">
        <div className="cs-meta-item glass-card">
          <Building2 size={15} className="text-[var(--accent)]" />
          <span>{study.clientContext}</span>
        </div>
        <div className="cs-meta-item glass-card">
          <Clock size={15} className="text-[var(--signal)]" />
          <span>{study.timeline}</span>
        </div>
        <div className="cs-meta-item glass-card">
          <Tag size={15} className="text-text-muted" />
          <span>{study.category}</span>
        </div>
        <div className="cs-meta-item glass-card">
          <CalendarDays size={15} className="text-text-muted" />
          <span>{study.year}</span>
        </div>
        {study.liveUrl && (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-meta-item cs-meta-item--link glass-card"
          >
            <ExternalLink size={15} />
            <span>{study.liveUrl.replace(/^https?:\/\//, "")}</span>
          </a>
        )}
      </section>

      {/* Optional Video Demo for Flagship */}
      {study.videoUrl && (
        <section className="section-container mb-12">
          <div className="glass-card-premium rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-text-primary mb-4">
              <Video size={18} className="text-[var(--accent)]" />
              <h3 className="font-heading text-lg font-bold">Interactive Product Demo & Walkthrough</h3>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black/80 border border-white/10 flex flex-col items-center justify-center text-center p-6">
              <div className="max-w-md">
                <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-[var(--accent-muted)] text-[var(--accent)] mb-3">
                  <Video size={28} />
                </span>
                <h4 className="font-heading text-base font-bold text-white">
                  LeadFlow AI Interactive Video Walkthrough
                </h4>
                <p className="mt-1 text-xs text-text-secondary">
                  Complete video demonstration of autonomous LLM lead qualification, round-robin distribution, and sales dashboard analytics.
                </p>
                <div className="mt-4">
                  <Link href="/contact#schedule" className="btn-primary text-xs">
                    Request Live Architecture Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3-Card Narrative: Problem, Approach, Solution */}
      <section className="section-padding cs-narrative">
        <div className="section-container cs-narrative-grid">
          <div className="cs-narrative-card glass-card-premium">
            <span className="cs-kicker">01. The Problem & Context</span>
            <p>{study.challenge}</p>
          </div>
          <div className="cs-narrative-card glass-card-premium">
            <span className="cs-kicker">02. Engineering Approach</span>
            <p>{study.approach}</p>
          </div>
          <div className="cs-narrative-card glass-card-premium">
            <span className="cs-kicker">03. The Architecture & Solution</span>
            <p>{study.solution}</p>
          </div>
        </div>
      </section>

      {/* Measurable Results */}
      <section className="section-padding cs-results">
        <div className="section-container">
          <div className="cs-section-head">
            <span className="cs-kicker">04. Measurable Outcomes</span>
            <h2 className="cs-headline">
              Verified <span className="text-gradient">Business Impact</span>
            </h2>
            <p className="mt-2 text-xs text-text-muted">
              Measurable metrics tracked post-deployment or during system benchmarking.
            </p>
          </div>
          <CaseStudyResults results={study.results} />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-container cs-stack">
        <div className="cs-section-head">
          <span className="cs-kicker">05. Tech Stack</span>
          <h2 className="cs-headline">
            Engineered <span className="text-gradient">With</span>
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

      {/* Client Feedback / Testimonial */}
      {quote && (
        <section className="section-padding cs-quote">
          <div className="section-container">
            <div className="cs-quote-card glass-card-premium">
              <span className="cs-kicker">06. Client Verification</span>
              <p className="cs-quote-text">&ldquo;{quote.quote}&rdquo;</p>
              <div className="cs-quote-author">
                <div className="cs-quote-avatar">{quote.name.charAt(0)}</div>
                <div>
                  <strong>{quote.name}</strong>
                  <span>{quote.roleCompany} · {quote.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Project Scope CTA Bar */}
      <section className="section-container my-12">
        <div className="glass-card-premium rounded-2xl p-8 text-center flex flex-col items-center">
          <span className="pill-badge mb-3 inline-flex">
            <Sparkles size={12} className="text-[var(--signal)]" /> Have a similar requirement?
          </span>
          <h3 className="font-heading text-2xl font-bold text-text-primary">
            Ready to build your next milestone with senior engineers?
          </h3>
          <p className="mt-2 text-sm text-text-secondary max-w-lg">
            We deliver fixed-milestone pricing, zero-risk contracts, and complete source code ownership.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?service=${encodeURIComponent(study.slug)}`}
              className="btn-primary"
            >
              {study.ctaText || "Request Project Scoping Call"} <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              View Engagement Models
            </Link>
          </div>
        </div>
      </section>

      {/* Next Case Study */}
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
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .cs-meta-item--link {
          color: var(--accent);
          text-decoration: none;
          transition: background var(--transition-fast);
        }
        .cs-meta-item--link:hover {
          background: var(--accent-muted);
        }
        .cs-narrative {
          padding-top: 0;
        }
        .cs-narrative-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .cs-narrative-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .cs-narrative-card {
          padding: 2rem 1.75rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .cs-narrative-card p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin: 0;
        }
        .cs-results {
          padding-top: 0;
        }
        .cs-section-head {
          margin-bottom: 2rem;
        }
        .cs-kicker {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.4rem;
        }
        .cs-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
          margin: 0;
        }
        .cs-stack {
          padding-bottom: clamp(3rem, 6vw, 5rem);
        }
        .cs-stack-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .cs-stack-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
        }
        .cs-quote {
          padding-top: 0;
        }
        .cs-quote-card {
          padding: 2.5rem 2rem;
          border-radius: 24px;
        }
        .cs-quote-text {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 2.5vw, 1.45rem);
          font-weight: 600;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0.75rem 0 1.75rem;
        }
        .cs-quote-author {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .cs-quote-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cs-quote-author strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .cs-quote-author span {
          display: block;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .cs-next {
          padding-bottom: clamp(4rem, 8vw, 7rem);
        }
        .cs-next-card {
          display: block;
          padding: 2.25rem 2rem;
          border-radius: 24px;
          text-decoration: none;
          transition: transform var(--transition-medium);
        }
        .cs-next-card:hover {
          transform: translateY(-2px);
        }
        .cs-next-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin: 0.5rem 0 0.5rem;
          color: var(--text-primary);
        }
        .cs-next-row h3 {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 3vw, 1.85rem);
          font-weight: 800;
          margin: 0;
        }
        .cs-next-card p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          max-width: 600px;
        }
      `}</style>
    </div>
  );
}
