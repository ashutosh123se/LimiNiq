"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Command,
  Compass,
  CornerDownLeft,
  FileText,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { TOOLS } from "@/data/tools";
import { cn } from "@/lib/utils";

interface PaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  group: "Service" | "Tool" | "Blog" | "Page";
  icon: LucideIcon;
}

/** Hardcoded blog post titles (DB-backed blog has no static export to import from). */
const BLOG_POSTS = [
  { title: "Core Web Vitals 2025: The Complete Developer's Playbook", slug: "core-web-vitals-2025" },
  { title: "Entity SEO: Why Google's Knowledge Graph Is Your Biggest Ranking Lever", slug: "entity-seo-knowledge-graph" },
  { title: "Why Your Website Isn't Ranking on AI Search Engines", slug: "why-website-not-ranking-ai-search" },
  { title: "Headless Commerce in 2026: When It's Worth the Migration", slug: "headless-commerce-2026" },
];

const QUICK_PAGES = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Industries", href: "/industries" },
  { title: "Tools", href: "/tools" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const ITEMS: PaletteItem[] = [
  ...SERVICES.map((s) => ({
    id: `service-${s.slug}`,
    title: s.name,
    subtitle: s.tagline,
    href: `/services/${s.slug}`,
    group: "Service" as const,
    icon: Briefcase,
  })),
  ...TOOLS.map((t) => ({
    id: `tool-${t.slug}`,
    title: t.name,
    subtitle: t.description,
    href: `/tools/${t.slug}`,
    group: "Tool" as const,
    icon: Wrench,
  })),
  ...BLOG_POSTS.map((b) => ({
    id: `blog-${b.slug}`,
    title: b.title,
    subtitle: "Blog post",
    href: `/blog/${b.slug}`,
    group: "Blog" as const,
    icon: FileText,
  })),
  ...QUICK_PAGES.map((p) => ({
    id: `page-${p.href}`,
    title: p.title,
    subtitle: "Page",
    href: p.href,
    group: "Page" as const,
    icon: Compass,
  })),
];

const fuse = new Fuse(ITEMS, {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "subtitle", weight: 0.3 },
  ],
  threshold: 0.34,
  ignoreLocation: true,
});

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return ITEMS.slice(0, 8);
    return fuse.search(trimmed).slice(0, 8).map((r) => r.item);
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  function select(item: PaletteItem) {
    setOpen(false);
    router.push(item.href);
  }

  function handleKeyNav(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) select(item);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary shadow-2xl shadow-black/60"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4">
              <Search size={18} className="shrink-0 text-text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNav}
                placeholder="Search services, tools, blog…"
                className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
              <kbd className="hidden shrink-0 rounded border border-border-subtle px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-text-muted sm:block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="px-5 py-10 text-center text-sm text-text-muted">
                  No results for &ldquo;{query}&rdquo;.
                </p>
              )}
              {results.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => select(item)}
                    className={cn(
                      "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors",
                      i === activeIndex ? "bg-accent/10" : "hover:bg-white/5"
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent">
                      <Icon size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-text-primary">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span className="block truncate text-xs text-text-muted">{item.subtitle}</span>
                      )}
                    </span>
                    <span className="shrink-0 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-text-muted">
                      {item.group}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="hidden items-center justify-between border-t border-border-subtle px-5 py-3 text-[11px] text-text-muted sm:flex">
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={12} /> Select
                </span>
                <span className="flex items-center gap-1">
                  <ArrowUp size={12} />
                  <ArrowDown size={12} /> Navigate
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Command size={12} />K to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
