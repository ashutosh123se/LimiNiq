import { Metadata } from "next";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { Users, Code2, LineChart, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | LIMINIQ",
  description: "Learn about LIMINIQ, our mission, and the team building next-generation digital solutions for ambitious brands.",
  alternates: { canonical: "https://liminiq.com/about" },
};

const STATS = [
  { label: "Founded", value: "2019" },
  { label: "Global Clients", value: "80+" },
  { label: "Projects Shipped", value: "150+" },
  { label: "Team Size", value: "24" },
];

const VALUES = [
  {
    icon: <Code2 size={24} />,
    title: "Engineering-First",
    desc: "Clean code, modern stacks (Next.js, React), and scalable architecture. We don't use templates; we build digital products.",
  },
  {
    icon: <LineChart size={24} />,
    title: "Data-Driven Marketing",
    desc: "No fluff. Just ROI-focused campaigns based on rigorous analytics, attribution modeling, and continuous testing.",
  },
  {
    icon: <Users size={24} />,
    title: "Radical Transparency",
    desc: "Direct access to the engineers and marketers working on your project, with weekly updates and clear KPI tracking.",
  },
  {
    icon: <Globe2 size={24} />,
    title: "Global Perspective",
    desc: "Based in India but competing on a world stage. We deliver Silicon Valley quality with unmatched agility.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      
      {/* Editorial Hero */}
      <section style={{ padding: "8rem 0 4rem", position: "relative" }}>
        <div className="section-container about-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          <div>
            <div className="pill-badge" style={{ marginBottom: "1.5rem" }}>
              <span style={{ color: "var(--accent-primary)" }}>✦</span> Our Story
            </div>
            <h1 className="text-hero" style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Building <span style={{ color: "var(--text-secondary)" }}>Globally.</span><br />
              <span style={{ color: "var(--text-primary)" }}>From India.</span>
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 500 }}>
              We're a collective of engineers, designers, and growth strategists partnering with ambitious brands to build scalable digital engines.
            </p>
          </div>
        </div>
      </section>

      {/* Mini Stats Strip */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.01)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{ padding: "3rem 2rem", borderRight: i !== STATS.length - 1 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }} className="stat-block">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding section-container" style={{ textAlign: "center", padding: "8rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
            Most agencies treat websites as static brochures and marketing as a guessing game. <span style={{ color: "var(--text-secondary)" }}>We believe your digital presence should be a high-performance engine that actively drives revenue.</span>
          </p>
        </div>
      </section>

      {/* Values / Bento Grid */}
      <section className="section-container" style={{ paddingBottom: "6rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Our DNA
          </h2>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {VALUES.map((val, i) => (
            <div key={i} className="glass-card group" style={{ padding: "3rem 2.5rem", borderRadius: 24, display: "flex", flexDirection: "column" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(109, 40, 217, 0.08)", border: "1px solid rgba(109, 40, 217, 0.2)", color: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
                {val.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
                {val.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0, flex: 1 }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <LeadCTASection />

      <style>{`
        @media (min-width: 900px) {
          .about-hero-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }
        @media (max-width: 768px) {
          .stat-block { border-right: none !important; border-bottom: 1px solid var(--border-subtle); padding: 2rem !important; }
          .stat-block:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  );
}
