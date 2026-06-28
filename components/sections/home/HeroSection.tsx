'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Star, TrendingUp, Zap, Target } from 'lucide-react'
import { HeroCanvas } from '@/components/three/HeroCanvas'
import { SplitHeadline } from '@/components/ui/SplitHeadline'
import { MagneticButton } from '@/components/ui/MagneticButton'

const FLOATING_CARDS = [
  { icon: <TrendingUp size={16} strokeWidth={1.5} />, label: "340% Traffic Increase", delay: 0.6, duration: 2.8, x: "65%", y: "18%" },
  { icon: <Zap size={16} strokeWidth={1.5} />, label: "98 PageSpeed Score", delay: 0.8, duration: 3.2, x: "72%", y: "52%" },
  { icon: <Target size={16} strokeWidth={1.5} />, label: "4.2x ROAS", delay: 1.0, duration: 2.6, x: "55%", y: "78%" },
];

const TRUST_BADGES = [
  { icon: "G", label: "Google Partner" },
  { icon: "M", label: "Meta Partner" },
  { icon: <Star size={14} fill="currentColor" strokeWidth={0} />, label: "5-Star Agency" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const router = useRouter()

  const rotateX = useTransform(mouseY, [-300, 300], [6, -6])
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '7rem',
        paddingBottom: '6rem',
      }}
    >
      <div className="mesh-gradient">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
        <div className="orb-4"></div>
      </div>
      <div className="grid-overlay"></div>
      
      <HeroCanvas />

      <div className="section-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          
          <motion.div initial="initial" animate="animate" style={{ maxWidth: 720 }} className="hero-content">
            <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
              <div className="pill-badge shimmer">
                <span style={{ color: 'var(--accent-primary)' }}>✦</span> Next-Gen Digital Solutions
              </div>
            </motion.div>

            <SplitHeadline className="hero-h1">
              Custom Software & SaaS Development — Backed by Data-Driven Marketing
            </SplitHeadline>

            <motion.p
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }
              }}
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                maxWidth: 580,
                marginBottom: '2.5rem',
                marginTop: '1.5rem',
                fontWeight: 500
              }}
            >
              LIMINIQ builds custom software, SaaS platforms, and enterprise systems — then drives their growth with precision SEO and data-backed digital marketing.
            </motion.p>

            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.0 } }
              }}
              className="hero-buttons"
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
            >
              <MagneticButton className="btn-primary" data-cursor="cta" onClick={() => router.push('/contact')}>
                Start Your Project
                <ArrowRight size={16} strokeWidth={2} />
              </MagneticButton>
              <MagneticButton className="btn-secondary" data-cursor="link" onClick={() => router.push('/portfolio')}>
                View Our Work
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 1, delay: 1.2 } }
              }}
              className="trust-badges"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem', borderRight: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#F59E0B' }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-label" style={{ color: 'var(--text-secondary)' }}>
                  4.9/5 Average
                </span>
              </div>

              {TRUST_BADGES.map((badge) => (
                <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 800 }}>{badge.icon}</span>
                  <span className="text-label" style={{ letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="hero-visual"
          >
            <motion.div style={{ rotateX, rotateY, perspective: 1200, transformStyle: 'preserve-3d', width: '100%', maxWidth: 460 }}>
              <DashboardMockup />
            </motion.div>

            {FLOATING_CARDS.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: card.delay + 0.8, type: 'spring', stiffness: 150 }}
                style={{
                  position: 'absolute',
                  left: card.x,
                  top: card.y,
                  background: 'var(--glass-2)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  animationName: 'floatBob',
                  animationDuration: `${card.duration}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${card.delay}s`,
                  whiteSpace: 'nowrap',
                  zIndex: 15,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1) inset'
                }}
              >
                <span style={{ color: 'var(--accent-primary)' }}>{card.icon}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {card.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1.3fr 0.7fr !important; }
          .hero-visual { min-height: 550px; }
          .hero-content { text-align: left; }
          .hero-buttons { justify-content: flex-start; }
          .trust-badges { justify-content: flex-start; }
        }
        @media (max-width: 899px) { 
          .hero-visual { display: none !important; } 
          .hero-content { text-align: center; display: flex; flex-direction: column; align-items: center; margin: 0 auto; }
          .hero-buttons { justify-content: center; width: 100%; }
          .trust-badges { justify-content: center; }
        }
        @keyframes floatBob { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
      `}</style>
    </section>
  )
}

function DashboardMockup() {
  return (
    <div className="glass-card-premium" style={{ width: '100%', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
        ))}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '4px 12px', marginLeft: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>liminiq.com/dashboard</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Revenue', value: '4.8L', trend: '+18%' },
          { label: 'Traffic', value: '48.2K', trend: '+34%' },
          { label: 'Conv.', value: '24.8%', trend: '+6%' },
        ].map((kpi) => (
          <div key={kpi.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div className="text-label" style={{ color: 'var(--text-tertiary)' }}>{kpi.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{kpi.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div className="text-label" style={{ marginBottom: '1rem', color: 'var(--text-tertiary)' }}>Traffic Overview</div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', height: 80 }}>
          {[40,65,45,80,55,100,75].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.2 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
              style={{
                flex: 1,
                borderRadius: '4px',
                background: i === 5 ? 'linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-tertiary) 100%)' : 'rgba(59,91,255,0.15)',
                height: `${h}%`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[
          { text: 'New lead: TechCorp Ltd.' },
          { text: 'SEO rank: +12 positions' },
          { text: 'Campaign ROI: 4.8x' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-secondary)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
