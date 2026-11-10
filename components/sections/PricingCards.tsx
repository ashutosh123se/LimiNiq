"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  FileCheck2,
  Clock,
  Handshake,
  Check,
  Sparkles,
} from "lucide-react";
import {
  PRICING_TIERS,
  SUPPORTED_CURRENCIES,
  CurrencyCode,
  PricingTier,
  getTierPrice,
} from "@/data/pricing";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: "No hidden fees" },
  { icon: FileCheck2, label: "Scoped in writing" },
  { icon: Clock, label: "Fixed delivery windows" },
  { icon: Handshake, label: "100% IP ownership" },
];

export function PricingCards({ initialCategory = "all" }: { initialCategory?: "all" | "core" | "additional" } = {}) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [activeTab, setActiveTab] = useState<"all" | "core" | "additional">(initialCategory);

  const filteredTiers = PRICING_TIERS.filter((tier) => {
    if (activeTab === "all") return true;
    return tier.category === activeTab;
  });

  return (
    <section className="section-padding relative overflow-hidden" id="pricing-plans">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-10 max-w-2xl text-center"
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
            Clear, milestone-based pricing with zero hidden costs. Final quotes are scoped in writing after technical discovery.
          </motion.p>

          {/* Controls bar: Currency toggle & Category filter */}
          <motion.div
            variants={revealVariants}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Currency toggle */}
            <div className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-bg-secondary p-1">
              {(Object.keys(SUPPORTED_CURRENCIES) as CurrencyCode[]).map((code) => {
                const info = SUPPORTED_CURRENCIES[code];
                const isActive = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                      isActive
                        ? "bg-[var(--accent)] text-white shadow-sm"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    <span>{info.flag}</span>
                    <span>{info.code}</span>
                  </button>
                );
              })}
            </div>

            {/* Category tabs */}
            <div className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-bg-secondary p-1">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                  activeTab === "all"
                    ? "bg-white/10 text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                All Services
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("core")}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                  activeTab === "core"
                    ? "bg-white/10 text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                AI & Software
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("additional")}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                  activeTab === "additional"
                    ? "bg-white/10 text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                Growth & CRO
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currency}-${activeTab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredTiers.map((tier: PricingTier) => {
              const price = getTierPrice(tier, currency);
              const isFeatured = tier.popular;

              return (
                <div
                  key={tier.id}
                  id={tier.id}
                  className={cn(
                    "relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 scroll-mt-28",
                    isFeatured
                      ? "glass-card-premium border-[var(--accent)] ring-1 ring-[var(--accent)]/30"
                      : "glass-card hover:border-[var(--border-hover)]"
                  )}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading text-lg font-bold leading-snug text-text-primary">
                        {tier.label}
                      </h3>
                      {isFeatured && (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                          <Sparkles size={11} /> Popular
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-text-muted leading-relaxed line-clamp-2">
                      {tier.tagline}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1.5 border-t border-[var(--border-subtle)] pt-4">
                      <span className="font-heading text-2xl font-extrabold text-gradient">
                        {price.amount}
                      </span>
                      <span className="text-xs text-text-muted">/ {price.unit}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-text-muted">{price.note}</p>

                    <ul className="mt-5 flex flex-col gap-2.5 border-t border-[var(--border-subtle)] pt-4">
                      {tier.serviceNames.map((name) => (
                        <li key={name} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                          <Check size={14} className="mt-0.5 shrink-0 text-[var(--signal)]" />
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                    <Link
                      href={`/contact?service=${encodeURIComponent(tier.id)}`}
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all",
                        isFeatured
                          ? "btn-primary"
                          : "border border-[var(--border-strong)] text-text-primary hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
                      )}
                    >
                      Scope Project <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footnote on scope & discovery */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted">
            * All starting rates reflect baseline technical scope. Exact milestones and quotes are finalized in your written Statement of Work (SOW).
          </p>
        </div>

        {/* Trust Chips */}
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
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-bg-secondary px-4 py-2 text-xs font-medium text-text-secondary"
              >
                <chip.icon size={14} className="text-[var(--signal)]" />
                {chip.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Request Custom Quote <ArrowUpRight size={16} />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              View Detailed Comparison
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
