"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/site";

const FOOTER_LINKS = {
  services: [
    { label: "Website & E-commerce", href: "/services/website-ecommerce" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "SaaS Development", href: "/services/custom-software-saas" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "SEO Services", href: "/services/seo-search-engine-marketing" },
    { label: "View All Services", href: "/services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: SITE_SOCIAL.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: SITE_SOCIAL.instagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubState(res.ok ? "success" : "error");
    } catch {
      setSubState("error");
    }
  };

  return (
    <footer
      style={{
        background: "var(--bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture overlay */}

      {/* Gradient fade from page to footer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom, var(--bg-primary), transparent)",
          pointerEvents: "none",
        }}
      />


      <div className="section-container" style={{ position: "relative", paddingTop: "5rem", paddingBottom: "2rem" }}>
        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Column 1 — Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <div style={{ position: 'relative', height: '160px', width: '160px', marginTop: '-40px', marginBottom: '-40px', marginLeft: '-12px' }}>
                <Image 
                  src="/images/logo-v2.png" 
                  alt="LimiNiq Logo" 
                  fill 
                  style={{ objectFit: 'contain', objectPosition: 'left center', filter: 'brightness(0) invert(1)' }} 
                />
              </div>
            </Link>
            <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 240 }}>
              Building the digital future, one ambitious brand at a time.
            </p>
            <p style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Based in India. Building Globally.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              <a href={`mailto:${SITE_CONTACT.email}`} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{SITE_CONTACT.email}</a>
              <span style={{ margin: "0 0.5rem", opacity: 0.35 }}>·</span>
              <a href={`tel:${SITE_CONTACT.phoneTel}`} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{SITE_CONTACT.phone}</a>
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.55)",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(59,91,255,0.25)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,91,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <FooterColumn title="Services" links={FOOTER_LINKS.services} />

          {/* Column 3 — Company */}
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />

          {/* Column 4 — Newsletter */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "white", marginBottom: "0.75rem" }}>
              Stay in the Loop
            </h4>
            <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              Get weekly insights on SEO, web dev, and digital growth.
            </p>

            {subState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "rgba(0,200,160,0.12)",
                  border: "1px solid rgba(0,200,160,0.25)",
                  borderRadius: 10,
                  padding: "0.75rem 1rem",
                  color: "var(--accent-teal)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                }}
              >
                ✓ You&apos;re subscribed! Welcome aboard.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 10,
                    padding: "0.7rem 1rem",
                    color: "white",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(59,91,255,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                />
                <button
                  type="submit"
                  disabled={subState === "loading"}
                  className="btn-primary btn-sm"
                  style={{ justifyContent: "center" }}
                >
                  {subState === "loading" ? "Subscribing..." : "Subscribe →"}
                </button>
                {subState === "error" && (
                  <p style={{ color: "#f87171", fontSize: "0.8rem", fontFamily: "var(--font-heading)" }}>
                    Something went wrong. Try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingTop: "1.5rem",
          }}
        >
          <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", margin: 0 }}>
            © {new Date().getFullYear()} LIMINIQ. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Link href="/privacy-policy" style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            >
              Privacy
            </Link>
            <Link href="/terms-of-service" style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            >
              Terms
            </Link>
            <span style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.4)", fontSize: "0.88rem" }}>
              Made with ⚡ by LIMINIQ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "white", marginBottom: "1rem" }}>
        {title}
      </h4>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.92rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
