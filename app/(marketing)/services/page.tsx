import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/data/services";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | LIMINIQ",
  description: "Explore our comprehensive suite of digital services including web development, mobile apps, SaaS, UI/UX, marketing, and SEO.",
  alternates: { canonical: "https://liminiq.com/services" },
};

export default function ServicesPage() {
  const services = SERVICES;

  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)", minHeight: "100vh" }}>
      
      {/* Hero */}
      <section className="services-hero">
        <div className="section-container">
          <div className="pill-badge shimmer" style={{ marginBottom: "1.5rem", margin: "0 auto" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Capabilities
          </div>
          <h1 className="text-hero" style={{ marginBottom: "1.5rem" }}>
            Engineering <span style={{ color: "var(--text-secondary)" }}>Your</span><br />
            Digital Growth.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            From high-performance applications to data-driven marketing, we provide end-to-end solutions to scale your business.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding section-container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {services.map((service) => (
            <Link 
              key={service.slug}
              href={`/services/${service.slug}`}
              className="glass-card group"
              style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", borderRadius: 24, textDecoration: "none" }}
            >
              <div style={{ position: "relative", height: 220, width: "100%", background: "var(--bg-surface)" }}>
                {service.coverImage && (
                  <Image 
                    src={service.coverImage} 
                    alt={service.title} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    className="group-hover-scale"
                  />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-surface) 0%, transparent 100%)" }} />
              </div>
              
              <div style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ color: "var(--accent-primary)" }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                    {service.title}
                  </h3>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem", flex: 1 }}>
                  {service.subtitle}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 600 }}>
                  Explore Service <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LeadCTASection />

      <style>{`
        .services-hero { padding: 6rem 1.5rem; text-align: center; }
        @media (max-width: 899px) {
          .services-hero { padding: 4rem 1rem; }
        }
        .group-hover-scale { transition: transform 0.5s ease; }
        .group:hover .group-hover-scale { transform: scale(1.05); }
      `}</style>
    </div>
  );
}
