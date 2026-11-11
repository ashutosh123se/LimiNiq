"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, TrendingUp, ShieldCheck, Star, Award } from "lucide-react";
import { StatCounter } from "@/components/ui/StatCounter";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LEADS = [
  {
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
    sub: "Enterprise SaaS & AI systems",
    icon: Award,
    bar: 0.95,
  },
  {
    value: 12,
    prefix: "$",
    suffix: "M+",
    label: "Client Revenue Influenced",
    sub: "Direct sales & pipeline automation",
    icon: TrendingUp,
    bar: 0.88,
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention Rate",
    sub: "Multi-quarter retained partners",
    icon: ShieldCheck,
    bar: 0.98,
  },
  {
    value: 49,
    label: "Verified Client Rating",
    sub: "Standardized across all deliveries",
    display: "4.9★",
    icon: Star,
    bar: 0.98,
  },
];

export function TheLeads() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-slate-50/50 py-16 lg:py-24">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.div variants={revealVariants} className="mb-3 inline-flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Sparkles size={12} className="text-blue-600" /> Accountable Track Record
              </span>
            </motion.div>
            <motion.h2
              variants={revealVariants}
              className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Numbers That{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Earn Trust.
              </span>
            </motion.h2>
          </div>
          <motion.p
            variants={revealVariants}
            className="max-w-md text-sm sm:text-base text-slate-600 sm:text-right"
          >
            Verified client outcomes, zero vanity metrics, and 100% written milestone accountability.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEADS.map((lead, i) => {
            const Icon = lead.icon;
            return (
              <motion.div
                key={lead.label}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_12px_32px_-6px_rgba(37,99,235,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      0{i + 1} // PROOF
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/10">
                      <Icon size={16} />
                    </span>
                  </div>

                  <div className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                    {lead.display ? (
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {lead.display}
                      </span>
                    ) : (
                      <StatCounter value={lead.value} prefix={lead.prefix} suffix={lead.suffix} />
                    )}
                  </div>

                  <p className="mt-3 font-heading text-base font-bold text-slate-900">
                    {lead.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                    {lead.sub}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      initial={reduced ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: lead.bar }}
                      viewport={viewportOnce}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:text-left">
          <p className="text-xs text-slate-500">
            * Cumulative metrics across delivered custom software and AI automation contracts since 2019. Detailed scope breakdowns and client references available under mutual NDA.
          </p>
        </div>
      </div>
    </section>
  );
}
