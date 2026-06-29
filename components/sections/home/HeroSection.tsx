'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, TrendingUp, BarChart3 } from 'lucide-react'
import { HeroCanvas } from '@/components/three/HeroCanvas'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ClientErrorBoundary } from '@/components/ui/ClientErrorBoundary'

const PILLARS = [
  { icon: Code2, label: 'Software', color: '#7B61FF' },
  { icon: BarChart3, label: 'Marketing', color: '#0EA5E9' },
  { icon: TrendingUp, label: 'SEO', color: '#00C8A0' },
]

const TECH_MARQUEE = [
  'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript', 'React', 'SEO', 'Meta Ads', 'SaaS', 'Docker',
]

const fade = (delay = 0, x = 0) => ({
  initial: { opacity: 0, y: 28, x },
  animate: { opacity: 1, y: 0, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay } },
})

function HeroBlueprint() {
  return (
    <div className="hero-blueprint">
      <div className="hero-blueprint-grid" />
      <div className="hero-blueprint-ring hero-blueprint-ring--outer" />
      <div className="hero-blueprint-ring hero-blueprint-ring--inner" />

      {PILLARS.map((pillar, i) => {
        const angle = (i * 120 - 90) * (Math.PI / 180)
        const radius = 46
        return (
          <motion.div
            key={pillar.label}
            className="hero-orbit-node"
            style={{
              left: `${50 + radius * Math.cos(angle)}%`,
              top: `${50 + radius * Math.sin(angle)}%`,
              borderColor: `${pillar.color}55`,
              boxShadow: `0 0 20px ${pillar.color}25`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
          >
            <span className="hero-orbit-icon" style={{ color: pillar.color }}>
              <pillar.icon size={18} strokeWidth={1.5} />
            </span>
            <span>{pillar.label}</span>
          </motion.div>
        )
      })}

      <div className="hero-blueprint-core glass-card-premium">
        <div className="hero-core-label">Delivery Stack</div>
        <div className="hero-core-flow">
          <span>Build</span>
          <span className="hero-core-arrow">→</span>
          <span>Launch</span>
          <span className="hero-core-arrow">→</span>
          <span>Scale</span>
        </div>
        <div className="hero-core-code">
          <span className="hero-code-line"><i>const</i> product = <b>engineer()</b>;</span>
          <span className="hero-code-line"><i>await</i> product.<b>scale</b>(growth);</span>
        </div>
      </div>

      <motion.div
        className="hero-float-stat hero-float-stat--top"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="hero-float-value">150+</span>
        <span className="hero-float-label">Projects</span>
      </motion.div>

      <motion.div
        className="hero-float-stat hero-float-stat--bottom"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6 }}
      >
        <span className="hero-float-value">4.9★</span>
        <span className="hero-float-label">Rated</span>
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="hero-section">
      <div className="hero-canvas-wrap">
        <ClientErrorBoundary>
          <HeroCanvas />
        </ClientErrorBoundary>
      </div>

      <div className="hero-watermark" aria-hidden>01</div>

      <div className="section-container hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.div {...fade(0.1)} className="hero-eyebrow-row">
              <span className="hero-index">01 / Build</span>
              <div className="pill-badge shimmer">
                <span style={{ color: 'var(--accent-primary)' }}>✦</span> India&apos;s Software-Led Agency
              </div>
            </motion.div>

            <h1 className="hero-h1 hero-h1--editorial">
              <span className="hero-h1-line">Custom Software &amp; SaaS Development</span>
              <span className="hero-h1-sub text-gradient">Backed by Data-Driven Marketing</span>
            </h1>

            <motion.p {...fade(0.48)} className="hero-lede">
              From multi-tenant platforms to growth engines — we architect the product,
              then own the pipeline that fills it.
            </motion.p>

            <motion.div {...fade(0.58)} className="hero-actions">
              <MagneticButton className="btn-primary" data-cursor="cta" onClick={() => router.push('/contact')}>
                Start Your Project
                <ArrowRight size={16} strokeWidth={2} />
              </MagneticButton>
              <MagneticButton className="btn-secondary" data-cursor="link" onClick={() => router.push('/portfolio')}>
                View Our Work
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div {...fade(0.4, 24)} className="hero-visual-col">
            <HeroBlueprint />
          </motion.div>
        </div>
      </div>

      <div className="hero-marquee-wrap edge-fade-x">
        <div className="hero-marquee">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((item, i) => (
            <span key={`${item}-${i}`} className="hero-marquee-item">
              {item}
              <span className="hero-marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding: 7rem 0 0;
        }

        .hero-canvas-wrap {
          position: absolute;
          top: 0;
          right: 0;
          width: 55%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          mask-image: linear-gradient(to left, black 40%, transparent 95%);
          -webkit-mask-image: linear-gradient(to left, black 40%, transparent 95%);
        }

        .hero-watermark {
          position: absolute;
          top: 12%;
          left: 4%;
          font-family: var(--font-heading);
          font-size: clamp(6rem, 18vw, 14rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(59, 91, 255, 0.08);
          pointer-events: none;
          z-index: 1;
          user-select: none;
        }

        .hero-shell {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          padding-bottom: 5rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
        }

        .hero-copy {
          max-width: 580px;
        }

        .hero-eyebrow-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .hero-index {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .hero-h1--editorial {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 0 0 1.5rem;
        }

        .hero-h1-pre {
          display: flex;
          flex-direction: column;
          gap: 0.08em;
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4.2vw, 3.35rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--text-primary);
        }

        .hero-h1-line {
          display: block;
        }

        .hero-h1-nowrap {
          white-space: nowrap;
        }

        .hero-h1-highlight {
          display: inline-block;
          padding: 0.02em 0.28em;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(59,91,255,0.25), rgba(123,97,255,0.15));
          border: 1px solid rgba(123, 97, 255, 0.35);
          box-shadow: 0 0 30px rgba(59, 91, 255, 0.15);
        }

        .hero-h1-sub {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(1rem, 2vw, 1.35rem);
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .hero-lede {
          font-size: 1.08rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0 0 2.25rem;
          max-width: 480px;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .hero-visual-col {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 480px;
        }

        .hero-blueprint {
          position: relative;
          width: 100%;
          max-width: 560px;
          aspect-ratio: 1;
          margin: 0 auto;
        }

        .hero-blueprint-grid {
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          background-image:
            linear-gradient(rgba(59,91,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,91,255,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: radial-gradient(circle, black 30%, transparent 72%);
        }

        .hero-blueprint-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(59, 91, 255, 0.2);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: heroRingSpin 40s linear infinite;
        }
        .hero-blueprint-ring--outer {
          width: 92%;
          height: 92%;
        }
        .hero-blueprint-ring--inner {
          width: 68%;
          height: 68%;
          animation-direction: reverse;
          animation-duration: 28s;
          border-color: rgba(0, 200, 160, 0.18);
        }

        @keyframes heroRingSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .hero-orbit-node {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.85rem;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-primary);
          background: rgba(4, 5, 8, 0.85);
          border: 1px solid;
          white-space: nowrap;
        }

        .hero-orbit-icon {
          display: flex;
          align-items: center;
        }

        .hero-blueprint-core {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 62%;
          padding: 1.5rem 1.35rem;
          border-radius: 20px;
          text-align: center;
        }

        .hero-core-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 0.65rem;
        }

        .hero-core-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
        }

        .hero-core-arrow {
          color: var(--accent-teal);
          font-size: 0.85rem;
        }

        .hero-core-code {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          text-align: left;
          padding: 0.65rem 0.75rem;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .hero-code-line {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .hero-code-line i {
          font-style: normal;
          color: var(--accent-violet);
        }
        .hero-code-line b {
          font-weight: 600;
          color: var(--accent-teal);
        }

        .hero-float-stat {
          position: absolute;
          display: flex;
          flex-direction: column;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: rgba(4, 5, 8, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        .hero-float-stat--top {
          top: 6%;
          right: 0;
        }
        .hero-float-stat--bottom {
          bottom: 8%;
          left: 0;
        }

        .hero-float-value {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .hero-float-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-top: 0.2rem;
        }

        .hero-marquee-wrap {
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: linear-gradient(
            90deg,
            rgba(8, 12, 20, 0.92) 0%,
            rgba(4, 5, 8, 0.55) 12%,
            rgba(4, 5, 8, 0.55) 88%,
            rgba(8, 12, 20, 0.92) 100%
          );
          backdrop-filter: blur(10px);
          padding: 1rem 0;
        }
        .hero-marquee-wrap::before {
          background: linear-gradient(to right, rgba(8, 12, 20, 0.98), transparent);
        }
        .hero-marquee-wrap::after {
          background: linear-gradient(to left, rgba(8, 12, 20, 0.98), transparent);
        }

        .hero-marquee {
          display: flex;
          width: max-content;
          gap: 2rem;
          animation: heroMarquee 35s linear infinite;
        }

        .hero-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 2rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          white-space: nowrap;
        }

        .hero-marquee-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-primary);
          opacity: 0.6;
        }

        @keyframes heroMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 0.92fr 1.08fr;
            gap: 2.5rem;
          }
          .hero-copy {
            padding-right: 0.5rem;
          }
          .hero-visual-col {
            justify-content: center;
          }
          .hero-blueprint {
            max-width: 520px;
          }
        }

        @media (max-width: 959px) {
          .hero-section {
            min-height: auto;
            padding-top: 6.5rem;
          }
          .hero-shell {
            padding-bottom: 2.5rem;
          }
          .hero-watermark {
            top: 8%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 5rem;
            opacity: 0.5;
          }
          .hero-copy {
            text-align: center;
            margin: 0 auto;
          }
          .hero-eyebrow-row {
            justify-content: center;
          }
          .hero-lede {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-canvas-wrap {
            width: 100%;
            height: 60%;
            top: auto;
            bottom: 0;
            mask-image: linear-gradient(to top, black 20%, transparent 80%);
          }
          .hero-blueprint {
            width: min(100%, 340px);
          }
        }
      `}</style>
    </section>
  )
}
