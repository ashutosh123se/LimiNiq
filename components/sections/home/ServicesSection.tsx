'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { MonitorSmartphone, Search, Megaphone, ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap-config'

import { SERVICES } from '@/lib/data/services'

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    if (window.innerWidth < 900) return
    
    const pinElement = pinRef.current
    const wrapper = wrapperRef.current
    if (!pinElement || !wrapper) return

    let ctx = gsap.context(() => {
      const getScrollAmount = () => {
        let wrapperWidth = wrapper.scrollWidth
        return -(wrapperWidth - window.innerWidth + 100)
      }

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pinElement,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })
    });

    return () => ctx.revert();
  }, [])

  return (
    <section ref={sectionRef}>
      <div ref={pinRef} className="pin-container" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      
      <div className="services-header" style={{ position: 'absolute', top: '4rem', left: '4rem', zIndex: 10, maxWidth: '400px' }}>
        <div className="eyebrow" style={{ marginBottom: '1rem' }}>Core Disciplines</div>
        <h2 className="section-h2">The Architecture of Growth</h2>
      </div>

      <div 
        ref={wrapperRef}
        style={{ 
          display: 'flex', 
          gap: '2.5rem', 
          paddingLeft: 'calc(4rem + 450px)', 
          paddingRight: '4rem',
          paddingTop: '6rem',
          width: 'max-content' 
        }}
        className="services-wrapper"
      >
        {SERVICES.map((service) => (
          <div
            key={service.id}
            onMouseEnter={() => setHoveredCard(service.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="glass-card-premium service-card group"
            style={{
              width: 420,
              height: 520,
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              opacity: hoveredCard && hoveredCard !== service.id ? 0.4 : 1,
              transform: hoveredCard === service.id ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            data-cursor="view"
          >
            {/* Hover Glow */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(800px circle at 50% 100%, ${service.color}15, transparent)`,
                opacity: hoveredCard === service.id ? 1 : 0,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
              <div 
                className="service-icon"
                style={{
                  width: 64, height: 64, 
                  background: `linear-gradient(135deg, ${service.color}20, transparent)`, 
                  borderRadius: 16, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: service.color,
                  border: `1px solid ${service.color}30`,
                  boxShadow: `0 8px 24px ${service.color}20`,
                  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hoveredCard === service.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                }}>
                {service.icon}
              </div>
              <Link
                href={`/services/${service.slug}`}
                className="service-link-btn"
                style={{
                  width: 44, height: 44,
                  borderRadius: '50%',
                  background: hoveredCard === service.id ? service.color : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                  border: hoveredCard === service.id ? `1px solid ${service.color}` : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === service.id ? 'rotate(45deg)' : 'rotate(0deg)'
                }}
              >
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </Link>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {service.title}
            </h3>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem', flex: 1 }}>
              {service.description}
            </p>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {service.features.map((feat, i) => (
                <li key={feat} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  transform: hoveredCard === service.id ? 'translateX(10px)' : 'translateX(0)',
                  transition: `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.05}s`
                }}>
                  <div style={{ 
                    width: 6, height: 6, borderRadius: '50%', background: service.color,
                    boxShadow: hoveredCard === service.id ? `0 0 10px ${service.color}` : 'none',
                    transition: 'box-shadow 0.3s ease'
                  }} />
                  <span style={{ fontSize: '0.95rem', color: hoveredCard === service.id ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: 500, transition: 'color 0.3s ease' }}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      </div>

      <style>{`
        @media (max-width: 899px) {
          .pin-container { height: auto !important; display: block !important; padding: 3rem 0 !important; }
          .services-header { position: relative !important; top: 0 !important; left: 0 !important; max-width: 100% !important; margin-bottom: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; padding: 0 1.5rem; }
          
          .services-wrapper { 
            display: flex !important; 
            flex-direction: row !important; 
            width: 100% !important; 
            padding: 0 1.5rem 2rem 1.5rem !important; /* bottom padding for shadow */
            overflow-x: auto !important; 
            scroll-snap-type: x mandatory;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .services-wrapper::-webkit-scrollbar { display: none; }
          
          .service-card { 
            width: 85vw !important; 
            height: auto !important; 
            flex-shrink: 0; 
            scroll-snap-align: center; 
          }
        }
      `}</style>
    </section>
  )
}
