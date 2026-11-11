"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { viewportOnce } from "@/lib/motion";

const CLIENT_PLACEHOLDERS = [
  {
    name: "CloudStack IT",
    region: "Austin, TX",
    countryFlag: "🇺🇸",
    countryCode: "USA",
    category: "Cloud & SaaS",
  },
  {
    name: "ApexFlow Tech",
    region: "London",
    countryFlag: "🇬🇧",
    countryCode: "UK",
    category: "AI Workflows",
  },
  {
    name: "PropSearch Middle East",
    region: "Dubai",
    countryFlag: "🇦🇪",
    countryCode: "UAE",
    category: "PropTech Platform",
  },
  {
    name: "Nordic StyleHub",
    region: "Stockholm",
    countryFlag: "🇸🇪",
    countryCode: "Sweden",
    category: "Headless E-Com",
  },
  {
    name: "LearnSphere Global",
    region: "Singapore",
    countryFlag: "🇸🇬",
    countryCode: "Global",
    category: "EdTech SaaS",
  },
  {
    name: "Finova Analytics",
    region: "Frankfurt",
    countryFlag: "🇩🇪",
    countryCode: "Germany",
    category: "FinTech Intelligence",
  },
];

export function InternationalLogos() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-12">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/70 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700">
            <Sparkles size={11} className="text-blue-600" /> Global Delivery Track Record
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-800">
            Trusted by Fast-Moving Engineering Teams Across North America, Europe &amp; UAE
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENT_PLACEHOLDERS.map((client) => (
            <div
              key={client.name}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-[0_8px_24px_-4px_rgba(37,99,235,0.12)]"
            >
              <div className="flex items-center justify-between gap-1 mb-3">
                <span className="flex items-center gap-1 rounded-md bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 border border-slate-200/80 shadow-2xs">
                  <span>{client.countryFlag}</span>
                  <span>{client.countryCode}</span>
                </span>
                <Building2 size={13} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>

              <div className="my-1">
                <span className="font-heading text-sm font-extrabold text-slate-900 tracking-tight block">
                  {client.name}
                </span>
                <span className="mt-0.5 font-mono text-[10px] font-medium text-slate-500 block">
                  {client.region}
                </span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                <span className="inline-block rounded-full bg-blue-50/80 px-2.5 py-0.5 font-mono text-[9px] font-bold text-blue-700 uppercase tracking-wide">
                  {client.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 px-6 py-3.5 text-center shadow-2xs">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
            <ShieldCheck size={15} className="text-blue-600" /> Standardized Mutual NDA &amp; 100% IP Transfer
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Globe size={15} className="text-blue-600" /> 4–6h Daily Synchronous Overlap (EST, GMT, GST)
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Sparkles size={15} className="text-blue-600" /> Milestone-Gated Invoicing (Wise, Stripe, Wire)
          </span>
        </div>
      </div>
    </section>
  );
}
