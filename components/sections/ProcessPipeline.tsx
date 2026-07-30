"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass, Cuboid, Rocket, Sparkles, Wand2 } from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ACTS = [
  {
    id: "01",
    title: "Discover",
    line: "Brief, audience, voice.",
    italic: "The story before the design.",
    detail:
      "We pressure-test goals, audience, and constraints before a single wireframe — so the build has a clear north star.",
    icon: Compass,
  },
  {
    id: "02",
    title: "Design",
    line: "Wireframes become hi-fidelity.",
    italic: "Decisions become defendable.",
    detail:
      "Structure first, then visual system. Every screen earns its place against conversion and clarity — not taste alone.",
    icon: Wand2,
  },
  {
    id: "03",
    title: "Build",
    line: "Components, content, infrastructure.",
    italic: "Done in green.",
    detail:
      "Production-ready engineering: typed components, content hooks, and deployable infrastructure from day one.",
    icon: Cuboid,
  },
  {
    id: "04",
    title: "Launch",
    line: "Quiet ship. Loud welcome.",
    italic: "A live URL with shipped on it.",
    detail:
      "Soft launch, QA, analytics live, and a URL your team can share without apology.",
    icon: Rocket,
  },
  {
    id: "05",
    title: "Optimize",
    line: "A/B, cohort, ROI.",
    italic: "Numbers that justify the next sprint.",
    detail:
      "Post-launch loops: experiments, retention signals, and paid/SEO compounding — not a handoff and goodbye.",
    icon: Sparkles,
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
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const ActiveIcon = ACTS[active].icon;
  const progress = ((active + 1) / ACTS.length) * 100;

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % ACTS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-24 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="section-container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 max-w-2xl"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 05 the{" "}
            <em className="font-[family-name:var(--font-display)] not-italic italic">process</em>
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

        {/* Timeline acts */}
        <div
          className="relative mb-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track */}
          <div className="absolute left-3 right-3 top-[1.15rem] hidden h-px bg-border-subtle sm:block lg:left-6 lg:right-6" />
          <motion.div
            className="absolute left-3 top-[1.15rem] hidden h-px origin-left bg-gradient-to-r from-accent via-sky-400 to-accent sm:block lg:left-6"
            style={{ width: `calc((100% - 1.5rem) * ${progress / 100})` }}
            layout
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          />

          <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible">
            {ACTS.map((act, i) => {
              const Icon = act.icon;
              const isActive = active === i;
              const isPast = i < active;

              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative min-w-[132px] flex-1 text-left sm:min-w-0"
                >
                  <span className="relative z-[1] mb-3 flex items-center sm:justify-start">
                    <span
                      className={cn(
                        "relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
                        isActive
                          ? "border-accent bg-accent text-white"
                          : isPast
                            ? "border-accent/40 bg-accent/10 text-accent"
                            : "border-border-subtle bg-white text-text-muted group-hover:border-accent/40 group-hover:text-accent"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="process-node-glow"
                          className="absolute inset-0 rounded-full bg-accent/30 blur-md"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon size={15} className="relative" />
                    </span>
                  </span>

                  <span
                    className={cn(
                      "relative block rounded-2xl border px-3.5 py-3.5 transition-colors duration-300",
                      isActive
                        ? "border-accent/25 bg-white"
                        : "border-transparent bg-transparent group-hover:border-border-subtle group-hover:bg-bg-secondary/70"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="process-active-panel"
                        className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-accent/[0.08] to-transparent ring-1 ring-accent/20"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.14em]",
                        isActive ? "text-accent" : "text-text-muted"
                      )}
                    >
                      § {act.id}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block font-[family-name:var(--font-heading)] text-base font-bold sm:text-lg",
                        isActive ? "text-text-primary" : "text-text-secondary"
                      )}
                    >
                      {act.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active act stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12 overflow-hidden rounded-[1.75rem] border border-border-subtle bg-[#F4F8FF]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(59,130,246,0.18), transparent 55%)",
              }}
            />
            <div className="pointer-events-none absolute -right-6 top-6 font-[family-name:var(--font-heading)] text-[clamp(5rem,14vw,9rem)] font-black leading-none tracking-[-0.06em] text-accent/[0.06]">
              {ACTS[active].id}
            </div>

            <div className="relative grid gap-8 p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12 lg:p-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-white text-accent shadow-[0_12px_40px_rgba(29,78,216,0.12)] lg:h-20 lg:w-20">
                <ActiveIcon size={28} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  Act {ACTS[active].id} · {ACTS[active].title}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
                  {ACTS[active].line}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-display)] text-xl italic text-accent lg:text-2xl">
                  {ACTS[active].italic}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                  {ACTS[active].detail}
                </p>

                {/* Step dots */}
                <div className="mt-8 flex items-center gap-2">
                  {ACTS.map((act, i) => (
                    <button
                      key={act.id}
                      type="button"
                      aria-label={`Go to ${act.title}`}
                      onClick={() => setActive(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === active ? "w-8 bg-accent" : "w-1.5 bg-accent/25 hover:bg-accent/50"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-4 md:grid-cols-3">
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border-subtle bg-bg-secondary p-6"
            >
              <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                {stage.title.split(" ").slice(0, 2).join(" ")}{" "}
                <em className="font-[family-name:var(--font-display)] not-italic italic text-accent">
                  {stage.title.split(" ").slice(2).join(" ")}
                </em>
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{stage.body}</p>
            </motion.div>
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
