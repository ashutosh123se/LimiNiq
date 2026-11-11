"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { CinematicVideo } from "@/components/media/CinematicVideo";
import { TEAM } from "@/data/team";
import { SITE_CONTACT } from "@/lib/site";
import { revealVariants, staggerContainer } from "@/lib/motion";

const TRUST_MARQUEE = [
  "150+ Projects Delivered Worldwide",
  "4.9★ Verified Client Rating",
  "$12M+ Client Revenue Influenced",
  "98% Client Retention",
  "100% Code & IP Ownership",
  "Fixed Milestone-Based Billing",
  "Seamless US, UK & Gulf Timezone Overlap",
  "Senior Engineering Architecture",
];

const SHOWCASE_TABS = [
  {
    id: "ai-agents",
    label: "Autonomous AI Agents",
    shortLabel: "AI Agents",
    icon: Bot,
    badge: "LLM Orchestration",
    title: "LeadFlow AI & Multi-Agent Execution",
    description:
      "Autonomous tool-calling agents that enrich leads, extract unstructured invoices, and route CRM data in real time.",
    image: "/images/portfolio/ecommerce_dashboard.png",
    stat: "0.38s execution",
    statLabel: "Sub-second LLM tool response",
    floatingPill: "⚡ 52% manual work cut",
    accent: "from-sky-500 to-blue-600",
  },
  {
    id: "saas-platform",
    label: "Custom SaaS & Cloud",
    shortLabel: "Custom SaaS",
    icon: Code2,
    badge: "Next.js 15 & Node.js",
    title: "Multi-Tenant Enterprise Platforms",
    description:
      "Production web apps built with high-velocity stacks, Stripe billing, RBAC, and scalable PostgreSQL database models.",
    image: "/images/portfolio/realestate_platform.png",
    stat: "99.99% uptime",
    statLabel: "Enterprise-grade reliability",
    floatingPill: "🛡️ 100% code ownership",
    accent: "from-indigo-500 to-purple-600",
  },
  {
    id: "workflow-engine",
    label: "Workflow Automation",
    shortLabel: "Workflows",
    icon: Layers,
    badge: "ETL & ERP Pipelines",
    title: "Bi-Directional System Automation",
    description:
      "Connect HubSpot, Salesforce, Slack, and internal SQL databases with event-driven sync and self-healing error handling.",
    image: "/images/portfolio/social_commerce_food.png",
    stat: "48K+ daily events",
    statLabel: "Zero manual data re-entry",
    floatingPill: "🚀 4-week sprint ship",
    accent: "from-cyan-500 to-emerald-600",
  },
];

