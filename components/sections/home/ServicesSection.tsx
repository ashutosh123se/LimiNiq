'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { SERVICES } from '@/lib/data/services'
import { TIER_1_SLUGS } from '@/lib/data/serviceExtensions'

const TIER_2_ORDER = [
  'website-ecommerce',
  'mobile-app-development',
  'ui-ux-design-branding',
  'graphic-design-creative',
  'content-creation',
  'video-production',
  'ai-automation-cloud',
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

interface ServiceCardProps {
  service: (typeof SERVICES)[number]
  variant: 'primary' | 'secondary'
}

function ServiceCard({ service, variant }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)
  const isPrimary = variant === 'primary'

  return (
    <Link
      href={`/services/${service.slug}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      data-cursor="view"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass-card-premium service-card"
        style={{
          height: '100%',
          padding: isPrimary ? '2.5rem 2rem' : '1.75rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease',
          border: hovered ? `1px solid ${service.color}40` : '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(600px circle at 50% 100%, ${service.color}12, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: isPrimary ? '2rem' : '1.25rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: isPrimary ? 56 : 44,
              height: isPrimary ? 56 : 44,
              background: `linear-gradient(135deg, ${service.color}25, transparent)`,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: service.color,
              border: `1px solid ${service.color}35`,
              transform: hovered ? 'scale(1.08) rotate(4deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {service.icon}
          </div>
          <div
            style={{
              width: isPrimary ? 40 : 34,
              height: isPrimary ? 40 : 34,
              borderRadius: '50%',
              background: hovered ? service.color : 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              border: hovered ? `1px solid ${service.color}` : '1px solid rgba(255,255,255,0.1)',
              transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowUpRight size={isPrimary ? 18 : 16} strokeWidth={1.5} />
          </div>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: isPrimary ? '1.5rem' : '1.15rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
            position: 'relative',
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            fontSize: isPrimary ? '1rem' : '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
            position: 'relative',
          }}
        >
          {isPrimary ? service.subtitle : service.shortTitle}
        </p>

        {isPrimary && (
          <ul
            style={{
              listStyle: 'none',
              margin: '1.5rem 0 0',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              position: 'relative',
            }}
          >
            {service.features.slice(0, 3).map((feat) => (
              <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: service.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}

function TierBlock({
  eyebrow,
  heading,
  services,
  variant,
}: {
  eyebrow: string
  heading: string
  services: typeof SERVICES
  variant: 'primary' | 'secondary'
}) {
  return (
    <div className="services-tier">
      <div className="services-tier-header">
        <div className="eyebrow">{eyebrow}</div>
        <h3 className="services-tier-title">{heading}</h3>
      </div>
      <div className={`services-tier-grid services-tier-grid--${variant}`}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} variant={variant} />
        ))}
      </div>
    </div>
  )
}

export function ServicesSection() {
  const tier1 = getTier1Services()
  const tier2 = getTier2Services()

  return (
    <section className="section-padding services-section">
      <div className="section-container">
        <div className="services-section-intro">
          <div className="pill-badge shimmer" style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--accent-primary)' }}>✦</span> Core Disciplines
          </div>
          <h2 className="section-h2" style={{ marginBottom: '1rem' }}>
            The Architecture of Growth
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: 560,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Custom software and SaaS at the core — supported by marketing, design, and delivery
            capabilities that scale with your product.
          </p>
        </div>

        <TierBlock
          eyebrow="Our Core Expertise"
          heading="Software, Marketing & Growth"
          services={tier1}
          variant="primary"
        />

        <TierBlock
          eyebrow="Also Part of How We Deliver"
          heading="Design, Content & Infrastructure"
          services={tier2}
          variant="secondary"
        />
      </div>

      <style>{`
        .services-section {
          position: relative;
          overflow: hidden;
        }

        .services-section-intro {
          margin-bottom: 4rem;
        }

        .services-tier + .services-tier {
          margin-top: 4rem;
          padding-top: 4rem;
          border-top: 1px solid var(--border-subtle);
        }

        .services-tier-header {
          margin-bottom: 2rem;
        }

        .services-tier-title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.75rem 0 0;
          letter-spacing: -0.02em;
        }

        .services-tier-grid {
          display: grid;
          gap: 1.5rem;
        }

        .services-tier-grid--primary {
          grid-template-columns: repeat(3, 1fr);
        }

        .services-tier-grid--secondary {
          grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 1100px) {
          .services-tier-grid--primary {
            grid-template-columns: repeat(2, 1fr);
          }
          .services-tier-grid--secondary {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .services-section-intro {
            margin-bottom: 3rem;
          }
          .services-tier + .services-tier {
            margin-top: 3rem;
            padding-top: 3rem;
          }
          .services-tier-grid--primary,
          .services-tier-grid--secondary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
