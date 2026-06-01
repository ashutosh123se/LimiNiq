'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Deep-dive consultation to understand your goals, audience, and competitive landscape.' },
  { num: '02', title: 'Strategy', desc: 'Data-driven roadmap with clear KPIs, timelines, and channel prioritisation.' },
  { num: '03', title: 'Design', desc: 'UI/UX prototyping that balances brand identity with conversion optimisation.' },
  { num: '04', title: 'Build', desc: 'Development and integration with rigorous code reviews and performance testing.' },
  { num: '05', title: 'Launch', desc: 'QA, go-live coordination, client training, and post-launch monitoring.' },
  { num: '06', title: 'Optimise', desc: 'Ongoing analytics, A/B testing, and continuous growth iteration.' },
]

export function ProcessSection() {
  const ref = useRef(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!lineRef.current) return
    let ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          }
        }
      )
    });
    return () => ctx.revert();
  }, [])

  return (
    <section ref={ref} className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="section-container" style={{ position: 'relative' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="pill-badge" style={{ marginBottom: '1rem', background: 'rgba(59,91,255,0.05)', borderColor: 'rgba(59,91,255,0.1)' }}>
            <span style={{ color: 'var(--accent-primary)' }}>✦</span> Our Process
          </div>
          <h2 className="section-h2" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            From Brief to Breakthrough
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            A proven, transparent methodology that delivers predictable growth.
          </p>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
          
          {/* Connecting Line */}
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 2, height: '80%', background: 'rgba(59,91,255,0.1)', zIndex: 0 }} className="process-line">
            <div ref={lineRef} style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #3B5BFF, #00C8A0)', transformOrigin: 'top' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="glass-card-premium bento-card"
                style={{
                  padding: '2.5rem',
                  position: 'relative',
                }}
                whileHover={{ y: -6, borderColor: 'rgba(59,91,255,0.3)' }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(59,91,255,0.1), rgba(0,200,160,0.1))',
                    border: '1px solid rgba(59,91,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700 }}>
                    {step.num}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .process-line { display: none !important; }
        }
      `}</style>
    </section>
  )
}
