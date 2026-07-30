"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { CinematicVideo } from "@/components/media/CinematicVideo";
import { TEAM } from "@/data/team";
import { SITE_CONTACT } from "@/lib/site";
import { WHATSAPP_URL } from "@/data/navigation";
import { revealVariants, staggerContainer } from "@/lib/motion";

const PAINS = [
  { text: "missed deadlines.", accent: false },
  { text: "ghosting vendors.", accent: true },
  { text: "redoing it twice.", accent: false },
  { text: "chasing updates.", accent: true },
  { text: "waiting months.", accent: false },
  { text: "surprise costs.", accent: true },
];

const TRUST = [
  "150+ projects delivered",
  "4.9★ client rating",
  "$12M+ revenue generated",
  "98% client retention",
  "You own the code",
  "Milestone billing",
  "Founded 2019 · Delhi",
  "4.5★ Google Reviews",
];

const STACK = [
  { icon: Zap, label: "Ship velocity", value: "Sprint-ready" },
  { icon: ShieldCheck, label: "Ownership", value: "You own the code" },
  { icon: Sparkles, label: "Growth loop", value: "Build + acquire" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const ticker = [...TRUST, ...TRUST];
  const [painIndex, setPainIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setPainIndex((i) => (i + 1) % PAINS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0B1F3A] pt-24 text-white lg:pt-28">
      {/* Full-bleed AI showreel */}
      <CinematicVideo
        src="/videos/hero.mp4"
        poster="/images/showreel/frame-01.png"
        opacity={0.55}
        overlayClassName="bg-gradient-to-r from-[#0B1F3A]/92 via-[#0B1F3A]/72 to-[#0B1F3A]/45"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 30%, rgba(59,130,246,0.25), transparent 60%)",
        }}
      />

      <div className="section-container relative z-10 grid min-h-[calc(100svh-8rem)] items-center gap-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={revealVariants} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-300" />
              </span>
              LIMINIQ Showreel · Est 2019
            </span>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="mb-2 font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.22em] text-blue-200/80"
          >
            NO MORE
          </motion.p>

          <motion.h1
            variants={revealVariants}
            className="mb-3 font-[family-name:var(--font-heading)] text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[1.02] tracking-[-0.04em]"
          >
            <span className="block text-white/35">agency chaos.</span>
            <span className="relative block min-h-[1.15em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={PAINS[painIndex].text}
                  initial={reduced ? false : { y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {PAINS[painIndex].accent ? (
                    <em className="font-[family-name:var(--font-display)] font-normal italic text-blue-300">
                      {PAINS[painIndex].text}
                    </em>
                  ) : (
                    PAINS[painIndex].text
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mb-8 max-w-lg text-base leading-relaxed text-blue-100/75 sm:text-lg"
          >
            Custom software, SaaS, websites, and growth — done fast, done right, done once. One senior
            team for product and pipeline.
          </motion.p>

          <motion.div variants={revealVariants} className="mb-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_40px_rgba(59,130,246,0.45)] transition hover:bg-blue-400"
            >
              Start your project <ArrowRight size={16} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              View our work
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-200 hover:text-white"
            >
              WhatsApp <ArrowUpRight size={14} />
            </a>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {[
              { value: "150+", label: "Projects" },
              { value: "4.9★", label: "Rating" },
              { value: "98%", label: "Retention" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-blue-200/60">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating glass panel over video */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/portfolio/ecommerce_dashboard.png"
                alt="LIMINIQ delivery dashboard"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[#0B1F3A] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                  Showreel live
                </span>
              </div>
            </div>
            <div className="space-y-2 p-4">
              {STACK.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                      <Icon size={16} />
                    </span>
                    <span>
                      <span className="block text-[11px] text-blue-100/50">{item.label}</span>
                      <span className="block text-sm font-semibold text-white">{item.value}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3.5">
              <div className="flex -space-x-2">
                {TEAM.map((m) => (
                  <div
                    key={m.name}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#0B1F3A]"
                  >
                    <Image
                      src={m.photoSrc}
                      alt={m.name}
                      fill
                      sizes="32px"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="text-[11px] font-semibold text-blue-200 hover:text-white"
              >
                {SITE_CONTACT.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 border-y border-white/10 bg-[#0B1F3A]/80 py-3.5 backdrop-blur-md">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track gap-10">
            {ticker.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-1 flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-blue-100/70"
              >
                <span className="h-1 w-1 rounded-full bg-blue-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
