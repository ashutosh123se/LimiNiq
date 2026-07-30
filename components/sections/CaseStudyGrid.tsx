"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getFeaturedCaseStudies, type CaseStudy } from "@/data/caseStudies";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

function StudyLink({
  study,
  className,
  children,
}: {
  study: CaseStudy;
  className?: string;
  children: React.ReactNode;
}) {
  if (study.liveUrl) {
    return (
      <a
        href={study.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={`/portfolio/${study.slug}`} className={className}>
      {children}
    </Link>
  );
}

function FeaturedStudy({ study }: { study: CaseStudy }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative isolate min-h-[28rem] overflow-hidden rounded-[1.75rem] lg:min-h-[36rem]"
    >
      <Image
        src={study.imageSrc}
        alt={study.title}
        fill
        priority
        sizes="100vw"
        className="object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.06]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#06101F]/95 via-[#0B1F3A]/78 to-[#0B1F3A]/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#06101F]/90 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative flex h-full min-h-[28rem] flex-col justify-between p-7 sm:p-10 lg:min-h-[36rem] lg:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            01 · Featured
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-blue-200/80">
            {study.category} · {study.year}
          </span>
        </div>

        <div className="max-w-2xl">
          <h3 className="font-[family-name:var(--font-heading)] text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
            {study.title}
            <span className="text-blue-300">.</span>
          </h3>
          <p className="mt-4 max-w-lg text-base text-white/70 sm:text-lg">{study.summary}</p>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
            {study.results.slice(0, 3).map((r) => (
              <div key={r.label}>
                <div className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-white sm:text-3xl">
                  {r.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/50">
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          <StudyLink
            study={study}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-blue-50"
          >
            {study.liveUrl ? "Visit live site" : "Open case study"}
            {study.liveUrl ? <ExternalLink size={15} /> : <ArrowUpRight size={15} />}
          </StudyLink>
        </div>
      </div>
    </motion.article>
  );
}

function StudyRow({
  study,
  index,
  flip,
}: {
  study: CaseStudy;
  index: number;
  flip?: boolean;
}) {
  const reduced = useReducedMotion();
  const n = String(index).padStart(2, "0");

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-border-subtle bg-[#F8FAFD]"
    >
      <div
        className={cn(
          "grid lg:grid-cols-12 lg:items-stretch",
          flip && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]"
        )}
      >
        <div className="relative flex flex-col justify-center px-6 py-8 sm:px-8 lg:col-span-5 lg:px-10 lg:py-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-[family-name:var(--font-display)] text-4xl italic leading-none text-accent/25 lg:text-5xl">
              {n}
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              {study.category} · {study.year}
            </span>
          </div>

          <h3 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-text-primary">
            {study.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-subtle bg-white px-3 py-1 text-[11px] font-medium text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-6">
            {study.results.slice(0, 2).map((r) => (
              <div key={r.label}>
                <div className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-accent">
                  {r.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          <StudyLink
            study={study}
            className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-text-primary transition group-hover:text-accent"
          >
            View project
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-white transition group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight size={14} />
            </span>
          </StudyLink>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[22rem]">
            <Image
              src={study.imageSrc}
              alt={study.title}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/35 via-transparent to-transparent lg:bg-gradient-to-r",
                flip
                  ? "lg:from-transparent lg:via-transparent lg:to-[#F8FAFD]/40"
                  : "lg:from-[#F8FAFD]/40 lg:via-transparent lg:to-transparent"
              )}
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudyGrid() {
  const featured = getFeaturedCaseStudies(3);
  const [primary, secondary, tertiary] = featured;
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-32 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
      </div>

      <div className="section-container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <motion.p variants={revealVariants} className="section-number mb-3">
              § 04 case{" "}
              <em className="font-[family-name:var(--font-display)] not-italic italic">studies</em>
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-primary"
            >
              Brands we&apos;ve scaled
              <br />
              to{" "}
              <span className="relative inline-block">
                <span className="relative z-[1]">measurable growth</span>
                <motion.span
                  className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-sm bg-blue-200/70"
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
              </span>
              .
            </motion.h2>
          </div>
          <motion.p
            variants={revealVariants}
            className="max-w-xs text-sm leading-relaxed text-text-secondary lg:text-right"
          >
            Selected work · 2023–2026
            <br />
            <em className="font-[family-name:var(--font-display)] text-accent not-italic italic">
              three featured builds
            </em>
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-5 lg:gap-7">
          {primary && <FeaturedStudy study={primary} />}
          {secondary && <StudyRow study={secondary} index={2} />}
          {tertiary && <StudyRow study={tertiary} index={3} flip />}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center lg:mt-16">
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
