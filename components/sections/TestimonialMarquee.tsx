"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const MID = Math.ceil(TESTIMONIALS.length / 2);
const ROW_1 = TESTIMONIALS.slice(0, MID);
const ROW_2 = TESTIMONIALS.slice(MID);

const AVERAGE_RATING = (
  TESTIMONIALS.reduce((sum, t) => sum + (t.rating ?? 5), 0) / TESTIMONIALS.length
).toFixed(1);

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating ?? 5;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className="glass-card mx-3 flex w-[340px] shrink-0 flex-col gap-4 p-6 sm:w-[400px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < fullStars
                  ? "fill-[var(--signal-amber)] text-[var(--signal-amber)]"
                  : i === fullStars && hasHalf
                    ? "fill-[var(--signal-amber)] text-[var(--signal-amber)] opacity-60"
                    : "text-[var(--border-strong)]"
              }
            />
          ))}
        </div>
        <Quote size={18} className="text-text-muted/60" />
      </div>

      <p className="line-clamp-4 text-sm leading-relaxed text-text-secondary">&ldquo;{testimonial.quote}&rdquo;</p>

      <div className="mt-auto flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] font-heading text-sm font-bold text-[var(--accent)]">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div className="min-w-0">
          <span className="block truncate font-heading text-sm font-bold text-text-primary">
            {testimonial.name}
          </span>
          <span className="block truncate text-xs text-text-muted">{testimonial.roleCompany}</span>
        </div>
        <span className="ml-auto shrink-0 rounded-full border border-[var(--border-subtle)] px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-text-muted">
          {testimonial.serviceTag}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10 mb-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
            <span className="text-[var(--signal)]">✦</span> Client Voices
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Trusted By Founders <span className="heading-accent">Who Ship</span>
          </motion.h2>

          <motion.div
            variants={revealVariants}
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-5 py-3"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-[var(--signal-amber)] text-[var(--signal-amber)]" />
              ))}
            </div>
            <span className="font-heading text-lg font-extrabold text-text-primary">{AVERAGE_RATING}</span>
            <span className="h-4 w-px bg-[var(--border-strong)]" />
            <span className="text-sm text-text-secondary">{TESTIMONIALS.length}+ Google reviews</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>
    </section>
  );
}
