"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StatCounter } from "@/components/ui/StatCounter";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LEADS = [
  {
    value: 150,
    suffix: "+",
    label: "Projects delivered",
    sub: "Since 2019",
    bar: 0.92,
  },
  {
    value: 12,
    prefix: "$",
    suffix: "M+",
    label: "Revenue scaled",
    sub: "For clients",
    bar: 0.86,
  },
  {
    value: 98,
    suffix: "%",
    label: "Client retention",
    sub: "Long-term partners",
    bar: 0.98,
  },
  {
    value: 49,
    label: "Client rating",
    sub: "Google 4.5★",
    display: "4.9★",
    bar: 0.98,
  },
];

export function TheLeads() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-white py-14 lg:py-20">
      <div className="section-container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.p variants={revealVariants} className="section-number mb-2">
              the <em className="font-[family-name:var(--font-display)] not-italic italic">leads</em>
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(1.85rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-text-primary"
            >
              Numbers that earn the next call.
            </motion.h2>
          </div>
          <motion.p
            variants={revealVariants}
            className="max-w-xs text-sm text-text-secondary sm:text-right"
          >
            Client-earned proof — not borrowed badges.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle lg:grid-cols-4">
          {LEADS.map((lead, i) => (
            <motion.div
              key={lead.label}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white px-5 py-7 sm:px-7 sm:py-9"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />

              <p className="relative mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                0{i + 1}
              </p>

              <div className="relative font-[family-name:var(--font-heading)] text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.04em] text-text-primary">
                {lead.display ? (
                  lead.display
                ) : (
                  <StatCounter value={lead.value} prefix={lead.prefix} suffix={lead.suffix} />
                )}
              </div>

              <p className="relative mt-4 font-[family-name:var(--font-heading)] text-sm font-bold text-text-primary">
                {lead.label}
              </p>
              <p className="relative mt-1 text-xs text-text-muted">{lead.sub}</p>

              <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-accent/10">
                <motion.div
                  className={cn("h-full rounded-full bg-accent")}
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: lead.bar }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
