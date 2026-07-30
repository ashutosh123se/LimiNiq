"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
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

  return (
    <section className="relative overflow-hidden bg-white pt-24 lg:pt-28">
      {/* Soft atmosphere — no heavy image under everything */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 0%, rgba(29,78,216,0.09), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 10%, rgba(59,130,246,0.08), transparent 50%), linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 45%, #FFFFFF 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(29,78,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 40% 20%, black, transparent)",
        }}
      />

      <div className="section-container relative z-10 pb-12 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={revealVariants} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                LIMINIQ · Est 2019
              </span>
              <span className="hidden text-sm text-text-muted sm:inline">
                Software-led agency · Delhi
              </span>
            </motion.div>

            <motion.p
              variants={revealVariants}
              className="mb-3 font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-[0.2em] text-text-muted"
            >
              NO MORE
            </motion.p>

            <motion.h1
              variants={revealVariants}
              className="mb-6 font-[family-name:var(--font-heading)] text-[clamp(2.35rem,5.2vw,4.35rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-text-primary"
            >
              {PAINS.map((p) => (
                <span key={p.text} className="block">
                  {p.accent ? (
                    <em className="font-[family-name:var(--font-display)] font-normal italic text-accent">
                      {p.text}
                    </em>
                  ) : (
                    p.text
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={revealVariants}
              className="mb-8 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              Custom software, SaaS, websites, and growth systems — done fast, done right, done once.
              One senior team for product and pipeline.
            </motion.p>

            <motion.div
              variants={revealVariants}
              className="mb-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(29,78,216,0.3)] transition hover:bg-accent-hover hover:shadow-[0_16px_40px_rgba(29,78,216,0.35)]"
              >
                Start your project <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white px-6 py-3.5 text-sm font-bold text-text-primary transition hover:border-accent hover:text-accent"
              >
                View our work
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-accent hover:underline"
              >
                WhatsApp <ArrowUpRight size={14} />
              </a>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="grid grid-cols-3 gap-3 border-t border-border-subtle pt-6 sm:max-w-md"
            >
              {[
                { value: "150+", label: "Projects" },
                { value: "4.9★", label: "Rating" },
                { value: "98%", label: "Retention" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-text-primary sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual panel */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(29,78,216,0.18),transparent_55%)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-border-subtle bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
              <div className="relative aspect-[16/11] overflow-hidden bg-[#EFF6FF]">
                <Image
                  src="/images/portfolio/ecommerce_dashboard.png"
                  alt="LIMINIQ product delivery — dashboard interface"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/55 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-primary">
                    Delivery live
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                      Featured build
                    </p>
                    <p className="font-[family-name:var(--font-heading)] text-lg font-extrabold text-white">
                      LeadFlow AI
                    </p>
                  </div>
                  <Link
                    href="/portfolio"
                    className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-accent shadow-sm hover:bg-white"
                  >
                    Case studies →
                  </Link>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-border-subtle p-4 sm:p-5">
                {STACK.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={reduced ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      className="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-secondary px-3.5 py-3"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] text-text-muted">{item.label}</span>
                        <span className="block text-sm font-semibold text-text-primary">
                          {item.value}
                        </span>
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-border-subtle bg-bg-secondary/80 px-4 py-3.5 sm:px-5">
                <div className="flex -space-x-2.5">
                  {TEAM.map((m) => (
                    <div
                      key={m.name}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-accent-muted"
                      title={m.name}
                    >
                      <Image
                        src={m.photoSrc}
                        alt={m.name}
                        fill
                        sizes="36px"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-text-primary">Senior team on every build</p>
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="text-[11px] font-medium text-accent hover:underline"
                  >
                    {SITE_CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-y border-border-subtle bg-bg-secondary/90 py-3.5">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track gap-10">
            {ticker.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-1 flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-text-secondary"
              >
                <span className="h-1 w-1 rounded-full bg-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
