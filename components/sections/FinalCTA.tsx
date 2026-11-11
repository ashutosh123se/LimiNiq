"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, Phone, Sparkles } from "lucide-react";
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
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)] lg:grid lg:grid-cols-2">
          {/* Left Column: Direct Outreach & Overlap */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border-b border-slate-200 bg-slate-50/70 p-8 sm:p-12 lg:border-b-0 lg:border-r"
          >
            <motion.div variants={revealVariants} className="mb-3 inline-flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Sparkles size={12} className="text-blue-600" /> Start A Conversation
              </span>
            </motion.div>

            <motion.h2
              variants={revealVariants}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Next Advantage?
              </span>
            </motion.h2>

            <motion.p variants={revealVariants} className="mt-4 max-w-md text-base text-slate-600">
              Tell us about your product or workflow. You will receive an initial technical scope, team profile, and milestone estimate within 24 hours.
            </motion.p>

            <motion.div variants={revealVariants} className="mt-8 flex flex-col gap-3.5">
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="group inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-blue-600 group-hover:border-blue-400 shadow-2xs">
                  <Mail size={16} />
                </span>
                <span>{SITE_CONTACT.email}</span>
              </a>

              <a
                href={`tel:${SITE_CONTACT.phoneTel}`}
                className="group inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-blue-600 group-hover:border-blue-400 shadow-2xs">
                  <Phone size={16} />
                </span>
                <span>{SITE_CONTACT.phone}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-100 shadow-2xs">
                  <ArrowRight size={16} />
                </span>
                <span>WhatsApp Instant Engineering Connect ↗</span>
              </a>
            </motion.div>

            <motion.div variants={revealVariants} className="mt-10 pt-6 border-t border-slate-200/80">
              <p className="text-xs font-semibold text-slate-500">
                4.9★ verified rating • 100% code ownership • Strict mutual NDA guaranteed
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: High-Conversion Form */}
          <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
            {formState === "success" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
                  <CheckCircle2 size={32} />
                </span>
                <p className="font-heading text-2xl font-bold text-slate-900">
                  Inquiry Received
                </p>
                <p className="max-w-sm text-sm text-slate-600">
                  Our engineering leads review every submission directly. Expect a comprehensive technical reply within 24 hours.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:underline"
                >
                  Book a live calendar call instead <ArrowUpRight size={14} />
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    Request Technical Discovery
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    No obligations. Direct engineer-to-client consultation.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Service Focus
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select an engineering discipline...</option>
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
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] disabled:opacity-70"
                >
                  <span>{formState === "loading" ? "Submitting Inquiry..." : "Submit Project Scope"}</span>
                  <ArrowRight size={16} />
                </button>

                {formState === "error" && (
                  <p className="text-xs text-red-600 text-center font-medium">
                    Something went wrong. Please reach us directly at {SITE_CONTACT.email}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
