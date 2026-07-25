"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Software", "Web", "Marketing"] as const;
type Filter = (typeof FILTERS)[number];

const TOTAL_PROJECTS_DELIVERED = 23;

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
      className="glass-card group relative flex flex-col overflow-hidden"
    >
      <div className="relative h-48 w-full overflow-hidden border-b border-[var(--border-subtle)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={study.imageSrc}
          alt={study.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          {study.category}
        </span>
        <span className="absolute right-3 top-3 font-mono text-[0.65rem] text-white/70">{study.year}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary">{study.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">{study.summary}</p>

        <ul className="flex flex-wrap gap-2">
          {study.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-[var(--border-subtle)] bg-white/[0.03] px-2 py-1 text-[0.68rem] font-medium text-text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
          <div className="flex flex-wrap gap-3">
            {study.results.slice(0, 2).map((r) => (
              <div key={r.label}>
                <span className="block font-heading text-sm font-bold text-[var(--signal)]">{r.value}</span>
                <span className="block text-[0.62rem] uppercase tracking-wide text-text-muted">{r.label}</span>
              </div>
            ))}
          </div>
          {study.liveUrl ? (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-[var(--accent)] transition-transform hover:translate-x-0.5"
            >
              Visit <ExternalLink size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-text-muted">
              Case study <ArrowUpRight size={13} />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudyGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.category === filter);
  const moreCount = Math.max(TOTAL_PROJECTS_DELIVERED - CASE_STUDIES.length, 0);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
              <span className="text-[var(--signal)]">§04</span> Selected Work
            </motion.span>
            <motion.h2
              variants={revealVariants}
              className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
            >
              Products We&apos;ve <span className="heading-accent">Shipped</span>
            </motion.h2>
          </div>

          <motion.div variants={revealVariants} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 font-heading text-sm font-semibold transition-all",
                  filter === f
                    ? "border-transparent bg-[var(--accent)] text-white shadow-[0_4px_20px_rgba(108,92,231,0.35)]"
                    : "border-[var(--border-subtle)] bg-white/[0.03] text-text-secondary hover:border-[var(--border-hover)] hover:text-text-primary"
                )}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((study, i) => <CaseStudyCard key={study.slug} study={study} index={i} />)
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center text-text-secondary"
              >
                More {filter.toLowerCase()} case studies are on the way — see the full archive below.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white/[0.02] px-6 py-8 text-center"
        >
          <span className="font-heading text-2xl font-extrabold text-gradient">+{moreCount} more</span>
          <p className="max-w-md text-sm text-text-secondary">
            Software, web, and marketing builds delivered for production — see the full delivery
            archive.
          </p>
          <Link href="/portfolio" className="btn-secondary">
            View Full Portfolio <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
