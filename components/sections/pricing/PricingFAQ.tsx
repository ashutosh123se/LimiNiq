"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Do you require full payment upfront for web development?",
    a: "We follow a 50/50 model — 50% to begin the project, 50% on final delivery before handover.",
  },
  {
    q: "What's included in the 'support' period?",
    a: "Bug fixes, minor content updates, and technical assistance. Does not include new features or redesigns.",
  },
  {
    q: "Can I upgrade my SEO plan later?",
    a: "Yes, anytime. We'll prorate the difference.",
  },
  {
    q: "Do you offer custom packages not listed here?",
    a: "Absolutely. Contact us for a tailored quote based on your exact requirements.",
  },
  {
    q: "How do you measure SEO results?",
    a: "We provide monthly rank tracking reports, Google Analytics data, and conversion reports so you see exactly what's improving.",
  },
  {
    q: "What technologies do you use for web development?",
    a: "Next.js, React, Node.js, PostgreSQL — modern, fast, and built to scale. We do not use slow page builders or off-the-shelf templates.",
  },
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 0 6rem" }}>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "2rem", textAlign: "center" }}>
        Frequently Asked Questions
      </h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "1.5rem",
              borderRadius: 16,
              border: openIndex === i ? "1px solid rgba(59, 91, 255, 0.3)" : "1px solid rgba(255,255,255,0.08)",
              background: openIndex === i ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
              transition: "all 0.3s ease",
            }}
          >
            <button
              onClick={() => toggle(i)}
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
              }}
            >
              {faq.q}
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: "var(--accent-primary)" }}
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
                      lineHeight: 1.6,
                      margin: "1rem 0 0",
                    }}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
