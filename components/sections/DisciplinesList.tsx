"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Short discipline label + hover “signal” line — Digital Heroes style. */
const SIGNAL_META: Record<string, { label: string; signal: string }> = {
  "custom-software-saas": {
    label: "Software",
    signal: "Multi-tenant · ERP/CRM · Legacy modernization",
  },
  "saas-mvp-development": {
    label: "MVP",
    signal: "Scoped roadmap · Auth · Billing · Tenancy",
  },
  "website-ecommerce": {
    label: "Web",
    signal: "Next.js · React · Commerce · Core Web Vitals",
  },
  "mobile-app-development": {
    label: "Mobile",
    signal: "React Native · iOS · Android · Push",
  },
  "digital-marketing": {
    label: "Growth",
    signal: "Funnel · Paid · SEO · Retention",
  },
  "seo-search-engine-marketing": {
    label: "SEO",
    signal: "Technical · Content · Authority · Rankings",
  },
  "ui-ux-design-branding": {
    label: "Design",
    signal: "Research · Prototypes · Brand systems",
  },
  "graphic-design-creative": {
    label: "Creative",
    signal: "Campaign art · Social · Print · Motion",
  },
  "content-creation": {
    label: "Content",
    signal: "SEO blogs · Landing pages · Product copy",
  },
  "ai-automation-cloud": {
    label: "AI",
    signal: "LLM chatbots · Automation · Cloud",
  },
};

export function DisciplinesList() {
  const [active, setActive] = useState<string | null>(SERVICES[0]?.slug ?? null);

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(50% 40% at 80% 20%, rgba(108,92,231,0.18), transparent 60%), radial-gradient(40% 35% at 10% 80%, rgba(34,211,238,0.1), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.p variants={revealVariants} className="section-number mb-3">
              § 02 · our services
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-heading text-[clamp(1.9rem,4.2vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-text-primary"
            >
              Built the way{" "}
              <span className="heading-accent italic">modern teams</span>
              <br />
              actually work.
            </motion.h2>
            <motion.p variants={revealVariants} className="mt-4 max-w-md text-text-secondary">
              Ten disciplines, one team. Hover any line for the signal.
            </motion.p>
          </div>
          <motion.div variants={revealVariants} className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Start a project <ArrowUpRight size={16} />
            </Link>
            <Link href="/services" className="btn-secondary text-sm">
              All services →
            </Link>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-5xl"
          onMouseLeave={() => setActive(SERVICES[0]?.slug ?? null)}
        >
          {SERVICES.map((service, i) => {
            const meta = SIGNAL_META[service.slug] ?? {
              label: service.category.split(" ")[0],
              signal: service.features.slice(0, 3).join(" · "),
            };
            const isActive = active === service.slug;
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.li key={service.slug} variants={revealVariants}>
                <Link
                  href={`/services/${service.slug}`}
                  onMouseEnter={() => setActive(service.slug)}
                  onFocus={() => setActive(service.slug)}
                  className={cn(
                    "group relative flex items-center gap-3 border-b border-border-subtle py-4 transition-colors sm:gap-5 sm:py-5",
                    isActive ? "border-border-hover" : "hover:border-white/20"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs transition-colors sm:text-sm",
                      isActive ? "text-signal" : "text-text-muted"
                    )}
                  >
                    → {num}
                  </span>
                  <span
                    className={cn(
                      "hidden w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] sm:block",
                      isActive ? "text-accent" : "text-text-muted"
                    )}
                  >
                    · {meta.label}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 font-heading text-base font-semibold transition-colors sm:text-xl",
                      isActive ? "text-text-primary" : "text-text-secondary"
                    )}
                  >
                    {service.name.replace(/ Development$/, "").replace(/ Services$/, "")}
                  </span>
                  <span
                    className={cn(
                      "hidden max-w-[42%] truncate text-right text-sm transition-all duration-300 md:block",
                      isActive
                        ? "translate-x-0 text-signal opacity-100"
                        : "translate-x-2 text-text-muted opacity-40"
                    )}
                  >
                    {meta.signal}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className={cn(
                      "shrink-0 transition-all duration-300",
                      isActive
                        ? "translate-x-0.5 -translate-y-0.5 text-accent opacity-100"
                        : "text-text-muted opacity-0 group-hover:opacity-60"
                    )}
                  />

                  {/* Active glow bar */}
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-signal to-transparent transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
