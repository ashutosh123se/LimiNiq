"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Zap, Search, Smartphone, Lock, UserCheck, Loader2 } from "lucide-react";

const MOCK_SCORES = [
  { label: "Performance", icon: <Zap size={16} strokeWidth={1.5} />, description: "Page load & Core Web Vitals" },
  { label: "SEO", icon: <Search size={16} strokeWidth={1.5} />, description: "Meta, structure & indexability" },
  { label: "Mobile UX", icon: <Smartphone size={16} strokeWidth={1.5} />, description: "Responsiveness & touch targets" },
  { label: "Security", icon: <Lock size={16} strokeWidth={1.5} />, description: "HTTPS, headers & vulnerabilities" },
  { label: "Accessibility", icon: <UserCheck size={16} strokeWidth={1.5} />, description: "WCAG compliance & ARIA" },
];

function generateMockScore() {
  return Math.floor(Math.random() * 30) + 55; // 55–85 to encourage improvement
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

  const CHECKING_MESSAGES = [
    "Checking page speed...",
    "Analysing SEO signals...",
    "Testing mobile experience...",
    "Scanning security headers...",
    "Evaluating accessibility...",
    "Generating your report...",
  ];

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
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

  const getScoreColor = (s: number) => {
    if (s >= 80) return "var(--accent-primary)";
    if (s >= 60) return "var(--accent-warning)";
    return "var(--text-tertiary)";
  };

  return (
    <section ref={ref} className="section-padding" style={{ position: "relative" }}>
      <div className="section-container" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}
        >
          <span className="text-label" style={{ display: "block", marginBottom: "1rem" }}>Free Tool</span>
          <h2 className="text-section" style={{ marginBottom: "1rem" }}>
            Instant Website Audit
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "3rem" }}>
            Enter your website URL and get an instant performance snapshot across 5 key dimensions — no signup required.
          </p>

          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.form
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={runAudit}
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", maxWidth: 480, margin: "0 auto" }}
              >
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  required
                  className="form-input"
                  style={{ flex: 1, minWidth: 260 }}
                />
                <button type="submit" className="btn-primary" style={{ marginTop: "1rem", width: "100%" }}>
                  Start Audit
                </button>
              </motion.form>
            )}

            {phase === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card"
                style={{ padding: "2.5rem", maxWidth: 480, margin: "0 auto", textAlign: "left" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {CHECKING_MESSAGES.slice(0, currentCheck).map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                    >
                      <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)" }}>
                        <Zap size={14} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>{msg}</span>
                    </motion.div>
                  ))}
                  {currentCheck < CHECKING_MESSAGES.length && (
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                      <Loader2 size={16} className="spin-animation" style={{ color: "var(--accent-primary)" }} />
                      <span style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
                        {CHECKING_MESSAGES[currentCheck]}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {phase === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: "2.5rem", maxWidth: 540, margin: "0 auto", textAlign: "left" }}
              >
                <div className="text-label" style={{ marginBottom: "2rem" }}>
                  Audit results for: <span style={{ color: "var(--text-primary)" }}>{url}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                  {MOCK_SCORES.map((check, i) => {
                    const score = scores[i] || 0;
                    return (
                      <div key={check.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ color: "var(--text-primary)" }}>{check.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500 }}>{check.label}</span>
                            <span className="text-mono" style={{ color: getScoreColor(score) }}>{score}/100</span>
                          </div>
                          <div style={{ height: 4, background: "var(--border-subtle)", borderRadius: 4 }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                              style={{ height: "100%", borderRadius: 4, background: getScoreColor(score) }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)", borderRadius: 8, marginBottom: "1.5rem" }}>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    Get the <strong>full 47-point audit</strong> with actionable recommendations sent to your inbox.
                  </p>
                  {!emailSent ? (
                    <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="form-input"
                      />
                      <button type="submit" className="btn-primary" style={{ width: "100%" }}>Send Full Report</button>
                    </form>
                  ) : (
                    <p style={{ color: "var(--text-primary)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Zap size={14} /> Report is on its way to your inbox.
                    </p>
                  )}
                </div>

                <button
                  onClick={() => { setPhase("idle"); setUrl(""); setScores([]); setEmailSent(false); }}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", color: "var(--text-tertiary)", display: "block", margin: "0 auto" }}
                >
                  Audit another website
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
}
