"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/faqs";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HomeFAQ() {
  const items = FAQS.filter((f) => f.page === "home" || f.page === "services").slice(0, 10);
  const [open, setOpen] = useState(0);

  return (
    <section className="section-padding relative overflow-hidden bg-bg-secondary">
      <div className="section-container max-w-3xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 text-center"
        >
          <motion.p variants={revealVariants} className="section-number mb-3">
            § 10 · questions
          </motion.p>
          <motion.h2
            variants={revealVariants}
            className="font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4vw,2.75rem)] font-bold text-text-primary"
          >
            Ten direct <span className="heading-accent">answers.</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-3 text-text-secondary">
            Who we are, what we build, and how an engagement works.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition-colors",
                  isOpen ? "border-accent" : "border-border-subtle"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text-primary sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-text-muted transition-transform",
                      isOpen && "rotate-180 text-accent"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-border-subtle px-5 pb-5 pt-3 text-sm leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
