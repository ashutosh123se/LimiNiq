"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const TEAM = [
  { name: "Ashutosh Shekhar", role: "CEO", color: "#3B5BFF", initials: "AS", bio: "Leads with a vision for innovation & growth.", image: "/images/team/ashutosh.png" },
  { name: "Ayush Shekhar", role: "Technical Head", color: "#00C8A0", initials: "AS", bio: "Architects scalable & secure digital solutions.", image: "/images/team/ayush.png" },
  { name: "Akanksha Singh", role: "Marketing Head", color: "#7B61FF", initials: "AK", bio: "Maximizes online visibility & growth strategies." },
  { name: "Aman Kumar", role: "Animation Head", color: "#FF4A7A", initials: "AM", bio: "Brings ideas to life through stunning visuals.", image: "/images/team/aman.png" },
];

export function AboutTeaser() {
  const containerRef = useRef(null);
  
  // Create parallax scroll effects tied to the section's position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  
  // Marquee scroll speeds
  const xMarquee1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const xMarquee2 = useTransform(scrollYProgress, [0, 1], [-800, 0]);

  return (
    <section ref={containerRef} style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden", padding: "8rem 0" }}>
      
      {/* Text Content Block */}
      <div className="section-container" style={{ position: "relative", zIndex: 10, marginBottom: "2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="pill-badge shimmer" style={{ marginBottom: "1.5rem", display: "inline-flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              <span style={{ color: "var(--accent-teal)" }}>✦</span> The LimiNiq Standard
            </div>
            <h2 className="section-h2" style={{ color: "var(--text-primary)", marginBottom: "1.5rem", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Driven By Data.<br/>
              <span style={{ color: "var(--text-secondary)" }}>Built By Builders.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem auto" }}>
              We are an elite collective of engineers, SEO strategists, and performance marketers. We abandoned the traditional agency model to build a boutique powerhouse obsessed with code quality and measurable ROI.
            </p>
            <Link href="/about" className="btn-primary" style={{ display: "inline-flex", padding: "1rem 2rem", fontSize: "1rem" }}>
              Meet The Team →
            </Link>
          </motion.div>
        </div>
        
        {/* Team Avatars Floating Over Marquee */}
        <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", maxWidth: "1000px", margin: "4rem auto 0" }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card group"
              style={{ padding: "1.5rem", textAlign: "center", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", minHeight: 220, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(10,12,16,0.5)" }}
            >
              {/* Background glow on hover */}
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top center, ${member.color}20 0%, transparent 70%)`, opacity: 0, transition: "opacity 0.4s ease" }} className="group-hover-glow" />

              {/* Avatar */}
              <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 1rem", zIndex: 1, transition: "transform 0.4s ease" }} className="member-avatar">
                <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: `${member.color}30`, animation: `pulseRing ${2 + i * 0.3}s ease-out infinite` }} />
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                ) : (
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${member.color}50` }}>
                    <span style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem" }}>{member.initials}</span>
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{member.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, color: member.color, marginBottom: "1rem" }}>{member.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Gallery Area */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        
        {/* Massive Background Marquees */}
        <div style={{ position: "absolute", width: "100%", display: "flex", flexDirection: "column", gap: "2rem", opacity: 0.1, transform: "rotate(-3deg) scale(1.1)", pointerEvents: "none" }}>
           <motion.div style={{ x: xMarquee1, whiteSpace: "nowrap", fontSize: "clamp(6rem, 12vw, 15rem)", fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1 }}>
              WEB DEVELOPMENT • SEO STRATEGY • PERFORMANCE MARKETING • BRAND IDENTITY • WEB DEVELOPMENT • SEO STRATEGY • PERFORMANCE MARKETING • BRAND IDENTITY
           </motion.div>
           <motion.div style={{ x: xMarquee2, whiteSpace: "nowrap", fontSize: "clamp(6rem, 12vw, 15rem)", fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", color: "transparent", WebkitTextStroke: "2px var(--text-primary)", lineHeight: 1 }}>
              DIGITAL INNOVATION • DATA DRIVEN • ROI FOCUSED • CREATIVE EXCELLENCE • DIGITAL INNOVATION • DATA DRIVEN • ROI FOCUSED • CREATIVE EXCELLENCE
           </motion.div>
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(59,91,255,0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <style>{`
        .group:hover .group-hover-glow { opacity: 1 !important; }
        .group:hover .member-avatar { transform: scale(1.1) translateY(-4px); }
        @keyframes pulseRing { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>
    </section>
  );
}
