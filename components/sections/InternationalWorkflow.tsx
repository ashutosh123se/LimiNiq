"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  BadgePercent,
  CreditCard,
  Clock,
  KeyRound,
  CheckCircle2,
  Globe2,
} from "lucide-react";
import { INTERNATIONAL_WORKFLOW } from "@/data/pricing";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const STEP_ICONS = [
  ShieldCheck,
  FileText,
  BadgePercent,
  CreditCard,
  Clock,
  KeyRound,
];

const PAYMENT_METHODS = [
  { name: "Wise", label: "Low-fee multi-currency transfers" },
  { name: "Stripe", label: "Credit/Debit card & auto-invoicing" },
  { name: "Bank Wire (SWIFT / ACH / SEPA)", label: "Direct business accounts" },
  { name: "PayPal", label: "Global merchant gateway" },
];

export function InternationalWorkflow() {
  return (
    <section className="section-padding relative overflow-hidden bg-bg-secondary/40 border-y border-[var(--border-subtle)]">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
            <Globe2 size={13} className="text-[var(--accent)]" /> Global Client Operations
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            How We Partner With <span className="heading-accent">International Clients</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mx-auto mt-4 max-w-2xl text-text-secondary leading-relaxed">
            Delivering senior engineering velocity to companies across the United States, United Kingdom, Canada, Australia, Europe, and UAE with institutional-grade legal and operational standards.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {INTERNATIONAL_WORKFLOW.map((item, idx) => {
            const Icon = STEP_ICONS[idx] || CheckCircle2;
            return (
              <motion.div
                key={item.step}
                variants={revealVariants}
                className="glass-card relative flex flex-col justify-between overflow-hidden p-7 transition-all duration-300 hover:border-[var(--accent)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--signal)]">
                      {item.badge}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-semibold text-text-muted">STEP {item.step}</span>
                  <h3 className="mt-1 font-heading text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-[var(--border-subtle)] pt-4 text-xs font-medium text-text-muted">
                  <CheckCircle2 size={14} className="text-[var(--signal)]" />
                  Standard in every engagement
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Global payment methods pill bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-12 rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated/80 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-text-muted">
                Accepted Payment Rails
              </span>
              <h4 className="mt-1 font-heading text-base font-bold text-text-primary">
                Frictionless Multi-Currency Invoicing (USD, GBP, EUR, AUD, CAD)
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {PAYMENT_METHODS.map((pm) => (
                <span
                  key={pm.name}
                  title={pm.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white/5 px-4 py-2 text-xs font-medium text-text-secondary"
                >
                  <CreditCard size={13} className="text-[var(--accent)]" />
                  {pm.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
