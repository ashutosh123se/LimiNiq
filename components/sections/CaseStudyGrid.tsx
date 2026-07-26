"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getFeaturedCaseStudies } from "@/data/caseStudies";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

export function CaseStudyGrid() {
  const featured = getFeaturedCaseStudies(3);
  const [primary, ...rest] = featured;

  return (
    <section className="section-padding relative overflow-hidden bg-bg-secondary">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 04 · case studies
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="max-w-2xl font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4.2vw,3.2rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Brands we&apos;ve scaled to{" "}
            <span className="heading-accent">measurable growth.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-3 text-sm text-text-secondary">
            Selected work · 2023–2026 · <em>three featured</em>
          </motion.p>
        </motion.div>

        {primary && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="mb-6 overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-sm lg:grid lg:grid-cols-2"
          >
            <div className="relative min-h-[240px] border-b border-border-subtle bg-accent-muted lg:min-h-[360px] lg:border-b-0 lg:border-r">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={primary.imageSrc}
                alt={primary.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                {primary.category} · Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                {primary.category} · {primary.year}
              </p>
              <h3 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold text-text-primary lg:text-4xl">
                {primary.title}
              </h3>
              <p className="mb-6 text-text-secondary">{primary.summary}</p>
              <div className="mb-8 flex flex-wrap gap-6">
                {primary.results.slice(0, 3).map((r) => (
                  <div key={r.label}>
                    <div className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-accent">
                      {r.value}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-text-muted">{r.label}</div>
                  </div>
                ))}
              </div>
              {primary.liveUrl ? (
                <a
                  href={primary.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  Visit live <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  href={`/portfolio/${primary.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  Case study <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          </motion.article>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((study) => (
            <motion.article
              key={study.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm"
            >
              <div className="relative h-44 overflow-hidden border-b border-border-subtle bg-accent-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={study.imageSrc} alt={study.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {study.category} · {study.year}
                </p>
                <h3 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-bold text-text-primary">
                  {study.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-text-secondary">{study.summary}</p>
                <div className="flex flex-wrap gap-4">
                  {study.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <span className="block font-semibold text-accent">{r.value}</span>
                      <span className="text-[10px] uppercase text-text-muted">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/portfolio" className="btn-secondary">
            Explore more brands <ArrowUpRight size={16} />
          </Link>
          <p className="mt-3 text-sm text-text-muted">
            Software, web, and marketing builds across India and global clients
          </p>
        </div>
      </div>
    </section>
  );
}
