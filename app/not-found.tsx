import type { Metadata } from "next";
import Link from "next/link";
import { Home, LayoutGrid, Briefcase, Mail, Search } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MarketingChrome } from "@/components/layout/MarketingChrome";

export const metadata: Metadata = {
  title: "Page Not Found | LIMINIQ",
  description:
    "The page you're looking for doesn't exist or has moved. Explore LIMINIQ's services, portfolio, or get in touch.",
  robots: { index: false, follow: true },
};

const QUICK_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: LayoutGrid },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="not-found-page">
        <div className="not-found-glow" aria-hidden />
        <div className="not-found-grid-bg" aria-hidden />

        <div className="section-container not-found-inner">
          <span className="not-found-code">404</span>
          <h1 className="not-found-title">
            Page not found — looks like this
            <br />
            <span className="text-gradient">signal got lost.</span>
          </h1>
          <p className="not-found-desc">
            The page you&apos;re looking for may have moved, been renamed, or never existed. Try one of the
            destinations below.
          </p>

          <div className="not-found-links">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="not-found-link-card glass-card">
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="not-found-search-hint">
            <Search size={14} />
            Tip: press <kbd>⌘K</kbd> <span className="not-found-search-hint-sep">/</span> <kbd>Ctrl K</kbd> anywhere
            on the site to instantly search services, tools, and blog posts.
          </div>
        </div>
      </main>
      <Footer />
      <MarketingChrome />

      <style>{`
        .not-found-page {
          position: relative;
          min-height: 78vh;
          padding: 9rem 0 6rem;
          overflow: hidden;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
        }
        .not-found-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 640px;
          height: 400px;
          background: radial-gradient(ellipse, var(--accent-muted), transparent 70%);
          pointer-events: none;
        }
        .not-found-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image: radial-gradient(rgba(108, 92, 231, 0.18) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 70% 55% at 50% 20%, black, transparent);
          pointer-events: none;
        }
        .not-found-inner {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 640px;
        }
        .not-found-code {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: clamp(3.5rem, 12vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          background: var(--gradient-signature);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        .not-found-title {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 1.1rem;
        }
        .not-found-desc {
          font-size: 1.02rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 2rem;
        }
        .not-found-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 2.25rem;
        }
        @media (min-width: 560px) {
          .not-found-links { grid-template-columns: repeat(4, 1fr); }
        }
        .not-found-link-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.1rem 0.75rem;
          border-radius: 16px;
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .not-found-link-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-hover);
          color: var(--accent);
        }
        .not-found-search-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .not-found-search-hint-sep {
          color: var(--text-tertiary);
        }
        .not-found-search-hint kbd {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
          background: var(--glass-2);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
