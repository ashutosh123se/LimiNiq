"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  { num: "01", title: "Discovery", desc: "Deep-dive consultation to understand your goals, audience, and competitive landscape." },
  { num: "02", title: "Strategy", desc: "Data-driven roadmap with clear KPIs, timelines, and channel prioritisation." },
  { num: "03", title: "Design", desc: "UI/UX prototyping that balances brand identity with conversion optimisation." },
  { num: "04", title: "Build", desc: "Development and integration with rigorous code reviews and performance testing." },
  { num: "05", title: "Launch", desc: "QA, go-live coordination, client training, and post-launch monitoring." },
  { num: "06", title: "Optimise", desc: "Ongoing analytics, A/B testing, and continuous growth iteration." },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>

      <div className="section-container" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
            <span style={{ color: "var(--accent-blue)" }}>✦</span> Our Process
          </div>
          <h2 className="text-section" style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            From Brief to <span style={{ color: "var(--text-primary)" }}>Breakthrough</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            A proven, transparent methodology that delivers predictable growth.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            position: "relative",
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="glass-card bento-card"
              style={{
                padding: "2rem",
                position: "relative",
                zIndex: 1,
              }}
              whileHover={{ y: -6 }}
            >
              {/* Step number badge */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700 }}>
                  {step.num}
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
