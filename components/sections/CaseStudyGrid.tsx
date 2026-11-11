"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Lock,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
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

/**
 * Flagship Featured Case Study Card:
 * Re-architected into a clean 2-column split showcase so text is never overlaid
 * directly over complex chart graphics, ensuring 100% legibility and Silicon Valley-grade aesthetics.
 */
function FeaturedStudy({ study }: { study: CaseStudy }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#060D1E] via-[#09152C] to-[#060B18] p-6 text-white shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10 xl:p-12"
    >
      {/* Background Ambient Radial Spotlights */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-500/15 blur-[120px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        {/* LEFT COLUMN: Clear, High-Contrast Case Study Narrative */}
        <div className="flex flex-col justify-center lg:col-span-5 xl:col-span-5">
          {/* Header Badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              01 · Flagship AI Build
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {study.category} · {study.year}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
            {study.title}
            <span className="text-sky-400">.</span>
          </h3>

          {/* Client Context */}
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-sky-300/80">
            {study.clientContext}
          </p>

          {/* Problem & Solution Summary */}
          <p className="mt-3.5 text-sm leading-relaxed text-slate-300/90 sm:text-base">
            {study.summary}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {study.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] font-medium text-slate-200 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* High-Impact Metric Cards Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
            {study.results.slice(0, 3).map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm"
              >
                <div className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-white sm:text-2xl">
                  {r.value}
                </div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-sky-200/70 leading-tight">
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/portfolio/${study.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_0_24px_rgba(56,189,248,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(56,189,248,0.6)]"
            >
              Explore Full Case Study
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15"
              >
                Visit Live Site <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Dedicated Visual Device Mockup Frame */}
        <div className="relative lg:col-span-7 xl:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#050914] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* macOS-style Browser Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#070D1B] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] text-slate-300">
                <Lock size={10} className="text-emerald-400" />
                <span className="text-slate-400">https://</span>
                <span className="text-white font-medium">leadflow.app/pipeline</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 font-bold hidden sm:inline-block">
                ● LIVE
              </span>
            </div>

            {/* Dashboard Screenshot Display */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <Image
                src={study.imageSrc}
                alt={`${study.title} - ${study.category} Software Architecture by LIMINIQ`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Subtle bottom vignette to blend mockup */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E]/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating 3D Metric Badge Over Preview */}
              <motion.div
                animate={reduced ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 z-20 hidden sm:block"
              >
                <div className="flex items-center gap-2.5 rounded-xl border border-sky-400/40 bg-[#060B18]/92 px-3.5 py-2 shadow-2xl backdrop-blur-xl">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">
                    <Zap size={14} />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-sky-300 font-bold">
                      Sub-Second Routing
                    </div>
                    <div className="text-xs font-bold text-white">0.38s LLM Response</div>
                  </div>
                </div>
              </motion.div>

              {/* Top Floating Badge */}
              <div className="absolute right-4 top-4 z-20 hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#060B18]/90 px-3 py-1 text-[10.5px] font-bold text-emerald-300 backdrop-blur-md shadow-lg">
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>100% Audit Visible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Secondary Case Study Rows (02 & 03):
 * Elevated modern cards with crisp typography, subtle glass borders, and browser frame mockups.
 */
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
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_20px_48px_rgba(37,99,235,0.08)] sm:p-8 lg:p-10"
    >
      <div
        className={cn(
          "grid items-center gap-8 lg:grid-cols-12 lg:gap-10",
          flip && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]"
        )}
      >
        {/* TEXT CONTENT COLUMN */}
        <div className="flex flex-col justify-center lg:col-span-5">
          {/* Badge & Number */}
          <div className="mb-4 flex items-center gap-3">
            <span className="font-[family-name:var(--font-heading)] text-2xl font-black text-blue-600 sm:text-3xl">
              {n}
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {study.category} · {study.year}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ml-auto" />
          </div>

          <h3 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,2.8vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-slate-900 group-hover:text-blue-600 transition-colors">
            {study.title}
          </h3>

          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-600/80">
            {study.clientContext}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {study.summary}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {study.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[11px] font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Measurable Results Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
            {study.results.slice(0, 2).map((r) => (
              <div key={r.label} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <div className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-blue-600">
                  {r.value}
                </div>
                <div className="mt-0.5 text-[10.5px] font-medium uppercase tracking-wider text-slate-500">
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          {/* Link */}
          <div className="mt-7">
            <Link
              href={`/portfolio/${study.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition group-hover:text-blue-600"
            >
              Explore Project Overview
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                <ArrowUpRight size={13} />
              </span>
            </Link>
          </div>
        </div>

        {/* IMAGE / BROWSER MOCKUP COLUMN */}
        <div className="relative lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-700/60 bg-slate-800/90 px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                <span className="h-2 w-2 rounded-full bg-slate-600" />
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-slate-400">
                <Globe size={10} className="text-blue-400" />
                <span>{study.slug}.liminiq.preview</span>
              </div>
              <span className="text-[9.5px] font-mono text-emerald-400 font-bold">● ACTIVE</span>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
              <Image
                src={study.imageSrc}
                alt={`${study.title} - ${study.category} Platform Architecture by LIMINIQ`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudyGrid() {
  const featured = getFeaturedCaseStudies(3);
  const [primary, secondary, tertiary] = featured;

  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-16 lg:py-24">
      {/* Ambient Lighting & Technical Dot Matrix Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-sky-400/5 to-transparent blur-[120px]" />
        <div className="absolute -left-20 bottom-1/4 h-80 w-80 rounded-full bg-indigo-400/10 blur-[100px]" />
        {/* Subtle dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 50%, transparent 95%)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.div variants={revealVariants} className="mb-3.5 inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-2xs backdrop-blur-sm">
                <Sparkles size={13} className="text-blue-600" />
                Flagship Case Studies &amp; Outcomes
              </span>
            </motion.div>
            <motion.h2
              variants={revealVariants}
              className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.1]"
            >
              Enterprise Systems &amp;{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Measurable Results.
              </span>
            </motion.h2>
            <motion.p
              variants={revealVariants}
              className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl"
            >
              From autonomous AI pipelines to high-traffic SaaS marketplaces — inspect production
              codebases and architectural outcomes shipped for international clients.
            </motion.p>
          </div>

          <motion.div
            variants={revealVariants}
            className="flex flex-col items-start lg:items-end text-xs font-mono text-slate-500"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Selected Works · 2024–2026
            </span>
            <span className="mt-1 text-[11px] text-slate-400">
              Fixed Milestones • Full IP Ownership
            </span>
          </motion.div>
        </motion.div>

        {/* Case Studies Stack */}
        <div className="flex flex-col gap-7 lg:gap-9">
          {primary && <FeaturedStudy study={primary} />}
          {secondary && <StudyRow study={secondary} index={2} />}
          {tertiary && <StudyRow study={tertiary} index={3} flip />}
        </div>

        {/* Bottom Navigation Strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row sm:items-center lg:mt-16">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Need a custom architecture or technical roadmap?
            </h4>
            <p className="text-sm text-slate-600">
              We design, build, and deploy production software with transparent milestone sprints.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-600 shrink-0"
          >
            Explore All 15+ Case Studies <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
