'use client'

import { useRef } from 'react'
import { Briefcase, TrendingUp, HeartHandshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const STATS: {
  number: number
  prefix?: string
  suffix: string
  label: string
  sublabel: string
  accent: string
  icon: LucideIcon
}[] = [
  {
    number: 150,
    suffix: '+',
    label: 'Projects Delivered',
    sublabel: 'Since 2019',
    accent: '#3B5BFF',
    icon: Briefcase,
  },
  {
    number: 12,
    prefix: '$',
    suffix: 'M+',
    label: 'Revenue Generated',
    sublabel: 'For our clients',
    accent: '#00C8A0',
    icon: TrendingUp,
  },
  {
    number: 98,
    suffix: '%',
    label: 'Client Retention',
    sublabel: 'Long-term partnerships',
    accent: '#7B61FF',
    icon: HeartHandshake,
  },
]

function StatCell({
  stat,
  index,
}: {
  stat: (typeof STATS)[number]
  index: number
}) {
  const Icon = stat.icon

  return (
    <article
      className={`impact-cell ${index === 1 ? 'impact-cell--center' : ''}`}
      style={{ '--impact-accent': stat.accent } as React.CSSProperties}
    >
      <div className="impact-cell-glow" />
      <div className="impact-cell-head">
        <span className="impact-cell-kicker">Metric · {String(index + 1).padStart(2, '0')}</span>
        <span
          className="impact-cell-icon"
          style={{
            color: stat.accent,
            borderColor: `${stat.accent}35`,
            background: `linear-gradient(135deg, ${stat.accent}18, transparent)`,
          }}
        >
          <Icon size={16} strokeWidth={1.6} />
        </span>
      </div>

      <div className="impact-cell-value">
        {stat.prefix && <span className="impact-cell-prefix">{stat.prefix}</span>}
        <span className="impact-cell-number">{stat.number.toLocaleString('en-IN')}</span>
        <span className="impact-cell-suffix">{stat.suffix}</span>
      </div>

      <div className="impact-cell-label">{stat.label}</div>
      <div className="impact-cell-sub">{stat.sublabel}</div>
      <div className="impact-cell-bar" />
    </article>
  )
}

export function StatsStrip() {
  const ref = useRef(null)

  return (
    <section ref={ref} className="impact-strip">
      <div className="impact-strip-grid-bg" aria-hidden />

      <div className="section-container impact-strip-inner">
        <div className="impact-strip-label">
          <span className="impact-strip-dot" />
          Live impact telemetry
        </div>

        <p className="impact-board-sr-summary">
          150+ projects delivered since 2019 · $12M+ revenue generated for clients · 98% client retention rate
        </p>

        <div className="impact-board">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .impact-strip {
          position: relative;
          z-index: 10;
          padding: clamp(2.5rem, 5vw, 4rem) 0 clamp(1.5rem, 3vw, 2rem);
          overflow: hidden;
        }

        .impact-strip-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          background-image:
            linear-gradient(rgba(59, 91, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 91, 255, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
        }

        .impact-strip-inner {
          position: relative;
        }

        .impact-strip-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 1rem;
        }

        .impact-strip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 10px var(--accent-teal);
          animation: impactPulse 2s ease infinite;
        }

        .impact-board {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          align-items: stretch;
        }

        .impact-board-sr-summary {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .impact-cell {
          position: relative;
          overflow: hidden;
          padding: 1.35rem 1.25rem 1.15rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .impact-cell:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--impact-accent) 35%, transparent);
        }

        .impact-cell--center {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--impact-accent) 25%, rgba(255, 255, 255, 0.08));
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--impact-accent) 10%, rgba(255, 255, 255, 0.02)),
            rgba(255, 255, 255, 0.02)
          );
        }

        .impact-cell--center:hover {
          transform: translateY(-9px);
        }

        .impact-cell-glow {
          position: absolute;
          top: -30%;
          right: -20%;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--impact-accent) 18%, transparent);
          filter: blur(40px);
          pointer-events: none;
        }

        .impact-cell-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .impact-cell-kicker {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .impact-cell-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .impact-cell-value {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 0.55rem;
          background: linear-gradient(135deg, #fff 10%, color-mix(in srgb, var(--impact-accent) 70%, #fff));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .impact-cell-prefix,
        .impact-cell-suffix {
          -webkit-text-fill-color: transparent;
        }

        .impact-cell-label {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .impact-cell-sub {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-tertiary);
        }

        .impact-cell-bar {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 0;
          height: 2px;
          border-radius: 4px 4px 0 0;
          background: linear-gradient(90deg, var(--impact-accent), transparent);
          opacity: 0.65;
        }

        @keyframes impactPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }

        @media (max-width: 720px) {
          .impact-board {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .impact-cell--center {
            transform: none;
          }

          .impact-cell--center:hover {
            transform: translateY(-3px);
          }

          .impact-cell {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto auto;
            column-gap: 1rem;
            align-items: center;
            padding: 1rem 1.1rem;
          }

          .impact-cell-head {
            grid-column: 1;
            grid-row: 1 / 4;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.65rem;
            margin-bottom: 0;
          }

          .impact-cell-kicker {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            font-size: 0.52rem;
          }

          .impact-cell-value {
            grid-column: 2;
            grid-row: 1;
            margin-bottom: 0.15rem;
            font-size: 1.85rem;
          }

          .impact-cell-label {
            grid-column: 2;
            grid-row: 2;
          }

          .impact-cell-sub {
            grid-column: 2;
            grid-row: 3;
          }

          .impact-cell-bar {
            left: 0;
            right: auto;
            top: 14%;
            bottom: 14%;
            width: 3px;
            height: auto;
            border-radius: 0 4px 4px 0;
            background: linear-gradient(180deg, var(--impact-accent), transparent);
          }
        }
      `}</style>
    </section>
  )
}
