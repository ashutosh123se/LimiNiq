'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, Target, PenTool, Code2, Rocket, LineChart } from 'lucide-react'

const STEPS = [
  { num: '01', title: 'Discovery', icon: Search, desc: 'Deep-dive consultation to understand your goals, audience, and competitive landscape.' },
  { num: '02', title: 'Strategy', icon: Target, desc: 'Data-driven roadmap with clear KPIs, timelines, and channel prioritisation.' },
  { num: '03', title: 'Design', icon: PenTool, desc: 'UI/UX prototyping that balances brand identity with conversion optimisation.' },
  { num: '04', title: 'Build', icon: Code2, desc: 'Development and integration with rigorous code reviews and performance testing.' },
  { num: '05', title: 'Launch', icon: Rocket, desc: 'QA, go-live coordination, client training, and post-launch monitoring.' },
  { num: '06', title: 'Optimise', icon: LineChart, desc: 'Ongoing analytics, A/B testing, and continuous growth iteration.' },
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const activeStep = STEPS[active]

  return (
    <section ref={ref} className="section-padding process-section">
      <div className="process-glow process-glow--left" />
      <div className="process-glow process-glow--right" />

      <div className="section-container process-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="process-header"
        >
          <div>
            <div className="pill-badge" style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--accent-primary)' }}>✦</span> Our Methodology
            </div>
            <h2 className="section-h2 process-title">
              From Brief to <span className="text-gradient">Breakthrough</span>
            </h2>
            <p className="process-subtitle">
              Six phases. One transparent pipeline — from first call to measurable growth.
            </p>
          </div>
          <div className="process-meta">
            <span className="process-meta-value">6</span>
            <span className="process-meta-label">Phases</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="process-panel glass-card-premium"
        >
          <div className="process-track-wrap">
            <div className="process-track-line">
              <div
                className="process-track-fill"
                style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
              />
            </div>

            <div className="process-track">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                const isActive = i === active
                return (
                  <button
                    key={step.num}
                    type="button"
                    className={`process-node ${isActive ? 'process-node--active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                  >
                    <span className="process-node-dot" />
                    <span className="process-node-icon">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <span className="process-node-num">{step.num}</span>
                    <span className="process-node-title">{step.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="process-detail"
            >
              <div className="process-detail-icon">
                <activeStep.icon size={22} strokeWidth={1.5} />
              </div>
              <div className="process-detail-body">
                <div className="process-detail-head">
                  <span className="process-detail-num">{activeStep.num}</span>
                  <h3 className="process-detail-title">{activeStep.title}</h3>
                </div>
                <p className="process-detail-desc">{activeStep.desc}</p>
              </div>
              <div className="process-detail-progress">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`process-detail-tick ${i <= active ? 'process-detail-tick--done' : ''}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .process-section {
          position: relative;
          overflow: hidden;
        }

        .process-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .process-glow--left {
          width: 400px;
          height: 400px;
          top: 10%;
          left: -120px;
          background: rgba(59, 91, 255, 0.1);
        }
        .process-glow--right {
          width: 360px;
          height: 360px;
          bottom: 0;
          right: -100px;
          background: rgba(0, 200, 160, 0.07);
        }

        .process-inner {
          position: relative;
          z-index: 1;
        }

        .process-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .process-title {
          margin-bottom: 0.75rem;
        }

        .process-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 480px;
          margin: 0;
        }

        .process-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-width: 90px;
        }

        .process-meta-value {
          font-family: var(--font-mono);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1;
        }

        .process-meta-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-top: 0.35rem;
        }

        .process-panel {
          padding: 1.75rem 1.75rem 1.5rem;
          border-radius: 28px;
        }

        .process-track-wrap {
          position: relative;
          margin-bottom: 1.75rem;
        }

        .process-track-line {
          position: absolute;
          top: 18px;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 2px;
          overflow: hidden;
        }

        .process-track-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-teal));
          box-shadow: 0 0 12px rgba(59, 91, 255, 0.5);
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .process-track {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .process-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.25rem 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: center;
          transition: opacity 0.25s ease;
        }

        .process-node:not(.process-node--active) {
          opacity: 0.55;
        }

        .process-node:hover {
          opacity: 1;
        }

        .process-node-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 2px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
        }

        .process-node--active .process-node-dot {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          box-shadow: 0 0 12px var(--accent-primary);
          transform: scale(1.15);
        }

        .process-node-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
        }

        .process-node--active .process-node-icon {
          color: var(--accent-primary);
          background: rgba(59, 91, 255, 0.12);
          border-color: rgba(59, 91, 255, 0.3);
        }

        .process-node-num {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
        }

        .process-node-title {
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .process-detail {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1.25rem;
          align-items: center;
          padding: 1.25rem 1.35rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .process-detail-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          background: rgba(59, 91, 255, 0.1);
          border: 1px solid rgba(59, 91, 255, 0.25);
        }

        .process-detail-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.4rem;
        }

        .process-detail-num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-teal);
        }

        .process-detail-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .process-detail-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .process-detail-progress {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-left: 0.5rem;
        }

        .process-detail-tick {
          width: 3px;
          height: 10px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.08);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .process-detail-tick--done {
          background: var(--accent-primary);
          box-shadow: 0 0 6px rgba(59, 91, 255, 0.4);
        }

        @media (max-width: 899px) {
          .process-header {
            margin-bottom: 2rem;
          }
          .process-track-wrap {
            overflow-x: auto;
            margin-left: -0.5rem;
            margin-right: -0.5rem;
            padding: 0 0.5rem 0.5rem;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .process-track-wrap::-webkit-scrollbar {
            display: none;
          }
          .process-track {
            grid-template-columns: repeat(6, 100px);
            min-width: max-content;
          }
          .process-detail {
            grid-template-columns: auto 1fr;
          }
          .process-detail-progress {
            display: none;
          }
        }

        @media (max-width: 560px) {
          .process-panel {
            padding: 1.25rem;
          }
          .process-detail {
            grid-template-columns: 1fr;
            text-align: left;
          }
          .process-detail-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  )
}
