"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface PipelineStep {
  cmd: string;
  flag: string;
  title: string;
  output: string;
  desc: string;
}

const STEPS: PipelineStep[] = [
  {
    cmd: "discover",
    flag: "--deep-dive",
    title: "Discover",
    output: "goals mapped · audience profiled · competitive landscape audited",
    desc: "A structured consultation to understand your product vision, users, and market before a single line of code is written.",
  },
  {
    cmd: "strategize",
    flag: "--data-driven",
    title: "Strategize",
    output: "KPIs defined · channel mix prioritised · roadmap locked",
    desc: "A clear execution plan with measurable targets, realistic timelines, and the right mix of build, SEO, and paid channels.",
  },
  {
    cmd: "design",
    flag: "--conversion-first",
    title: "Design",
    output: "wireframes approved · UI system built · prototypes validated",
    desc: "UI/UX that balances brand identity with conversion — prototypes tested with real users before development begins.",
  },
  {
    cmd: "build",
    flag: "--production-grade",
    title: "Build",
    output: "architecture set · sprints shipping · code reviewed & tested",
    desc: "Agile development with weekly deliverables, rigorous QA, and performance benchmarks baked in from day one.",
  },
  {
    cmd: "launch",
    flag: "--zero-downtime",
    title: "Launch",
    output: "QA passed · deployment live · client team trained",
    desc: "Coordinated go-live with monitoring, documentation, and handover so your team is confident from day one.",
  },
  {
    cmd: "optimize",
    flag: "--continuous",
    title: "Optimize",
    output: "analytics live · A/B tests running · growth compounding",
    desc: "Post-launch iteration — analytics, SEO refinement, and campaign optimisation to keep results climbing.",
  },
];

function TerminalPanel({ active }: { active: number }) {
  const step = STEPS[active];
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(step.output.slice(0, i));
      if (i >= step.output.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [step.output]);

  return (
    <div className="glass-card-premium overflow-hidden rounded-2xl">
      <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] bg-black/40 px-5 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="flex-1 font-mono text-[0.7rem] text-text-muted">liminiq — delivery.sh</span>
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--signal)]">
          <span className="pipeline-live-dot" />
          running
        </span>
      </div>

      <div className="p-5 font-mono sm:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
          <span className="font-bold text-[var(--signal)]">$</span>
          <span className="font-semibold text-text-primary">liminiq run pipeline</span>
          <span className="text-[var(--accent)]">--client your-project</span>
        </div>

        <div className="mb-5 flex flex-col gap-1">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <div
                key={s.cmd}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                  isActive && "bg-[var(--accent-muted)]"
                )}
              >
                <span className="text-[0.68rem] text-text-muted">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span
                  className={cn(
                    "flex-1 text-[0.8rem] font-semibold",
                    isActive ? "text-text-primary" : isDone ? "text-text-muted" : "text-text-secondary"
                  )}
                >
                  {s.cmd} <span className="font-medium text-[var(--accent)]">{s.flag}</span>
                </span>
                <span
                  className={cn(
                    "text-[0.62rem] font-bold uppercase tracking-wider",
                    isActive || isDone ? "text-[var(--signal)]" : "text-text-muted"
                  )}
                >
                  {isDone ? "✓ done" : isActive ? "→ running" : "· queued"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="min-h-[3.5rem] rounded-lg border border-[var(--border-subtle)] bg-black/30 p-3">
          <span className="mb-1 block text-[0.6rem] font-bold uppercase tracking-widest text-text-muted">
            stdout ›
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[0.8rem] leading-relaxed text-[var(--signal)]"
            >
              {typed}
              <span className="pipeline-cursor">▋</span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ step, index }: { step: PipelineStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.4 }}
      className="glass-card relative overflow-hidden p-6 sm:p-8"
    >
      <span className="absolute -right-2 -top-4 font-heading text-6xl font-extrabold text-white/[0.04] sm:text-8xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--signal)]">
        Phase {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="relative mb-3 font-heading text-2xl font-bold text-text-primary sm:text-3xl">
        {step.title}
      </h3>
      <p className="relative max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
        {step.desc}
      </p>
    </motion.div>
  );
}

export function ProcessPipeline() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let closestIndex = -1;
        let closestDistance = Infinity;
        const viewportCenter = window.innerHeight / 2;

        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-step-index"));
          if (!entry.isIntersecting) return;
          const rect = entry.boundingClientRect;
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex >= 0) setActive(closestIndex);
      },
      { threshold: 0.15, rootMargin: "-20% 0px -20% 0px" }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 30%, rgba(108,92,231,0.16), transparent 60%), radial-gradient(40% 35% at 85% 70%, rgba(34,211,238,0.1), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 03 · delivery pipeline
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Six commands.{" "}
            <span className="heading-accent italic">One transparent run.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mx-auto mt-4 max-w-xl text-text-secondary">
            From first brief to compounding growth — every phase is visible, versioned, and
            accountable.
          </motion.p>
        </motion.div>

        {/* Desktop: sticky terminal + scroll-driven step activation */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <TerminalPanel active={active} />
          </div>
          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <div
                key={step.cmd}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step-index={i}
                className="flex min-h-[55vh] flex-col items-stretch justify-center"
              >
                <DetailCard step={step} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical stack, no scroll pin */}
        <div className="flex flex-col gap-6 lg:hidden">
          <TerminalPanel active={active} />
          {STEPS.map((step, i) => (
            <button
              key={step.cmd}
              type="button"
              onClick={() => setActive(i)}
              className="text-left"
            >
              <DetailCard step={step} index={i} />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .pipeline-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--signal);
          box-shadow: 0 0 8px var(--signal);
          ${reducedMotion ? "" : "animation: pipelinePulse 2s ease-in-out infinite;"}
        }
        .pipeline-cursor {
          display: inline-block;
          margin-left: 2px;
          color: var(--accent);
          ${reducedMotion ? "" : "animation: pipelineBlink 1s step-end infinite;"}
        }
        @keyframes pipelinePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes pipelineBlink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
