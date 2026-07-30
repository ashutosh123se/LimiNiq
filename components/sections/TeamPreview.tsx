"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { TEAM } from "@/data/team";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

export function TeamPreview() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § the <em className="font-[family-name:var(--font-display)] not-italic italic">people</em>
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Driven by data. <span className="heading-accent">Built by builders.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mx-auto mt-4 max-w-xl text-text-secondary">
            A boutique collective of engineers, strategists, and creatives — obsessed with code
            quality and measurable ROI.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={revealVariants}
              className="group overflow-hidden rounded-[1.25rem] border border-border-subtle bg-bg-secondary shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-accent-muted">
                <Image
                  src={member.photoSrc}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Quote size={18} className="mb-2 text-white/80" />
                  <p className="text-center text-sm font-medium leading-snug text-white">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-10 flex justify-center"
        >
          <Link href="/about" className="btn-primary">
            Meet the team <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
