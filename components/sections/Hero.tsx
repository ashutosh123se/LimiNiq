"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { HeroMediaBackground } from "@/components/media/HeroMediaBackground";
import { TEAM } from "@/data/team";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/site";
import { WHATSAPP_URL } from "@/data/navigation";
import { revealVariants, staggerContainer } from "@/lib/motion";

const PAINS = [
  { text: "missed deadlines.", italic: false },
  { text: "ghosting vendors.", italic: true },
  { text: "redoing it twice.", italic: false },
  { text: "chasing updates.", italic: true },
  { text: "waiting months.", italic: false },
  { text: "surprise costs.", italic: true },
];

const TICKER = [
  "✅ 150+ Projects Delivered",
  "⭐ 4.9★ Client Rating",
  "📈 $12M+ Revenue Generated",
  "🔁 98% Client Retention",
  "📍 Founded 2019 · Delhi",
  "🔐 You Own the Code",
  "💳 Milestone Billing",
  "⭐ 4.5★ Google Reviews",
  "🛠️ Software + Marketing Under One Roof",
];

export function Hero() {
  const reduced = useReducedMotion();
  const ticker = [...TICKER, ...TICKER];

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-20 lg:pt-24">
      <HeroMediaBackground />

      {/* Giant watermark like DH "HEROES" */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[18%] z-[1] select-none overflow-hidden text-center"
        aria-hidden
      >
        <span className="font-[family-name:var(--font-heading)] text-[clamp(4.5rem,18vw,14rem)] font-extrabold leading-none tracking-[-0.06em] text-accent/[0.06]">
          LIMINIQ
        </span>
      </div>

      <div className="section-container relative z-10 grid items-end gap-10 pb-8 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pb-10 lg:pt-16">
        {/* LEFT — DH-style pain headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={revealVariants}
            className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            LIMINIQ · EST 2019
          </motion.p>

          <motion.h1
            variants={revealVariants}
            className="mb-6 font-[family-name:var(--font-heading)] text-[clamp(2.6rem,6.5vw,5.25rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-text-primary"
          >
            <span className="block">NO MORE</span>
            {PAINS.map((p) => (
              <span key={p.text} className="mr-[0.28em] inline">
                {p.italic ? (
                  <em className="font-[family-name:var(--font-display)] font-normal not-italic italic text-accent">
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
            className="mb-8 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            We build custom software, SaaS, websites, mobile apps, and growth systems. Done fast.
            Done right. Done once — the first time.
          </motion.p>

          <motion.div variants={revealVariants} className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${SITE_CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(29,78,216,0.28)] transition hover:bg-accent-hover"
            >
              <Mail size={16} /> Email us
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white px-6 py-3.5 text-sm font-bold text-text-primary transition hover:border-accent hover:text-accent"
            >
              <MessageCircle size={16} /> Live Chat
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Ignition / What We Do panel (DH pattern) */}
        <motion.aside
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden overflow-hidden rounded-[1.75rem] border border-border-subtle bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-md lg:block"
        >
          <div className="relative h-44 overflow-hidden border-b border-border-subtle">
            <Image
              src="/images/hero/poster.png"
              alt=""
              fill
              className="object-cover opacity-80"
              sizes="420px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Ignition
                </p>
                <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-text-primary">
                  150+ Projects
                </p>
              </div>
              <p className="text-right font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Delhi · Global
              </p>
            </div>
          </div>

          <div className="p-6">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
              What we do
            </p>
            <p className="mb-5 text-sm leading-relaxed text-text-secondary">
              Industry-leading software, premium product design, and growth that compounds.
            </p>

            <div className="mb-5 flex -space-x-3">
              {TEAM.slice(0, 4).map((m) => (
                <div
                  key={m.name}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-accent-muted shadow-sm"
                  title={`${m.name} — ${m.role}`}
                >
                  <Image src={m.photoSrc} alt={m.name} fill className="object-cover object-top" sizes="44px" />
                </div>
              ))}
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3 border-y border-border-subtle py-4">
              <div>
                <p className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-accent">
                  98%
                </p>
                <p className="text-[11px] uppercase tracking-wide text-text-muted">Retention</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-accent">
                  $12M+
                </p>
                <p className="text-[11px] uppercase tracking-wide text-text-muted">Revenue scaled</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <a
                  href={SITE_SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-text-secondary hover:border-accent hover:text-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={SITE_SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-text-secondary hover:border-accent hover:text-accent"
                >
                  Instagram
                </a>
              </div>
              <Link href="/services" className="text-xs font-bold text-accent hover:underline">
                Explore →
              </Link>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Continuous trust ticker — DH award strip pattern */}
      <div className="relative z-10 border-y border-border-subtle bg-white/85 py-3.5 backdrop-blur-md">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <div className="marquee-track gap-8">
            {ticker.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-2 whitespace-nowrap text-sm font-medium text-text-secondary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
