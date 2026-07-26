"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { HeroMediaBackground } from "@/components/media/HeroMediaBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatCounter } from "@/components/ui/StatCounter";
import { revealVariants, staggerContainer } from "@/lib/motion";

const TECH_ROW_1 = ["Next.js", "Node.js", "PostgreSQL", "AWS", "TypeScript", "React"];
const TECH_ROW_2 = ["SEO", "Meta Ads", "Google Ads", "SaaS", "Docker", "GraphQL"];

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered", sub: "Since 2019" },
  { value: 12, prefix: "$", suffix: "M+", label: "Revenue Generated", sub: "For our clients" },
  { value: 98, suffix: "%", label: "Client Retention", sub: "Long-term partners" },
];

const FLOAT_CARDS = [
  { icon: Zap, label: "Ship velocity", value: "Sprint-ready", color: "#6C5CE7" },
  { icon: ShieldCheck, label: "Code ownership", value: "You own it", color: "#22D3EE" },
  { icon: Sparkles, label: "Growth loop", value: "Build + acquire", color: "#F59E0B" },
];

const PARTICLES = Array.from({ length: 36 }, (_, i) => {
  const seed = (i * 137.508) % 360;
  return {
    id: i,
    left: (Math.sin(seed) * 0.5 + 0.5) * 100,
    top: (Math.cos(seed * 1.7) * 0.5 + 0.5) * 100,
    size: 2 + (i % 4),
    delay: (i % 7) * 0.55,
    duration: 7 + (i % 5) * 2.2,
    isSignal: i % 3 === 0,
  };
});

function TechMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-2 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24">
      <HeroMediaBackground />
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        {!prefersReducedMotion &&
          PARTICLES.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                background: p.isSignal ? "var(--signal)" : "var(--accent)",
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>

      <div className="section-container relative z-10 flex-1 pb-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={revealVariants} className="mb-5 flex justify-center lg:justify-start">
              <span className="pill-badge shimmer">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--signal)]" />
                India&apos;s Software-Led Agency · Est. 2019
              </span>
            </motion.div>

            <motion.p
              variants={revealVariants}
              className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted"
            >
              § 00 · Build
            </motion.p>

            <motion.h1
              variants={revealVariants}
              className="mb-6 font-heading text-[clamp(2.55rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-text-primary"
            >
              Custom Software &amp; SaaS{" "}
              <span className="text-gradient">Development</span>
              <br />
              <span className="heading-accent text-[0.72em]">Backed by Data-Driven Marketing</span>
            </motion.h1>

            <motion.p
              variants={revealVariants}
              className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0"
            >
              From multi-tenant platforms to growth engines — we architect the product, then own the
              pipeline that fills it.
            </motion.p>

            <motion.div
              variants={revealVariants}
              className="mb-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <MagneticButton href="/contact" className="text-sm sm:text-base">
                Start Your Project <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton
                href="/portfolio"
                className="!bg-transparent border border-[var(--border-strong)] text-text-primary hover:!shadow-[0_0_28px_rgba(108,92,231,0.2)]"
              >
                View Our Work
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  className="glass-card-premium relative overflow-hidden px-4 py-4 text-left"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-40 blur-2xl"
                    style={{
                      background: i === 1 ? "rgba(34,211,238,0.35)" : "rgba(108,92,231,0.35)",
                    }}
                  />
                  <div className="font-heading text-2xl font-extrabold text-gradient sm:text-3xl">
                    <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-semibold text-text-primary">{stat.label}</div>
                  <div className="text-[11px] text-text-muted">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visual stack — fills blank space on desktop */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto hidden w-full max-w-md lg:block"
          >
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(108,92,231,0.25),transparent_65%)] blur-2xl" />
            <div className="glass-card-premium relative overflow-hidden p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                  Delivery stack
                </span>
                <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 font-mono text-[10px] text-success">
                  ● Online
                </span>
              </div>
              <div className="mb-6 space-y-2 font-mono text-xs text-text-secondary">
                <p>
                  <span className="text-accent">const</span> product ={" "}
                  <span className="text-signal">engineer</span>();
                </p>
                <p>
                  <span className="text-accent">await</span> product.
                  <span className="text-signal">scale</span>(growth);
                </p>
                <p className="text-text-muted">// milestone billing · you own the code</p>
              </div>
              <div className="flex flex-col gap-3">
                {FLOAT_CARDS.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.label}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.12 }}
                      whileHover={prefersReducedMotion ? undefined : { x: 6 }}
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/25 px-3.5 py-3"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg border"
                        style={{
                          color: card.color,
                          borderColor: `${card.color}40`,
                          background: `${card.color}18`,
                        }}
                      >
                        <Icon size={16} />
                      </span>
                      <span>
                        <span className="block text-[11px] text-text-muted">{card.label}</span>
                        <span className="block text-sm font-semibold text-text-primary">
                          {card.value}
                        </span>
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 hidden justify-center pb-5 sm:flex"
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-text-muted"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-3 border-t border-[var(--border-subtle)] bg-[rgba(5,6,10,0.65)] py-5 backdrop-blur-md">
        <TechMarquee items={TECH_ROW_1} />
        <TechMarquee items={TECH_ROW_2} reverse />
      </div>

      <style>{`
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.35;
          animation-name: heroParticleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes heroParticleFloat {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.15; }
          50% { transform: translate3d(8px, -26px, 0); opacity: 0.55; }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
          animation: shimmerSlide 3.5s ease-in-out infinite;
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-particle, .shimmer::after { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
