"use client";

import { motion } from "framer-motion";
import { StatCounter } from "@/components/ui/StatCounter";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const LEADS = [
  { value: 150, suffix: "+", label: "Projects Delivered", sub: "Since 2019" },
  { value: 12, prefix: "$", suffix: "M+", label: "Revenue Scaled", sub: "For clients" },
  { value: 98, suffix: "%", label: "Client Retention", sub: "Long-term partners" },
  { value: 49, suffix: "", label: "Client Rating", sub: "4.9★ average", display: "4.9★" },
];

/** Digital Heroes “the leads” — oversized counters under the hero */
export function TheLeads() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-16 lg:py-24">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.p variants={revealVariants} className="section-number mb-2">
              the <em className="font-[family-name:var(--font-display)] not-italic italic">leads</em>
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl"
            >
              Numbers that earn the next call.
            </motion.h2>
          </div>
          <motion.p variants={revealVariants} className="max-w-sm text-sm text-text-secondary">
            awarded · <em className="text-accent">accountable</em> · recognized by clients — not
            borrowed badges.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-10">
          {LEADS.map((lead) => (
            <div key={lead.label} className="border-t border-border-subtle pt-6">
              <div className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.04em] text-text-primary">
                {lead.display ? (
                  lead.display
                ) : (
                  <StatCounter value={lead.value} prefix={lead.prefix} suffix={lead.suffix} />
                )}
              </div>
              <p className="mt-3 font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.08em] text-text-primary">
                {lead.label}
              </p>
              <p className="mt-1 text-xs text-text-muted">{lead.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
