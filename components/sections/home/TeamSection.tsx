'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const TEAM = [
  {
    name: "Ashutosh Shekhar",
    role: "Chief Executive Officer (CEO)",
    bio: "Ashutosh leads the company with a vision for innovation, growth, and excellence. With expertise in software development, business strategy, and digital transformation, he oversees operations, client relationships, and the overall direction of the organization.",
    image: null,
    initials: "AS"
  },
  {
    name: "Ayush Shekhar",
    role: "Technical Head",
    bio: "Ayush is responsible for leading the technical team and architecting scalable, secure, and high-performance digital solutions. He oversees software development, technology implementation, system optimization, and innovation.",
    image: null,
    initials: "AS"
  },
  {
    name: "Akanksha Singh",
    role: "SEO & Digital Marketing Head",
    bio: "Akanksha manages the company's digital presence and growth strategies. She specializes in search engine optimization (SEO), content marketing, social media management, paid advertising, and brand positioning.",
    image: null,
    initials: "AK"
  },
  {
    name: "Aman Kumar",
    role: "Graphic Designing & Animation Head",
    bio: "Aman leads the creative department, bringing ideas to life through stunning visual designs and engaging animations. He specializes in branding, UI/UX design, motion graphics, video editing, and creative storytelling.",
    image: null,
    initials: "AM"
  }
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Our Leadership
          </div>
          <h2 className="section-h2" style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            Meet the <span style={{ color: "var(--text-secondary)" }}>Team</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto" }}>
            The minds behind LIMINIQ, driving innovation and delivering exceptional results for our clients globally.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="glass-card group"
              style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column", borderRadius: 24, textAlign: "center" }}
            >
              {/* Image Container */}
              <div style={{ position: "relative", width: "100%", height: 300, background: "rgba(109, 40, 217, 0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {member.image ? (
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="group-hover:scale-105"
                  />
                ) : (
                  <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(59,91,255,0.3)" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 800, color: "white" }}>
                      {member.initials}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  {member.name}
                </h3>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-primary)", marginBottom: "1rem", fontWeight: 600 }}>
                  {member.role}
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0" }}>
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .group:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}
