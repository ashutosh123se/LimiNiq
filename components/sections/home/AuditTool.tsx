"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Zap,
  Search,
  Smartphone,
  Lock,
  UserCheck,
  Loader2,
  ArrowRight,
  ScanSearch,
  CheckCircle2,
  RotateCcw,
  Mail,
} from "lucide-react";

const MOCK_SCORES = [
  { label: "Performance", icon: Zap, description: "Page load & Core Web Vitals", accent: "#3B5BFF" },
  { label: "SEO", icon: Search, description: "Meta, structure & indexability", accent: "#00C8A0" },
  { label: "Mobile UX", icon: Smartphone, description: "Responsiveness & touch targets", accent: "#7B61FF" },
  { label: "Security", icon: Lock, description: "HTTPS, headers & vulnerabilities", accent: "#0EA5E9" },
  { label: "Accessibility", icon: UserCheck, description: "WCAG compliance & ARIA", accent: "#F59E0B" },
];

const CHECKING_MESSAGES = [
  "Checking page speed...",
  "Analysing SEO signals...",
  "Testing mobile experience...",
  "Scanning security headers...",
  "Evaluating accessibility...",
  "Generating your report...",
];

function generateMockScore() {
  return Math.floor(Math.random() * 30) + 55;
}

function getScoreColor(score: number) {
  if (score >= 80) return "var(--accent-primary)";
  if (score >= 60) return "var(--accent-warning)";
  return "#f87171";
}

function getOverallGrade(score: number) {
  if (score >= 80) return "Strong";
  if (score >= 65) return "Needs work";
  return "Critical gaps";
}

