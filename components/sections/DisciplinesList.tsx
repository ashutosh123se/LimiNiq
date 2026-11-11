"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SERVICES, type Service } from "@/data/services";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const FILTERS = [
  { id: "all", label: "All Disciplines" },
  { id: "AI & Software", label: "AI & Software" },
  { id: "Web & Mobile", label: "Web & Mobile" },
  { id: "Growth & Marketing", label: "Growth" },
  { id: "Design & Creative", label: "Design" },
] as const;

function shortName(name: string) {
  return name
    .replace(/ Development$/, "")
    .replace(/ & Autonomous Agents$/, "")
    .replace(/ & Branding$/, "")
    .replace(/ & Creative$/, "")
    .replace(/ & Copywriting$/, "")
    .replace(/ Solutions$/, "")
    .replace(/^Custom /, "")
    .replace(/^AI Automation/, "AI Automation");
}

function getIcon(name: string): IconComponent {
  const icons = LucideIcons as unknown as Record<string, IconComponent>;
  return icons[name] ?? LucideIcons.Circle;
}

function ServiceTile({ service, index }: { service: Service; index: number }) {
  const Icon = getIcon(service.icon);
  const title = shortName(service.name);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, delay: Math.min(index, 6) * 0.03 }}
      className="h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300",
          service.isCorePillar
            ? "border-blue-200/90 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.08)] hover:border-blue-500 hover:shadow-[0_16px_36px_-6px_rgba(37,99,235,0.18)] hover:-translate-y-1 ring-1 ring-blue-500/10"
            : "border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:shadow-[0_12px_28px_-4px_rgba(15,23,42,0.08)] hover:-translate-y-1"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div>
          <div className="relative mb-4 flex items-start justify-between gap-2">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                service.isCorePillar
                  ? "border-blue-200 bg-blue-50 text-blue-600 ring-1 ring-blue-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600"
              )}
            >
              <Icon size={18} />
            </span>
            <div className="flex items-center gap-1.5">
              {service.isCorePillar && (
                <span className="rounded-full bg-blue-50 border border-blue-200/80 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-blue-700">
                  Core
                </span>
              )}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100/80 text-slate-400 transition-all group-hover:bg-blue-600 group-hover:text-white">
                <ArrowUpRight size={13} />
              </span>
            </div>
          </div>

          <h3 className="relative font-heading text-base font-bold leading-snug tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="relative mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
            {service.tagline}
          </p>
        </div>

        {service.priceFrom && (
          <div className="relative mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
              From
            </span>
            <span className="font-mono text-xs font-bold text-blue-600">
              {service.priceFrom.amount}
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export function DisciplinesList() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const visible = useMemo(
    () =>
      filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter),
    [filter]
  );

  return (
    <section className="relative overflow-hidden bg-slate-50/40 py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.div variants={revealVariants} className="mb-3 inline-flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Sparkles size={12} className="text-blue-600" /> Engineering Disciplines
              </span>
            </motion.div>
            <motion.h2
              variants={revealVariants}
              className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Full-Stack Software &amp;{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Autonomous AI.
              </span>
            </motion.h2>
          </div>

          <motion.div variants={revealVariants} className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)]"
            >
              <span>Scope Your Project</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900"
            >
              View Service Matrix
            </Link>
          </motion.div>
        </motion.div>

        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 border",
                  on
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className="relative z-[1]">{f.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {visible.map((service, i) => (
            <ServiceTile key={service.slug} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
