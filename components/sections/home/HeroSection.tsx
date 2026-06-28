'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HeroCanvas } from '@/components/three/HeroCanvas'
import { MagneticButton } from '@/components/ui/MagneticButton'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
})

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="hero-section">
      <div className="mesh-gradient">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="orb-4" />
      </div>
      <div className="grid-overlay" />
      <HeroCanvas />

      <div className="hero-glow hero-glow--center" />

      <div className="section-container hero-inner">
        <motion.div {...fadeUp(0.1)} className="hero-badge-wrap">
          <div className="pill-badge shimmer">
            <span style={{ color: 'var(--accent-primary)' }}>✦</span> Software · SaaS · Growth
          </div>
        </motion.div>

        <h1 className="hero-h1 hero-h1--structured">
          <motion.span {...fadeUp(0.2)} className="hero-h1-line">
            Custom Software & SaaS
          </motion.span>
          <motion.span {...fadeUp(0.32)} className="hero-h1-line">
            Development
          </motion.span>
          <motion.span {...fadeUp(0.44)} className="hero-h1-line hero-h1-accent text-gradient">
            Backed by Data-Driven Marketing
          </motion.span>
        </h1>

        <motion.p {...fadeUp(0.56)} className="hero-subtext">
          We build enterprise software and SaaS platforms — then scale them with precision SEO
          and performance marketing.
        </motion.p>

        <motion.div {...fadeUp(0.68)} className="hero-buttons">
          <MagneticButton className="btn-primary" data-cursor="cta" onClick={() => router.push('/contact')}>
            Start Your Project
            <ArrowRight size={16} strokeWidth={2} />
          </MagneticButton>
          <MagneticButton className="btn-secondary" data-cursor="link" onClick={() => router.push('/portfolio')}>
            View Our Work
          </MagneticButton>
        </motion.div>

        <motion.div {...fadeUp(0.8)} className="hero-proof">
          <span className="hero-proof-dot" />
          <span>150+ projects delivered</span>
          <span className="hero-proof-sep">·</span>
          <span>4.9/5 client rating</span>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 8rem 0 5rem;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 1;
        }
        .hero-glow--center {
          width: 700px;
          height: 400px;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, rgba(59, 91, 255, 0.14) 0%, transparent 70%);
        }

        .hero-inner {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 820px;
          margin: 0 auto;
        }

        .hero-badge-wrap {
          margin-bottom: 2rem;
        }

        .hero-h1--structured {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.05em;
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin: 0 0 1.75rem;
        }

        .hero-h1-line {
          display: block;
        }

        .hero-h1-accent {
          font-size: clamp(1.1rem, 2.2vw, 1.45rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-top: 0.65rem;
          max-width: 520px;
          line-height: 1.35;
        }

        .hero-subtext {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 520px;
          margin: 0 0 2.5rem;
          font-weight: 500;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .hero-proof {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .hero-proof-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 10px var(--accent-teal);
          animation: dotPulse 2s ease-in-out infinite;
        }

        .hero-proof-sep {
          opacity: 0.4;
        }

        @media (max-width: 640px) {
          .hero-section {
            min-height: auto;
            padding: 7rem 0 4rem;
          }
          .hero-badge-wrap {
            margin-bottom: 1.5rem;
          }
          .hero-subtext {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          .hero-proof {
            flex-wrap: wrap;
            justify-content: center;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  )
}
