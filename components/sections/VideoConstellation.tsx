"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CLIPS = [
  {
    id: "network",
    title: "Systems that scale",
    tag: "Software",
    poster: "/images/showreel/frame-01.png",
    href: "/services/custom-software-saas",
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
];

/** Digital Heroes–style video constellation — hover to peek */
export function VideoConstellation() {
  const [active, setActive] = useState(CLIPS[0].id);
  const current = CLIPS.find((c) => c.id === active) ?? CLIPS[0];

  return (
    <section className="section-padding relative overflow-hidden bg-[#0B1F3A] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(29,78,216,0.25), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.p
              variants={revealVariants}
              className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300"
            >
              § 08 · broadcast · showreel
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight"
            >
              Content that converts,{" "}
              <em className="font-[family-name:var(--font-display)] font-normal italic text-blue-300">
                on loop.
              </em>
            </motion.h2>
            <motion.p variants={revealVariants} className="mt-4 text-blue-100/75">
              Hover any title to peek inside. Built from LIMINIQ cinematic frames + shipped work.
            </motion.p>
          </div>
          <motion.div variants={revealVariants}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/15"
            >
              <Play size={14} fill="currentColor" /> Watch the work
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.poster}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-blue-200">
                    {current.tag}
                  </p>
                  <p className="font-[family-name:var(--font-heading)] text-2xl font-bold">
                    {current.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="flex flex-col" onMouseLeave={() => setActive(CLIPS[0].id)}>
            {CLIPS.map((clip, i) => {
              const isActive = active === clip.id;
              return (
                <li key={clip.id}>
                  <Link
                    href={clip.href}
                    onMouseEnter={() => setActive(clip.id)}
                    onFocus={() => setActive(clip.id)}
                    className={cn(
                      "group flex items-center gap-4 border-b border-white/10 py-4 transition-colors",
                      isActive && "border-blue-400/40"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-xs tabular-nums",
                        isActive ? "text-blue-300" : "text-white/35"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-[family-name:var(--font-heading)] text-lg font-semibold transition-colors sm:text-xl",
                        isActive ? "text-white" : "text-white/55"
                      )}
                    >
                      {clip.title}
                    </span>
                    <span
                      className={cn(
                        "hidden rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider sm:inline",
                        isActive ? "bg-blue-500/30 text-blue-200" : "text-white/30"
                      )}
                    >
                      {clip.tag}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
