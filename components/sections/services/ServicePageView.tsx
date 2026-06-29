'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Code2,
  Cpu,
  FileText,
  Globe,
  Palette,
  PenTool,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { LeadCTASection } from '@/components/sections/home/LeadCTASection'
import { FAQAccordion, type FAQItem } from '@/components/sections/services/FAQAccordion'
import { CaseStudyCard, type CaseStudyData } from '@/components/sections/services/CaseStudyCard'
import { InternalLinkCallout, type InternalLinkItem } from '@/components/sections/services/InternalLinkCallout'
import type { ServiceData } from '@/lib/data/services'

const ICONS: Record<string, LucideIcon> = {
  'website-ecommerce': Globe,
  'mobile-app-development': Smartphone,
  'custom-software-saas': Code2,
  'ui-ux-design-branding': PenTool,
  'graphic-design-creative': Palette,
  'digital-marketing': BarChart3,
  'seo-search-engine-marketing': TrendingUp,
  'content-creation': FileText,
  'ai-automation-cloud': Cpu,
}

const PROOF_STATS = [
  { value: '150+', label: 'Projects delivered' },
  { value: '4.9★', label: 'Client rating' },
  { value: '24h', label: 'Response time' },
]

export interface ServicePageExtension {
  metaDescription?: string
  expandedIntro?: string
  caseStudies?: CaseStudyData[]
  techStack?: string[]
  industries?: string[]
  faqs?: FAQItem[]
  internalLinks?: InternalLinkItem[]
  seoForSaasNote?: string
}

export type ServicePageData = Pick<
  ServiceData,
  'slug' | 'title' | 'shortTitle' | 'subtitle' | 'description' | 'features' | 'process' | 'coverImage' | 'color'
>

interface ServicePageViewProps {
  service: ServicePageData
  extension: ServicePageExtension | null
}

