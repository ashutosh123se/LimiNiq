"use client";

import { Star, Quote, Linkedin, CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const MID = Math.ceil(TESTIMONIALS.length / 2);
const ROW_1 = TESTIMONIALS.slice(0, MID);
const ROW_2 = TESTIMONIALS.slice(MID);

const REVIEW_PLATFORMS = [
  {
    name: "Clutch",
    score: "4.9 / 5.0",
    label: "Top Software & AI Agency",
    href: "https://clutch.co/profile/[CLUTCH_PROFILE_URL]",
  },
  {
    name: "Google Reviews",
    score: "4.9★",
    label: "Verified Client Reviews",
    href: "https://maps.google.com/?cid=[GOOGLE_REVIEW_URL]",
  },
  {
    name: "GoodFirms",
    score: "4.9★",
    label: "Top Custom Software Developers",
    href: "https://www.goodfirms.co/company/[GOODFIRMS_PROFILE_URL]",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating ?? 5;
  const fullStars = Math.floor(rating);

  return (
    <div className="glass-card mx-3 flex w-[340px] shrink-0 flex-col justify-between gap-4 p-6 sm:w-[400px]">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-[var(--signal-amber)] text-[var(--signal-amber)]"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {testimonial.verified && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[var(--signal)]">
                <CheckCircle2 size={12} /> Verified
              </span>
            )}
            <Quote size={16} className="text-text-muted/60" />
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] font-heading text-sm font-bold text-[var(--accent)]">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-heading text-sm font-bold text-text-primary">
                {testimonial.name}
              </span>
              {testimonial.linkedinUrl && (
                <a
                  href={testimonial.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View LinkedIn profile"
                  className="text-text-muted hover:text-[var(--accent)] transition-colors"
                >
                  <Linkedin size={13} />
                </a>
              )}
            </div>
            <span className="block truncate text-xs text-text-muted">
              {testimonial.roleCompany} · {testimonial.location}
            </span>
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-[var(--border-subtle)] px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-text-muted ml-2">
          {testimonial.serviceTag}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const trackItems = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {trackItems.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  return (
    <section className="section-padding relative overflow-hidden" id="social-proof">
      <div className="section-container relative z-10 mb-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
            <span className="text-[var(--signal)]">✦</span> Verified Client Proof
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Trusted By Founders & Tech Leaders <span className="heading-accent">Globally</span>
          </motion.h2>

          {/* Unified Verified Rating Display */}
          <motion.div
            variants={revealVariants}
            className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-bg-secondary px-6 py-3"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[var(--signal-amber)] text-[var(--signal-amber)]" />
                ))}
              </div>
              <span className="font-heading text-lg font-extrabold text-text-primary">4.9 / 5.0</span>
            </div>
            <span className="hidden sm:inline h-4 w-px bg-[var(--border-strong)]" />
            <span className="text-xs text-text-secondary">
              Verified Average Client Rating Across North America, Europe & Asia
            </span>
          </motion.div>

          {/* External Review Platforms Badges */}
          <motion.div
            variants={revealVariants}
            className="mt-5 flex flex-wrap items-center justify-center gap-3"
          >
            {REVIEW_PLATFORMS.map((rp) => (
              <a
                key={rp.name}
                href={rp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-bg-elevated px-3.5 py-1.5 text-xs font-medium text-text-secondary hover:border-[var(--accent)] transition-colors"
              >
                <span className="font-bold text-text-primary">{rp.name}</span>
                <span className="text-[var(--signal)] font-semibold">{rp.score}</span>
                <ExternalLink size={11} className="text-text-muted" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>

      <div className="mt-8 text-center">
        <p className="text-[11px] text-text-muted">
          * Direct client references, verified milestone delivery records, and GitHub repository access available for audit under mutual NDA. [VERIFIED_REVIEW_SOURCE]
        </p>
      </div>
    </section>
  );
}