export function AuditTool() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [scores, setScores] = useState<number[]>([]);
  const [currentCheck, setCurrentCheck] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const overallScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    setUrl(normalized);
    setPhase("scanning");
    setCurrentCheck(0);

    for (let i = 0; i < CHECKING_MESSAGES.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setCurrentCheck(i + 1);
    }

    setScores(MOCK_SCORES.map(() => generateMockScore()));
    setPhase("done");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: url }),
      });
    } catch {}
    setEmailSent(true);
  };

  const resetAudit = () => {
    setPhase("idle");
    setUrl("");
    setScores([]);
    setEmailSent(false);
    setEmail("");
    setCurrentCheck(0);
  };

  return (
    <section ref={ref} className="audit-section section-padding">
      <div className="audit-glow audit-glow--left" />
      <div className="audit-glow audit-glow--right" />
      <div className="audit-grid-bg" aria-hidden />

      <div className="section-container audit-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="audit-header"
        >
          <div className="pill-badge shimmer audit-badge">
            <ScanSearch size={12} style={{ color: "var(--accent-teal)" }} />
            Free Tool
          </div>
          <h2 className="section-h2 audit-title">
            Instant Website <span className="text-gradient">Audit</span>
          </h2>
          <p className="audit-sub">
            Drop your URL and get a live snapshot across five dimensions — performance, SEO, mobile, security, and accessibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="audit-console glass-card-premium"
        >
          <div className="audit-console-bar">
            <div className="audit-console-dots">
              <span /><span /><span />
            </div>
            <span className="audit-console-title">LIMINIQ Site Scanner</span>
            <span className="audit-console-status">
              <span className={`audit-live-dot audit-live-dot--${phase}`} />
              {phase === "idle" && "Ready"}
              {phase === "scanning" && "Scanning"}
              {phase === "done" && "Complete"}
            </span>
          </div>

          <div className="audit-console-body">
            <div className="audit-dimensions">
              <span className="audit-dimensions-label">Scan dimensions</span>
              <ul className="audit-dim-list">
                {MOCK_SCORES.map((check) => {
                  const Icon = check.icon;
                  return (
                    <li key={check.label} style={{ "--dim-accent": check.accent } as React.CSSProperties}>
                      <span className="audit-dim-icon">
                        <Icon size={14} strokeWidth={1.6} />
                      </span>
                      <span>
                        <strong>{check.label}</strong>
                        <em>{check.description}</em>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="audit-workspace">
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.form
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={runAudit}
                    className="audit-form"
                  >
                    <label className="audit-url-label" htmlFor="audit-url">
                      Website URL
                    </label>
                    <div className="audit-url-row">
                      <div className="audit-url-wrap">
                        <span className="audit-url-prefix">https://</span>
                        <input
                          id="audit-url"
                          type="text"
                          inputMode="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="yourwebsite.com"
                          required
                          className="audit-url-input"
                        />
                      </div>
                      <button type="submit" className="btn-primary audit-submit">
                        Start Audit
                        <ArrowRight size={18} />
                      </button>
                    </div>
                    <p className="audit-form-note">No signup required · Results in seconds</p>
                  </motion.form>
                )}

                {phase === "scanning" && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="audit-scanning"
                  >
                    <div className="audit-scan-head">
                      <div className="audit-scan-ring">
                        <Loader2 size={22} className="audit-spin" />
                      </div>
                      <div>
                        <span className="audit-scan-target">{url}</span>
                        <span className="audit-scan-progress">
                          Step {Math.min(currentCheck, CHECKING_MESSAGES.length)} of {CHECKING_MESSAGES.length}
                        </span>
                      </div>
                    </div>

                    <div className="audit-progress-track">
                      <motion.div
                        className="audit-progress-fill"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `${(currentCheck / CHECKING_MESSAGES.length) * 100}%`,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>

                    <ul className="audit-checklist">
                      {CHECKING_MESSAGES.map((msg, i) => {
                        const done = i < currentCheck;
                        const active = i === currentCheck && currentCheck < CHECKING_MESSAGES.length;
                        return (
                          <motion.li
                            key={msg}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: done || active ? 1 : 0.35, x: 0 }}
                            className={`audit-check-item ${done ? "audit-check-item--done" : ""} ${active ? "audit-check-item--active" : ""}`}
                          >
                            {done ? (
                              <CheckCircle2 size={15} />
                            ) : active ? (
                              <Loader2 size={15} className="audit-spin" />
                            ) : (
                              <span className="audit-check-pending" />
                            )}
                            {msg}
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}

                {phase === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="audit-results"
                  >
                    <div className="audit-results-head">
                      <div
                        className="audit-score-ring"
                        style={{ "--score-color": getScoreColor(overallScore) } as React.CSSProperties}
                      >
                        <svg viewBox="0 0 100 100" className="audit-score-svg">
                          <circle cx="50" cy="50" r="42" className="audit-score-bg" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="42"
                            className="audit-score-fill"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: overallScore / 100 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="audit-score-center">
                          <span className="audit-score-num">{overallScore}</span>
                          <span className="audit-score-of">/100</span>
                        </div>
                      </div>

                      <div className="audit-results-meta">
                        <span className="audit-results-url">{url}</span>
                        <span className="audit-results-grade">{getOverallGrade(overallScore)} baseline</span>
                        <p>Your site has room to improve. Unlock the full 47-point audit for actionable fixes.</p>
                      </div>
                    </div>

                    <div className="audit-score-grid">
                      {MOCK_SCORES.map((check, i) => {
                        const score = scores[i] || 0;
                        const Icon = check.icon;
                        return (
                          <div
                            key={check.label}
                            className="audit-score-card"
                            style={{ "--score-accent": check.accent } as React.CSSProperties}
                          >
                            <div className="audit-score-card-top">
                              <span className="audit-score-card-icon">
                                <Icon size={14} strokeWidth={1.6} />
                              </span>
                              <span className="audit-score-card-label">{check.label}</span>
                              <span className="audit-score-card-value" style={{ color: getScoreColor(score) }}>
                                {score}
                              </span>
                            </div>
                            <div className="audit-score-card-bar">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: "easeOut" }}
                                style={{ background: getScoreColor(score) }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="audit-report-box">
                      {!emailSent ? (
                        <form onSubmit={handleEmailSubmit} className="audit-report-form">
                          <div className="audit-report-copy">
                            <Mail size={18} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                            <p>Get the <strong>full 47-point audit</strong> with prioritized recommendations in your inbox.</p>
                          </div>
                          <div className="audit-report-row">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@company.com"
                              required
                              className="audit-report-input"
                            />
                            <button type="submit" className="btn-primary audit-report-btn">
                              Send Full Report
                            </button>
                          </div>
                        </form>
                      ) : (
                        <p className="audit-report-sent">
                          <CheckCircle2 size={16} style={{ color: "var(--accent-teal)" }} />
                          Report is on its way to your inbox.
                        </p>
                      )}
                    </div>

                    <button type="button" onClick={resetAudit} className="audit-reset">
                      <RotateCcw size={14} />
                      Audit another website
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .audit-section {
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .audit-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }

        .audit-glow--left {
          width: 420px;
          height: 420px;
          top: 10%;
          left: -120px;
          background: rgba(59, 91, 255, 0.12);
        }

        .audit-glow--right {
          width: 360px;
          height: 360px;
          bottom: 0;
          right: -100px;
          background: rgba(0, 200, 160, 0.08);
        }

        .audit-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.28;
          background-image: radial-gradient(rgba(59, 91, 255, 0.18) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 75% 65% at 50% 40%, black, transparent);
        }

        .audit-inner {
          position: relative;
          z-index: 1;
        }

        .audit-header {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 2rem;
        }

        .audit-badge {
          margin-bottom: 0.85rem;
          display: inline-flex;
          gap: 0.4rem;
        }

        .audit-title {
          margin-bottom: 0.65rem !important;
        }

        .audit-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        .audit-console {
          max-width: 920px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 22px;
          padding: 0;
        }

        .audit-console-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1.1rem;
          background: rgba(0, 0, 0, 0.35);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .audit-console-dots {
          display: flex;
          gap: 5px;
        }

        .audit-console-dots span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
        }

        .audit-console-dots span:first-child { background: rgba(255, 90, 90, 0.55); }
        .audit-console-dots span:nth-child(2) { background: rgba(255, 190, 60, 0.55); }
        .audit-console-dots span:nth-child(3) { background: rgba(80, 210, 120, 0.55); }

        .audit-console-title {
          flex: 1;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--text-tertiary);
        }

        .audit-console-status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .audit-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-tertiary);
        }

        .audit-live-dot--idle {
          background: var(--accent-teal);
          box-shadow: 0 0 8px var(--accent-teal);
        }

        .audit-live-dot--scanning {
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-primary);
          animation: auditPulse 1.2s ease infinite;
        }

        .audit-live-dot--done {
          background: var(--accent-teal);
        }

        .audit-console-body {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.25fr);
        }

        .audit-dimensions {
          padding: 1.35rem 1.25rem;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.15);
        }

        .audit-dimensions-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.85rem;
        }

        .audit-dim-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .audit-dim-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        .audit-dim-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid color-mix(in srgb, var(--dim-accent) 35%, transparent);
          background: color-mix(in srgb, var(--dim-accent) 12%, transparent);
          color: var(--dim-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .audit-dim-list strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.05rem;
        }

        .audit-dim-list em {
          display: block;
          font-style: normal;
          font-size: 0.66rem;
          color: var(--text-tertiary);
          line-height: 1.4;
        }

        .audit-workspace {
          padding: 1.5rem 1.35rem;
          min-height: 320px;
          display: flex;
          align-items: center;
        }

        .audit-form {
          width: 100%;
        }

        .audit-url-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.5rem;
        }

        .audit-url-row {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .audit-url-wrap {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s ease;
        }

        .audit-url-wrap:focus-within {
          border-color: rgba(59, 91, 255, 0.45);
        }

        .audit-url-prefix {
          padding: 0.85rem 0 0.85rem 1rem;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--text-tertiary);
          flex-shrink: 0;
        }

        .audit-url-input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          padding: 0.85rem 1rem 0.85rem 0;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
        }

        .audit-url-input::placeholder {
          color: var(--text-tertiary);
        }

        .audit-submit {
          justify-content: center;
          gap: 0.45rem;
          padding: 0.9rem 1.25rem;
        }

        .audit-form-note {
          margin: 0.75rem 0 0;
          font-size: 0.72rem;
          color: var(--text-tertiary);
        }

        .audit-scanning,
        .audit-results {
          width: 100%;
        }

        .audit-scan-head {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1rem;
        }

        .audit-scan-ring {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(59, 91, 255, 0.35);
          background: rgba(59, 91, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .audit-scan-target {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-primary);
          word-break: break-all;
          margin-bottom: 0.15rem;
        }

        .audit-scan-progress {
          font-size: 0.68rem;
          color: var(--text-tertiary);
        }

        .audit-progress-track {
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.06);
          margin-bottom: 1.1rem;
          overflow: hidden;
        }

        .audit-progress-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-teal));
        }

        .audit-checklist {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .audit-check-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .audit-check-item--done {
          color: var(--text-primary);
        }

        .audit-check-item--done svg {
          color: var(--accent-teal);
        }

        .audit-check-item--active {
          color: var(--text-primary);
        }

        .audit-check-item--active svg {
          color: var(--accent-primary);
        }

        .audit-check-pending {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .audit-results-head {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .audit-score-ring {
          position: relative;
          width: 88px;
          height: 88px;
          flex-shrink: 0;
        }

        .audit-score-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .audit-score-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.08);
          stroke-width: 6;
        }

        .audit-score-fill {
          fill: none;
          stroke: var(--score-color);
          stroke-width: 6;
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
        }

        .audit-score-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .audit-score-num {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .audit-score-of {
          font-size: 0.58rem;
          color: var(--text-tertiary);
        }

        .audit-results-meta {
          min-width: 0;
        }

        .audit-results-url {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-primary);
          word-break: break-all;
          margin-bottom: 0.2rem;
        }

        .audit-results-grade {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent-teal);
          margin-bottom: 0.35rem;
        }

        .audit-results-meta p {
          margin: 0;
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .audit-score-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.55rem;
          margin-bottom: 1rem;
        }

        .audit-score-card {
          padding: 0.65rem 0.75rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .audit-score-card-top {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.45rem;
        }

        .audit-score-card-icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--score-accent);
          background: color-mix(in srgb, var(--score-accent) 12%, transparent);
        }

        .audit-score-card-label {
          flex: 1;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .audit-score-card-value {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .audit-score-card-bar {
          height: 3px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .audit-score-card-bar div {
          height: 100%;
          border-radius: 3px;
        }

        .audit-report-box {
          padding: 0.9rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          margin-bottom: 0.85rem;
        }

        .audit-report-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .audit-report-copy {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        .audit-report-copy p {
          margin: 0;
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .audit-report-row {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .audit-report-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 0.75rem 0.9rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.88rem;
          outline: none;
        }

        .audit-report-input:focus {
          border-color: rgba(59, 91, 255, 0.4);
        }

        .audit-report-btn {
          justify-content: center;
          padding: 0.75rem 1rem;
          font-size: 0.88rem;
        }

        .audit-report-sent {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .audit-reset {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-tertiary);
          padding: 0;
          transition: color 0.2s ease;
        }

        .audit-reset:hover {
          color: var(--text-secondary);
        }

        .audit-spin {
          animation: auditSpin 1s linear infinite;
        }

        @keyframes auditSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes auditPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (min-width: 640px) {
          .audit-url-row {
            flex-direction: row;
            align-items: stretch;
          }

          .audit-url-wrap {
            flex: 1;
          }

          .audit-submit {
            flex-shrink: 0;
          }

          .audit-report-row {
            flex-direction: row;
          }

          .audit-report-input {
            flex: 1;
          }

          .audit-report-btn {
            flex-shrink: 0;
          }
        }

        @media (max-width: 760px) {
          .audit-console-body {
            grid-template-columns: 1fr;
          }

          .audit-dimensions {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            padding: 1rem 1.1rem;
          }

          .audit-dim-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .audit-workspace {
            min-height: 280px;
            padding: 1.15rem 1.1rem;
          }

          .audit-results-head {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .audit-dim-list {
            grid-template-columns: 1fr;
          }

          .audit-score-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
