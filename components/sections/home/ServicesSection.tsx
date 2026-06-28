'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap-config'

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
  size: 'large' | 'compact'
  hoveredCard: string | null
  onHover: (id: string | null) => void
}

function ServiceCard({ service, size, hoveredCard, onHover }: ServiceCardProps) {
  const isLarge = size === 'large'
  const isHovered = hoveredCard === service.id
  const isDimmed = hoveredCard && hoveredCard !== service.id

  return (
    <div
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      className="glass-card-premium service-card group"
      style={{
        width: isLarge ? 460 : 340,
        height: isLarge ? 540 : 420,
        padding: isLarge ? '3rem 2.5rem' : '2rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        opacity: isDimmed ? 0.4 : 1,
        transform: isHovered ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      data-cursor="view"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(800px circle at 50% 100%, ${service.color}15, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isLarge ? '2.5rem' : '1.75rem' }}>
        <div
          className="service-icon"
          style={{
            width: isLarge ? 64 : 52,
            height: isLarge ? 64 : 52,
            background: `linear-gradient(135deg, ${service.color}20, transparent)`,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: service.color,
            border: `1px solid ${service.color}30`,
            boxShadow: `0 8px 24px ${service.color}20`,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          {service.icon}
        </div>
        <Link
          href={`/services/${service.slug}`}
          className="service-link-btn"
          style={{
            width: isLarge ? 44 : 38,
            height: isLarge ? 44 : 38,
            borderRadius: '50%',
            background: isHovered ? service.color : 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            border: isHovered ? `1px solid ${service.color}` : '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <ArrowUpRight size={isLarge ? 20 : 18} strokeWidth={1.5} />
        </Link>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: isLarge ? '1.8rem' : '1.35rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '1rem',
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontSize: isLarge ? '1.05rem' : '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: isLarge ? '2.5rem' : '1.5rem',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: isLarge ? undefined : 3,
          WebkitBoxOrient: 'vertical',
          overflow: isLarge ? 'visible' : 'hidden',
        }}
      >
        {isLarge ? service.description : service.subtitle}
      </p>

      {isLarge && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {service.features.slice(0, 4).map((feat, i) => (
            <li
              key={feat}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transform: isHovered ? 'translateX(10px)' : 'translateX(0)',
                transition: `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.05}s`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: service.color,
                  boxShadow: isHovered ? `0 0 10px ${service.color}` : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}
              />
              <span
                style={{
                  fontSize: '0.95rem',
                  color: isHovered ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                }}
              >
                {feat}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function TierScrollSection({
  eyebrow,
  heading,
  services,
  size,
  pinId,
}: {
  eyebrow: string
  heading: string
  services: typeof SERVICES
  size: 'large' | 'compact'
  pinId: string
}) {
  const pinRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    if (window.innerWidth < 900) return

    const pinElement = pinRef.current
    const wrapper = wrapperRef.current
    if (!pinElement || !wrapper) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const wrapperWidth = wrapper.scrollWidth
        return -(wrapperWidth - window.innerWidth + 100)
      }

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: pinElement,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          id: pinId,
        },
      })
    })

    return () => ctx.revert()
  }, [pinId, services])

  const isLarge = size === 'large'
  const headerOffset = isLarge ? '450px' : '380px'

  return (
    <div
      ref={pinRef}
      className="pin-container"
      style={{
        position: 'relative',
        height: isLarge ? '100vh' : '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        className="services-header"
        style={{
          position: 'absolute',
          top: '4rem',
          left: '4rem',
          zIndex: 10,
          maxWidth: isLarge ? '400px' : '360px',
        }}
      >
        <div className="eyebrow" style={{ marginBottom: '1rem' }}>
          {eyebrow}
        </div>
        <h2 className="section-h2" style={{ fontSize: isLarge ? undefined : 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          {heading}
        </h2>
      </div>

      <div
        ref={wrapperRef}
        style={{
          display: 'flex',
          gap: isLarge ? '2.5rem' : '1.75rem',
          paddingLeft: `calc(4rem + ${headerOffset})`,
          paddingRight: '4rem',
          paddingTop: isLarge ? '6rem' : '5rem',
          width: 'max-content',
        }}
        className="services-wrapper"
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            size={size}
            hoveredCard={hoveredCard}
            onHover={setHoveredCard}
          />
        ))}
      </div>
    </div>
  )
}

export function ServicesSection() {
  const tier1 = getTier1Services()
  const tier2 = getTier2Services()

  return (
    <section>
      <TierScrollSection
        eyebrow="Our Core Expertise"
        heading="Software, Marketing & Growth"
        services={tier1}
        size="large"
        pinId="tier1-services"
      />

      <TierScrollSection
        eyebrow="Also Part of How We Deliver"
        heading="Design, Content & Infrastructure"
        services={tier2}
        size="compact"
        pinId="tier2-services"
      />

      <style>{`
        @media (max-width: 899px) {
          .pin-container { height: auto !important; display: block !important; padding: 3rem 0 !important; }
          .services-header { position: relative !important; top: 0 !important; left: 0 !important; max-width: 100% !important; margin-bottom: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; padding: 0 1.5rem; }
          
          .services-wrapper { 
            display: flex !important; 
            flex-direction: row !important; 
            width: 100% !important; 
            padding: 0 1.5rem 2rem 1.5rem !important;
            overflow-x: auto !important; 
            scroll-snap-type: x mandatory;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .services-wrapper::-webkit-scrollbar { display: none; }
          
          .service-card { 
            width: 85vw !important; 
            height: auto !important; 
            min-height: 380px;
            flex-shrink: 0; 
            scroll-snap-align: center; 
          }
        }
      `}</style>
    </section>
  )
}
