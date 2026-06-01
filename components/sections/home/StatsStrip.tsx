'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'

const STATS = [
  { number: 150, suffix: '+', label: 'Projects Delivered', sublabel: 'Since 2019' },
  { number: 12, prefix: '$', suffix: 'M+', label: 'Revenue Generated', sublabel: 'For our clients' },
  { number: 98, suffix: '%', label: 'Client Retention', sublabel: 'Long-term partnerships' },
]

export function StatsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: '4rem 0 2rem',
        zIndex: 10,
      }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card-premium"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Slow shine sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '30%',
              background: 'linear-gradient(90deg, transparent, rgba(59,91,255,0.1), transparent)',
              animation: 'shimmerSlide 4s ease infinite',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item"
              style={{
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Number */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF, #A0B4FF, #3B5BFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.prefix && stat.prefix}
                {isInView ? (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    delay={i * 0.15}
                    useEasing
                    separator=","
                  />
                ) : 0}
                {stat.suffix}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.label}
              </div>

              {/* Sublabel */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--text-tertiary)',
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmerSlide {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
        @media (min-width: 641px) {
          .stat-item { border-right: 1px solid rgba(59,91,255,0.06); }
          .stat-item:last-child { border-right: none; }
        }
        @media (max-width: 640px) {
          .stat-item { border-bottom: 1px solid rgba(59,91,255,0.06); }
          .stat-item:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  )
}
