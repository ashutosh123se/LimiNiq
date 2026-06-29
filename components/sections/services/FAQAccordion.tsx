"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  accent?: string;
}

export function FAQAccordion({
  items,
  title = "Frequently Asked Questions",
  accent = "var(--accent-primary)",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <JsonLd data={faqSchema} />
      <h2 className="svc-faq-title">{title}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((faq, i) => (
          <div
            key={faq.question}
            className="glass-card"
            style={{
              padding: "1.25rem 1.35rem",
              borderRadius: 16,
              border:
                openIndex === i
                  ? `1px solid color-mix(in srgb, ${accent} 35%, rgba(255,255,255,0.1))`
                  : "1px solid rgba(255,255,255,0.08)",
              background: openIndex === i
                ? `color-mix(in srgb, ${accent} 6%, rgba(255,255,255,0.03))`
                : "rgba(255,255,255,0.02)",
              transition: "all 0.3s ease",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                fontWeight: 600,
                textAlign: "left",
                gap: "1rem",
              }}
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: accent, flexShrink: 0 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      margin: "1rem 0 0",
                    }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <style>{`
        .svc-faq-title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1.75rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
