"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ACTS = [
  {
    id: "01",
    title: "Discover",
    line: "Brief, audience, voice.",
    italic: "The story before the design.",
  },
  {
    id: "02",
    title: "Design",
    line: "Wireframes become hi-fidelity.",
    italic: "Decisions become defendable.",
  },
  {
    id: "03",
    title: "Build",
    line: "Components, content, infrastructure.",
    italic: "Done in green.",
  },
  {
    id: "04",
    title: "Launch",
    line: "Quiet ship. Loud welcome.",
    italic: "A live URL with shipped on it.",
  },
  {
    id: "05",
    title: "Optimize",
    line: "A/B, cohort, ROI.",
    italic: "Numbers that justify the next sprint.",
  },
];

export function ProcessPipeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 max-w-2xl"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 05 · the process
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4.2vw,3.2rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Three services.{" "}
            <span className="heading-accent">One system.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-4 text-text-secondary">
            Same five acts. Different stage — whether the deliverable is a page, a product, or a
            growth engine.
          </motion.p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2 border-b border-border-subtle pb-4">
          {ACTS.map((act, i) => (
            <button
              key={act.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
                active === i
                  ? "bg-accent text-white"
                  : "bg-bg-secondary text-text-secondary hover:text-text-primary"
              )}
            >
              § {act.id} {act.title}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {ACTS.map((act, i) => (
              <button
                key={act.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "w-full rounded-2xl border px-5 py-5 text-left transition-all",
                  active === i
                    ? "border-accent bg-accent-muted shadow-sm"
                    : "border-border-subtle bg-white hover:border-border-strong"
                )}
              >
                <span className="font-mono text-xs text-accent">§ {act.id}</span>
                <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold text-text-primary">
                  {act.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {act.line}{" "}
                  <span className="font-[family-name:var(--font-display)] italic text-accent">
                    {act.italic}
                  </span>
                </p>
              </button>
            ))}
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-border-subtle bg-bg-secondary p-8 lg:p-12">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
              Act {ACTS[active].id} · {ACTS[active].title}
            </p>
            <h3 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold text-text-primary">
              {ACTS[active].title}
            </h3>
            <p className="mb-2 text-lg text-text-secondary">{ACTS[active].line}</p>
            <p className="mb-8 font-[family-name:var(--font-display)] text-xl italic text-accent">
              {ACTS[active].italic}
            </p>
            <p className="mb-8 text-sm text-text-muted">
              Predictable cadence, unpredictable craft — clients always know which act they&apos;re
              in, and what the next one looks like.
            </p>
            <Link href="/contact" className="btn-primary w-fit text-sm">
              See how we&apos;d ship yours <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
