"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { HeroMediaBackground } from "@/components/media/HeroMediaBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatCounter } from "@/components/ui/StatCounter";
import { revealVariants, staggerContainer } from "@/lib/motion";
import { SITE_CONTACT } from "@/lib/site";
import { WHATSAPP_URL } from "@/data/navigation";

const PAINS = [
  "missed deadlines.",
  "ghosting vendors.",
  "redoing it twice.",
  "chasing updates.",
  "waiting months.",
  "surprise costs.",
];

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 12, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 49, suffix: "/10★", label: "Client Rating" },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32">
      <HeroMediaBackground />

      <div className="section-container relative z-10 pb-16 lg:pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={revealVariants}
            className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            Software · Web · Growth · Est 2019
          </motion.p>

          <motion.h1
            variants={revealVariants}
            className="mb-6 font-[family-name:var(--font-heading)] text-[clamp(2.4rem,7vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-text-primary"
          >
            NO MORE{" "}
            <span className="block sm:inline">
              {PAINS.map((pain, i) => (
                <span key={pain} className="inline">
                  <span
                    className={
                      i % 2 === 0
                        ? "text-text-primary"
                        : "font-[family-name:var(--font-display)] font-normal italic text-accent"
                    }
                  >
                    {pain}
                  </span>
                  {i < PAINS.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            We build custom software, SaaS, websites, and growth systems — done fast, done right,
            done once. Software-led agency. Delhi. Since 2019.
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton href={`mailto:${SITE_CONTACT.email}`} className="text-sm sm:text-base">
              <Mail size={16} /> Email us
            </MagneticButton>
            <MagneticButton
              href={WHATSAPP_URL}
              className="!bg-white border border-border-strong !text-text-primary hover:!shadow-[0_8px_24px_rgba(29,78,216,0.15)]"
            >
              <MessageCircle size={16} /> Live chat
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="!bg-transparent border-0 !text-accent underline-offset-4 hover:underline !shadow-none !px-3"
            >
              Start a project <ArrowRight size={16} />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border-subtle bg-white/90 px-4 py-5 text-center shadow-sm backdrop-blur-sm"
            >
              <div className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-accent sm:text-3xl">
                {stat.label === "Client Rating" ? (
                  "4.9★"
                ) : (
                  <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 border-y border-border-subtle bg-white/80 py-4 backdrop-blur-md">
        <div className="section-container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm text-text-secondary">
          <span>You own the code</span>
          <span className="hidden text-border-strong sm:inline">·</span>
          <span>Milestone billing</span>
          <span className="hidden text-border-strong sm:inline">·</span>
          <span>98% client retention</span>
          <span className="hidden text-border-strong sm:inline">·</span>
          <span>4.5★ on Google Reviews</span>
        </div>
      </div>
    </section>
  );
}
