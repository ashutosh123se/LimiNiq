"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const VALUES = [
  { icon: "⚡", label: "Speed-First", desc: "We move fast, ship quality." },
  { icon: "🔬", label: "Data-Driven", desc: "Every decision is evidence-backed." },
  { icon: "🤝", label: "Transparent", desc: "Full visibility into our work." },
];

const TEAM_AVATARS = [
  { name: "Aryan S.", color: "#3B5BFF" },
  { name: "Priya N.", color: "#00C8A0" },
  { name: "Rohan M.", color: "#7B61FF" },
  { name: "Sneha K.", color: "#3B5BFF" },
  { name: "Vikram T.", color: "#00C8A0" },
  { name: "Anika J.", color: "#7B61FF" },
];

export function AboutTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>

      <div className="section-container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center" }} className="about-grid">

          {/* Left — Avatar grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}
            className="about-avatars"
          >
            {TEAM_AVATARS.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{ padding: "1.5rem", textAlign: "center", cursor: "default" }}
                whileHover={{ y: -4 }}
              >
                {/* Glow ring avatar */}
                <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 0.75rem" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      background: `${member.color}30`,
                      animation: `pulseRing ${2 + i * 0.3}s ease-out infinite`,
                    }}
                  />
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 16px ${member.color}40`,
                    }}
                  >
                    <span style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {member.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="pill-badge shimmer" style={{ marginBottom: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              <span style={{ color: "var(--accent-teal)" }}>✦</span> Who We Are
            </div>
            <h2 className="text-section" style={{ color: "var(--text-primary)", marginBottom: "1.25rem" }}>
              Built by <span style={{ color: "var(--text-primary)" }}>Builders</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1rem" }}>
              LIMINIQ was founded by engineers and marketers who were tired of agencies that over-promise and under-deliver. We believe great digital work comes from obsessing over the details — code quality, data integrity, creative excellence.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1rem" }}>
              Our team of 18 specialists spans full-stack development, SEO strategy, paid media, and creative direction — all under one roof, all rowing in the same direction.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "2rem" }}>
              We&apos;ve helped 150+ brands across India and beyond grow their digital presence into genuine business assets.
            </p>

            {/* Core values */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="glass-card"
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 1rem", borderRadius: 12 }}
                >
                  <span style={{ fontSize: "1rem" }}>{v.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{v.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Meet the Team →
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 899px) {
          .about-avatars { display: none !important; }
        }
      `}</style>
    </section>
  );
}
