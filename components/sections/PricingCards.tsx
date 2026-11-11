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
  { icon: FileCheck2, label: "Scoped in writing (SOW)" },
  { icon: Clock, label: "Fixed milestone delivery" },
  { icon: Handshake, label: "100% IP code transfer" },
];

const TIER_MODEL_TAGS: Record<string, { category: string; model: string }> = {
  "ai-automation": { category: "AI & Agents", model: "Fixed or Retainer" },
  software: { category: "Custom Software", model: "Milestone SOW" },
  "saas-mvp": { category: "Rapid Prototype", model: "4-Week Sprint" },
  "dedicated-team": { category: "Embedded Talent", model: "Monthly Rolling" },
  web: { category: "Marketing Platform", model: "Fixed Delivery" },
  seo: { category: "Organic Growth", model: "Monthly Retainer" },
  marketing: { category: "Paid Acquisition", model: "ROAS Retainer" },
  cro: { category: "Conversion Engine", model: "Sprint Testing" },
};

export function PricingCards({
  initialCategory = "all",
}: {
  initialCategory?: "all" | "core" | "additional";
} = {}) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [activeTab, setActiveTab] = useState<"all" | "core" | "additional">(initialCategory);

  const filteredTiers = PRICING_TIERS.filter((tier) => {
    if (activeTab === "all") return true;
    return tier.category === activeTab;
  });

  return (
    <section className="section-padding relative overflow-hidden bg-slate-50/60" id="pricing-plans">
      {/* Subtle ambient grid & glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[350px] w-[600px] rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <motion.div variants={revealVariants} className="mb-4 inline-flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-2xs">
              <Sparkles size={13} className="text-blue-600" /> Transparent International Rates
            </span>
          </motion.div>

          <motion.h2
            variants={revealVariants}
            className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Predictable Milestones.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Zero Hidden Fees.
            </span>
          </motion.h2>

          <motion.p
            variants={revealVariants}
            className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg"
          >
            Clear milestone-based pricing with full source code ownership. Quotes are locked in a
            written Statement of Work (SOW) after a direct discovery call with our senior architects.
          </motion.p>

          {/* Controls bar: Currency toggle & Category filter */}
          <motion.div
            variants={revealVariants}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Currency toggle */}
            <div className="inline-flex items-center rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-2xs">
              {(Object.keys(SUPPORTED_CURRENCIES) as CurrencyCode[]).map((code) => {
                const info = SUPPORTED_CURRENCIES[code];
                const isActive = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200",
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <span>{info.flag}</span>
                    <span>{info.code}</span>
                  </button>
                );
              })}
            </div>

            {/* Category tabs */}
            <div className="inline-flex items-center rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
                  activeTab === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                All Services
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("core")}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
                  activeTab === "core"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                AI &amp; Software
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("additional")}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
                  activeTab === "additional"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                Growth &amp; CRO
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
            className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredTiers.map((tier: PricingTier) => {
              const price = getTierPrice(tier, currency);
              const isFeatured = Boolean(tier.popular);
              const tags = TIER_MODEL_TAGS[tier.id] || {
                category: "Custom Build",
                model: "Milestone SOW",
              };

              return (
                <div
                  key={tier.id}
                  id={tier.id}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-2xl bg-white p-6 transition-all duration-300 scroll-mt-28",
                    isFeatured
                      ? "border-2 border-blue-600 shadow-[0_16px_40px_-8px_rgba(37,99,235,0.22)] ring-4 ring-blue-500/10 lg:-translate-y-1.5"
                      : "border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.1)]"
                  )}
                >
                  {/* Popular top banner */}
                  {isFeatured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(37,99,235,0.35)]">
                        <Sparkles size={11} className="fill-white" /> Most Popular
                      </span>
                    </div>
                  )}

                  {/* Header Slot: Category & Model Tag (Strict Height) */}
                  <div>
                    <div className="flex h-7 items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                        {tags.category}
                      </span>
                      <span className="font-mono text-[10px] font-medium text-slate-600">
                        {tags.model}
                      </span>
                    </div>

                    {/* Title Slot (Strict Height for 100% Horizontal Alignment) */}
                    <div className="mt-2 flex h-14 items-center">
                      <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-slate-900 sm:text-xl">
                        {tier.label}
                      </h3>
                    </div>

                    {/* Description Slot (Strict Height, No Ugly Truncation) */}
                    <div className="mt-1 flex h-14 items-start">
                      <p className="text-xs leading-relaxed text-slate-600">
                        {tier.tagline}
                      </p>
                    </div>

                    {/* Price Block (Strict Height & Baseline Alignment) */}
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                          {price.amount}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                          / {price.unit}
                        </span>
                      </div>
                      <div className="mt-1 flex h-6 items-center">
                        <p className="text-[11px] font-medium text-slate-600 truncate">
                          {price.note}
                        </p>
                      </div>
                    </div>

                    {/* Features List Slot */}
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        Included in this tier:
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {tier.serviceNames.map((name) => (
                          <li
                            key={name}
                            className="flex items-start gap-2.5 text-xs text-slate-700 sm:text-[13px]"
                          >
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
                              <Check size={10} strokeWidth={3} />
                            </span>
                            <span className="font-medium leading-snug">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button Slot (Pinned to Bottom) */}
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <Link
                      href={`/contact?service=${encodeURIComponent(tier.id)}`}
                      className={cn(
                        "group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all duration-200 sm:text-sm",
                        isFeatured
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:from-blue-700 hover:to-indigo-700 hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)]"
                          : "border border-slate-300 bg-slate-50 text-slate-800 shadow-2xs hover:border-slate-400 hover:bg-white hover:shadow-xs"
                      )}
                    >
                      <span>Scope Project</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Discovery & Scope Footnote */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            * All starting rates reflect baseline technical scope. Detailed milestones, timelines, and deliverables are locked in your written Statement of Work (SOW).
          </p>
        </div>

        {/* Trust Chips Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs"
              >
                <chip.icon size={14} className="text-blue-600" />
                {chip.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)]"
            >
              <span>Schedule Technical Discovery</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900"
            >
              View Full Engagement Models
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