export function Hero() {
  const reduced = useReducedMotion();
  const ticker = [...TRUST_MARQUEE, ...TRUST_MARQUEE];
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle tabs smoothly unless hovered/interacted
  useEffect(() => {
    if (reduced || isPaused) return;
    const interval = window.setInterval(() => {
      setActiveTab((prev) => (prev + 1) % SHOWCASE_TABS.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [reduced, isPaused]);

  const currentTab = SHOWCASE_TABS[activeTab];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#060B18] pt-24 text-white lg:pt-28">
      {/* 1. Cinematic Background Video Layer */}
      <CinematicVideo
        src="/videos/hero.mp4"
        poster="/images/showreel/frame-01.png"
        opacity={0.35}
        priority={true}
        overlayClassName="bg-gradient-to-r from-[#060B18]/95 via-[#060B18]/85 to-[#060B18]/60"
      />

      {/* 2. Layered Ambient Lighting Glows & Cyber Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden
      >
        {/* Top-center ambient light */}
        <div className="absolute -top-32 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/20 via-sky-500/10 to-transparent blur-[120px]" />
        {/* Left cyan spotlight */}
        <div className="absolute top-1/4 -left-24 h-[450px] w-[500px] rounded-full bg-sky-500/15 blur-[130px]" />
        {/* Right purple/indigo aura */}
        <div className="absolute top-1/3 -right-24 h-[500px] w-[600px] rounded-full bg-indigo-600/20 blur-[140px]" />
        {/* High-tech engineering grid matrix */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 90%)",
          }}
        />
      </div>

      {/* 3. Main Hero Interactive Grid */}
      <div className="section-container relative z-10 grid min-h-[calc(100svh-8.5rem)] items-center gap-10 pb-14 pt-2 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-14">
        {/* LEFT COLUMN: High-Impact Typography & Conversion Focus */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center"
        >
          {/* Status Badge with Live Pulsing Radar */}
          <motion.div variants={revealVariants} className="mb-5 flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-transparent px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_24px_rgba(56,189,248,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-sky-200">
                AI AUTOMATION &amp; SOFTWARE ENGINEERING
              </span>
              <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                <Globe2 size={12} className="text-emerald-400" />
                US • UK • Gulf Live Overlap
              </span>
            </div>
          </motion.div>

          {/* Primary SEO H1 Headline with High-Contrast Gradient */}
          <motion.h1
            variants={revealVariants}
            className="mb-4 font-[family-name:var(--font-heading)] text-[clamp(2.4rem,5.1vw,4.3rem)] font-extrabold leading-[1.07] tracking-[-0.038em] text-white"
          >
            Custom Software Development{" "}
            <span className="block mt-1 bg-gradient-to-r from-sky-400 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
              &amp; AI Automation
            </span>
          </motion.h1>

          {/* Subheading Outcome Lead */}
          <motion.p
            variants={revealVariants}
            className="mb-3 text-lg font-semibold text-sky-100/95 sm:text-xl lg:text-[1.35rem]"
          >
            Cut manual work by{" "}
            <span className="font-[family-name:var(--font-display)] italic font-semibold text-sky-300 underline decoration-sky-400/40 underline-offset-4">
              50%+
            </span>{" "}
            with production-grade engineering.
          </motion.p>

          {/* Supporting Copy */}
          <motion.p
            variants={revealVariants}
            className="mb-6 max-w-xl text-sm leading-relaxed text-slate-300/85 sm:text-base"
          >
            Senior engineers. Fixed milestones. You own 100% of the code. We architect custom SaaS
            platforms, autonomous AI agents, and internal workflow automations — backed by seamless
            international timezone coverage.
          </motion.p>

          {/* Value Pillar Chips */}
          <motion.div
            variants={revealVariants}
            className="mb-8 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-200"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-amber-400/40 hover:bg-amber-500/10">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              Fixed 2–4 Week Sprints
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              100% IP &amp; Code Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-sky-400/40 hover:bg-sky-500/10">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              Senior Architect Led
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={revealVariants}
            className="mb-8 flex flex-wrap items-center gap-3.5"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_32px_rgba(56,189,248,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_46px_rgba(56,189,248,0.7)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Claim Free Automation Audit
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            <Link
              href="/services/ai-automation"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:border-white/35 hover:bg-white/15"
            >
              Explore AI Capabilities
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-sky-200 transition-colors hover:text-white"
            >
              Case Studies
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>

          {/* Social Proof & Trust Metrics Bar */}
          <motion.div
            variants={revealVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6 border-t border-white/10 pt-5 text-xs text-slate-300/80"
          >
            {/* Real Architect Avatars with Active Beacon */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {TEAM.slice(0, 4).map((member) => (
                  <div
                    key={member.name}
                    className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-[#060B18]"
                    title={`${member.name} — ${member.role}`}
                  >
                    <Image
                      src={member.photoSrc}
                      alt={member.name}
                      fill
                      sizes="28px"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400">
                  <span className="text-xs">★★★★★</span>
                  <span className="font-bold text-white ml-0.5">4.9★</span>
                </div>
                <span className="text-[10.5px] text-slate-400">Verified Client Rating</span>
              </div>
            </div>

            <div className="hidden sm:block h-6 w-px bg-white/15" />

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-[11.5px]">
              <div>
                <span className="font-bold text-white text-sm">150+</span>
                <span className="text-slate-400 block text-[10px]">Shipped Projects</span>
              </div>
              <div>
                <span className="font-bold text-emerald-400 text-sm">98%</span>
                <span className="text-slate-400 block text-[10px]">Client Retention</span>
              </div>
              <div>
                <span className="font-bold text-sky-300 text-sm">NDA in 1hr</span>
                <span className="text-slate-400 block text-[10px]">Zero Vendor Lock-in</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Interactive AI & Engineering Command Deck */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Ambient Underglow */}
          <div
            className="absolute -inset-2 rounded-[2.2rem] bg-gradient-to-r from-sky-500/25 via-blue-600/20 to-indigo-600/25 opacity-70 blur-2xl"
            aria-hidden
          />

          {/* Main Glass Deck Container */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-[#070D1D]/90 p-3 sm:p-4 shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* 1. Terminal / Mac Browser Header Bar */}
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 px-2 pb-3">
              {/* macOS Traffic Dots */}
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 ring-1 ring-rose-400/30" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 ring-1 ring-amber-400/30" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 ring-1 ring-emerald-400/30" />
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-slate-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span>ENGINEERING PRODUCTION SUITE</span>
              </div>

              {/* Live Metric */}
              <span className="font-mono text-[10px] text-emerald-400 font-semibold hidden sm:inline-block">
                ● 99.98% SLA
              </span>
            </div>

            {/* 2. Interactive Capability Tabs */}
            <div className="mb-3 grid grid-cols-3 gap-1.5 rounded-xl bg-black/35 p-1 border border-white/10">
              {SHOWCASE_TABS.map((tab, idx) => {
                const Icon = tab.icon;
                const active = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`relative flex items-center justify-center gap-1.5 rounded-lg py-2 px-1 text-[11px] font-semibold transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_2px_12px_rgba(59,130,246,0.5)]"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={13} className={active ? "text-white" : "text-sky-300"} />
                    <span className="truncate">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* 3. Dynamic Visual Preview Screen */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/12 bg-[#050914] shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentTab.image}
                    alt={currentTab.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 95vw, 480px"
                    className="object-cover object-top"
                  />
                  {/* Subtle Dark Vignette & Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/90 via-[#060B18]/30 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#060B18]/85 px-3 py-1 text-[10.5px] font-bold text-sky-200 backdrop-blur-md shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    {currentTab.badge}
                  </div>

                  {/* Live Stream Terminal Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/15 bg-black/75 px-3 py-2 text-[11px] font-mono text-slate-200 backdrop-blur-md">
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-sky-400">❯</span>
                      <span className="truncate">{currentTab.statLabel}</span>
                    </span>
                    <span className="font-bold text-emerald-400 shrink-0 ml-2">
                      {currentTab.stat}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 4. Layered 3D Floating Glass Badge (Top Right) */}
              <motion.div
                animate={reduced ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -top-1 -right-1 z-20 hidden sm:block"
              >
                <div className="rounded-xl border border-sky-400/40 bg-[#060B18]/92 p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">
                      <TrendingUp size={14} />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-sky-300 font-bold">
                        Live Impact
                      </div>
                      <div className="text-xs font-bold text-white">52% Overhead Cut</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 5. Layered 3D Floating Glass Badge (Bottom Left) */}
              <motion.div
                animate={reduced ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="pointer-events-none absolute -bottom-2 -left-1 z-20 hidden sm:block"
              >
                <div className="rounded-xl border border-emerald-400/40 bg-[#060B18]/92 p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                        Verified Outcome
                      </div>
                      <div className="text-xs font-bold text-white">100% IP Transfer</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 6. Active Spec Details Card */}
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{currentTab.title}</h3>
                  <p className="mt-1 text-xs text-slate-300/80 leading-relaxed">
                    {currentTab.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-sky-400/30 bg-sky-500/15 px-2.5 py-1 text-[10.5px] font-bold text-sky-300">
                  {currentTab.floatingPill}
                </span>
              </div>
            </div>

            {/* 7. Footer: Team & Direct Contact Ribbon */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 px-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                </span>
                <span className="font-medium text-slate-300 text-[11.5px]">
                  Direct access to senior engineering leads
                </span>
              </div>
              <Link
                href="/contact"
                className="font-bold text-sky-300 hover:text-white transition-colors text-[11.5px] flex items-center gap-1"
              >
                Schedule Call <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. High-Tech Marquee Ticker */}
      <div className="relative z-10 border-y border-white/12 bg-[#050914]/90 py-3.5 backdrop-blur-xl">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track gap-10">
            {ticker.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-1 flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-sm font-semibold tracking-wide text-slate-300/85 hover:text-white transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
