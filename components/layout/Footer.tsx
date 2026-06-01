"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  services: [
    { label: "Website Development", href: "/services/website-development" },
    { label: "SEO Services", href: "/services/seo" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Full-Stack Suite", href: "/pricing" },
    { label: "Free Audit", href: "/contact" },
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
    href: "https://linkedin.com/company/liminiq",
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
    href: "https://instagram.com/liminiq",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/liminiq",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/liminiq",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
        background: "var(--bg-dark)",
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
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--gradient-hero)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <text x="2" y="15" fontFamily="Syne, sans-serif" fontWeight="800" fontSize="13" fill="white">LN</text>
                </svg>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "white", letterSpacing: "-0.02em" }}>
                LIMI<span style={{ color: "var(--text-primary)" }}>NIQ</span>
              </span>
            </Link>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 240 }}>
              Building the digital future, one ambitious brand at a time.
            </p>
            <p style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Based in India. Building Globally.
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
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>
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
                    fontFamily: "var(--font-body)",
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
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", margin: 0 }}>
            © {new Date().getFullYear()} LIMINIQ. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Link href="/privacy-policy" style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
            >
              Privacy
            </Link>
            <Link href="/terms-of-service" style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
            >
              Terms
            </Link>
            <span style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.25)", fontSize: "0.82rem" }}>
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
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.88rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
