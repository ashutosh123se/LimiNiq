'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Globe2,
  LineChart,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { LeadCTASection } from '@/components/sections/home/LeadCTASection'
import {
  ABOUT_MILESTONES,
  ABOUT_STATS,
  ABOUT_VALUES,
  TEAM,
} from '@/lib/data/about'

const VALUE_ICONS: Record<(typeof ABOUT_VALUES)[number]['icon'], LucideIcon> = {
  code: Code2,
  chart: LineChart,
  users: Users,
  globe: Globe2,
}

export function AboutPageView() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-glow about-hero-glow--a" />
        <div className="about-hero-glow about-hero-glow--b" />
        <div className="about-hero-grid-bg" aria-hidden />
        <span className="about-hero-watermark" aria-hidden>ABT</span>

        <div className="section-container about-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="about-hero-copy"
          >
            <div className="about-hero-eyebrow">
              <span className="about-hero-index">01 / Studio</span>
              <div className="pill-badge shimmer">
                <Sparkles size={12} />
                Our story
              </div>
            </div>

            <h1 className="about-hero-title">
              Building <span className="about-hero-muted">globally.</span>
              <br />
              <span className="text-gradient">From India.</span>
            </h1>

            <p className="about-hero-lede">
              We&apos;re a collective of engineers, designers, and growth strategists partnering with ambitious brands to build scalable digital engines — software first, marketing backed by data.
            </p>

            <div className="about-hero-actions">
              <Link href="/contact" className="btn-primary">
                Work with us
                <ArrowRight size={16} />
              </Link>
              <a href="#team" className="btn-secondary">
                Meet the team
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="about-hero-panel glass-card-premium"
          >
            <span className="about-panel-kicker">Mission snapshot</span>
            <p className="about-panel-quote">
              Most agencies treat websites as brochures and marketing as guesswork.{' '}
              <em>We engineer revenue systems.</em>
            </p>
            <div className="about-panel-tags">
              <span>Custom software</span>
              <span>SEO & SEM</span>
              <span>Performance ads</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="section-container">
          <div className="about-stats-board">
            {ABOUT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="about-stat glass-card"
                style={{ '--stat-accent': stat.accent } as React.CSSProperties}
              >
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section-padding about-manifesto">
        <div className="section-container">
          <div className="about-manifesto-panel glass-card-premium">
            <span className="about-section-kicker">What we believe</span>
            <blockquote className="about-manifesto-text">
              Your digital presence shouldn&apos;t be a static brochure — it should be a{' '}
              <span className="text-gradient">high-performance engine</span> that actively drives revenue, retention, and measurable growth.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values bento */}
      <section className="section-padding about-values">
        <div className="section-container">
          <div className="about-section-head">
            <span className="about-section-kicker">Our DNA</span>
            <h2 className="section-h2">
              Principles we <span className="text-gradient">never compromise</span>
            </h2>
          </div>

          <div className="about-values-grid">
            {ABOUT_VALUES.map((val, i) => {
              const Icon = VALUE_ICONS[val.icon]
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className={`about-value glass-card ${i === 0 ? 'about-value--lead' : ''}`}
                  style={{ '--val-color': val.color } as React.CSSProperties}
                >
                  <div className="about-value-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{val.title}</h3>
                  <p>{val.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding about-timeline">
        <div className="section-container">
          <div className="about-section-head">
            <span className="about-section-kicker">Our journey</span>
            <h2 className="section-h2">How we got here</h2>
          </div>

          <div className="about-timeline-board glass-card-premium">
            <div className="about-timeline-head">
              <span>liminiq — studio.log</span>
              <span className="about-timeline-live">
                <span className="about-timeline-dot" />
                since 2019
              </span>
            </div>
            <div className="about-timeline-track">
              {ABOUT_MILESTONES.map((m, i) => (
                <div key={m.year} className="about-milestone">
                  <div className="about-milestone-marker">
                    <span>{m.year}</span>
                    {i < ABOUT_MILESTONES.length - 1 && <div className="about-milestone-line" />}
                  </div>
                  <div className="about-milestone-body">
                    <h3>{m.title}</h3>
                    <p>{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding about-team">
        <div className="section-container">
          <div className="about-section-head about-section-head--center">
            <span className="about-section-kicker">Leadership</span>
            <h2 className="section-h2">
              The people <span className="text-gradient">behind the work</span>
            </h2>
            <p className="about-team-sub">
              Engineers, strategists, and creatives — one team, one delivery standard.
            </p>
          </div>

          <div className="about-team-grid">
            {TEAM.map((member, i) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="about-member glass-card-premium"
                style={{ '--member-color': member.color } as React.CSSProperties}
              >
                <div className="about-member-glow" />
                <div className="about-member-avatar">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="about-member-meta">
                  <h3>{member.name}</h3>
                  <span className="about-member-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <LeadCTASection />

      <style>{`
        .about-page {
          padding-top: 5rem;
          background: var(--bg-primary);
          overflow-x: clip;
        }

        /* Hero */
        .about-hero {
          position: relative;
          padding: clamp(3rem, 7vw, 5.5rem) 0 clamp(2rem, 4vw, 3rem);
          overflow: hidden;
        }
        .about-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .about-hero-glow--a {
          width: 460px; height: 460px;
          top: -100px; left: -60px;
          background: rgba(59, 91, 255, 0.16);
        }
        .about-hero-glow--b {
          width: 340px; height: 340px;
          bottom: -60px; right: 8%;
          background: rgba(0, 200, 160, 0.1);
        }
        .about-hero-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.22;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 75% 65% at 35% 25%, black, transparent);
        }
        .about-hero-watermark {
          position: absolute;
          top: 10%;
          right: 4%;
          font-family: var(--font-heading);
          font-size: clamp(5rem, 16vw, 11rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(59, 91, 255, 0.07);
          pointer-events: none;
          user-select: none;
        }
        .about-hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }
        .about-hero-eyebrow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .about-hero-index {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-teal);
        }
        .about-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 6vw, 3.75rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin: 0 0 1.25rem;
        }
        .about-hero-muted { color: var(--text-secondary); }
        .about-hero-lede {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 34rem;
          margin: 0 0 1.75rem;
        }
        .about-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .about-hero-panel {
          padding: 1.75rem;
          border-color: rgba(59, 91, 255, 0.18) !important;
        }
        .about-panel-kicker {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 0.85rem;
        }
        .about-panel-quote {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.55;
          color: var(--text-primary);
          margin: 0 0 1.25rem;
        }
        .about-panel-quote em {
          font-style: normal;
          color: var(--accent-teal);
        }
        .about-panel-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .about-panel-tags span {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.35rem 0.65rem;
          border-radius: 100px;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* Stats */
        .about-stats { padding: 0 0 1rem; }
        .about-stats-board {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.65rem;
        }
        .about-stat {
          padding: 1.25rem 1.15rem;
          border-radius: 16px;
          border-color: color-mix(in srgb, var(--stat-accent) 18%, rgba(255,255,255,0.07)) !important;
        }
        .about-stat-value {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }
        .about-stat-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        /* Shared */
        .about-section-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-teal);
          margin-bottom: 0.65rem;
        }
        .about-section-head { margin-bottom: 2rem; }
        .about-section-head--center {
          text-align: center;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }
        .about-section-head h2 { margin: 0; }

        /* Manifesto */
        .about-manifesto-panel {
          padding: clamp(2rem, 4vw, 3rem);
          text-align: center;
          border-color: rgba(59, 91, 255, 0.15) !important;
          background: linear-gradient(160deg, rgba(59,91,255,0.06), rgba(255,255,255,0.02)) !important;
        }
        .about-manifesto-text {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 3vw, 2rem);
          font-weight: 700;
          line-height: 1.45;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
          max-width: 52rem;
          margin-inline: auto;
        }

        /* Values */
        .about-values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        .about-value {
          padding: 1.5rem;
          border-radius: 18px;
          border-color: color-mix(in srgb, var(--val-color) 18%, rgba(255,255,255,0.07));
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .about-value:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--val-color) 35%, rgba(255,255,255,0.08));
        }
        .about-value-icon {
          width: 46px; height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--val-color);
          background: color-mix(in srgb, var(--val-color) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--val-color) 28%, transparent);
        }
        .about-value h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .about-value p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        /* Timeline */
        .about-timeline-board {
          padding: 1.35rem;
          border-color: rgba(59, 91, 255, 0.12) !important;
        }
        .about-timeline-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1.15rem;
          margin-bottom: 1.15rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-tertiary);
        }
        .about-timeline-live {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--accent-teal);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .about-timeline-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 8px var(--accent-teal);
        }
        .about-timeline-track {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .about-milestone {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1rem;
        }
        .about-milestone-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .about-milestone-marker span {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-primary);
          padding: 0.35rem 0.55rem;
          border-radius: 8px;
          background: rgba(59, 91, 255, 0.1);
          border: 1px solid rgba(59, 91, 255, 0.2);
          white-space: nowrap;
        }
        .about-milestone-line {
          flex: 1;
          width: 2px;
          min-height: 1.25rem;
          margin: 0.35rem 0;
          background: linear-gradient(180deg, var(--accent-primary), transparent);
          opacity: 0.35;
        }
        .about-milestone-body {
          padding-bottom: 1.35rem;
        }
        .about-milestone-body h3 {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.3rem;
        }
        .about-milestone-body p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
        }

        /* Team */
        .about-team-sub {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0.75rem 0 0;
        }
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .about-member {
          position: relative;
          overflow: hidden;
          padding: 1.25rem;
          border-radius: 20px;
          border-color: color-mix(in srgb, var(--member-color) 20%, rgba(255,255,255,0.08)) !important;
          transition: box-shadow 0.25s ease;
        }
        .about-member-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--member-color) 18%, transparent), transparent 65%);
        }
        .about-member-avatar {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1rem;
          border: 2px solid color-mix(in srgb, var(--member-color) 40%, transparent);
          box-shadow: 0 0 20px color-mix(in srgb, var(--member-color) 25%, transparent);
        }
        .about-member-meta {
          position: relative;
          z-index: 1;
        }
        .about-member-meta h3 {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.2rem;
        }
        .about-member-role {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--member-color);
          margin-bottom: 0.5rem;
        }
        .about-member-meta p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
        }

        @media (min-width: 768px) {
          .about-stats-board { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .about-values-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .about-value--lead { grid-column: span 2; }
        }

        @media (min-width: 900px) {
          .about-hero-inner { grid-template-columns: 1.15fr 0.85fr; gap: 3rem; }
          .about-team-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .about-timeline-track {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.75rem;
          }
          .about-milestone { grid-template-columns: 1fr; }
          .about-milestone-marker { flex-direction: row; width: 100%; align-items: center; }
          .about-milestone-line {
            flex: 1;
            height: 2px;
            min-height: auto;
            width: auto;
            margin: 0 0.35rem;
            background: linear-gradient(90deg, var(--accent-primary), transparent);
          }
          .about-milestone-body { padding: 0.65rem 0 0; }
        }

        @media (max-width: 560px) {
          .about-value--lead { grid-column: span 1; }
          .about-team-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
