"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight, ChevronDown, type LucideIcon } from "lucide-react";
import { CORE_PILLARS, SUPPORTING_SERVICES } from "@/data/services";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

function getIcon(name: string): LucideIcon {
  const icons = Icons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? Icons.Sparkles;
}

export function DisciplinesList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
            <span className="text-[var(--signal)]">§01</span> Core Disciplines
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            The <span className="heading-accent">Architecture</span> of Growth
          </motion.h2>
          <motion.p variants={revealVariants} className="mx-auto mt-4 max-w-xl text-text-secondary">
            Three disciplines we never outsource, backed by a full bench of supporting services
            that round out every engagement.
          </motion.p>
        </motion.div>

        {/* Core pillars — expandable list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-20 flex max-w-4xl flex-col gap-3"
        >
          {CORE_PILLARS.map((pillar, i) => {
            const Icon = getIcon(pillar.icon);
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={pillar.slug}
                variants={revealVariants}
                className={cn(
                  "glass-card-premium overflow-hidden transition-colors",
                  isOpen && "border-[var(--border-hover)]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-8 sm:py-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--accent-muted)] text-[var(--accent)] sm:h-14 sm:w-14">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--signal)]">
                      Pillar {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block font-heading text-lg font-bold text-text-primary sm:text-xl">
                      {pillar.name}
                    </span>
                    <span className="mt-0.5 hidden text-sm text-text-secondary sm:block">
                      {pillar.tagline}
                    </span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "shrink-0 text-text-muted transition-transform duration-300",
                      isOpen && "rotate-180 text-[var(--accent)]"
                    )}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--border-subtle)] px-5 pb-6 pt-5 sm:px-8">
                    <p className="mb-5 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                      {pillar.description}
                    </p>
                    <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {pillar.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/services/${pillar.slug}`}
                        className="btn-secondary text-sm"
                      >
                        Explore {pillar.category.split(" ")[0]}
                        <ArrowUpRight size={16} />
                      </Link>
                      {pillar.priceFrom && (
                        <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                          From {pillar.priceFrom.amount} / {pillar.priceFrom.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Supporting services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h3
            variants={revealVariants}
            className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            Supporting Services
          </motion.h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTING_SERVICES.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div key={service.slug} variants={revealVariants}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group glass-card flex h-full flex-col gap-3 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] text-text-secondary transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                        <Icon size={18} strokeWidth={1.7} />
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)] group-hover:opacity-100"
                      />
                    </div>
                    <h4 className="font-heading text-base font-bold text-text-primary">
                      {service.name}
                    </h4>
                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">
                      {service.tagline}
                    </p>
                    {service.priceFrom && (
                      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-text-muted">
                        From {service.priceFrom.amount} / {service.priceFrom.unit}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
