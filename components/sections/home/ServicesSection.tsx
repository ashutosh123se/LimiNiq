'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Layers } from 'lucide-react'

import { SERVICES } from '@/lib/data/services'
import { TIER_1_SLUGS } from '@/lib/data/serviceExtensions'

const TIER_2_ORDER = [
  'website-ecommerce',
  'mobile-app-development',
  'ui-ux-design-branding',
  'graphic-design-creative',
  'content-creation',
  'ai-automation-cloud',
]

const PILLAR_STATS = [
  { value: '3', label: 'Core Pillars' },
  { value: '6', label: 'Supporting Disciplines' },
  { value: '150+', label: 'Projects Delivered' },
]

function getTier1Services() {
  return TIER_1_SLUGS
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as typeof SERVICES
}

function getTier2Services() {
  return TIER_2_ORDER
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as typeof SERVICES
}

function PrimaryPillarCard({
  service,
  index,
  featured = false,
}: {
  service: (typeof SERVICES)[number]
  index: number
  featured?: boolean
}) {
  const num = String(index + 1).padStart(2, '0')

  const cardInner = (
    <div
      className="pillar-card-inner glass-card-premium"
      style={{ '--accent': service.color } as React.CSSProperties}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
    >
      <div className="pillar-card-glow" />

      {featured ? (
        <>
          <div className="pillar-card-content">
            <div className="pillar-card-top">
              <span className="pillar-index">{num}</span>
              <span className="pillar-badge">Core Pillar</span>
            </div>
            <div
              className="pillar-icon"
              style={{
                color: service.color,
                borderColor: `${service.color}40`,
                background: `linear-gradient(135deg, ${service.color}22, transparent)`,
              }}
            >
              {service.icon}
            </div>
            <h3 className="pillar-title">{service.title}</h3>
            <p className="pillar-desc">{service.subtitle}</p>
            <ul className="pillar-tags">
              {service.features.slice(0, 4).map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
            <div className="pillar-footer pillar-footer--inline">
              <span>Explore service</span>
              <ArrowUpRight size={18} strokeWidth={2} />
            </div>
          </div>
          <div
            className="pillar-card-visual"
            style={{
              backgroundImage: service.coverImage ? `url(${service.coverImage})` : undefined,
            }}
          >
            <div className="pillar-visual-overlay" />
            <div className="pillar-visual-stats">
              <div>
                <span className="pillar-visual-value">150+</span>
                <span className="pillar-visual-label">Projects</span>
              </div>
              <div>
                <span className="pillar-visual-value">Multi-Tenant</span>
                <span className="pillar-visual-label">Architecture</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="pillar-card-bg"
            style={{
              backgroundImage: service.coverImage ? `url(${service.coverImage})` : undefined,
            }}
          />
          <div className="pillar-card-top">
            <span className="pillar-index">{num}</span>
            <span className="pillar-badge">Core Pillar</span>
          </div>
          <div
            className="pillar-icon"
            style={{
              color: service.color,
              borderColor: `${service.color}40`,
              background: `linear-gradient(135deg, ${service.color}22, transparent)`,
            }}
          >
            {service.icon}
          </div>
          <h3 className="pillar-title">{service.title}</h3>
          <p className="pillar-desc">{service.subtitle}</p>
          <ul className="pillar-tags">
            {service.features.slice(0, 3).map((feat) => (
              <li key={feat}>{feat}</li>
            ))}
          </ul>
          <div className="pillar-footer pillar-footer--inline">
            <span>Explore service</span>
            <ArrowUpRight size={18} strokeWidth={2} />
          </div>
        </>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={featured ? 'pillar-card pillar-card--featured' : 'pillar-card'}
    >
      <Link href={`/services/${service.slug}`} className="pillar-card-link" data-cursor="view">
        {cardInner}
      </Link>
    </motion.div>
  )
}

function SecondaryServiceCell({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="secondary-cell-wrap"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="secondary-cell"
        data-cursor="view"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="secondary-cell-accent"
          style={{ background: hovered ? service.color : `${service.color}80` }}
        />
        <div
          className="secondary-cell-icon"
          style={{
            color: service.color,
            background: `${service.color}15`,
            borderColor: `${service.color}30`,
          }}
        >
          {service.icon}
        </div>
        <div className="secondary-cell-body">
          <span className="secondary-cell-label">{service.shortTitle}</span>
          <span className="secondary-cell-title">{service.title}</span>
        </div>
        <div
          className="secondary-cell-arrow"
          style={{
            background: hovered ? service.color : 'rgba(255,255,255,0.06)',
            transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <ArrowUpRight size={15} strokeWidth={2} />
        </div>
      </Link>
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const tier1 = getTier1Services()
  const tier2 = getTier2Services()
  const [featured, ...rest] = tier1

  return (
    <section ref={ref} className="section-padding services-section">
      <div className="services-bg-glow services-bg-glow--left" />
      <div className="services-bg-glow services-bg-glow--right" />
      <div className="services-dot-grid" />

      <div className="section-container services-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="services-intro"
        >
          <div className="pill-badge shimmer">
            <span style={{ color: 'var(--accent-primary)' }}>✦</span> Core Disciplines
          </div>
          <h2 className="section-h2">
            The Architecture of{' '}
            <span className="text-gradient">Growth</span>
          </h2>
          <p className="services-intro-copy">
            Custom software and SaaS at the core — supported by marketing, design, and
            delivery capabilities that scale with your product.
          </p>
        </motion.div>

        <div className="services-stats">
          {PILLAR_STATS.map((stat) => (
            <div key={stat.label} className="services-stat">
              <span className="services-stat-value">{stat.value}</span>
              <span className="services-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="pillar-section">
          <div className="pillar-section-head">
            <div className="eyebrow">Our Core Expertise</div>
            <h3 className="pillar-section-title">Software, Marketing & Growth</h3>
          </div>

          {featured && (
            <div className="pillar-bento">
              <PrimaryPillarCard service={featured} index={0} featured />
              <div className="pillar-bento-row">
                {rest.map((service, i) => (
                  <PrimaryPillarCard key={service.id} service={service} index={i + 1} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="services-bridge">
          <div className="services-bridge-line" />
          <div className="services-bridge-chip">
            <Layers size={16} strokeWidth={2} />
            <span>Also part of how we deliver</span>
          </div>
          <div className="services-bridge-line" />
        </div>

        <div className="secondary-section">
          <h3 className="secondary-section-title">Design, Content & Infrastructure</h3>
          <div className="secondary-panel glass-card-premium">
            <div className="secondary-grid">
              {tier2.map((service, i) => (
                <SecondaryServiceCell key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .services-section {
          position: relative;
          overflow-x: clip;
          overflow-y: visible;
        }

        .services-inner {
          position: relative;
          z-index: 1;
        }

        .services-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .services-bg-glow--left {
          width: 520px;
          height: 520px;
          top: 5%;
          left: -180px;
          background: rgba(59, 91, 255, 0.12);
        }
        .services-bg-glow--right {
          width: 480px;
          height: 480px;
          bottom: 0;
          right: -140px;
          background: rgba(0, 200, 160, 0.08);
        }

        .services-dot-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          background-image: radial-gradient(rgba(59, 91, 255, 0.25) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent);
        }

        .services-intro {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 2.5rem;
        }
        .services-intro .pill-badge {
          margin-bottom: 1.25rem;
        }
        .services-intro .section-h2 {
          margin-bottom: 1rem;
        }
        .services-intro-copy {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        .services-stats {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }
        .services-stat {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.25rem;
          border-radius: 100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .services-stat-value {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-primary);
        }
        .services-stat-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.02em;
        }

        .pillar-section-head {
          margin-bottom: 2rem;
        }
        .pillar-section-title {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 2.5vw, 1.75rem);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.85rem 0 0;
          letter-spacing: -0.02em;
        }

        .pillar-bento {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .pillar-bento-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }

        .pillar-card-link {
          display: block;
          text-decoration: none;
        }
        .pillar-card--featured .pillar-card-inner {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          padding: 0;
          height: auto;
          min-height: 0;
          overflow: hidden;
        }
        .pillar-card--featured .pillar-card-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }
        .pillar-card--featured .pillar-card-visual {
          position: relative;
          min-height: 240px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 1.25rem;
        }
        .pillar-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(4,5,8,0.2) 0%, rgba(4,5,8,0.75) 100%);
        }
        .pillar-visual-stats {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 0.75rem;
          width: 100%;
        }
        .pillar-visual-stats > div {
          flex: 1;
          padding: 0.75rem 0.85rem;
          border-radius: 12px;
          background: rgba(4, 5, 8, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
        }
        .pillar-visual-value {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .pillar-visual-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-top: 0.2rem;
        }
        .pillar-card-inner {
          position: relative;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 24px;
        }
        .pillar-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            color-mix(in srgb, var(--accent) 18%, transparent),
            transparent 65%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .pillar-card-inner:hover .pillar-card-glow {
          opacity: 1;
        }
        .pillar-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.12;
          filter: saturate(1.2);
          pointer-events: none;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 85%);
        }
        .pillar-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .pillar-index {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-tertiary);
        }
        .pillar-badge {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          color: var(--accent-primary);
          background: rgba(59, 91, 255, 0.12);
          border: 1px solid rgba(59, 91, 255, 0.25);
        }
        .pillar-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          position: relative;
        }
        .pillar-card--featured .pillar-icon {
          width: 60px;
          height: 60px;
        }
        .pillar-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          margin: 0 0 0.75rem;
          position: relative;
        }
        .pillar-card--featured .pillar-title {
          font-size: clamp(1.5rem, 2.5vw, 1.85rem);
        }
        .pillar-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
          position: relative;
        }
        .pillar-tags {
          list-style: none;
          margin: 1.25rem 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          position: relative;
        }
        .pillar-tags li {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 8px;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .pillar-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 1.25rem;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          position: relative;
          transition: color 0.25s ease;
        }
        .pillar-footer--inline {
          margin-top: 0;
        }
        .pillar-card-inner:hover .pillar-footer {
          color: var(--accent-primary);
        }
        .pillar-card-inner:hover .pillar-footer svg {
          transform: translate(3px, -3px);
        }
        .pillar-footer svg {
          transition: transform 0.25s ease;
        }

        .services-bridge {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin: 4rem 0 2.5rem;
        }
        .services-bridge-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,91,255,0.35), transparent);
        }
        .services-bridge-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.1rem;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          white-space: nowrap;
        }
        .services-bridge-chip svg {
          color: var(--accent-teal);
        }

        .secondary-section-title {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 700;
          color: var(--text-secondary);
          margin: 0 0 1.25rem;
          letter-spacing: -0.02em;
        }

        .secondary-panel {
          padding: 0.75rem;
          border-radius: 28px;
          overflow: visible;
          width: 100%;
        }
        .secondary-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-auto-rows: 1fr;
          align-items: stretch;
          gap: 0.65rem;
          width: 100%;
        }
        .secondary-cell-wrap {
          display: flex;
          height: 100%;
          min-height: 0;
        }
        .secondary-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          height: 100%;
          padding: 0.9rem 1rem;
          border-radius: 16px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          border: 1px solid transparent;
          min-width: 0;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .secondary-cell:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.08);
        }
        .secondary-cell-accent {
          position: absolute;
          left: 0;
          top: 12%;
          bottom: 12%;
          width: 3px;
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        .secondary-cell-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-left: 0.35rem;
        }
        .secondary-cell-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .secondary-cell-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
        .secondary-cell-title {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
          min-height: calc(1.35em * 2);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .secondary-cell-arrow {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        @media (max-width: 1024px) {
          .secondary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 899px) {
          .pillar-bento-row {
            grid-template-columns: 1fr;
          }
          .pillar-card--featured .pillar-card-inner {
            grid-template-columns: 1fr;
          }
          .pillar-card--featured .pillar-card-visual {
            min-height: 180px;
            order: -1;
          }
          .services-stats {
            margin-bottom: 3rem;
          }
          .services-bridge {
            margin: 3rem 0 2rem;
          }
          .services-bridge-chip span {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 560px) {
          .secondary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
