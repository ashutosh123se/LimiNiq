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
          className="mb-16 grid gap-12 lg:grid-cols-12 lg:items-start"
        >
          <div className="lg:col-span-7">
            <motion.p variants={revealVariants} className="section-number mb-3">
              § 06 our <em className="font-[family-name:var(--font-display)] not-italic italic">story</em>
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(2.2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-text-primary"
            >
              Built to launch brands into{" "}
              <span className="heading-accent">new orbits.</span>
            </motion.h2>
            <motion.blockquote
              variants={revealVariants}
              className="mt-8 max-w-xl border-l-[3px] border-accent pl-6 text-xl leading-relaxed text-text-secondary lg:text-2xl"
            >
              &ldquo;We ship systems that compound — code and pipeline together. The craft is why
              clients stay.&rdquo;
              <footer className="mt-4 text-sm text-text-muted">
                — {founder.name},{" "}
                <em className="font-[family-name:var(--font-display)] not-italic italic text-accent">
                  founder
                </em>
              </footer>
            </motion.blockquote>
          </div>

          <motion.div
            variants={revealVariants}
            className="overflow-hidden rounded-[1.75rem] border border-border-subtle bg-white shadow-sm lg:col-span-5"
          >
            <div className="relative h-56 bg-accent-muted">
              <Image src={founder.photoSrc} alt={founder.name} fill className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur">
                leading · 2019 — now
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-text-primary">
                {founder.name}
                <span className="text-accent">.</span>
              </h3>
              <p className="mt-1 text-sm text-accent">
                CEO & <em className="font-[family-name:var(--font-display)] not-italic italic">Founder</em>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{founder.bio}</p>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border-subtle pt-5 text-center">
                <div>
                  <div className="text-2xl font-extrabold text-accent">7+</div>
                  <div className="text-[10px] uppercase text-text-muted">years</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-accent">4</div>
                  <div className="text-[10px] uppercase text-text-muted">leaders</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-accent">150+</div>
                  <div className="text-[10px] uppercase text-text-muted">projects</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mb-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className="relative rounded-2xl border border-border-subtle bg-white p-5 shadow-sm"
            >
              <span className="absolute right-4 top-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-accent/10">
                {String(i + 1).padStart(2, "0")}
              </span>
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
            <p className="section-number mb-2">
              § the <em className="font-[family-name:var(--font-display)] not-italic italic">people</em>
            </p>
            <h3 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-text-primary">
              Leadership behind every{" "}
              <span className="heading-accent">shipped product.</span>
            </h3>
            <p className="mt-3 max-w-xl text-sm text-text-secondary">
              ◆ 4 leaders · design · engineering · growth · motion ◆ HQ in Delhi
            </p>
          </div>
          <Link href="/about" className="text-sm font-bold text-accent hover:underline">
            Meet the team <ArrowUpRight className="inline" size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group overflow-hidden rounded-[1.25rem] border border-border-subtle bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] bg-accent-muted">
                <Image
                  src={member.photoSrc}
                  alt={member.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
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
