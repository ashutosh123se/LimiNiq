"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageSquare, ClipboardList, Rocket, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/data/services";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Free consultation",
    desc: "A 30-minute call to understand your goals — no sales pitch, no pressure.",
  },
  {
    icon: ClipboardList,
    title: "Scoped proposal",
    desc: "A clear plan with timeline, deliverables, and pricing in writing within 48 hours.",
  },
  {
    icon: Rocket,
    title: "Kickoff & delivery",
    desc: "Weekly check-ins, transparent progress, and a team that's accountable end-to-end.",
  },
];

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
          message: `Free consultation request for: ${service || "General Inquiry"}`,
          source: "home-final-cta",
        }),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
          style={{ background: "var(--gradient-signature)" }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
              <span className="text-[var(--signal)]">✦</span> Let&apos;s Build
            </motion.span>
            <motion.h2
              variants={revealVariants}
              className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-tight text-text-primary"
            >
              Get a Free <span className="heading-accent">Growth Consultation</span>
            </motion.h2>
            <motion.p variants={revealVariants} className="mt-4 max-w-md text-text-secondary">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a
              tailored plan — engineering and marketing, under one roof.
            </motion.p>

            <motion.div variants={revealVariants} className="mt-10 flex flex-col gap-5">
              {STEPS.map((step, i) => (
                <div key={step.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--accent-muted)] font-mono text-sm font-bold text-[var(--accent)]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-text-primary">
                      <step.icon size={15} className="text-[var(--signal)]" /> {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.p
              variants={revealVariants}
              className="mt-8 inline-flex items-center gap-2 text-xs text-text-muted"
            >
              <ShieldCheck size={14} className="text-[var(--signal)]" />
              Your details stay confidential — no spam, no third-party sharing, ever.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="glass-card-premium relative overflow-hidden p-6 sm:p-8"
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: "var(--gradient-signature)" }}
            />
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--signal)]/40 bg-[var(--signal)]/10 text-[var(--signal)]">
                    <CheckCircle2 size={28} />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-text-primary">
                    Thanks — we got it!
                  </h3>
                  <p className="max-w-sm text-sm text-text-secondary">
                    Our team will review your request and reach out within 24 hours with a tailored
                    plan.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Start Your Project Brief
                  </h3>

                  <div>
                    <label htmlFor="cta-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-muted">
                      Full Name
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Arjun Mehta"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-muted">
                      Email Address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-service" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-muted">
                      Service Interested In
                    </label>
                    <select
                      id="cta-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="form-input cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn-primary mt-2 justify-center disabled:opacity-60"
                  >
                    {formState === "loading" ? "Sending…" : "Request Free Consultation"}
                    {formState !== "loading" && <ArrowRight size={18} />}
                  </button>

                  {formState === "error" && (
                    <p className="text-center text-sm text-red-400">
                      Something went wrong. Please try again or email hello@liminiq.com directly.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
