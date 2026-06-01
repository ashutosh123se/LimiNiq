"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SERVICES = ["Website Development", "SEO", "Digital Marketing", "Full-Stack Suite"];

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
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0",
        background: "linear-gradient(135deg, #0A0F2C 0%, #1a1440 50%, #0A1F2C 100%)",
      }}
    >
      {/* Background effects */}

      <div className="section-container" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="glass-card-dark"
          style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2.5rem", textAlign: "center" }}
        >
          {/* Heading */}
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: "var(--accent-teal)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
            ✦ Free Consultation
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "white", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Ready to Grow? Let&apos;s Talk.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 2.5rem" }}>
            Get a free website audit + growth strategy session — completely free, no strings attached.
          </p>

          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: "1.5rem", background: "rgba(0,200,160,0.12)", border: "1px solid rgba(0,200,160,0.25)", borderRadius: 16 }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  We&apos;ll reach out within 24 hours!
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                  Check your inbox for a confirmation email from hello@liminiq.com
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "0.75rem",
                }}
                className="cta-form"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "14px 18px",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "14px 18px",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                />
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  required
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "14px 18px",
                    color: form.service ? "white" : "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled>Service Interest</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} style={{ background: "#0A0F2C", color: "white" }}>{s}</option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-primary"
                  style={{ justifyContent: "center", padding: "16px", fontSize: "1rem" }}
                >
                  {state === "loading" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                      Sending...
                    </span>
                  ) : "Get Free Audit →"}
                </button>

                {state === "error" && (
                  <p style={{ color: "#f87171", fontFamily: "var(--font-heading)", fontSize: "0.85rem" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {/* Trust signals */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", justifyContent: "center", marginTop: "1.75rem" }}>
            {["🔒 No spam", "📞 Response within 24h", "⭐ 150+ happy clients"].map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .cta-form {
            grid-template-columns: 1fr 1fr !important;
          }
          .cta-form select,
          .cta-form button {
            grid-column: 1 / -1;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
