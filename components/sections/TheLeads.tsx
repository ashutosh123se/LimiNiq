"use client";

import { useEffect, useId, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";
import { ArrowUpRight, FolderKanban, IndianRupee, Star, Users } from "lucide-react";
import { StatCounter } from "@/components/ui/StatCounter";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Lead = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  display?: string;
  icon: typeof FolderKanban;
  accent: string;
  span?: "lg" | "md";
  ring?: number; // 0–1 fill for circular meter
};

const LEADS: Lead[] = [
  {
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
    sub: "Since 2019 · Delhi",
    icon: FolderKanban,
    accent: "from-blue-600/20 via-blue-500/5 to-transparent",
    span: "lg",
  },
  {
    value: 12,
    prefix: "$",
    suffix: "M+",
    label: "Revenue Scaled",
    sub: "For client businesses",
    icon: IndianRupee,
    accent: "from-sky-500/15 via-transparent to-transparent",
    span: "md",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    sub: "Long-term partners",
    icon: Users,
    accent: "from-indigo-500/15 via-transparent to-transparent",
    ring: 0.98,
  },
  {
    value: 49,
    label: "Client Rating",
    sub: "4.9★ average · Google 4.5",
    display: "4.9★",
    icon: Star,
    accent: "from-amber-400/20 via-transparent to-transparent",
    ring: 0.98,
  },
];

const TICKER = [
  "150+ shipped",
  "You own the code",
  "Milestone billing",
  "98% retention",
  "$12M+ scaled",
  "Founded 2019",
  "4.9★ clients",
  "Delhi · remote-ready",
];

function RingMeter({ progress, className }: { progress: number; className?: string }) {
  const id = useId();
  const reduced = useReducedMotion();
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const r = 34;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    if (!ref.current) return;
    if (reduced || !inView) {
      ref.current.style.strokeDashoffset = String(c * (1 - (reduced ? progress : 0)));
      return;
    }
    const controls = animate(0, progress, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.style.strokeDashoffset = String(c * (1 - v));
      },
    });
    return () => controls.stop();
  }, [inView, progress, reduced, c]);

  return (
    <svg viewBox="0 0 80 80" className={cn("h-16 w-16 -rotate-90", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(29,78,216,0.12)" strokeWidth="5" />
      <circle
        ref={ref}
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c}
      />
    </svg>
  );
}

function LeadTile({ lead, index }: { lead: Lead; index: number }) {
  const Icon = lead.icon;
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-[1.35rem] border border-border-subtle bg-white/70 p-6 backdrop-blur-sm lg:p-8",
        "shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)]",
        lead.span === "lg" && "lg:col-span-2 lg:row-span-2",
        lead.span === "md" && "lg:col-span-2"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity duration-500 group-hover:opacity-100",
          lead.accent
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-transform duration-500 group-hover:scale-125"
        aria-hidden
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/15 bg-white/80 text-accent shadow-sm">
            <Icon size={18} />
          </span>
          {lead.ring != null ? (
            <RingMeter progress={lead.ring} />
          ) : (
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              0{index + 1}
            </span>
          )}
        </div>

        <div
          className={cn(
            "font-[family-name:var(--font-heading)] font-extrabold leading-none tracking-[-0.05em] text-text-primary",
            lead.span === "lg"
              ? "text-[clamp(3.5rem,8vw,6.5rem)]"
              : "text-[clamp(2.4rem,4.5vw,3.5rem)]"
          )}
        >
          {lead.display ? (
            <span className="inline-flex items-baseline gap-1">
              {lead.display.replace("★", "")}
              <Star className="relative top-[-0.15em] h-[0.45em] w-[0.45em] fill-amber-400 text-amber-400" />
            </span>
          ) : (
            <StatCounter value={lead.value} prefix={lead.prefix} suffix={lead.suffix} />
          )}
        </div>

        <div className="mt-auto pt-5">
          <p className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.1em] text-text-primary">
            {lead.label}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-text-muted">
            {lead.sub}
            <ArrowUpRight
              size={14}
              className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function TheLeads() {
  const reduced = useReducedMotion();
  const ticker = [...TICKER, ...TICKER];

  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-[#F4F7FC] py-16 lg:py-24">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(29,78,216,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl" />
        <motion.p
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-heading)] text-[clamp(6rem,22vw,18rem)] font-black leading-none tracking-[-0.08em] text-accent/[0.04]"
          animate={reduced ? undefined : { x: ["-2%", "2%", "-2%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          150+
        </motion.p>
      </div>

      <div className="section-container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.p variants={revealVariants} className="section-number mb-3">
              the <em className="font-[family-name:var(--font-display)] not-italic italic">leads</em>
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-text-primary"
            >
              Numbers that{" "}
              <span className="relative inline-block">
                <span className="relative z-[1]">earn</span>
                <motion.span
                  className="absolute bottom-1 left-0 h-3 w-full -z-0 rounded-sm bg-blue-200/70"
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
              </span>{" "}
              the next call.
            </motion.h2>
          </div>

          <motion.div variants={revealVariants} className="max-w-sm lg:text-right">
            <p className="text-sm leading-relaxed text-text-secondary">
              Real delivery metrics —{" "}
              <em className="font-[family-name:var(--font-display)] text-accent not-italic italic">
                accountable
              </em>
              , client-earned, never borrowed badges.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-white/80 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Live since 2019
            </div>
          </motion.div>
        </motion.div>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {LEADS.map((lead, i) => (
            <LeadTile key={lead.label} lead={lead} index={i} />
          ))}
        </div>
      </div>

      {/* Trust ticker */}
      <div className="relative mt-12 border-y border-border-subtle/80 bg-white/50 py-3 backdrop-blur-sm lg:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F4F7FC] to-transparent lg:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F4F7FC] to-transparent lg:w-28" />
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap px-6"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {ticker.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-3 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-[0.12em] text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
