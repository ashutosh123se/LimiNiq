"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { CinematicVideo } from "@/components/media/CinematicVideo";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CLIPS = [
  {
    id: "network",
    title: "Systems that scale",
    tag: "Software",
    poster: "/images/showreel/frame-01.png",
    href: "/services/custom-software-saas",
    video: true,
  },
  {
    id: "product",
    title: "Products that convert",
    tag: "SaaS UI",
    poster: "/images/showreel/frame-02.png",
    href: "/portfolio",
  },
  {
    id: "motion",
    title: "Motion that clarifies",
    tag: "Brand",
    poster: "/images/showreel/frame-03.png",
    href: "/services/ui-ux-design-branding",
  },
  {
    id: "commerce",
    title: "Commerce that ships",
    tag: "Web",
    poster: "/images/portfolio/ecommerce_dashboard.png",
    href: "/services/website-ecommerce",
  },
  {
    id: "growth",
    title: "Growth that compounds",
    tag: "Marketing",
    poster: "/images/portfolio/edtech_marketing.png",
    href: "/services/digital-marketing",
  },
  {
    id: "place",
    title: "PropTech, built right",
    tag: "Industry",
    poster: "/images/portfolio/realestate_platform.png",
    href: "/industries/saas-startups",
  },
] as const;

export function VideoConstellation() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const current = CLIPS[active];

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % CLIPS.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  return (
    <section className="relative overflow-hidden bg-[#071526] py-16 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 15% 20%, rgba(59,130,246,0.28), transparent 60%), radial-gradient(ellipse 45% 40% at 90% 80%, rgba(14,165,233,0.18), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(147,197,253,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.35) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={revealVariants}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-300" />
              </span>
              § 08 · Showreel
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em]"
            >
              Content that converts,{" "}
              <em className="font-[family-name:var(--font-display)] font-normal italic text-sky-300">
                on loop.
              </em>
            </motion.h2>
            <motion.div
              variants={revealVariants}
              className="mt-5 flex flex-wrap items-center gap-2 text-sm text-blue-100/70 sm:text-base"
            >
              <span>Hover any title to peek. Frames from</span>
              <Image
                src="/images/logo-stack.png"
                alt="LIMINIQ"
                width={480}
                height={480}
                className="h-8 w-8 object-contain opacity-95 sm:h-9 sm:w-9"
              />
              <span>+ shipped work.</span>
            </motion.div>
          </div>

          <motion.div variants={revealVariants}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-[#071526] transition hover:bg-sky-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071526] text-white transition group-hover:scale-105">
                <Play size={13} fill="currentColor" className="ml-0.5" />
              </span>
              Watch the work
              <ArrowUpRight size={15} className="opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          </motion.div>
        </motion.div>

        <div
          className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Preview stage */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0B1F3A] shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  {"video" in current && current.video ? (
                    <CinematicVideo
                      src="/videos/hero.mp4"
                      poster={current.poster}
                      opacity={0.95}
                      overlayClassName="bg-gradient-to-t from-[#071526]/90 via-[#071526]/25 to-transparent"
                    />
                  ) : (
                    <>
                      <Image
                        src={current.poster}
                        alt={current.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071526]/90 via-[#071526]/20 to-transparent" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#071526]/50 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-6 sm:top-6">
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                  {String(active + 1).padStart(2, "0")} / {String(CLIPS.length).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-sky-300/30 bg-sky-400/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-200 backdrop-blur">
                  {current.tag}
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {current.title}
                </p>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    key={`progress-${current.id}-${paused}`}
                    className="h-full rounded-full bg-gradient-to-r from-sky-300 to-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: paused || reduced ? "100%" : "100%" }}
                    transition={
                      paused || reduced
                        ? { duration: 0 }
                        : { duration: 3.8, ease: "linear" }
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="flex flex-col lg:col-span-5">
            <ul className="flex flex-1 flex-col justify-center rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-2 backdrop-blur-sm sm:p-3">
              {CLIPS.map((clip, i) => {
                const isActive = active === i;
                return (
                  <li key={clip.id} className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="showreel-active"
                        className="absolute inset-0 rounded-2xl bg-white/[0.08] ring-1 ring-white/15"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Link
                      href={clip.href}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="relative z-[1] flex items-center gap-3 rounded-2xl px-3.5 py-3.5 sm:gap-4 sm:px-4 sm:py-4"
                    >
                      <span
                        className={cn(
                          "font-mono text-xs tabular-nums transition-colors",
                          isActive ? "text-sky-300" : "text-white/30"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 font-[family-name:var(--font-heading)] text-[15px] font-semibold transition-colors sm:text-lg",
                          isActive ? "text-white" : "text-white/45"
                        )}
                      >
                        {clip.title}
                      </span>
                      <span
                        className={cn(
                          "hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] sm:inline",
                          isActive ? "text-sky-200/80" : "text-white/25"
                        )}
                      >
                        {clip.tag}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className={cn(
                          "shrink-0 transition-all",
                          isActive
                            ? "translate-x-0 text-white opacity-100"
                            : "translate-x-[-4px] text-white opacity-0"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 px-1 text-xs text-white/40">
              Autoplays through the reel · hover to pause and explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
