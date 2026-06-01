"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "/services/website-development" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="section-container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Animated LN Monogram */}
              <LogoMark />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                LIMI
                <span>NI</span>
                <span style={{ color: "var(--accent-primary)" }}>Q</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div style={{ display: "none", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link${pathname === link.href || pathname.startsWith(link.href + "/") ? " active" : ""}`}
                  style={{ padding: "0.4rem 0.75rem" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div style={{ display: "none", alignItems: "center", gap: "1rem" }} className="desktop-cta">
              <Link href="/contact" className="btn-primary btn-sm">
                Get Free Audit
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                style={{ display: "block", width: 24, height: 2, background: "var(--text-primary)", borderRadius: 2, transformOrigin: "center" }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                style={{ display: "block", width: 24, height: 2, background: "var(--text-primary)", borderRadius: 2 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                style={{ display: "block", width: 24, height: 2, background: "var(--text-primary)", borderRadius: 2, transformOrigin: "center" }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5, 5, 10, 0.95)",
              backdropFilter: "blur(20px)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
                fontSize: "1.5rem",
              }}
              aria-label="Close menu"
            >
              ✕
            </button>

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 6vw, 2.5rem)",
                    fontWeight: 700,
                    color: pathname === link.href ? "var(--accent-blue)" : "var(--text-primary)",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                    padding: "0.5rem 2rem",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 + 0.05 }}
              style={{ marginTop: "1.5rem" }}
            >
              <Link href="/contact" className="btn-primary">
                Get Free Audit →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 899px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function LogoMark() {
  return (
    <motion.div
      style={{
        width: 32,
        height: 32,
        background: "var(--accent-primary)",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      animate={{ boxShadow: ["0 0 0px rgba(109,40,217,0.3)", "0 0 16px rgba(109,40,217,0.5)", "0 0 0px rgba(109,40,217,0.3)"] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <text x="2" y="15" fontFamily="Syne, sans-serif" fontWeight="800" fontSize="13" fill="white">LN</text>
      </svg>
    </motion.div>
  );
}
