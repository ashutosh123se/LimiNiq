"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SIGNAL_META: Record<string, { label: string; signal: string }> = {
  "custom-software-saas": { label: "Software", signal: "Multi-tenant · ERP/CRM · Legacy" },
  "saas-mvp-development": { label: "MVP", signal: "Auth · Billing · Tenancy · Deploy" },
  "website-ecommerce": { label: "Web", signal: "Next.js · React · Commerce · CWV" },
  "mobile-app-development": { label: "Mobile", signal: "React Native · iOS · Android" },
  "digital-marketing": { label: "Growth", signal: "Meta · Google · Funnel · CRO" },
  "seo-search-engine-marketing": { label: "SEO", signal: "Technical · Content · Authority" },
  "ui-ux-design-branding": { label: "Design", signal: "Research · Systems · Prototypes" },
  "graphic-design-creative": { label: "Creative", signal: "Ads · Decks · Brand assets" },
  "content-creation": { label: "Content", signal: "Blogs · Landing pages · Copy" },
  "ai-automation-cloud": { label: "AI", signal: "LLM · Automation · Cloud" },
};

export function DisciplinesList() {
  const [active, setActive] = useState(SERVICES[0]?.slug ?? null);

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="max-w-2xl">
            <motion.p variants={revealVariants} className="section-number mb-3">
              § 03 our <em className="font-[family-name:var(--font-display)] not-italic italic">services</em>
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-primary"
            >
              Built the way
              <br />
              modern teams
              <br />
              <span className="heading-accent">actually work.</span>
            </motion.h2>
            <motion.p variants={revealVariants} className="mt-5 max-w-md text-text-secondary">
              Ten disciplines, one team. Hover any line for the signal.
            </motion.p>
          </div>
          <motion.div variants={revealVariants} className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Start a project <ArrowUpRight size={16} />
            </Link>
            <Link href="/services" className="btn-secondary">
              All services →
            </Link>
          </motion.div>
        </motion.div>

        <ul
          className="border-t border-border-subtle"
          onMouseLeave={() => setActive(SERVICES[0]?.slug ?? null)}
        >
          {SERVICES.map((service, i) => {
            const meta = SIGNAL_META[service.slug] ?? {
              label: "Service",
              signal: service.features.slice(0, 3).join(" · "),
            };
            const isActive = active === service.slug;
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onMouseEnter={() => setActive(service.slug)}
                  onFocus={() => setActive(service.slug)}
                  className={cn(
                    "group grid grid-cols-[auto_1fr] items-center gap-x-4 border-b border-border-subtle py-5 transition-colors sm:grid-cols-[4.5rem_5.5rem_1fr_auto] sm:gap-x-6 sm:py-6",
                    isActive && "bg-[#EFF6FF]"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-sm tabular-nums",
                      isActive ? "text-accent" : "text-text-muted"
                    )}
                  >
                    → {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "hidden font-mono text-[11px] uppercase tracking-[0.14em] sm:block",
                      isActive ? "text-accent" : "text-text-muted"
                    )}
                  >
                    · {meta.label}
                  </span>
                  <span
                    className={cn(
                      "col-span-1 font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight transition-colors sm:col-span-1 sm:text-2xl lg:text-[1.65rem]",
                      isActive ? "text-text-primary" : "text-text-secondary"
                    )}
                  >
                    {service.name
                      .replace(/ Development$/, "")
                      .replace(/ & Branding$/, "")
                      .replace(/ & Creative$/, "")
                      .replace(/ & Copywriting$/, "")
                      .replace(/ Solutions$/, "")}
                  </span>
                  <span
                    className={cn(
                      "col-span-2 hidden items-center justify-end gap-3 sm:col-span-1 sm:flex",
                      isActive ? "opacity-100" : "opacity-40"
                    )}
                  >
                    <span className="max-w-[280px] truncate text-right text-sm text-accent">
                      {meta.signal}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className={cn(
                        "shrink-0 transition-transform",
                        isActive && "translate-x-0.5 -translate-y-0.5 text-accent"
                      )}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
