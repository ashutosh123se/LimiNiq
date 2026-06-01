"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const STATS = [
  { number: 150, suffix: "+", label: "Projects Delivered", sublabel: "Since 2019" },
  { number: 12, prefix: "$", suffix: "M+", label: "Revenue Generated", sublabel: "For our clients" },
  { number: 98, suffix: "%", label: "Client Retention", sublabel: "Long-term partnerships" },
  { number: 5, suffix: "★", label: "Google Rating", sublabel: "120+ reviews" },
];

export function StatsStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "4rem 0 2rem",
        zIndex: 10,
      }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card shimmer"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Slow shine sweep */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "30%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: "shimmerSlide 4s ease infinite",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "2rem 1.5rem",
                textAlign: "center",
                position: "relative",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              {/* Number */}
              <div
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.prefix && stat.prefix}
                {isInView ? (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2}
                    delay={i * 0.15}
                    useEasing
                    separator=","
                  />
                ) : 0}
                {stat.suffix}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.2rem",
                }}
              >
                {stat.label}
              </div>

              {/* Sublabel */}
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--text-tertiary)",
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
