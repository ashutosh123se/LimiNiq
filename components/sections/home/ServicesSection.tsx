"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MonitorSmartphone, Search, Megaphone, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    id: "web",
    icon: <MonitorSmartphone size={16} strokeWidth={1.5} />,
    title: "Website Development",
    description: "We craft blazing-fast, conversion-optimised web experiences that leave lasting impressions and drive real business results.",
    features: [
      "Custom Web Applications",
      "E-Commerce (Shopify, Custom)",
      "Landing Pages & Sales Funnels",
    ],
    href: "/services/website-development",
    colSpan: "md:col-span-2",
  },
  {
    id: "seo",
    icon: <Search size={16} strokeWidth={1.5} />,
    title: "Search Engine Optimization",
    description: "Data-driven SEO strategies that move the needle — from technical foundations to authority-building link campaigns.",
    features: [
      "Technical SEO Audits",
      "On-Page Optimisation",
      "Link Building & Authority",
    ],
    href: "/services/seo",
    colSpan: "md:col-span-1",
  },
  {
    id: "marketing",
    icon: <Megaphone size={16} strokeWidth={1.5} />,
    title: "Digital Marketing",
    description: "Full-spectrum digital marketing — from paid ads that scale profitably to organic content that builds brand authority.",
    features: [
      "Google & Meta Ads (PPC)",
      "Email Marketing Automation",
      "Conversion Tracking",
    ],
    href: "/services/digital-marketing",
    colSpan: "md:col-span-3",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding" style={{ position: "relative" }}>
      <div className="section-container" style={{ position: "relative", zIndex: 1, maxWidth: 1100 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "5rem", maxWidth: 640 }}
        >
          <div className="text-label" style={{ marginBottom: "1rem" }}>
            Core Disciplines
          </div>
          <h2 className="text-section" style={{ marginBottom: "1rem" }}>
            The Architecture of Growth
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Three interconnected services engineered to dominate your market.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="bento-grid"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`glass-card ${service.colSpan} bento-card`}
              style={{
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Top Row: Icon + Title */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
                <div style={{
                  width: 48, height: 48, 
                  background: `var(--bg-primary)`, 
                  border: `1px solid var(--border-subtle)`, 
                  borderRadius: 8, 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  color: "var(--text-primary)",
                }}>
                  {service.icon}
                </div>
                <Link
                  href={service.href}
                  className="bento-link"
                  style={{
                    width: 36, height: 36,
                    borderRadius: 6,
                    background: "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-tertiary)",
                    transition: "all 0.2s ease",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
              </div>

              <h3 className="text-card-title" style={{ marginBottom: "1rem" }}>
                {service.title}
              </h3>
              
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2.5rem", flex: 1 }}>
                {service.description}
              </p>

              {/* Minimal Features List */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {service.features.map((feat) => (
                  <li key={feat} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent-primary)" }} />
                    <span style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .bento-link:hover {
          background: var(--bg-primary) !important;
          color: var(--text-primary) !important;
          border-color: var(--border-hover) !important;
        }
        
        @media (max-width: 991px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .md\\:col-span-2, .md\\:col-span-1, .md\\:col-span-3 {
            grid-column: span 1 / span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
