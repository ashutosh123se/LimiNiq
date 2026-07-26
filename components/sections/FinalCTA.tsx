"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE_CONTACT } from "@/lib/site";
import { WHATSAPP_URL } from "@/data/navigation";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

export function FinalCTA() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service: service || "General Inquiry",
          message: `Launch request for: ${service || "General Inquiry"}`,
          source: "home-final-cta",
        }),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="section-container relative z-10">
        <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-bg-secondary shadow-sm lg:grid lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border-b border-border-subtle p-8 lg:border-b-0 lg:border-r lg:p-12"
          >
            <motion.p variants={revealVariants} className="section-number mb-3">
              § 11 · contact · mission control online
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-text-primary"
            >
              Ready for <span className="heading-accent">liftoff?</span>
            </motion.h2>
            <motion.p variants={revealVariants} className="mt-4 max-w-md text-text-secondary">
              Tell us about your product. A plan, a team, a timeline — within 24 hours.
            </motion.p>

            <motion.div variants={revealVariants} className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-accent"
              >
                <Mail size={16} className="text-accent" /> {SITE_CONTACT.email}
              </a>
              <a
                href={`tel:${SITE_CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-accent"
              >
                <Phone size={16} className="text-accent" /> {SITE_CONTACT.phone}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                WhatsApp — instant reply <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.p variants={revealVariants} className="mt-8 text-xs text-text-muted">
              4.9★ client rating · 4.5★ Google Reviews · You own the code
            </motion.p>
          </motion.div>

          <div className="bg-white p-8 lg:p-12">
            {formState === "success" ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                <CheckCircle2 className="text-accent" size={40} />
                <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-text-primary">
                  Sequence started
                </p>
                <p className="text-sm text-text-secondary">
                  We&apos;ll reply within 24 hours. Prefer a call?{" "}
                  <Link href="/contact" className="text-accent underline">
                    Book here
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                  Start your launch sequence
                </p>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="form-input"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  className="form-input"
                />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="form-input"
                >
                  <option value="">What do you need?</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="btn-primary mt-2 disabled:opacity-70"
                >
                  {formState === "loading" ? "Sending…" : "Book appointment"} <ArrowRight size={16} />
                </button>
                {formState === "error" && (
                  <p className="text-xs text-red-600">Something went wrong. Try again or email us.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
