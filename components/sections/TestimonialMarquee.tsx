"use client";

import { Star, Quote, CheckCircle2, ExternalLink } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import { motion } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { SITE_RATING, REVIEW_PLATFORMS_CONFIG } from "@/lib/site";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const MID = Math.ceil(TESTIMONIALS.length / 2);
const ROW_1 = TESTIMONIALS.slice(0, MID);
const ROW_2 = TESTIMONIALS.slice(MID);

// Only show platform badges when a verified public URL is configured in environment/config
const ACTIVE_REVIEW_PLATFORMS = [
  REVIEW_PLATFORMS_CONFIG.clutchUrl
    ? { name: "Clutch", score: "4.9 / 5.0", href: REVIEW_PLATFORMS_CONFIG.clutchUrl }
    : null,
  REVIEW_PLATFORMS_CONFIG.googleReviewUrl
    ? { name: "Google Reviews", score: "4.9★", href: REVIEW_PLATFORMS_CONFIG.googleReviewUrl }
    : null,
  REVIEW_PLATFORMS_CONFIG.goodfirmsUrl
    ? { name: "GoodFirms", score: "4.9★", href: REVIEW_PLATFORMS_CONFIG.goodfirmsUrl }
    : null,
].filter(Boolean) as { name: string; score: string; href: string }[];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating ?? 5;
  const fullStars = Math.floor(rating);
  const isVerified = Boolean(testimonial.verified && testimonial.linkedinUrl);

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
            {isVerified && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-blue-600">
                <CheckCircle2 size={12} /> Verified
              </span>
            )}
            <Quote size={16} className="text-slate-400" />
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-sm font-bold text-slate-900">
                {testimonial.name}
              </span>
              {testimonial.linkedinUrl && (
                <a
                  href={testimonial.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${testimonial.name} on LinkedIn`}
                  className="text-slate-400 transition-colors hover:text-blue-600"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {testimonial.roleCompany}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
            {testimonial.location}
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex shrink-0 animate-marquee gap-0 py-2"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: "50s",
        }}
      >
        {items.map((t) => (
          <TestimonialCard key={`row1-${t.id}`} testimonial={t} />
        ))}
      </div>
      <div
        className="flex shrink-0 animate-marquee gap-0 py-2"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: "50s",
        }}
        aria-hidden
      >
        {items.map((t) => (
          <TestimonialCard key={`row2-${t.id}`} testimonial={t} />
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
          <motion.div variants={revealVariants} className="mb-3 inline-flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <span className="text-blue-600">✦</span> Client Outcomes
            </span>
          </motion.div>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Trusted By Engineering Leaders{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Worldwide.
            </span>
          </motion.h2>

          {/* Unified Verified Rating Display */}
          <motion.div
            variants={revealVariants}
            className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3 shadow-2xs"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[var(--signal-amber)] text-[var(--signal-amber)]" />
                ))}
              </div>
              <span className="font-heading text-lg font-extrabold text-slate-900">
                {SITE_RATING.score} / {SITE_RATING.scale}
              </span>
            </div>
            <span className="hidden sm:inline h-4 w-px bg-slate-200" />
            <span className="text-xs text-slate-600">
              {SITE_RATING.label} Across Delivered Software Engagements
            </span>
          </motion.div>

          {/* External Review Platforms Badges — Shown only when real profiles exist */}
          {ACTIVE_REVIEW_PLATFORMS.length > 0 && (
            <motion.div
              variants={revealVariants}
              className="mt-5 flex flex-wrap items-center justify-center gap-3"
            >
              {ACTIVE_REVIEW_PLATFORMS.map((rp) => (
                <a
                  key={rp.name}
                  href={rp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-2xs"
                >
                  <span className="font-bold text-slate-900">{rp.name}</span>
                  <span className="text-blue-600 font-semibold">{rp.score}</span>
                  <ExternalLink size={11} className="text-slate-400" />
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          Client project summaries and technical scope deliverables are available for review upon request.
        </p>
      </div>
    </section>
  );
}
