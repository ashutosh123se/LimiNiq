"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, FileCheck2, Clock, Handshake } from "lucide-react";
import { PRICING_TIERS } from "@/data/pricing";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: "No hidden fees" },
  { icon: FileCheck2, label: "Scoped in writing" },
  { icon: Clock, label: "Fixed delivery windows" },
  { icon: Handshake, label: "Cancel anytime on retainers" },
];

export function PricingCards() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
            <span className="text-[var(--signal)]">✦</span> Transparent Pricing
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Straightforward <span className="heading-accent">Starting Rates</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mx-auto mt-4 max-w-xl text-text-secondary">
            Final quotes are scoped after a short discovery call — no bait-and-switch, ever.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRICING_TIERS.map((tier, i) => {
            const isFeatured = i === 0;
            return (
              <motion.div
                key={tier.id}
                id={tier.id}
                variants={revealVariants}
                className={cn(
                  "relative flex flex-col gap-5 overflow-hidden p-6 scroll-mt-28",
                  isFeatured ? "glass-card-premium border-[var(--border-hover)]" : "glass-card"
                )}
              >
                {isFeatured && (
                  <span className="pill-badge absolute right-4 top-4 !bg-[var(--accent)] !text-white">
                    Popular
                  </span>
                )}
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">{tier.label}</h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-heading text-2xl font-extrabold text-gradient">
                      {tier.priceFrom}
                    </span>
                    <span className="text-sm text-text-muted">/ {tier.unit}</span>
                  </div>
                  <p className="mt-1 text-xs text-text-muted">{tier.note}</p>
                </div>

                <ul className="flex flex-1 flex-col gap-2 border-t border-[var(--border-subtle)] pt-4">
                  {tier.serviceNames.map((name) => (
                    <li key={name} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      {name}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/pricing"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
                    isFeatured
                      ? "btn-primary"
                      : "border border-[var(--border-strong)] text-text-primary hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
                  )}
                >
                  See Full Pricing <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-4 py-2 text-xs font-medium text-text-secondary"
              >
                <chip.icon size={14} className="text-[var(--signal)]" />
                {chip.label}
              </span>
            ))}
          </div>

          <Link href="/contact" className="btn-primary">
            Request Custom Quote <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
