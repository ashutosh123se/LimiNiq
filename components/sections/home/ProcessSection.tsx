'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from '@/lib/gsap-config'
import { Search, Target, PenTool, Code2, Rocket, LineChart } from 'lucide-react'

const STEPS = [
  { num: '01', title: 'Discovery', icon: <Search size={24} />, desc: 'Deep-dive consultation to understand your goals, audience, and competitive landscape.' },
  { num: '02', title: 'Strategy', icon: <Target size={24} />, desc: 'Data-driven roadmap with clear KPIs, timelines, and channel prioritisation.' },
  { num: '03', title: 'Design', icon: <PenTool size={24} />, desc: 'UI/UX prototyping that balances brand identity with conversion optimisation.' },
  { num: '04', title: 'Build', icon: <Code2 size={24} />, desc: 'Development and integration with rigorous code reviews and performance testing.' },
  { num: '05', title: 'Launch', icon: <Rocket size={24} />, desc: 'QA, go-live coordination, client training, and post-launch monitoring.' },
  { num: '06', title: 'Optimise', icon: <LineChart size={24} />, desc: 'Ongoing analytics, A/B testing, and continuous growth iteration.' },
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
      
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(59,91,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,200,160,0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <div className="pill-badge" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
            <span style={{ color: 'var(--accent-primary)' }}>✦</span> Our Methodology
          </div>
          <h2 className="section-h2" style={{ color: 'white', marginBottom: '1.25rem', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            From Brief to <span style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Breakthrough</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            A proven, transparent engineering process that transforms complex challenges into predictable, scalable growth.
          </p>
        </motion.div>

        <div className="process-timeline-wrapper" style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
          
          {/* Central Connecting Line */}
          <div className="process-line-bg" style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.05)', zIndex: 0 }} >
            <div ref={lineRef} style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))', transformOrigin: 'top', boxShadow: '0 0 15px var(--accent-primary)' }} />
          </div>

          <div className="process-grid">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={step.num} className={`process-row ${isEven ? 'row-left' : 'row-right'}`}>
                  
                  {/* Timeline Node */}
                  <div className="timeline-node">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="node-inner" 
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
                    className="glass-card process-card group"
                    onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                    }}
                    style={{
                      padding: '2.5rem',
                      position: 'relative',
                      borderRadius: 24,
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Hover Glow Effect */}
                    <div className="card-hover-glow" />

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 16,
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-primary)',
                          boxShadow: 'inset 0 0 20px rgba(59,91,255,0.05)'
                        }}
                      >
                        {step.icon}
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.03)', lineHeight: 0.8, letterSpacing: '-0.05em' }}>
                        {step.num}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0, position: 'relative', zIndex: 1 }}>
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .process-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .process-row {
          display: flex;
          position: relative;
          width: 100%;
        }
        .process-card {
          width: calc(50% - 3rem);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .process-card:hover {
          transform: translateY(-5px);
          border-color: rgba(59,91,255,0.3);
          box-shadow: 0 10px 40px rgba(59,91,255,0.1);
        }
        .card-hover-glow {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 0;
        }
        .process-card:hover .card-hover-glow {
          opacity: 1;
        }
        .timeline-node {
          position: absolute;
          left: 50%;
          top: 3rem;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 2px solid rgba(255,255,255,0.1);
          display: flex;
          alignItems: center;
          justifyContent: center;
          z-index: 2;
        }
        .node-inner {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
        }

        /* Desktop specific positioning */
        @media (min-width: 900px) {
          .process-line-bg {
            left: 50%;
            transform: translateX(-50%);
          }
          .row-left {
            justify-content: flex-start;
            padding-right: 3rem;
          }
          .row-right {
            justify-content: flex-end;
            padding-left: 3rem;
          }
        }

        /* Mobile specific positioning */
        @media (max-width: 899px) {
          .process-line-bg {
            left: 1.5rem;
          }
          .timeline-node {
            left: 1.5rem;
          }
          .process-card {
            width: calc(100% - 4rem);
            margin-left: 4rem;
          }
          .row-left, .row-right {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
