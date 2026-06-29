"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Zap,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const SERVICES = [
  "Website Development",
  "SEO",
  "Digital Marketing",
  "Full-Stack Suite",
];

const SESSION_STEPS = [
  { step: "01", title: "Discovery call", detail: "15-minute fit & goals review" },
  { step: "02", title: "Site audit", detail: "Performance, SEO & UX snapshot" },
  { step: "03", title: "Growth roadmap", detail: "Prioritized action plan for you" },
];

export function LeadCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", service: "" });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: [form.service] }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section ref={ref} className="briefing-section">
      <div className="briefing-glow briefing-glow--left" />
      <div className="briefing-glow briefing-glow--right" />
      <div className="briefing-grid-bg" aria-hidden />

      <div className="section-container briefing-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="briefing-panel glass-card-premium"
        >
          <div className="briefing-copy">
            <div className="pill-badge shimmer briefing-badge">
              <Sparkles size={12} style={{ color: "var(--accent-teal)" }} />
              Free Consultation
            </div>

            <h2 className="section-h2 briefing-title">
              Ready to Grow?
              <span className="text-gradient"> Let&apos;s Talk.</span>
            </h2>

            <p className="briefing-desc">
              Book a free audit and strategy session. We&apos;ll review your site, identify quick wins, and map a path to measurable growth — no pitch deck, no pressure.
            </p>

            <ul className="briefing-steps">
              {SESSION_STEPS.map((item, i) => (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <span className="briefing-step-num">{item.step}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.detail}</em>
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="briefing-trust">
              <span><Lock size={13} /> No spam</span>
              <span><Zap size={13} /> Reply within 24h</span>
              <span><Star size={13} /> 150+ clients</span>
            </div>
          </div>

          <div className="briefing-form-wrap">
            <div className="briefing-form-head">
              <span className="briefing-form-kicker">Session Request</span>
              <span className="briefing-form-status">
                <span className="briefing-form-live" />
                Open slots
              </span>
            </div>

            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="briefing-success"
                >
                  <CheckCircle2 size={40} style={{ color: "var(--accent-teal)", marginBottom: "0.75rem" }} />
                  <h3>We&apos;ll reach out within 24 hours!</h3>
                  <p>Check your inbox for a confirmation from hello@liminiq.com</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="briefing-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label className="briefing-field">
                    <span>Your name</span>
                    <input
                      type="text"
                      placeholder="Ashutosh Shekhar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </label>

                  <label className="briefing-field">
                    <span>Email address</span>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </label>

                  <label className="briefing-field briefing-field--full">
                    <span>Service interest</span>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      required
                    >
                      <option value="" disabled>Select a service line</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="btn-primary briefing-submit"
                  >
                    {state === "loading" ? (
                      <span className="briefing-loading">
                        <span className="briefing-spinner" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Get Free Audit
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  {state === "error" && (
                    <p className="briefing-error">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <span className="briefing-watermark" aria-hidden>GO</span>
        </motion.div>
      </div>

      <style>{`
        .briefing-section {
          position: relative;
          overflow: hidden;
          padding: clamp(4rem, 7vw, 6rem) 0;
          background: linear-gradient(165deg, #080b14 0%, #0f1230 45%, #0a1520 100%);
        }

        .briefing-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }

        .briefing-glow--left {
          width: 420px;
          height: 420px;
          top: -80px;
          left: -120px;
          background: rgba(59, 91, 255, 0.14);
        }

        .briefing-glow--right {
          width: 380px;
          height: 380px;
          bottom: -60px;
          right: -100px;
          background: rgba(0, 200, 160, 0.1);
        }

        .briefing-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.25;
          background-image: radial-gradient(rgba(59, 91, 255, 0.2) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent);
        }

        .briefing-inner {
          position: relative;
          z-index: 1;
        }

        .briefing-panel {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 0;
          border-radius: 26px;
          padding: 0;
        }

        .briefing-watermark {
          position: absolute;
          right: 2%;
          bottom: -8%;
          font-family: var(--font-heading);
          font-size: clamp(6rem, 14vw, 10rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.06em;
          color: rgba(255, 255, 255, 0.025);
          pointer-events: none;
          user-select: none;
        }

        .briefing-copy {
          padding: clamp(1.75rem, 4vw, 2.75rem);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          z-index: 1;
        }

        .briefing-badge {
          margin-bottom: 1rem;
          display: inline-flex;
          gap: 0.4rem;
        }

        .briefing-title {
          margin-bottom: 0.75rem !important;
          font-size: clamp(1.75rem, 3.5vw, 2.6rem) !important;
          text-align: left;
        }

        .briefing-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 1.5rem;
          max-width: 28rem;
        }

        .briefing-steps {
          list-style: none;
          margin: 0 0 1.5rem;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .briefing-steps li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .briefing-step-num {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-teal);
          padding-top: 0.15rem;
          flex-shrink: 0;
        }

        .briefing-steps strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.1rem;
        }

        .briefing-steps em {
          display: block;
          font-style: normal;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .briefing-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem 1rem;
        }

        .briefing-trust span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-tertiary);
        }

        .briefing-form-wrap {
          padding: clamp(1.75rem, 4vw, 2.75rem);
          background: rgba(0, 0, 0, 0.22);
          position: relative;
          z-index: 1;
        }

        .briefing-form-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .briefing-form-kicker {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-violet);
        }

        .briefing-form-status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .briefing-form-live {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 8px var(--accent-teal);
          animation: briefingPulse 2s ease infinite;
        }

        .briefing-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .briefing-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .briefing-field--full {
          grid-column: 1 / -1;
        }

        .briefing-field span {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .briefing-field input,
        .briefing-field select {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.8rem 0.95rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
        }

        .briefing-field input:focus,
        .briefing-field select:focus {
          border-color: rgba(59, 91, 255, 0.45);
          background: rgba(255, 255, 255, 0.07);
        }

        .briefing-field select {
          cursor: pointer;
          color: var(--text-primary);
        }

        .briefing-field select:invalid {
          color: var(--text-tertiary);
        }

        .briefing-field option {
          background: #0a0f2c;
          color: white;
        }

        .briefing-submit {
          grid-column: 1 / -1;
          justify-content: center;
          padding: 0.95rem 1.25rem;
          font-size: 0.95rem;
          gap: 0.5rem;
        }

        .briefing-loading {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .briefing-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: briefingSpin 0.8s linear infinite;
        }

        .briefing-error {
          grid-column: 1 / -1;
          color: #f87171;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          margin: 0;
        }

        .briefing-success {
          text-align: center;
          padding: 1.5rem 1rem;
          background: rgba(0, 200, 160, 0.08);
          border: 1px solid rgba(0, 200, 160, 0.2);
          border-radius: 16px;
        }

        .briefing-success h3 {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.4rem;
          font-size: 1.05rem;
        }

        .briefing-success p {
          font-family: var(--font-body);
          color: var(--text-secondary);
          font-size: 0.88rem;
          margin: 0;
        }

        @keyframes briefingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        @keyframes briefingSpin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 860px) {
          .briefing-panel {
            grid-template-columns: 1fr;
          }

          .briefing-copy {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .briefing-title {
            text-align: left;
          }
        }

        @media (max-width: 520px) {
          .briefing-form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
