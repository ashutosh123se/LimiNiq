import { Metadata } from "next";
import { PricingSection } from "@/components/sections/home/PricingSection";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { ShieldCheck, UserCheck, Zap, RefreshCw } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Simple, Honest Pricing | LIMINIQ",
  description: "Transparent pricing for web development and SEO marketing. No hidden fees. Invest in high-performance digital growth.",
  alternates: { canonical: "https://liminiq.com/pricing" },
};

const TRUST_POINTS = [
  { icon: <ShieldCheck size={24} />, title: "Transparent Pricing", desc: "No hidden fees or surprise invoices. Ever." },
  { icon: <RefreshCw size={24} />, title: "No Vendor Lock-in", desc: "You own 100% of the code and assets." },
  { icon: <Zap size={24} />, title: "Results Guaranteed", desc: "Built for speed, conversion, and ranking." },
  { icon: <UserCheck size={24} />, title: "Dedicated Team", desc: "Direct access to engineers and strategists." },
];

export default function PricingPage() {
  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      
      {/* Hero & Pricing Wrapper */}
      <div style={{ position: "relative" }}>
        {/* Background glow behind header */}
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "rgba(59, 91, 255, 0.05)", borderRadius: "50%", filter: "blur(100px)", zIndex: 0, pointerEvents: "none" }} />
        
        {/* The CMS-driven Pricing Section Component */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <PricingSection showFAQ={true} />
        </div>
      </div>

      {/* Why LIMINIQ? Trust Strip */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.01)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {TRUST_POINTS.map((point, i) => (
              <div key={i} style={{ padding: "3rem 2rem", borderRight: i !== TRUST_POINTS.length - 1 ? "1px solid var(--border-subtle)" : "none", display: "flex", flexDirection: "column", gap: "1rem" }} className="trust-block">
                <div style={{ color: "var(--accent-primary)" }}>{point.icon}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>{point.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div style={{ padding: "4rem 0" }} />
      <LeadCTASection />

      <style>{`
        @media (max-width: 768px) {
          .trust-block { border-right: none !important; border-bottom: 1px solid var(--border-subtle); }
          .trust-block:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  );
}
