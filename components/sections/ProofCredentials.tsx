"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Star, Code2, Globe2, Sparkles, Lock } from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const PROOFS = [
  {
    icon: Star,
    title: "4.9★",
    subtitle: "Verified Client Rating",
    body: "Standardized rating across delivered software, AI, and growth engagements.",
  },
  {
    icon: Globe2,
    title: "Timezone SLA",
    subtitle: "Global Overlap",
    body: "Dedicated synchronous working overlap across US East, UK GMT, and Gulf hours.",
  },
  {
    icon: Code2,
    title: "You Own It",
    subtitle: "100% Code Ownership",
    body: "Full IP transfer and milestone billing written into every contract. Zero vendor lock-in.",
  },
  {
    icon: Shield,
    title: "98%",
    subtitle: "Client Retention",
    body: "Long-term partners who stay because engineering delivery remains accountable.",
  },
];

const GUARANTEES = [
  { label: "Scoped Quote in Writing", detail: "Locked after discovery — zero surprise cost additions" },
  { label: "Named Senior Leads", detail: "Direct engineering & architect contact — no account middlemen" },
  { label: "Weekly Live Sprints", detail: "Staging URL walk-throughs & continuous GitHub visibility" },
  { label: "Post-Launch SLA Care", detail: "Warranty window included + optional month-to-month retainers" },
];

export function ProofCredentials() {
  return (
    <section className="section-padding relative overflow-hidden bg-slate-50/40">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={revealVariants} className="mb-3 inline-flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Sparkles size={12} className="text-blue-600" /> Contractual De-risking
            </span>
          </motion.div>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Verified. Accountable.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              De-risked.
            </span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-4 text-base text-slate-600 sm:text-lg">
            Real metrics only — an engineering framework built to de-risk your investment through milestone billing and 100% IP ownership.
          </motion.p>
        </motion.div>

        {/* 4 Proof Cards */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROOFS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_12px_32px_-6px_rgba(37,99,235,0.12)]"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/10">
                    <Icon size={18} />
                  </div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                    {item.title}
                  </div>
                  <p className="mt-1 font-heading text-sm font-bold text-blue-600">{item.subtitle}</p>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Guarantees Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]">
          <div className="mb-6 flex items-center gap-2">
            <Lock size={15} className="text-blue-600" />
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
              Contractual Engagement Guarantees
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((g) => (
              <li key={g.label} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-600" />
                <div>
                  <span className="block font-heading text-sm font-bold text-slate-900">
                    {g.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500 leading-relaxed">
                    {g.detail}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
