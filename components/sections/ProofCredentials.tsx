"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Star } from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const PROOFS = [
  {
    icon: Star,
    title: "4.9★ client rating",
    body: "Average rating across delivered engagements — software and growth.",
  },
  {
    icon: Star,
    title: "4.5★ Google Reviews",
    body: "Public reviews from real clients on Google Business.",
  },
  {
    icon: Shield,
    title: "You own the code",
    body: "IP transfer and milestone billing written into every engagement.",
  },
  {
    icon: CheckCircle2,
    title: "98% retention",
    body: "Long-term partners who stay because delivery stays accountable.",
  },
];

const GUARANTEES = [
  "Scoped quote after discovery — no surprise costs",
  "Named leads on engineering and marketing",
  "Weekly visible progress, not black-box sprints",
  "Post-launch support retainers available",
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
            § 07 · credentials
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight text-text-primary"
          >
            Verified.{" "}
            <span className="heading-accent">Accountable.</span>
            <br />
            Proven.
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-4 text-text-secondary">
            Real metrics only — no borrowed badges. A stack that de-risks your decision.
          </motion.p>
        </motion.div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOFS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border-subtle bg-bg-secondary p-6"
              >
                <Icon className="mb-3 text-accent" size={22} />
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{item.body}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-8 lg:p-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">
            engagement guarantees
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-text-secondary">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
