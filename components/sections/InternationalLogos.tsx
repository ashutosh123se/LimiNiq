"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck } from "lucide-react";
import { viewportOnce } from "@/lib/motion";

const CLIENT_PLACEHOLDERS = [
  {
    name: "CloudStack IT",
    region: "Austin, TX (USA)",
    category: "Cloud & Multi-Tenant SaaS",
    tag: "[INTERNATIONAL_CLIENT_LOGO_1]",
  },
  {
    name: "ApexFlow Technologies",
    region: "London (UK)",
    category: "AI Workflow Automation",
    tag: "[INTERNATIONAL_CLIENT_LOGO_2]",
  },
  {
    name: "PropSearch Middle East",
    region: "Dubai (UAE)",
    category: "PropTech Marketplace",
    tag: "[INTERNATIONAL_CLIENT_LOGO_3]",
  },
  {
    name: "Nordic StyleHub",
    region: "Stockholm (Sweden)",
    category: "High-Speed Headless E-Com",
    tag: "[INTERNATIONAL_CLIENT_LOGO_4]",
  },
  {
    name: "LearnSphere Global",
    region: "Bengaluru & Singapore",
    category: "EdTech & Learning SaaS",
    tag: "[INTERNATIONAL_CLIENT_LOGO_5]",
  },
  {
    name: "Finova Analytics",
    region: "Frankfurt (Germany)",
    category: "FinTech Intelligence",
    tag: "[INTERNATIONAL_CLIENT_LOGO_6]",
  },
];

export function InternationalLogos() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-bg-secondary/20 py-10">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mx-auto mb-8 max-w-xl text-center"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted">
            Partnered With Fast-Growing Teams Across North America, Europe & UAE
          </span>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENT_PLACEHOLDERS.map((client) => (
            <div
              key={client.name}
              className="glass-card flex flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:border-[var(--accent)]"
            >
              <span className="font-heading text-sm font-bold text-text-primary tracking-tight">
                {client.name}
              </span>
              <span className="mt-1 font-mono text-[10px] text-text-muted">
                {client.region}
              </span>
              <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 font-mono text-[9px] text-text-muted">
                {client.category}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <ShieldCheck size={13} className="text-[var(--signal)]" /> Standardized NDA & IP Protection
          </span>
          <span className="text-text-muted hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <Globe size={13} className="text-[var(--accent)]" /> 4–6h Daily Synchronous Timezone Overlap
          </span>
        </div>
      </div>
    </section>
  );
}
