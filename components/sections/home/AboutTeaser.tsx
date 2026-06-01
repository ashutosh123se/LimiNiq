"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const VALUES = [
  { icon: "⚡", label: "Speed-First", desc: "We move fast, ship quality." },
  { icon: "🔬", label: "Data-Driven", desc: "Every decision is evidence-backed." },
  { icon: "🤝", label: "Transparent", desc: "Full visibility into our work." },
];

const TEAM = [
  { name: "Ashutosh Shekhar", role: "CEO", color: "#3B5BFF", initials: "AS", bio: "Leads with a vision for innovation & growth.", image: "/images/team/ashutosh.png" },
  { name: "Ayush Shekhar", role: "Technical Head", color: "#00C8A0", initials: "AS", bio: "Architects scalable & secure digital solutions.", image: "/images/team/ayush.png" },
  { name: "Akanksha Singh", role: "Marketing Head", color: "#7B61FF", initials: "AK", bio: "Maximizes online visibility & growth strategies." },
  { name: "Aman Kumar", role: "Animation Head", color: "#FF4A7A", initials: "AM", bio: "Brings ideas to life through stunning visuals.", image: "/images/team/aman.png" },
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
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}
            className="about-avatars"
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                className="glass-card group"
                style={{ 
                  padding: "1.5rem", 
                  textAlign: "center", 
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  minHeight: 220
                }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                {/* Background glow on hover */}
                <div 
                  className="group-hover-glow" 
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    background: `radial-gradient(circle at top center, ${member.color}25 0%, transparent 70%)`,
                    opacity: 0,
                    transition: "opacity 0.4s ease"
                  }} 
                />

                {/* Avatar */}
                <motion.div 
                  style={{ position: "relative", width: 64, height: 64, margin: "0 auto 1rem", zIndex: 1, transition: "transform 0.4s ease" }}
                  className="member-avatar"
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      background: `${member.color}30`,
                      animation: `pulseRing ${2 + i * 0.3}s ease-out infinite`,
                    }}
                  />
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 16px ${member.color}50`,
                      }}
                    >
                      <span style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem" }}>
                        {member.initials}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Name & Role */}
                <div style={{ position: "relative", zIndex: 1, transition: "transform 0.4s ease" }} className="member-info">
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {member.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, color: member.color }}>
                    {member.role}
                  </div>
                </div>

                {/* Bio on hover */}
                <div 
                  className="member-bio"
                  style={{ 
                    position: "absolute",
                    bottom: "1.5rem",
                    left: "1rem",
                    right: "1rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "all 0.4s ease",
                    zIndex: 1
                  }}
                >
                  {member.bio}
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="glass-card"
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1.25rem", borderRadius: 14, cursor: "default" }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{v.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{v.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{v.desc}</div>
                  </div>
                </motion.div>
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
        
        /* Interactive Hover Animations */
        .group:hover .group-hover-glow {
          opacity: 1 !important;
        }
        .group:hover .member-avatar {
          transform: translateY(-8px) scale(1.05) rotate(5deg) !important;
        }
        .group:hover .member-info {
          transform: translateY(-80px) !important;
          opacity: 0 !important;
        }
        .group:hover .member-bio {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
