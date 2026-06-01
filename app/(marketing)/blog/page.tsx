import { Metadata } from "next";
import { BlogPreviewSection } from "@/components/sections/home/BlogPreviewSection";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights & Strategy Blog | LIMINIQ",
  description: "Read the latest insights on website development, SEO strategies, and digital marketing trends from the LIMINIQ team.",
  alternates: { canonical: "https://liminiq.com/blog" },
};

export default function BlogPage() {
  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      
      {/* Blog Hero & Categories */}
      <section style={{ padding: "6rem 0 4rem", position: "relative" }}>
        <div className="section-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <div className="pill-badge" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
                <span style={{ color: "var(--accent-primary)" }}>✦</span> Insights
              </div>
              <h1 className="text-hero" style={{ letterSpacing: "-0.04em" }}>
                The Growth <span style={{ color: "var(--text-secondary)" }}>Playbook</span>
              </h1>
            </div>
            
            {/* Category Pills */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["All", "Engineering", "SEO", "Marketing"].map((cat, i) => (
                <button
                  key={cat}
                  style={{
                    background: i === 0 ? "rgba(109, 40, 217, 0.1)" : "rgba(255,255,255,0.03)",
                    border: i === 0 ? "1px solid rgba(109, 40, 217, 0.3)" : "1px solid var(--border-subtle)",
                    color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                    padding: "8px 20px",
                    borderRadius: 30,
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  className="hover-brighten"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post Card */}
          <Link href="/blog/the-future-of-headless-commerce" style={{ textDecoration: "none", display: "block" }}>
            <div className="glass-card group" style={{ padding: "1.5rem", borderRadius: 32, display: "grid", gridTemplateColumns: "1fr", gap: "3rem", position: "relative", overflow: "hidden" }} id="featured-post">
              
              {/* Image Area */}
              <div style={{ width: "100%", height: "100%", minHeight: 350, background: "rgba(255,255,255,0.02)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.05)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} className="featured-image-container">
                <Image 
                  src="https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=1200" 
                  alt="The Future of Headless Commerce" 
                  fill 
                  style={{ objectFit: "cover" }} 
                  className="featured-image"
                  priority
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,5,8,0.4), transparent)" }} />
              </div>

              {/* Content Area */}
              <div style={{ padding: "2rem 2rem 2rem 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Engineering</span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-tertiary)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-tertiary)" }}>8 min read</span>
                </div>
                
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", lineHeight: 1.15 }}>
                  The Future of Headless Commerce: Next.js & Shopify Integration
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 600 }}>
                  Why modern e-commerce brands are migrating away from monolithic platforms towards flexible, high-performance headless architectures to drive conversion rates.
                </p>
                
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-primary)", fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                  Read Article <ArrowRight size={18} className="group-hover-translate" style={{ transition: "transform 0.2s" }} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid of latest posts re-using homepage blog component */}
      <BlogPreviewSection />
      
      <div style={{ padding: "4rem 0" }} />
      
      <LeadCTASection />

      <style>{`
        @media (min-width: 900px) {
          #featured-post { grid-template-columns: 1.2fr 1fr !important; padding: 1.5rem 0 1.5rem 1.5rem !important; }
        }
        .group:hover .group-hover-translate { transform: translateX(6px); }
        .hover-brighten:hover { background: rgba(255,255,255,0.08) !important; color: white !important; }
        .featured-image { transition: transform 0.8s cubic-bezier(0.2, 1, 0.2, 1); }
        .group:hover .featured-image { transform: scale(1.05); }
      `}</style>
    </div>
  );
}
