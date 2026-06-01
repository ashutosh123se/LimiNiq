"use client";

import { useState, useEffect } from "react";

const FALLBACK_TESTIMONIALS = [
  { name: "Rohan Mehta", company: "TechScale SaaS", role: "CEO", quote: "LIMINIQ rebuilt our platform and organic traffic shot up 420% in 4 months. The team is insanely talented — they think like product builders, not just developers.", rating: 5, service: "Web Dev" },
  { name: "Priya Sharma", company: "HealthFirst Clinics", role: "Marketing Director", quote: "We rank #1 for 45 high-intent keywords now. Our patient inquiries doubled in 6 months. LIMINIQ's SEO team is exceptional — data-driven and results-obsessed.", rating: 5, service: "SEO" },
  { name: "Arjun Kapoor", company: "LearnSphere EdTech", role: "Founder", quote: "Our Meta campaigns went from a 1.2x ROAS to 4.8x in just 8 weeks. The level of optimisation and attention to detail is unlike any agency I've worked with.", rating: 5, service: "Digital Marketing" },
  { name: "Sneha Iyer", company: "PropVault Realty", role: "Co-Founder", quote: "Website speed went from 42 to 98 on PageSpeed, and our lead form conversions tripled. LIMINIQ delivered exactly what they promised, on time.", rating: 5, service: "Web Dev" },
  { name: "Vikram Singh", company: "LegalEdge LLP", role: "Managing Partner", quote: "Our firm now dominates local search in 3 cities. Revenue from organic search grew 220% year-over-year. Best investment we've made in marketing.", rating: 5, service: "SEO" },
  { name: "Anika Joshi", company: "CraftBite Foods", role: "Brand Head", quote: "They launched our Instagram commerce strategy and we hit ₹1Cr in online sales in month 3. The team feels like an extension of our internal team.", rating: 5, service: "Digital Marketing" },
  { name: "Deepak Nair", company: "CloudStack IT", role: "CTO", quote: "LIMINIQ built our entire B2B web app from scratch — clean architecture, flawless UI, and delivered 2 weeks early. Rare to find this level of craft.", rating: 5, service: "Web Dev" },
  { name: "Meera Pillai", company: "Organic Root", role: "Founder", quote: "We were invisible on Google. 6 months with LIMINIQ and we're ranking for 200+ keywords. Organic orders now make up 65% of our revenue.", rating: 5, service: "SEO" },
  { name: "Rahul Gupta", company: "QuickFin Loans", role: "VP Marketing", quote: "Our cost per acquisition dropped 58% while lead volume grew 3x. The LIMINIQ team's command of Google Ads is genuinely world-class.", rating: 5, service: "Digital Marketing" },
  { name: "Tanvi Choudhary", company: "StyleHub Fashion", role: "E-Commerce Head", quote: "The new Shopify store LIMINIQ built loads in under 0.8 seconds and our cart abandonment fell 40%. Revenue per visitor is up 2.4x.", rating: 5, service: "Web Dev" },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    fetch("/api/testimonials?active=true")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // If fewer than 6 testimonials (needed for a nice scroll), duplicate them
          let items = data;
          if (items.length < 6) {
            items = [...items, ...items, ...items];
          }
          setTestimonials(items);
        }
      })
      .catch(() => console.error("Failed to load testimonials, using fallback"));
  }, []);

  const mid = Math.ceil(testimonials.length / 2);
  const ROW1 = [...testimonials.slice(0, mid), ...testimonials.slice(0, mid)];
  const ROW2 = [...testimonials.slice(mid), ...testimonials.slice(mid)];

  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)", overflow: "hidden", position: "relative" }}>

      <div style={{ position: "relative" }}>
        {/* Header */}
        <div className="section-container" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="pill-badge shimmer" style={{ marginBottom: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
            <span style={{ color: "var(--accent-violet)" }}>✦</span> Client Voices
          </div>
          <h2 className="text-section" style={{ color: "var(--text-primary)" }}>
            What Our Clients <span style={{ color: "var(--text-primary)" }}>Say</span>
          </h2>
        </div>

        {/* Row 1 — left scroll */}
        <div className="carousel-wrapper" style={{ marginBottom: "1.25rem", maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
          <div className="carousel-track">
            {ROW1.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll */}
        <div className="carousel-wrapper" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
          <div className="carousel-track carousel-track-reverse">
            {ROW2.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div
      className="glass-card"
      style={{
        width: 320,
        flexShrink: 0,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: "2px" }}>
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBB034">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65, flex: 1, fontStyle: "italic" }}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: testimonial.avatar ? `url(${testimonial.avatar}) center/cover` : "var(--gradient-hero)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {!testimonial.avatar && (
            <span style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem" }}>
              {testimonial.name?.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
            {testimonial.name}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
        <span
          className={`pill-badge pill-badge-${testimonial.service?.toLowerCase().includes("seo") ? "teal" : testimonial.service?.toLowerCase().includes("marketing") ? "violet" : "blue"}`}
          style={{ marginLeft: "auto", fontSize: "0.65rem", padding: "3px 8px" }}
        >
          {testimonial.service}
        </span>
      </div>
    </div>
  );
}
