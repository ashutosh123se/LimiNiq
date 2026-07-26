"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const TRUST_ITEMS = [
  "150+ Projects Delivered",
  "4.9★ Client Rating",
  "98% Client Retention",
  "$12M+ Revenue Generated",
  "Founded 2019 · Delhi",
  "Software + Marketing Under One Roof",
  "You Own the Code",
  "Milestone Billing",
];

/** Digital Heroes–style credential ticker — only verified LIMINIQ stats (no fake awards). */
export function TrustTicker() {
  const row = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <section className="relative overflow-hidden border-y border-border-subtle bg-bg-secondary/80 py-5">
      <div className="section-container mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="section-number mb-1">§ 01 · credentials</p>
          <h2 className="font-heading text-xl font-bold text-text-primary sm:text-2xl">
            Proven. <span className="heading-accent">Accountable.</span> Transparent.
          </h2>
        </div>
        <Link href="/about" className="text-sm font-semibold text-accent hover:underline">
          Why teams choose LIMINIQ <ArrowUpRight className="inline" size={14} />
        </Link>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track gap-3 py-1">
          {row.map((item, i) => (
            <motion.span
              key={`${item}-${i}`}
              whileHover={{ scale: 1.04, y: -2 }}
              className="mx-1.5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-white/[0.03] px-4 py-2 text-sm text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
