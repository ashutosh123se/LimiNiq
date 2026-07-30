"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, type Service } from "@/data/services";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const FILTERS = [
  { id: "all", label: "All" },
  { id: "Software & SaaS", label: "Software" },
  { id: "Web & Commerce", label: "Web" },
  { id: "Mobile & Design", label: "Design" },
  { id: "Marketing & Growth", label: "Growth" },
] as const;

function shortName(name: string) {
  return name
    .replace(/ Development$/, "")
    .replace(/ & Branding$/, "")
    .replace(/ & Creative$/, "")
    .replace(/ & Copywriting$/, "")
    .replace(/ Solutions$/, "")
    .replace(/^Custom /, "")
    .replace(/^AI, Automation & Cloud$/, "AI & Automation");
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
    >
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white p-4 transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_16px_40px_rgba(29,78,216,0.1)]",
          service.isCorePillar && "ring-1 ring-accent/15"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative mb-3 flex items-start justify-between gap-2">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors",
              service.isCorePillar
                ? "border-accent/20 bg-accent/10 text-accent"
                : "border-border-subtle bg-bg-secondary text-text-secondary group-hover:border-accent/20 group-hover:text-accent"
            )}
          >
            <Icon size={16} />
          </span>
          <span className="flex items-center gap-1.5">
            {service.isCorePillar && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-accent">
                Core
              </span>
            )}
            <ArrowUpRight
              size={14}
              className="text-text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
            />
          </span>
        </div>

        <h3 className="relative font-[family-name:var(--font-heading)] text-[15px] font-bold leading-snug tracking-tight text-text-primary sm:text-base">
          {title}
        </h3>
        <p className="relative mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-text-muted">
          {service.tagline}
        </p>

        {service.priceFrom && (
          <p className="relative mt-3 border-t border-border-subtle/80 pt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
            From{" "}
            <span className="font-semibold text-accent">{service.priceFrom.amount}</span>
          </p>
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
    <section className="relative overflow-hidden bg-white py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="section-container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.p variants={revealVariants} className="section-number mb-2">
              § 03 our{" "}
              <em className="font-[family-name:var(--font-display)] not-italic italic">services</em>
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(1.85rem,3.8vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text-primary"
            >
              Built the way modern teams{" "}
              <span className="heading-accent">actually work.</span>
            </motion.h2>
          </div>

          <motion.div variants={revealVariants} className="flex flex-wrap gap-2.5">
            <Link href="/contact" className="btn-primary !px-4 !py-2.5 text-sm">
              Start a project <ArrowUpRight size={15} />
            </Link>
            <Link href="/services" className="btn-secondary !px-4 !py-2.5 text-sm">
              All services →
            </Link>
          </motion.div>
        </motion.div>

        <div className="mb-5 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  on ? "text-white" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {on && (
                  <motion.span
                    layoutId="service-filter"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-[1]">{f.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {visible.map((service, i) => (
            <ServiceTile key={service.slug} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
