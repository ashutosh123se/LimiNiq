"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Loader2, Mail, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { FOOTER_COMPANY, FOOTER_SERVICES } from "@/data/navigation";
import { TOOLS } from "@/data/tools";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/site";
import { cn } from "@/lib/utils";

const FEATURED_TOOLS = TOOLS.slice(0, 5);

const TRUST_BADGES = [
  { icon: Award, label: "150+ Projects Delivered" },
  { icon: Star, label: "4.9/5 Average Client Rating" },
  { icon: ShieldCheck, label: "NDA-Protected Engagements" },
  { icon: ShieldCheck, label: "Secure, GDPR-Aware Delivery" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: SITE_SOCIAL.linkedin,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: SITE_SOCIAL.instagram,
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 font-[family-name:var(--font-heading)] text-sm font-bold text-text-primary">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm font-medium text-text-primary"
      >
        You&apos;re subscribed. Welcome to LIMINIQ.
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-white/[0.03] pl-4 pr-1.5 py-1.5 transition-colors focus-within:border-accent/50">
        <Mail size={15} className="shrink-0 text-text-muted" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex shrink-0 items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03] disabled:opacity-70"
        >
          {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <Link
              href="/"
              className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-text-primary"
            >
              LIMINIQ
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Software, web, and growth marketing engineered for ambitious brands — built for
              production, not pitch decks.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="flex items-center gap-2.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <Mail size={15} className="text-accent" />
                {SITE_CONTACT.email}
              </a>
              <a
                href={`tel:${SITE_CONTACT.phoneTel}`}
                className="flex items-center gap-2.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <Phone size={15} className="text-accent" />
                {SITE_CONTACT.phone}
              </a>
            </div>
            <div className="mt-6 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <FooterColumn title="Services" links={FOOTER_SERVICES} />
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <FooterColumn title="Company" links={FOOTER_COMPANY} />
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h4 className="mb-4 font-[family-name:var(--font-heading)] text-sm font-bold text-text-primary">
              Tools
            </h4>
            <ul className="flex flex-col gap-3">
              {FEATURED_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tools"
                  className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  All Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Location + Newsletter */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <h4 className="mb-4 font-[family-name:var(--font-heading)] text-sm font-bold text-text-primary">
              Based In
            </h4>
            <p className="mb-6 flex items-start gap-2.5 text-sm text-text-secondary">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              {SITE_CONTACT.addressDisplay}
            </p>
            <h4 className="mb-3 font-[family-name:var(--font-heading)] text-sm font-bold text-text-primary">
              Stay in the loop
            </h4>
            <NewsletterForm />
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-border-subtle py-6">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-xs font-medium text-text-secondary">
              <badge.icon size={16} className="text-accent" />
              {badge.label}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-text-muted">© {year} LIMINIQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className={cn("text-sm text-text-muted transition-colors hover:text-text-secondary")}
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className={cn("text-sm text-text-muted transition-colors hover:text-text-secondary")}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
