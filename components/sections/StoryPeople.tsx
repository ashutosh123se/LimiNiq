"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TEAM } from "@/data/team";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const TIMELINE = [
  { year: "2019", title: "Founded in Delhi", body: "LIMINIQ starts as a software-led studio in Paschim Vihar." },
  { year: "2021", title: "Full growth stack", body: "SEO, paid, and product engineering under one roof." },
  { year: "2023", title: "SaaS at scale", body: "Multi-tenant platforms and MVPs shipping for startups." },
  { year: "2026", title: "150+ projects", body: "$12M+ client revenue influenced. 98% retention." },
];

export function StoryPeople() {
  const founder = TEAM[0];

  return (
    <section className="section-padding relative overflow-hidden bg-bg-secondary">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <motion.p variants={revealVariants} className="section-number mb-3">
              § 06 · our story
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight text-text-primary"
            >
              Built to launch brands into{" "}
              <span className="heading-accent">new orbits.</span>
            </motion.h2>
            <motion.blockquote
              variants={revealVariants}
              className="mt-6 max-w-xl border-l-2 border-accent pl-5 text-lg leading-relaxed text-text-secondary"
            >
              &ldquo;We ship systems that compound — code and pipeline together. The craft is why
              clients stay.&rdquo;
              <footer className="mt-3 text-sm text-text-muted">
                — {founder.name}, <em className="text-accent">founder</em>
              </footer>
            </motion.blockquote>
          </div>

          <motion.div
            variants={revealVariants}
            className="relative overflow-hidden rounded-3xl border border-border-subtle bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border-subtle bg-accent-muted">
                <Image src={founder.photoSrc} alt={founder.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                  {founder.name}
                </p>
                <p className="text-sm text-accent">CEO & Founder</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">{founder.bio}</p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border-subtle pt-5 text-center">
              <div>
                <div className="text-xl font-extrabold text-accent">7+</div>
                <div className="text-[10px] uppercase text-text-muted">years</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-accent">4</div>
                <div className="text-[10px] uppercase text-text-muted">leaders</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-accent">150+</div>
                <div className="text-[10px] uppercase text-text-muted">projects</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="rounded-2xl border border-border-subtle bg-white p-5 shadow-sm"
            >
              <p className="font-mono text-xs font-semibold text-accent">{item.year}</p>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-number mb-2">§ the people</p>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text-primary sm:text-3xl">
              Leadership behind every{" "}
              <span className="heading-accent">shipped product.</span>
            </h3>
          </div>
          <Link href="/about" className="text-sm font-semibold text-accent hover:underline">
            Meet the team <ArrowUpRight className="inline" size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm"
            >
              <div className="relative h-48 bg-accent-muted">
                <Image src={member.photoSrc} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-[family-name:var(--font-heading)] font-bold text-text-primary">
                  {member.name}
                </p>
                <p className="text-sm text-accent">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
