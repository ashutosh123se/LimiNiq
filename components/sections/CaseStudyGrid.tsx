"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getFeaturedCaseStudies } from "@/data/caseStudies";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

export function CaseStudyGrid() {
  const featured = getFeaturedCaseStudies(3);
  const [primary, secondary, tertiary] = featured;

  return (
    <section className="section-padding relative overflow-hidden bg-bg-secondary">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 max-w-3xl"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 04 case <em className="font-[family-name:var(--font-display)] not-italic italic">studies</em>
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-primary"
          >
            Brands we&apos;ve scaled
            <br />
            to <span className="heading-accent">measurable growth.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-4 text-sm text-text-secondary">
            Selected work · 2023–2026 · <em>three featured</em>
          </motion.p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {primary && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="group overflow-hidden rounded-[1.75rem] border border-border-subtle bg-white shadow-sm lg:col-span-7"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFF6FF]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primary.imageSrc}
                  alt={primary.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                  {primary.category} ★ Featured
                </span>
              </div>
              <div className="p-7 lg:p-9">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  {primary.category} · {primary.year}
                </p>
                <h3 className="mb-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
                  {primary.title}
                  <span className="text-accent">.</span>
                </h3>
                <p className="mb-6 max-w-xl text-text-secondary">{primary.summary}</p>
                <div className="mb-6 flex flex-wrap gap-8 border-y border-border-subtle py-5">
                  {primary.results.slice(0, 3).map((r) => (
                    <div key={r.label}>
                      <div className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-accent">
                        {r.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-wide text-text-muted">{r.label}</div>
                    </div>
                  ))}
                </div>
                {primary.liveUrl ? (
                  <a
                    href={primary.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
                  >
                    Visit live <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link
                    href={`/portfolio/${primary.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
                  >
                    Case study <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            </motion.article>
          )}

          <div className="flex flex-col gap-5 lg:col-span-5">
            {[secondary, tertiary].filter(Boolean).map((study) => (
              <motion.article
                key={study!.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                className="flex flex-1 flex-col overflow-hidden rounded-[1.5rem] border border-border-subtle bg-white shadow-sm sm:flex-row lg:flex-col xl:flex-row"
              >
                <div className="relative h-40 w-full shrink-0 bg-[#EFF6FF] sm:h-auto sm:w-40 lg:h-40 lg:w-full xl:h-auto xl:w-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study!.imageSrc}
                    alt={study!.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-5">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {study!.category} · {study!.year}
                  </p>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-extrabold text-text-primary">
                    {study!.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap gap-4">
                    {study!.results.slice(0, 2).map((r) => (
                      <div key={r.label}>
                        <span className="block font-bold text-accent">{r.value}</span>
                        <span className="text-[10px] uppercase text-text-muted">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm text-text-secondary">
            Software, web, and growth builds across India and global clients — sorted by category +
            outcome.
          </p>
          <Link href="/portfolio" className="btn-secondary shrink-0">
            Explore more brands <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
