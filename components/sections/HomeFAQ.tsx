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
          <motion.div variants={revealVariants} className="mb-3 inline-flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <span className="text-blue-600">✦</span> Direct Answers
            </span>
          </motion.div>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions.
            </span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mt-3 text-base text-slate-600">
            Clear answers on contracts, international delivery, codebase ownership, and billing.
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
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text-primary sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-text-muted transition-transform duration-200",
                      isOpen && "rotate-180 text-accent"
                    )}
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-border-subtle px-5 pb-5 pt-3 text-sm leading-relaxed text-text-secondary">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
