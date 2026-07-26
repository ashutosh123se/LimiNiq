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
  "4.5★ Google Reviews",
];

export function TrustTicker() {
  const row = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-8">
      <div className="section-container mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="section-number mb-1">§ 01 · the leads</p>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-text-primary sm:text-2xl">
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
            <span
              key={`${item}-${i}`}
              className="mx-1.5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-white px-4 py-2 text-sm text-text-secondary shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
