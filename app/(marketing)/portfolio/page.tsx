import { Metadata } from "next";
import { PortfolioSection } from "@/components/sections/home/PortfolioSection";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { ArrowRight, BarChart3, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | LIMINIQ",
  description: "Explore our portfolio of high-performance websites, SEO campaigns, and digital marketing success stories.",
  alternates: { canonical: "https://liminiq.com/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      
      {/* Premium Header */}
      <section style={{ padding: "6rem 0 4rem", textAlign: "center", position: "relative" }}>
        {/* Background glow behind text */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 400, background: "rgba(109, 40, 217, 0.05)", borderRadius: "50%", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />
        
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill-badge" style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Case Studies
          </div>
          <h1 className="text-hero" style={{ marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>
            Work That <span style={{ color: "var(--text-secondary)" }}>Performs</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: 650, margin: "0 auto", lineHeight: 1.6 }}>
            We don't just build beautiful interfaces; we build engines for growth. Dive into our recent projects where design meets conversion.
          </p>
        </div>
      </section>

      {/* Featured Case Study Bento Block */}
      <section className="section-container section-padding" style={{ paddingBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "4rem", borderRadius: 32, display: "grid", gridTemplateColumns: "1fr", gap: "4rem", position: "relative", overflow: "hidden" }} id="featured-work">
          
          {/* Subtle noise and gradients */}
          <div className="bg-noise" />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "60%", height: "100%", background: "radial-gradient(ellipse at bottom right, rgba(109, 40, 217, 0.08), transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", position: "relative", zIndex: 1 }} className="featured-grid">
            
            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-primary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Featured Project
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
                Scaling TechScale's Organic Engine
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 480 }}>
                A complete technical SEO overhaul and React rebuild that drove a massive influx of qualified B2B leads, fundamentally changing their customer acquisition model.
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "3rem" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)" }}>420%</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>Traffic Growth</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)" }}>0.8s</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>Load Time</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)" }}>#1</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>Rankings</div>
                </div>
              </div>

              <div>
                <Link href="/contact" className="btn-secondary" style={{ borderRadius: 30, padding: "12px 28px" }}>
                  Read Case Study <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div style={{ position: "relative", minHeight: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Mockup Frame */}
              <div style={{ width: "100%", height: "100%", background: "var(--bg-primary)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                {/* Browser bar */}
                <div style={{ height: 32, background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 1rem", gap: "6px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                </div>
                {/* Visual Area */}
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", height: "calc(100% - 32px)", position: "relative" }}>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 1, height: 120, background: "rgba(109, 40, 217, 0.1)", borderRadius: 12, border: "1px solid rgba(109, 40, 217, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <TrendingUp size={32} color="var(--accent-primary)" />
                    </div>
                    <div style={{ flex: 1, height: 120, background: "rgba(255, 255, 255, 0.03)", borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <BarChart3 size={32} color="var(--text-secondary)" />
                    </div>
                  </div>
                  <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px dashed rgba(255,255,255,0.1)" }} />
                  
                  {/* Floating abstract element */}
                  <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 64, height: 64, background: "var(--accent-primary)", borderRadius: "50%", filter: "blur(20px)", opacity: 0.4 }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid of previous work re-using homepage portfolio component */}
      <PortfolioSection />
      
      <div style={{ padding: "4rem 0" }} />
      
      <LeadCTASection />

      <style>{`
        @media (min-width: 900px) {
          .featured-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
