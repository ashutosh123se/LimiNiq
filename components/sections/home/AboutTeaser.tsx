"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const TEAM = [
  { name: "Ashutosh Shekhar", role: "CEO", color: "#3B5BFF", initials: "AS", bio: "Leads with a vision for innovation & growth.", image: "/images/team/ashutosh.png" },
  { name: "Ayush Shekhar", role: "Technical Head", color: "#00C8A0", initials: "AS", bio: "Architects scalable & secure digital solutions.", image: "/images/team/ayush.png" },
  { name: "Akanksha Singh", role: "Marketing Head", color: "#7B61FF", initials: "AK", bio: "Maximizes online visibility & growth strategies.", image: "/images/team/akanksha.jpg" },
  { name: "Aman Kumar", role: "Animation Head", color: "#FF4A7A", initials: "AM", bio: "Brings ideas to life through stunning visuals.", image: "/images/team/aman.png" },
];

const MARQUEE_LINE_1 =
  "WEB DEVELOPMENT • SEO STRATEGY • PERFORMANCE MARKETING • BRAND IDENTITY • ";
const MARQUEE_LINE_2 =
  "DIGITAL INNOVATION • DATA DRIVEN • ROI FOCUSED • CREATIVE EXCELLENCE • ";

export function AboutTeaser() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xMarquee1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const xMarquee2 = useTransform(scrollYProgress, [0, 1], [-800, 0]);

  return (
    <section ref={containerRef} className="about-teaser">
      <div className="about-marquee-zone about-marquee-zone--desktop">
        <div className="about-marquee-inner about-marquee-inner--desktop">
          <motion.div
            className="about-marquee-line about-marquee-line--fill"
            style={{ x: xMarquee1 }}
          >
            {MARQUEE_LINE_1.repeat(2)}
          </motion.div>
          <motion.div
            className="about-marquee-line about-marquee-line--stroke"
            style={{ x: xMarquee2 }}
          >
            {MARQUEE_LINE_2.repeat(2)}
          </motion.div>
        </div>
      </div>

      <div className="about-marquee-zone about-marquee-zone--mobile" aria-hidden>
        <div className="about-marquee-inner about-marquee-inner--mobile">
          <div className="about-marquee-track about-marquee-track--a">
            <span>{MARQUEE_LINE_1.repeat(3)}</span>
            <span>{MARQUEE_LINE_1.repeat(3)}</span>
          </div>
          <div className="about-marquee-track about-marquee-track--b">
            <span>{MARQUEE_LINE_2.repeat(3)}</span>
            <span>{MARQUEE_LINE_2.repeat(3)}</span>
          </div>
        </div>
      </div>

      <div className="about-teaser-glow" />

      <div className="section-container about-teaser-content">
        <div className="about-teaser-intro">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="pill-badge shimmer about-teaser-badge">
              <span style={{ color: "var(--accent-teal)" }}>✦</span> The LimiNiq Standard
            </div>
            <h2 className="section-h2 about-teaser-title">
              Driven By Data.
              <br />
              <span className="about-teaser-title-muted">Built By Builders.</span>
            </h2>
            <p className="about-teaser-copy">
              We are an elite collective of engineers, SEO strategists, and performance marketers. We abandoned the traditional agency model to build a boutique powerhouse obsessed with code quality and measurable ROI.
            </p>
            <Link href="/about" className="btn-primary about-teaser-cta">
              Meet The Team →
            </Link>
          </motion.div>
        </div>

        <div className="about-team-grid">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card about-team-card group"
            >
              <div
                className="about-team-glow group-hover-glow"
                style={{ background: `radial-gradient(circle at top center, ${member.color}20 0%, transparent 70%)` }}
              />

              <div className="member-avatar about-member-avatar">
                <div
                  className="about-avatar-ring"
                  style={{ background: `${member.color}30`, animation: `pulseRing ${2 + i * 0.3}s ease-out infinite` }}
                />
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                ) : (
                  <div
                    className="about-avatar-fallback"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                      boxShadow: `0 4px 16px ${member.color}50`,
                    }}
                  >
                    <span>{member.initials}</span>
                  </div>
                )}
              </div>

              <div className="about-member-meta">
                <div className="about-member-name">{member.name}</div>
                <div className="about-member-role" style={{ color: member.color }}>{member.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .about-teaser {
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
          padding: clamp(4rem, 8vw, 8rem) 0;
        }

        .about-marquee-zone {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .about-marquee-zone--mobile {
          display: none;
        }

        .about-marquee-inner--desktop {
          position: absolute;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          opacity: 0.1;
          transform: rotate(-3deg) scale(1.1);
        }

        .about-marquee-line {
          white-space: nowrap;
          font-size: clamp(6rem, 12vw, 15rem);
          font-family: var(--font-heading);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1;
        }

        .about-marquee-line--fill {
          color: var(--text-primary);
        }

        .about-marquee-line--stroke {
          color: transparent;
          -webkit-text-stroke: 2px var(--text-primary);
        }

        .about-teaser-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(800px, 90vw);
          height: min(800px, 90vw);
          background: radial-gradient(circle, rgba(59,91,255,0.05) 0%, transparent 70%);
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        .about-teaser-content {
          position: relative;
          z-index: 10;
        }

        .about-teaser-intro {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .about-teaser-badge {
          margin-bottom: 1.5rem;
          display: inline-flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
        }

        .about-teaser-title {
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-size: clamp(2rem, 5vw, 4rem);
        }

        .about-teaser-title-muted {
          color: var(--text-secondary);
        }

        .about-teaser-copy {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 2.5vw, 1.1rem);
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .about-teaser-cta {
          display: inline-flex;
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        .about-team-grid {
          margin-top: clamp(2.5rem, 6vw, 4rem);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }

        .about-team-card {
          padding: 1.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 220px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(10,12,16,0.5);
        }

        .about-team-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .group:hover .group-hover-glow { opacity: 1 !important; }

        .about-member-avatar {
          position: relative;
          width: 72px;
          height: 72px;
          margin: 0 auto 1rem;
          z-index: 1;
          transition: transform 0.4s ease;
        }

        .group:hover .about-member-avatar {
          transform: scale(1.1) translateY(-4px);
        }

        .about-avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
        }

        .about-avatar-fallback {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-avatar-fallback span {
          color: white;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.2rem;
        }

        .about-member-meta {
          position: relative;
          z-index: 1;
        }

        .about-member-name {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .about-member-role {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @media (max-width: 767px) {
          .about-marquee-zone--desktop {
            display: none;
          }

          .about-marquee-zone--mobile {
            display: block;
            inset: auto 0 auto 0;
            top: 0;
            height: clamp(220px, 42vh, 340px);
            align-items: flex-end;
            mask-image: linear-gradient(
              180deg,
              black 0%,
              black 55%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              180deg,
              black 0%,
              black 55%,
              transparent 100%
            );
          }

          .about-marquee-inner--mobile {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            opacity: 0.08;
            transform: rotate(-2deg);
            padding-bottom: 0.5rem;
          }

          .about-marquee-track {
            display: flex;
            width: max-content;
            white-space: nowrap;
            will-change: transform;
          }

          .about-marquee-track span {
            font-family: var(--font-heading);
            font-size: clamp(2.4rem, 11vw, 3.5rem);
            font-weight: 900;
            text-transform: uppercase;
            line-height: 1;
            padding-right: 1.5rem;
          }

          .about-marquee-track--a span {
            color: var(--text-primary);
          }

          .about-marquee-track--b span {
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,0.35);
          }

          .about-marquee-track--a {
            animation: aboutMarqueeLeft 28s linear infinite;
          }

          .about-marquee-track--b {
            animation: aboutMarqueeRight 32s linear infinite;
          }

          .about-teaser-glow {
            top: 22%;
            width: 120vw;
            height: 50vh;
          }

          .about-teaser-intro {
            position: relative;
            z-index: 2;
            padding-top: 0.25rem;
          }

          .about-team-grid {
            position: relative;
            z-index: 2;
            background: linear-gradient(
              180deg,
              transparent 0%,
              rgba(10, 11, 16, 0.35) 8%,
              rgba(10, 11, 16, 0.85) 100%
            );
            padding-top: 0.5rem;
          }
        }

        @keyframes aboutMarqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes aboutMarqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-marquee-track--a,
          .about-marquee-track--b {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
