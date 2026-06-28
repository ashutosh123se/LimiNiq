'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    cmd: 'discover',
    flag: '--deep-dive',
    title: 'Discovery',
    output: 'Goals mapped · audience profiled · competitive landscape audited.',
    desc: 'We start with a structured consultation — understanding your product vision, users, and market before a single line of code is written.',
  },
  {
    cmd: 'strategize',
    flag: '--data-driven',
    title: 'Strategy',
    output: 'KPIs defined · channel mix prioritised · roadmap locked.',
    desc: 'A clear execution plan with measurable targets, realistic timelines, and the right mix of build, SEO, and paid channels.',
  },
  {
    cmd: 'design',
    flag: '--conversion-first',
    title: 'Design',
    output: 'Wireframes approved · UI system built · prototypes validated.',
    desc: 'UI/UX that balances brand identity with conversion — prototypes tested before development begins.',
  },
  {
    cmd: 'build',
    flag: '--production-grade',
    title: 'Build',
    output: 'Architecture set · sprints shipping · code reviewed & tested.',
    desc: 'Agile development with weekly deliverables, rigorous QA, and performance benchmarks baked in from day one.',
  },
  {
    cmd: 'launch',
    flag: '--zero-downtime',
    title: 'Launch',
    output: 'QA passed · deployment live · client team trained.',
    desc: 'Coordinated go-live with monitoring, documentation, and handover so your team is confident on day one.',
  },
  {
    cmd: 'optimize',
    flag: '--continuous',
    title: 'Optimise',
    output: 'Analytics live · A/B tests running · growth compounding.',
    desc: 'Post-launch iteration — analytics, SEO refinement, and campaign optimisation to keep results climbing.',
  },
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState('')

  const step = STEPS[active]

  const typeOutput = useCallback((text: string) => {
    setTyped('')
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!isInView) return
    return typeOutput(step.output)
  }, [active, isInView, step.output, typeOutput])

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <section ref={ref} className="section-padding process-section">
      <div className="section-container process-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="process-head"
        >
          <div className="pill-badge" style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--accent-primary)' }}>✦</span> How We Work
          </div>
          <h2 className="section-h2">
            The <span className="text-gradient">Delivery Pipeline</span>
          </h2>
          <p className="process-lede">
            Six commands. One transparent run — from first brief to compounding growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="process-terminal-wrap"
        >
          <div className="process-terminal glass-card-premium">
            <div className="process-terminal-bar">
              <div className="process-dots">
                <span /><span /><span />
              </div>
              <span className="process-terminal-title">liminiq — delivery.sh</span>
              <span className="process-terminal-status">
                <span className="process-live-dot" />
                running
              </span>
            </div>

            <div className="process-terminal-body">
              <div className="process-cmd-line">
                <span className="process-prompt">$</span>
                <span className="process-cmd">liminiq run pipeline</span>
                <span className="process-flag">--client your-project</span>
              </div>

              <div className="process-phase-list">
                {STEPS.map((s, i) => {
                  const isActive = i === active
                  const isDone = i < active
                  return (
                    <button
                      key={s.cmd}
                      type="button"
                      className={`process-phase-row ${isActive ? 'process-phase-row--active' : ''} ${isDone ? 'process-phase-row--done' : ''}`}
                      onClick={() => setActive(i)}
                    >
                      <span className="process-phase-bracket">[{String(i + 1).padStart(2, '0')}]</span>
                      <span className="process-phase-cmd">
                        {s.cmd}
                        <span className="process-phase-flag"> {s.flag}</span>
                      </span>
                      <span className="process-phase-status">
                        {isDone ? '✓ done' : isActive ? '→ running' : '· queued'}
                      </span>
                      {isActive && (
                        <span className="process-phase-bar">
                          <span className="process-phase-bar-fill" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="process-output-block">
                <span className="process-output-label">stdout ›</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="process-output-text"
                  >
                    {typed}
                    <span className="process-cursor">▋</span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="process-side glass-card"
            >
              <span className="process-side-num">{String(active + 1).padStart(2, '0')}</span>
              <h3 className="process-side-title">{step.title}</h3>
              <p className="process-side-desc">{step.desc}</p>
              <div className="process-side-nav">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`process-side-dot ${i === active ? 'process-side-dot--active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to phase ${i + 1}`}
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

        .process-wrap {
          position: relative;
          z-index: 1;
        }

        .process-head {
          margin-bottom: 2.5rem;
          max-width: 520px;
        }

        .process-lede {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0.75rem 0 0;
        }

        .process-terminal-wrap {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          align-items: stretch;
        }

        .process-terminal {
          border-radius: 20px;
          overflow: hidden;
          padding: 0;
        }

        .process-terminal-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1.25rem;
          background: rgba(0, 0, 0, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .process-dots {
          display: flex;
          gap: 6px;
        }
        .process-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .process-dots span:nth-child(1) { background: #ff5f56; }
        .process-dots span:nth-child(2) { background: #ffbd2e; }
        .process-dots span:nth-child(3) { background: #27c93f; }

        .process-terminal-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-tertiary);
          flex: 1;
        }

        .process-terminal-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-teal);
        }

        .process-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 8px var(--accent-teal);
          animation: dotPulse 2s ease-in-out infinite;
        }

        .process-terminal-body {
          padding: 1.25rem 1.5rem 1.5rem;
          font-family: var(--font-mono);
        }

        .process-cmd-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .process-prompt {
          color: var(--accent-teal);
          font-weight: 700;
        }

        .process-cmd {
          color: var(--text-primary);
          font-weight: 600;
        }

        .process-flag {
          color: var(--accent-violet);
        }

        .process-phase-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1.25rem;
        }

        .process-phase-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          grid-template-rows: auto auto;
          gap: 0 1rem;
          align-items: center;
          width: 100%;
          padding: 0.55rem 0.75rem;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .process-phase-row:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .process-phase-row--active {
          background: rgba(59, 91, 255, 0.08);
          border-color: rgba(59, 91, 255, 0.25);
        }

        .process-phase-row--done .process-phase-cmd {
          color: var(--text-tertiary);
        }

        .process-phase-bracket {
          font-size: 0.72rem;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        .process-phase-row--active .process-phase-bracket {
          color: var(--accent-primary);
        }

        .process-phase-cmd {
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .process-phase-row--active .process-phase-cmd {
          color: var(--text-primary);
        }

        .process-phase-flag {
          color: var(--accent-violet);
          font-weight: 500;
        }

        .process-phase-status {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .process-phase-row--active .process-phase-status {
          color: var(--accent-teal);
        }

        .process-phase-row--done .process-phase-status {
          color: var(--accent-teal);
        }

        .process-phase-bar {
          grid-column: 1 / -1;
          height: 2px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 0.35rem;
        }

        .process-phase-bar-fill {
          display: block;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-teal));
          animation: processBarFill 5s linear forwards;
          transform-origin: left;
        }

        @keyframes processBarFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .process-output-block {
          padding: 0.85rem 1rem;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          min-height: 52px;
        }

        .process-output-label {
          display: block;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.4rem;
        }

        .process-output-text {
          font-size: 0.8rem;
          color: var(--accent-teal);
          line-height: 1.5;
        }

        .process-cursor {
          display: inline-block;
          animation: cursorBlink 1s step-end infinite;
          color: var(--accent-primary);
          margin-left: 2px;
        }

        @keyframes cursorBlink {
          50% { opacity: 0; }
        }

        .process-side {
          padding: 1.5rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .process-side-num {
          font-family: var(--font-mono);
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          color: rgba(255, 255, 255, 0.04);
          position: absolute;
          top: 1rem;
          right: 1.25rem;
          letter-spacing: -0.04em;
        }

        .process-side-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.65rem;
          position: relative;
        }

        .process-side-desc {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
          flex: 1;
          position: relative;
        }

        .process-side-nav {
          display: flex;
          gap: 0.4rem;
          margin-top: 1.25rem;
        }

        .process-side-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          padding: 0;
          border: none;
          background: rgba(255, 255, 255, 0.12);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .process-side-dot--active {
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-primary);
          transform: scale(1.2);
        }

        @media (min-width: 900px) {
          .process-terminal-wrap {
            grid-template-columns: 1.4fr 0.75fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 899px) {
          .process-phase-row {
            grid-template-columns: auto 1fr;
          }
          .process-phase-status {
            grid-column: 2;
            justify-self: start;
            margin-top: -0.2rem;
          }
        }
      `}</style>
    </section>
  )
}