export function ServicePageView({ service, extension }: ServicePageViewProps) {
  const Icon = ICONS[service.slug] ?? Code2
  const heroDesc = extension?.metaDescription ?? service.subtitle
  const introParagraphs = extension?.expandedIntro?.split('\n\n').filter(Boolean) ?? []

  return (
    <div
      className="svc-page"
      style={{ '--svc-accent': service.color } as React.CSSProperties}
    >
      {/* ── Hero ── */}
      <section className="svc-hero">
        <div className="svc-hero-glow svc-hero-glow--a" />
        <div className="svc-hero-glow svc-hero-glow--b" />
        <div className="svc-hero-grid-bg" aria-hidden />

        <div className="section-container svc-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="svc-hero-copy"
          >
            <div className="svc-hero-eyebrow">
              <span className="svc-hero-index">SVC · {service.shortTitle}</span>
              <div className="pill-badge shimmer">
                <Icon size={14} strokeWidth={1.6} />
                Service
              </div>
            </div>

            <h1 className="svc-hero-title">{service.title}</h1>
            <p className="svc-hero-lede">{heroDesc}</p>

            <div className="svc-hero-actions">
              <Link href="/contact" className="btn-primary">
                Book free consultation
                <ArrowRight size={16} />
              </Link>
              <a href="#capabilities" className="btn-secondary">
                View capabilities
              </a>
            </div>

            <div className="svc-hero-proof">
              {PROOF_STATS.map((stat) => (
                <div key={stat.label} className="svc-proof-chip glass-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="svc-hero-visual"
          >
            <div className="svc-visual-frame glass-card-premium">
              <div className="svc-visual-accent-bar" />
              {service.coverImage && (
                <Image
                  src={service.coverImage}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="svc-visual-img"
                />
              )}
              <div className="svc-visual-overlay" />
              <div className="svc-visual-badge">
                <Icon size={20} strokeWidth={1.5} />
                <span>{service.shortTitle}</span>
              </div>
            </div>
            <div className="svc-visual-float svc-visual-float--top glass-card">
              <span className="svc-float-label">Delivery</span>
              <span className="svc-float-value">Agile sprints</span>
            </div>
            <div className="svc-visual-float svc-visual-float--bottom glass-card">
              <span className="svc-float-label">Quality</span>
              <span className="svc-float-value">Production-grade</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="section-padding svc-intro">
        <div className="section-container">
          <div className="svc-intro-grid">
            {introParagraphs.length > 0 && (
              <div className="svc-intro-panel glass-card-premium">
                <span className="svc-section-kicker">Why it matters</span>
                <h2 className="svc-section-title">Built for real business complexity</h2>
                {introParagraphs.slice(0, 2).map((p) => (
                  <p key={p.slice(0, 48)} className="svc-body">{p}</p>
                ))}
              </div>
            )}
            <div className={`svc-intro-panel glass-card-premium ${introParagraphs.length === 0 ? 'svc-intro-panel--solo' : ''}`}>
              <span className="svc-section-kicker">Our approach</span>
              <h2 className="svc-section-title">Challenge → solution</h2>
              <p className="svc-body">{service.description}</p>
              {introParagraphs.length > 2 && (
                <p className="svc-body">{introParagraphs[2]}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="section-padding svc-capabilities">
        <div className="section-container">
          <div className="svc-section-head">
            <span className="svc-section-kicker">Capabilities</span>
            <h2 className="section-h2 svc-section-headline">
              What we deliver for{' '}
              <span className="text-gradient">{service.shortTitle}</span>
            </h2>
          </div>

          <div className="svc-cap-grid">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className={`svc-cap-cell glass-card ${i === 0 ? 'svc-cap-cell--lead' : ''}`}
              >
                <span className="svc-cap-num">{String(i + 1).padStart(2, '0')}</span>
                <p className="svc-cap-title">{feature}</p>
                <ArrowUpRight size={16} className="svc-cap-arrow" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ── */}
      {extension?.caseStudies && extension.caseStudies.length > 0 && (
        <section className="section-padding svc-results">
          <div className="section-container">
            <div className="svc-section-head svc-section-head--center">
              <span className="svc-section-kicker">Client results</span>
              <h2 className="section-h2">Outcomes that compound</h2>
            </div>
            <div className="svc-results-grid">
              {extension.caseStudies.map((cs) => (
                <CaseStudyCard key={cs.name} caseStudy={cs} accent={service.color} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tech stack ── */}
      {extension?.techStack && extension.techStack.length > 0 && (
        <section className="svc-stack section-padding">
          <div className="section-container">
            <div className="svc-section-head svc-section-head--center">
              <span className="svc-section-kicker">Technology</span>
              <h2 className="section-h2">Tools we ship with</h2>
            </div>
            <div className="svc-stack-panel glass-card-premium edge-fade-x">
              <div className="svc-stack-track">
                {[...extension.techStack, ...extension.techStack].map((item, i) => (
                  <span key={`${item}-${i}`} className="svc-stack-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Industries ── */}
      {extension?.industries && extension.industries.length > 0 && (
        <section className="section-padding svc-industries">
          <div className="section-container">
            <div className="svc-section-head svc-section-head--center">
              <span className="svc-section-kicker">Industries</span>
              <h2 className="section-h2">Sectors we know deeply</h2>
            </div>
            <div className="svc-industry-cloud">
              {extension.industries.map((industry) => (
                <span key={industry} className="svc-industry-chip">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Process ── */}
      <section className="section-padding svc-process">
        <div className="section-container">
          <div className="svc-section-head">
            <span className="svc-section-kicker">Process</span>
            <h2 className="section-h2 svc-section-headline">
              How we <span className="text-gradient">execute</span>
            </h2>
          </div>

          <div className="svc-process-board glass-card-premium">
            <div className="svc-process-head">
              <span className="svc-process-file">liminiq — {service.slug}.sh</span>
              <span className="svc-process-status">
                <span className="svc-process-dot" />
                delivery pipeline
              </span>
            </div>
            <div className="svc-process-steps">
              {service.process.map((step, i) => (
                <div key={step.title} className="svc-step">
                  <div className="svc-step-marker">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {i < service.process.length - 1 && <div className="svc-step-line" />}
                  </div>
                  <div className="svc-step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {extension?.seoForSaasNote && (
        <section className="section-container svc-note-wrap">
          <div className="svc-note glass-card-premium">
            <strong>SEO for SaaS & Software</strong>
            <p>{extension.seoForSaasNote}</p>
          </div>
        </section>
      )}

      {extension?.faqs && extension.faqs.length > 0 && (
        <section className="section-padding svc-faq">
          <div className="section-container">
            <FAQAccordion items={extension.faqs} accent={service.color} />
          </div>
        </section>
      )}

      {extension?.internalLinks && extension.internalLinks.length > 0 && (
        <section className="section-container svc-links-wrap">
          <InternalLinkCallout links={extension.internalLinks} accent={service.color} />
        </section>
      )}

      <LeadCTASection />

      <style>{`
        .svc-page {
          padding-top: 5rem;
          background: var(--bg-primary);
          overflow-x: clip;
        }

        /* Hero */
        .svc-hero {
          position: relative;
          padding: clamp(3rem, 7vw, 5.5rem) 0 clamp(2.5rem, 5vw, 4rem);
          overflow: hidden;
        }
        .svc-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .svc-hero-glow--a {
          width: 480px; height: 480px;
          top: -120px; left: -80px;
          background: color-mix(in srgb, var(--svc-accent) 22%, transparent);
        }
        .svc-hero-glow--b {
          width: 360px; height: 360px;
          bottom: -80px; right: 5%;
          background: rgba(0, 200, 160, 0.1);
        }
        .svc-hero-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.25;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 70% at 40% 30%, black, transparent);
        }
        .svc-hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .svc-hero-eyebrow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .svc-hero-index {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--svc-accent);
        }
        .svc-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin: 0 0 1.25rem;
          max-width: 16ch;
        }
        .svc-hero-lede {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 34rem;
          margin: 0 0 1.75rem;
        }
        .svc-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .svc-hero-proof {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .svc-proof-chip {
          padding: 0.55rem 0.85rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 7rem;
        }
        .svc-proof-chip strong {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .svc-proof-chip span {
          font-size: 0.68rem;
          color: var(--text-tertiary);
        }

        .svc-hero-visual {
          position: relative;
          max-width: 440px;
          margin: 0 auto;
          width: 100%;
        }
        .svc-visual-frame {
          position: relative;
          aspect-ratio: 4 / 4.5;
          border-radius: 24px;
          overflow: hidden;
          border-color: color-mix(in srgb, var(--svc-accent) 25%, rgba(255,255,255,0.1)) !important;
        }
        .svc-visual-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--svc-accent), transparent);
          z-index: 3;
        }
        .svc-visual-img { object-fit: cover; }
        .svc-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(4,5,8,0.85) 0%, rgba(4,5,8,0.15) 55%, transparent);
          z-index: 1;
        }
        .svc-visual-badge {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.85rem;
          border-radius: 100px;
          background: rgba(4,5,8,0.65);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          color: var(--svc-accent);
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
        }
        .svc-visual-float {
          position: absolute;
          padding: 0.65rem 0.85rem;
          border-radius: 12px;
          z-index: 4;
        }
        .svc-visual-float--top { top: 8%; right: -4%; }
        .svc-visual-float--bottom { bottom: 12%; left: -6%; }
        .svc-float-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
        .svc-float-value {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Shared section styles */
        .svc-section-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--svc-accent);
          margin-bottom: 0.65rem;
        }
        .svc-section-title {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 2.5vw, 1.75rem);
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .svc-section-head { margin-bottom: 2.25rem; }
        .svc-section-head--center { text-align: center; }
        .svc-section-headline { margin: 0; text-align: left; }
        .svc-body {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0 0 1rem;
        }
        .svc-body:last-child { margin-bottom: 0; }

        /* Intro */
        .svc-intro-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .svc-intro-panel {
          padding: clamp(1.5rem, 3vw, 2.25rem);
          border-color: color-mix(in srgb, var(--svc-accent) 18%, rgba(255,255,255,0.08)) !important;
        }
        .svc-intro-panel--solo { grid-column: 1 / -1; max-width: 720px; }

        /* Capabilities bento */
        .svc-cap-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }
        .svc-cap-cell {
          position: relative;
          padding: 1.25rem 1.15rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          min-height: 120px;
          border-color: rgba(255,255,255,0.07);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .svc-cap-cell:hover {
          border-color: color-mix(in srgb, var(--svc-accent) 35%, rgba(255,255,255,0.08));
          transform: translateY(-3px);
        }
        .svc-cap-cell--lead {
          grid-column: span 2;
          min-height: auto;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--svc-accent) 10%, rgba(255,255,255,0.02)),
            rgba(255,255,255,0.02)
          );
        }
        .svc-cap-num {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--svc-accent);
          letter-spacing: 0.08em;
        }
        .svc-cap-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          margin: 0;
          flex: 1;
        }
        .svc-cap-arrow {
          color: var(--text-tertiary);
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .svc-cap-cell:hover .svc-cap-arrow {
          color: var(--svc-accent);
          transform: translate(2px, -2px);
        }

        /* Results */
        .svc-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        /* Tech stack marquee */
        .svc-stack-panel {
          padding: 1rem 0;
          overflow: hidden;
          border-color: color-mix(in srgb, var(--svc-accent) 15%, rgba(255,255,255,0.08)) !important;
        }
        .svc-stack-track {
          display: flex;
          width: max-content;
          gap: 0.65rem;
          animation: svcStackMarquee 40s linear infinite;
        }
        .svc-stack-panel:hover .svc-stack-track { animation-play-state: paused; }
        .svc-stack-pill {
          flex-shrink: 0;
          padding: 0.55rem 1rem;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          background: rgba(255,255,255,0.04);
          border: 1px solid color-mix(in srgb, var(--svc-accent) 22%, rgba(255,255,255,0.08));
        }
        @keyframes svcStackMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Industries */
        .svc-industry-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          justify-content: center;
        }
        .svc-industry-chip {
          padding: 0.65rem 1.1rem;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.22s ease;
        }
        .svc-industry-chip:hover {
          border-color: color-mix(in srgb, var(--svc-accent) 30%, rgba(255,255,255,0.08));
          background: color-mix(in srgb, var(--svc-accent) 8%, rgba(255,255,255,0.03));
        }

        /* Process pipeline */
        .svc-process-board {
          padding: 1.35rem 1.35rem 1.5rem;
          border-color: color-mix(in srgb, var(--svc-accent) 18%, rgba(255,255,255,0.1)) !important;
        }
        .svc-process-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        .svc-process-file {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-tertiary);
        }
        .svc-process-status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent-teal);
        }
        .svc-process-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 8px var(--accent-teal);
        }
        .svc-process-steps {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .svc-step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1rem;
        }
        .svc-step-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0.15rem;
        }
        .svc-step-marker span {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--svc-accent);
          background: color-mix(in srgb, var(--svc-accent) 12%, rgba(255,255,255,0.03));
          border: 1px solid color-mix(in srgb, var(--svc-accent) 28%, rgba(255,255,255,0.08));
        }
        .svc-step-line {
          flex: 1;
          width: 2px;
          min-height: 1.5rem;
          margin: 0.35rem 0;
          background: linear-gradient(180deg, var(--svc-accent), transparent);
          opacity: 0.35;
        }
        .svc-step-body {
          padding: 0 0 1.5rem;
        }
        .svc-step-body h3 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.4rem;
        }
        .svc-step-body p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* Note + links */
        .svc-note-wrap, .svc-links-wrap { padding-bottom: 2rem; }
        .svc-note {
          padding: 1.5rem 1.75rem;
          border-color: rgba(16, 185, 129, 0.25) !important;
          background: rgba(16, 185, 129, 0.05) !important;
        }
        .svc-note strong {
          display: block;
          font-family: var(--font-heading);
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .svc-note p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .svc-faq { padding-top: 0; }

        @media (min-width: 900px) {
          .svc-hero-inner { grid-template-columns: 1.05fr 0.95fr; gap: 3.5rem; }
          .svc-hero-visual { margin: 0 0 0 auto; }
          .svc-intro-grid { grid-template-columns: 1fr 1fr; }
          .svc-cap-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .svc-cap-cell--lead { grid-column: span 2; }
          .svc-process-steps {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 0.75rem;
          }
          .svc-step { grid-template-columns: 1fr; }
          .svc-step-marker { flex-direction: row; width: 100%; }
          .svc-step-line {
            flex: 1;
            height: 2px;
            min-height: auto;
            width: auto;
            margin: 0 0.35rem;
            background: linear-gradient(90deg, var(--svc-accent), transparent);
          }
          .svc-step-body { padding: 0.75rem 0 0; }
        }

        @media (max-width: 560px) {
          .svc-cap-grid { grid-template-columns: 1fr; }
          .svc-cap-cell--lead { grid-column: span 1; }
          .svc-visual-float--top { right: 0; }
          .svc-visual-float--bottom { left: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-stack-track { animation: none; }
        }
      `}</style>
    </div>
  )
}
