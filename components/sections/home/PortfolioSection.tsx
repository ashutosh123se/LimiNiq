'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [activeFilter, setActiveFilter] = useState("All")
  const [items, setItems] = useState<any[]>(FALLBACK_ITEMS)

  useEffect(() => {
    fetch("/api/portfolio?featured=true")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const enhanced = data.map((item: any, index: number) => {
            const isSEO = item.category.toLowerCase().includes("seo");
            const isMarketing = item.category.toLowerCase().includes("marketing");
            
            // Try to match with our default fallback items if possible
            const fallbackItem = FALLBACK_ITEMS.find(f => f.title === item.title) || FALLBACK_ITEMS[index % FALLBACK_ITEMS.length];

            return {
              ...item,
              bg: isSEO
                ? "linear-gradient(135deg, #00C8A0 0%, #3B5BFF 100%)"
                : isMarketing
                ? "linear-gradient(135deg, #7B61FF 0%, #00C8A0 100%)"
                : "linear-gradient(135deg, #3B5BFF 0%, #7B61FF 100%)",
              image: item.coverImage ? undefined : fallbackItem.image
            }
          })
          setItems(enhanced)
        }
      })
      .catch(() => console.error("Failed to load portfolio items, using fallback"))
  }, [])

  const filtered = activeFilter === "All"
    ? items
    : items.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || p.category === activeFilter)

  return (
    <section ref={ref} className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section-container" style={{ position: "relative" }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Case Studies
          </div>
          <h2 className="section-h2" style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            Results We&apos;re <span style={{ color: "var(--text-primary)" }}>Proud Of</span>
          </h2>
        </motion.div>

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
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                fontWeight: 600,
                padding: "10px 24px",
                borderRadius: 100,
                border: activeFilter === f ? "none" : "1px solid var(--border-subtle)",
                background: activeFilter === f ? "var(--accent-primary)" : "rgba(255,255,255,0.05)",
                color: activeFilter === f ? "white" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: activeFilter === f ? "0 4px 15px rgba(59,91,255,0.3)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card-premium group"
              style={{ overflow: "hidden", cursor: "pointer", position: "relative", display: "flex", flexDirection: "column" }}
              whileHover={{ y: -6, scale: 1.01 }}
              data-cursor="view"
            >
              <div
                className="portfolio-img-container"
                style={{
                  height: 220,
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
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="portfolio-img"
                  />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(4,5,8,0.9) 0%, rgba(4,5,8,0.2) 100%)" }} />
                
                <div style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  right: "1rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}>
                  {item.metrics?.map((m: any, idx: number) => (
                    <span key={idx} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      background: "rgba(4,5,8,0.8)",
                      color: "#A0B4FF",
                      padding: "4px 10px",
                      borderRadius: 6,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
                    }}>
                      {typeof m === "string" ? m : m.value}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: "1.5rem", flex: 1 }}>
                <span className="pill-badge" style={{ marginBottom: "1rem", display: "inline-flex", fontSize: "0.75rem", background: "rgba(59,91,255,0.05)", border: "none" }}>
                  {item.category}
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 1rem", lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {item.tags?.map((t: string) => (
                    <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text-secondary)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", padding: "4px 10px", borderRadius: 8 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          <Link href="/portfolio" className="btn-secondary">
            View All Case Studies →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .group:hover .portfolio-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  )
}
