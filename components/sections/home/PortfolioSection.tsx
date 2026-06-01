"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const FALLBACK_ITEMS = [
  {
    id: "1",
    title: "E-Commerce Overhaul for FashionNova India",
    client: "FashionNova India",
    category: "Web Dev",
    metrics: [{ label: "Traffic", value: "+420%" }, { label: "LCP", value: "2.8s → 0.4s" }, { label: "Revenue", value: "3.2x" }],
    tags: ["Shopify", "Next.js", "Performance"],
    bg: "linear-gradient(135deg, #3B5BFF 0%, #7B61FF 100%)",
    image: "/images/portfolio/ecommerce_dashboard.png",
  },
  {
    id: "2",
    title: "SEO Domination for HealthFirst Clinics",
    client: "HealthFirst Clinics",
    category: "SEO",
    metrics: [{ label: "Organic", value: "+680%" }, { label: "KWs", value: "Rank #1 for 45" }, { label: "ROI", value: "4.1x" }],
    tags: ["Local SEO", "Technical", "Content"],
    bg: "linear-gradient(135deg, #00C8A0 0%, #3B5BFF 100%)",
    image: "/images/portfolio/health_clinic_website.png",
  },
  {
    id: "3",
    title: "Performance Marketing for EdTech Startup",
    client: "LearnSphere",
    category: "Digital Marketing",
    metrics: [{ label: "ROAS", value: "4.2x" }, { label: "CPA", value: "-62%" }, { label: "Leads", value: "38K/mo" }],
    tags: ["Meta Ads", "Google Ads", "Email"],
    bg: "linear-gradient(135deg, #7B61FF 0%, #00C8A0 100%)",
    image: "/images/portfolio/edtech_marketing.png",
  },
];

const FILTERS = ["All", "Web Dev", "SEO", "Digital Marketing"];

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState<any[]>(FALLBACK_ITEMS);

  useEffect(() => {
    fetch("/api/portfolio?featured=true")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const enhanced = data.map((item: any) => ({
            ...item,
            bg: item.category.toLowerCase().includes("seo")
              ? "linear-gradient(135deg, #00C8A0 0%, #3B5BFF 100%)"
              : item.category.toLowerCase().includes("marketing")
              ? "linear-gradient(135deg, #7B61FF 0%, #00C8A0 100%)"
              : "linear-gradient(135deg, #3B5BFF 0%, #7B61FF 100%)"
          }));
          setItems(enhanced);
        }
      })
      .catch(() => console.error("Failed to load portfolio items, using fallback"));
  }, []);

  const filtered = activeFilter === "All"
    ? items
    : items.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || p.category === activeFilter);

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
            <span style={{ color: "var(--accent-teal)" }}>✦</span> Case Studies
          </div>
          <h2 className="text-section" style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            Results We&apos;re <span style={{ color: "var(--text-primary)" }}>Proud Of</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.88rem",
                fontWeight: 600,
                padding: "8px 20px",
                borderRadius: 100,
                border: activeFilter === f ? "none" : "1.5px solid rgba(59,91,255,0.2)",
                background: activeFilter === f ? "var(--gradient-hero)" : "transparent",
                color: activeFilter === f ? "white" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: activeFilter === f ? "0 4px 16px rgba(59,91,255,0.3)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card group"
              style={{ overflow: "hidden", cursor: "pointer", position: "relative" }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              {/* Cover */}
              <div
                style={{
                  height: 160,
                  background: item.coverImage ? `url(${item.coverImage}) center/cover` : item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {!item.coverImage && item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover", opacity: 0.6, mixBlendMode: "luminosity" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,15,26,0.9) 0%, rgba(10,15,26,0.2) 100%)" }} />
                {/* Metrics overlay */}
                <div style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "0.75rem",
                  right: "0.75rem",
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                }}>
                  {item.metrics?.map((m: any, idx: number) => (
                    <span key={idx} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      padding: "3px 8px",
                      borderRadius: 6,
                    }}>
                      {typeof m === "string" ? m : m.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.25rem" }}>
                <span className={`pill-badge pill-badge-${item.category.toLowerCase().includes("seo") ? "teal" : item.category.toLowerCase().includes("marketing") ? "violet" : "blue"}`} style={{ marginBottom: "0.75rem", display: "inline-flex", fontSize: "0.7rem" }}>
                  {item.category}
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.75rem", lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {item.tags?.map((t: string) => (
                    <span key={t} style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", color: "var(--text-tertiary)", background: "rgba(59,91,255,0.05)", padding: "2px 8px", borderRadius: 6 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <Link href="/portfolio" className="btn-secondary">
            View All Case Studies →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
