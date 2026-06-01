"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Zap, Target } from "lucide-react";

const FLOATING_CARDS = [
  { icon: <TrendingUp size={16} strokeWidth={1.5} />, label: "340% Traffic Increase", delay: 0.6, duration: 2.8, x: "65%", y: "18%" },
  { icon: <Zap size={16} strokeWidth={1.5} />, label: "98 PageSpeed Score", delay: 0.8, duration: 3.2, x: "72%", y: "52%" },
  { icon: <Target size={16} strokeWidth={1.5} />, label: "4.2x ROAS", delay: 1.0, duration: 2.6, x: "55%", y: "78%" },
];

const TRUST_BADGES = [
  { icon: "G", label: "Google Partner" },
  { icon: "M", label: "Meta Partner" },
  { icon: <Star size={14} fill="currentColor" strokeWidth={0} />, label: "5-Star Agency" },
];

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Background ambient noise */}
      <div className="bg-noise" />

      <div className="section-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left — Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            style={{ maxWidth: 720 }}
          >
            {/* Pill badge */}
            <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
              <div className="pill-badge shimmer">
                <span style={{ color: "var(--accent-primary)" }}>✦</span> Next-Gen Digital Solutions
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={fadeUp} className="text-hero" style={{ marginBottom: "1.5rem" }}>
              <span style={{ display: "block" }}>We Build</span>
              <span style={{ display: "block", color: "var(--text-secondary)" }}>
                Digital Experiences
              </span>
              <span style={{ display: "block" }}>That Convert.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                maxWidth: 580,
                marginBottom: "2.5rem",
              }}
            >
              LIMINIQ engineers high-performance websites, drives organic growth through precision SEO, and executes data-backed digital marketing strategies for ambitious brands.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}
            >
              <Link href="/contact" className="btn-primary">
                Start Your Project
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                View Our Work
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingRight: "1rem", borderRight: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", gap: "2px", color: "var(--text-primary)" }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-label">
                  4.9/5 Average
                </span>
              </div>

              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 700 }}>{badge.icon}</span>
                  <span className="text-label" style={{ letterSpacing: "0.05em" }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
            className="hero-visual"
          >
            <motion.div
              style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d", width: "100%", maxWidth: 460 }}
            >
              <DashboardMockup />
            </motion.div>

            {/* Floating stat cards */}
            {FLOATING_CARDS.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: card.delay + 0.4, type: "spring", stiffness: 150 }}
                style={{
                  position: "absolute",
                  left: card.x,
                  top: card.y,
                  background: "var(--bg-surface)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 8,
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  animationName: "floatBob",
                  animationDuration: `${card.duration}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${card.delay}s`,
                  whiteSpace: "nowrap",
                  zIndex: 5,
                }}
              >
                <span style={{ color: "var(--accent-primary)" }}>{card.icon}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>
                  {card.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
          .hero-visual {
            min-height: 550px;
          }
        }
        @media (max-width: 899px) {
          .hero-visual { display: none !important; }
        }
        @keyframes floatBob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div
      className="glass-card"
      style={{
        width: "100%",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
        {["var(--text-muted)","var(--text-muted)","var(--text-muted)"].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)", borderRadius: 6, padding: "4px 12px", marginLeft: "1rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>liminiq.com/dashboard</span>
        </div>
      </div>

      {/* Mini KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Revenue", value: "4.8L", trend: "+18%" },
          { label: "Traffic", value: "48.2K", trend: "+34%" },
          { label: "Conv.", value: "24.8%", trend: "+6%" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div className="text-label">{kpi.label}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", color: "var(--text-primary)" }}>{kpi.value}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-primary)" }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Mini chart bars */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="text-label" style={{ marginBottom: "1rem" }}>Traffic Overview</div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", height: 80 }}>
          {[40,65,45,80,55,100,75].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.5, ease: "easeOut" }}
              style={{
                flex: 1,
                borderRadius: "2px",
                background: i === 5 ? "var(--accent-primary)" : "var(--border-subtle)",
                height: `${h}%`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent activities */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {[
          { text: "New lead: TechCorp Ltd." },
          { text: "SEO rank: +12 positions" },
          { text: "Campaign ROI: 4.8x" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", border: "1px solid var(--border-subtle)", borderRadius: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-primary)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
