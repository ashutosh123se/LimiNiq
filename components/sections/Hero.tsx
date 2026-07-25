"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, PlayCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatCounter } from "@/components/ui/StatCounter";
import { revealVariants, staggerContainer } from "@/lib/motion";

const TECH_ROW_1 = ["Next.js", "Node.js", "PostgreSQL", "AWS", "TypeScript", "React"];
const TECH_ROW_2 = ["SEO", "Meta Ads", "Google Ads", "SaaS", "Docker", "GraphQL"];

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 12, prefix: "$", suffix: "M+", label: "Client Revenue Generated" },
  { value: 98, suffix: "%", label: "Client Retention Rate" },
];

/** Deterministic pseudo-random particle field — avoids SSR/CSR hydration mismatch. */
const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const seed = (i * 137.508) % 360;
  return {
    id: i,
    left: (Math.sin(seed) * 0.5 + 0.5) * 100,
    top: (Math.cos(seed * 1.7) * 0.5 + 0.5) * 100,
    size: 2 + (i % 4),
    delay: (i % 7) * 0.6,
    duration: 8 + (i % 5) * 2.5,
    isSignal: i % 3 === 0,
  };
});

function TechMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-3 inline-flex items-center gap-3 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary sm:text-sm"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" aria-hidden>
      {PARTICLES.map((p) => (
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
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28">
      {/* Gradient + particle fallback background (no video required) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 18% 20%, rgba(108,92,231,0.28), transparent 65%), radial-gradient(55% 45% at 85% 15%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(108,92,231,0.16), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {!prefersReducedMotion && <ParticleField />}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>

      <div className="section-container relative z-10 flex-1 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={revealVariants} className="mb-6 flex justify-center">
            <span className="pill-badge">
              <span className="text-[var(--signal)]">✦</span> India&apos;s Software-Led Agency
            </span>
          </motion.div>

          <motion.h1
            variants={revealVariants}
            className="mb-6 font-heading text-[clamp(2.4rem,6.5vw,4.75rem)] font-bold leading-[1.05] tracking-tight text-text-primary"
          >
            Custom Software &amp; SaaS Development
            <br />
            <span className="heading-accent">Data-Driven Marketing</span>
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mx-auto mb-10 max-w-xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            We architect and ship production-grade platforms, then own the growth pipeline that
            fills them — engineering and marketing under one accountable roof.
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="/contact" className="text-sm sm:text-base">
              Start Your Project <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton
              href="/portfolio"
              className="!bg-none !bg-transparent border border-[var(--border-strong)] text-text-primary hover:!shadow-none"
            >
              <PlayCircle size={18} className="text-[var(--signal)]" /> View Our Work
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-card px-6 py-5 text-center">
              <div className="font-heading text-3xl font-extrabold text-gradient sm:text-4xl">
                <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-text-muted sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 hidden justify-center pb-8 sm:flex"
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-2 border-t border-[var(--border-subtle)] bg-[var(--bg-overlay)] py-4 backdrop-blur-sm">
        <TechMarquee items={TECH_ROW_1} />
        <TechMarquee items={TECH_ROW_2} reverse />
      </div>

      <style>{`
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.35;
          filter: blur(0.5px);
          animation-name: heroParticleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes heroParticleFloat {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.15; }
          50% { transform: translate3d(6px, -22px, 0); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
