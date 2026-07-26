"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Star, Code2 } from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const PROOFS = [
  {
    icon: Star,
    title: "4.9★",
    subtitle: "Client rating",
    body: "Average across delivered software and growth engagements.",
  },
  {
    icon: Star,
    title: "4.5★",
    subtitle: "Google Reviews",
    body: "Public reviews from real clients on Google Business.",
  },
  {
    icon: Code2,
    title: "You own it",
    subtitle: "Code ownership",
    body: "IP transfer and milestone billing written into every SOW.",
  },
  {
    icon: Shield,
    title: "98%",
    subtitle: "Retention",
    body: "Partners who stay because delivery stays accountable.",
  },
];

const GUARANTEES = [
  { label: "Scoped quote", detail: "After discovery — no surprise costs" },
  { label: "Named leads", detail: "Engineering + marketing contacts" },
  { label: "Weekly visibility", detail: "Not black-box sprints" },
  { label: "Post-launch care", detail: "Retainers available month-to-month" },
];

export function ProofCredentials() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 max-w-2xl"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 07 <em className="font-[family-name:var(--font-display)] not-italic italic">credentials</em>
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-primary"
          >
            Verified.
            <br />
            Accountable.
            <br />
            <span className="heading-accent">Proven.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-4 text-text-secondary">
            Real metrics only — a stack that de-risks your decision without borrowed badges.
          </motion.p>
        </motion.div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOFS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-border-subtle bg-bg-secondary p-6 transition hover:border-accent/40 hover:bg-[#EFF6FF]"
              >
                <Icon className="mb-4 text-accent" size={22} />
                <div className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-text-primary">
                  {item.title}
                </div>
                <p className="mt-1 text-sm font-semibold text-accent">{item.subtitle}</p>
                <p className="mt-3 text-sm text-text-secondary">{item.body}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-[1.75rem] border border-border-subtle bg-bg-secondary p-8 lg:p-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-wider text-accent">
            engagement guarantees
          </p>
          <ul className="grid gap-5 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <li key={g.label} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  <span className="block font-[family-name:var(--font-heading)] font-bold text-text-primary">
                    {g.label}
                  </span>
                  <span className="text-sm text-text-secondary">{g.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
