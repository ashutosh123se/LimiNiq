"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { TEAM } from "@/data/team";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const ACCENTS = ["var(--accent)", "var(--signal)", "var(--accent)", "var(--signal)"];

export function TeamPreview() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
            <span className="text-[var(--signal)]">✦</span> The LIMINIQ Standard
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Driven By Data. <span className="heading-accent">Built By Builders.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mx-auto mt-4 max-w-xl text-text-secondary">
            An elite, boutique collective of engineers, strategists, and designers — obsessed
            with code quality and measurable ROI.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((member, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div
                key={member.name}
                variants={revealVariants}
                className="team-card glass-card group relative flex flex-col items-center gap-4 overflow-hidden p-6 text-center"
                style={{ "--team-accent": accent } as React.CSSProperties}
              >
                <div className="team-face flex flex-col items-center gap-4">
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-full font-heading text-xl font-extrabold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 40%, #05060A))`,
                      boxShadow: `0 8px 24px color-mix(in srgb, ${accent} 35%, transparent)`,
                    }}
                  >
                    {initialsOf(member.name)}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-text-primary">{member.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="team-quote absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Quote size={22} style={{ color: accent }} />
                  <p className="font-heading text-sm font-medium leading-snug text-text-primary">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-10 flex justify-center"
        >
          <Link href="/about" className="btn-primary">
            Meet The Team <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        .team-card {
          min-height: 220px;
        }
        .team-face {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .team-card:hover .team-face {
          opacity: 0;
          transform: scale(0.92);
        }
        .team-quote {
          background: linear-gradient(160deg, color-mix(in srgb, var(--team-accent) 14%, transparent), rgba(5,6,10,0.92));
        }
        @media (hover: none) {
          .team-quote { display: none; }
          .team-face { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
