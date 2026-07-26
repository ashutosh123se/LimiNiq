"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

const STAGES = [
  {
    title: "The marketing page",
    body: "A SaaS landing page from kickoff to conversion lift — wireframe to hi-fi, A/B reveal at the end.",
  },
  {
    title: "The product",
    body: "Custom software or multi-tenant SaaS — architecture to sprint shipping to a production URL.",
  },
  {
    title: "The growth engine",
    body: "SEO + paid + CRO after launch — analytics live, tests running, pipeline compounding.",
  },
];

export function ProcessPipeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 max-w-2xl"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 05 the <em className="font-[family-name:var(--font-display)] not-italic italic">process</em>
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-primary"
          >
            Three services.
            <br />
            <span className="heading-accent">One system.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-4 text-text-secondary">
            Same five acts. Different stage — whether the deliverable is a page, a product, or a
            growth engine.
          </motion.p>
        </motion.div>

        {/* Horizontal funnel strip — DH style */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
          {ACTS.map((act, i) => (
            <button
              key={act.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "min-w-[140px] flex-1 rounded-2xl border px-4 py-4 text-left transition-all",
                active === i
                  ? "border-accent bg-accent text-white shadow-[0_12px_32px_rgba(29,78,216,0.25)]"
                  : "border-border-subtle bg-bg-secondary text-text-secondary hover:border-border-strong"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider",
                  active === i ? "text-white/70" : "text-accent"
                )}
              >
                § {act.id}
              </span>
              <span className="mt-1 block font-[family-name:var(--font-heading)] text-lg font-bold">
                {act.title}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-12 rounded-[1.75rem] border border-border-subtle bg-[#EFF6FF] p-8 lg:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Act {ACTS[active].id} · {ACTS[active].title}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold text-text-primary lg:text-4xl">
              {ACTS[active].line}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-display)] text-xl italic text-accent lg:text-2xl">
              {ACTS[active].italic}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-4 md:grid-cols-3">
          {STAGES.map((stage) => (
            <div
              key={stage.title}
              className="rounded-2xl border border-border-subtle bg-bg-secondary p-6"
            >
              <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                {stage.title.split(" ").slice(0, 2).join(" ")}{" "}
                <em className="font-[family-name:var(--font-display)] not-italic italic text-accent">
                  {stage.title.split(" ").slice(2).join(" ")}
                </em>
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{stage.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            <em className="text-accent">same five acts</em>, different stage · predictable cadence,
            unpredictable craft
          </p>
          <Link href="/contact" className="btn-primary text-sm">
            See how we&apos;d ship yours <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
