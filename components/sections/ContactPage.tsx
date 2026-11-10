"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Globe2,
  Linkedin,
  Video,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/site";
import { WHATSAPP_URL } from "@/data/navigation";
import { isContactServiceSlug } from "@/lib/contactServices";
import { InternationalWorkflow } from "@/components/sections/InternationalWorkflow";

const AUDIT_SERVICE_SLUG = "website-ecommerce";

const INTERNATIONAL_BUDGETS = [
  "Under $5,000 (Focused Automation or MVP)",
  "$5,000 – $15,000 (Complete System / Automation Suite)",
  "$15,000 – $35,000 (Production SaaS / Cloud Platform)",
  "$35,000+ (Enterprise Multi-Tenant System)",
  "Monthly Retainer ($2,000+/mo Dedicated Pod)",
  "INR Equivalent / Scope After Discovery",
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(20, "Please describe your project goals (min 20 characters)"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type FormData = z.infer<typeof schema>;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function ContactPage({ initialServiceSlug }: { initialServiceSlug?: string } = {}) {
  return (
    <Suspense fallback={null}>
      <ContactPageInner initialServiceSlug={initialServiceSlug} />
    </Suspense>
  );
}

function ContactPageInner({ initialServiceSlug }: { initialServiceSlug?: string }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"schedule" | "brief">("schedule");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "", budget: "", honeypot: "" },
  });

  useEffect(() => {
    const querySlug = initialServiceSlug ?? searchParams.get("service");
    if (querySlug && isContactServiceSlug(querySlug)) {
      setValue("service", querySlug);
      setActiveTab("brief");
      return;
    }
    if (searchParams.get("engagement") || searchParams.get("brief")) {
      setActiveTab("brief");
    }
    if (typeof window !== "undefined" && window.location.hash === "#audit") {
      setValue("service", AUDIT_SERVICE_SLUG);
      setActiveTab("brief");
    }
    if (typeof window !== "undefined" && window.location.hash === "#schedule") {
      setActiveTab("schedule");
    }
  }, [initialServiceSlug, searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmitState("loading");
    const service = SERVICES.find((s) => s.slug === data.service);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: service?.name ?? data.service,
          budget: data.budget,
          message: data.message,
          honeypot: data.honeypot,
          source: "contact_page_brief",
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      setSubmitState(res.ok ? "success" : "error");
    } catch {
      setSubmitState("error");
    }
  };

  const CONTACT_INFO = [
    { icon: <Mail size={18} />, label: "Direct Email", value: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}` },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "LIMINIQ Company", href: SITE_SOCIAL.linkedin },
    { icon: <Phone size={18} />, label: "Phone", value: SITE_CONTACT.phone, href: `tel:${SITE_CONTACT.phoneTel}` },
    {
      icon: <MapPin size={18} />,
      label: "Engineering HQ",
      value: `${SITE_CONTACT.addressDisplay}`,
      href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONTACT.mapsQuery)}`,
    },
  ];

  const TIMEZONES = [
    { city: "New York (EST/EDT)", hours: "9:00 AM – 2:00 PM EST Overlap" },
    { city: "London (GMT/BST)", hours: "1:00 PM – 7:00 PM GMT Overlap" },
    { city: "Dubai (GST)", hours: "12:00 PM – 8:00 PM GST Overlap" },
  ];

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-glow" aria-hidden />
        <div className="section-container contact-hero-inner">
          <span className="pill-badge shimmer mb-6 inline-flex">
            <Globe2 size={13} className="text-[var(--signal)]" /> Global Client Operations
          </span>
          <h1 className="contact-hero-title">
            Let&apos;s build software & AI <span className="text-gradient">that moves the needle.</span>
          </h1>
          <p className="contact-hero-desc">
            Direct access to senior engineering architects. Book an instant discovery call or submit your project brief — no aggressive sales pitches, 100% confidential.
          </p>

          {/* Timezone Overlap Pill Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-bg-secondary/80 px-4 py-2 text-xs text-text-secondary">
            <span className="flex h-2 w-2 rounded-full bg-[var(--signal)] animate-pulse" />
            <span className="font-semibold text-text-primary">Live Timezone Overlap:</span>
            <span>4–6 hours daily synchronous overlap with US East, UK & Gulf working hours</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="section-container contact-body" id="booking">
        <div className="contact-grid">
          {/* Sidebar */}
          <div className="contact-sidebar">
            <div className="glass-card contact-sidebar-card">
              <h3 className="contact-sidebar-title">Direct Communication</h3>
              <div className="flex flex-col gap-3">
                {CONTACT_INFO.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="contact-info-row"
                  >
                    <span className="contact-info-icon">{c.icon}</span>
                    <span>
                      <span className="contact-info-label">{c.label}</span>
                      <span className="contact-info-value">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>

              {/* WhatsApp Secondary Channel */}
              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                  Need quick answers?
                </span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-whatsapp-btn">
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat with Team on WhatsApp
                </a>
              </div>
            </div>

            {/* Timezone Overlap Details */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-text-primary mb-3">
                <Clock size={16} className="text-[var(--accent)]" />
                <h4 className="font-heading text-sm font-bold">Synchronous Timezone SLA</h4>
              </div>
              <ul className="flex flex-col gap-2.5 text-xs text-text-secondary">
                {TIMEZONES.map((tz) => (
                  <li key={tz.city} className="flex flex-col border-b border-[var(--border-subtle)]/50 pb-2 last:border-none last:pb-0">
                    <span className="font-semibold text-text-primary">{tz.city}</span>
                    <span className="text-text-muted">{tz.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Map */}
            <div className="glass-card contact-map-card">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_CONTACT.mapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) opacity(70%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LIMINIQ Engineering HQ"
              />
            </div>
          </div>

          {/* Form / Scheduler Area */}
          <div className="contact-form-wrap">
            {/* Interactive Mode Toggle */}
            <div className="mb-6 flex rounded-2xl border border-[var(--border-subtle)] bg-bg-secondary p-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("schedule")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "schedule"
                    ? "bg-[var(--accent)] text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Calendar size={16} /> Schedule 30-Min Call
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("brief")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "brief"
                    ? "bg-[var(--accent)] text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Sparkles size={16} /> Submit Project Brief
              </button>
            </div>

            {activeTab === "schedule" ? (
              /* Cal.com / Scheduler Embed Card */
              <div className="glass-card-premium rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 mb-6">
                  <div>
                    <span className="pill-badge mb-2 inline-flex !text-[11px]">
                      <Video size={12} className="text-[var(--signal)]" /> Google Meet / Zoom Video
                    </span>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                      Technical Discovery Session
                    </h2>
                    <p className="mt-1 text-xs text-text-muted">
                      30 minutes · 1-on-1 with Lead Technical Architect · 100% Confidential
                    </p>
                  </div>
                  <span className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--accent)]">
                    <Calendar size={24} />
                  </span>
                </div>

                {/* What we cover */}
                <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-secondary/60 p-4 mb-6">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                    What we cover during this call:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--signal)] shrink-0 mt-0.5" />
                      <span>Technical feasibility & system architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--signal)] shrink-0 mt-0.5" />
                      <span>AI model selection & automation stack</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--signal)] shrink-0 mt-0.5" />
                      <span>Fixed milestone roadmap & timeline estimate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--signal)] shrink-0 mt-0.5" />
                      <span>Zero sales pitch — talk directly with engineers</span>
                    </li>
                  </ul>
                </div>

                {/* Scheduler Embed or Direct Cal link */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated p-6 text-center">
                  <div className="mx-auto max-w-md">
                    <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-[var(--signal-muted)] text-[var(--signal)] mb-4">
                      <Clock size={24} />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      Select Your Preferred Time Slot
                    </h3>
                    <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                      Our live calendar automatically adapts to your local timezone across US East (EST), UK (GMT), Europe (CET), and UAE (GST).
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href="https://cal.com/liminiq/discovery"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full sm:w-auto justify-center"
                      >
                        <Calendar size={16} /> Open Interactive Calendar
                      </a>
                      <button
                        type="button"
                        onClick={() => setActiveTab("brief")}
                        className="btn-secondary w-full sm:w-auto justify-center text-xs"
                      >
                        Prefer writing? Submit Brief
                      </button>
                    </div>

                    <p className="mt-4 text-[11px] text-text-muted">
                      Need custom NDA signed prior to the call? Email us at{" "}
                      <a href={`mailto:${SITE_CONTACT.email}`} className="text-[var(--accent)] underline">
                        {SITE_CONTACT.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : submitState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card-premium contact-success"
              >
                <div className="contact-success-icon">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="contact-success-title">Project Brief Received!</h3>
                <p className="contact-success-desc">
                  Thank you for reaching out. A senior technical architect will review your requirements and reply with a tailored scoping plan within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitState("idle")}
                  className="mt-6 btn-secondary text-xs"
                >
                  Submit another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card-premium contact-form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="contact-form-top-bar" />
                <div className="flex items-center justify-between">
                  <h2 className="contact-form-title">Submit Project Brief</h2>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <ShieldCheck size={14} className="text-[var(--signal)]" /> Protected by NDA
                  </span>
                </div>

                <input {...register("honeypot")} style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

                <div className="contact-form-row">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input {...register("name")} className="form-input" placeholder="e.g. David Miller" />
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="form-label">Work Email *</label>
                    <input {...register("email")} type="email" className="form-input" placeholder="david@company.com" />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="form-label">Phone / WhatsApp (Optional)</label>
                  <input {...register("phone")} className="form-input" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="contact-form-row">
                  <div>
                    <label className="form-label">Core Discipline *</label>
                    <select {...register("service")} className="form-input contact-select">
                      <option value="">Select core capability</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && <span className="form-error">{errors.service.message}</span>}
                  </div>
                  <div>
                    <label className="form-label">Target Investment *</label>
                    <select {...register("budget")} className="form-input contact-select">
                      <option value="">Select budget range</option>
                      {INTERNATIONAL_BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    {errors.budget && <span className="form-error">{errors.budget.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="form-label">Project Objectives & Challenges *</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="form-input"
                    placeholder="Tell us what you are building, existing workflows to automate, and what success looks like..."
                    style={{ resize: "vertical", paddingTop: "1rem" }}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                <button type="submit" disabled={submitState === "loading"} className="btn-primary contact-submit-btn">
                  {submitState === "loading" ? (
                    <span className="contact-spinner-row">
                      <span className="contact-spinner" />
                      Submitting Brief...
                    </span>
                  ) : (
                    <>
                      Send Project Brief <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {submitState === "error" && (
                  <p className="form-error contact-form-error-text">
                    Something went wrong. Please try again or email us directly at {SITE_CONTACT.email}.
                  </p>
                )}
              </motion.form>
            )}
          </div>
        </div>
      </div>

      {/* Institutional Safeguards & International Client Workflow */}
      <InternationalWorkflow />

      <style>{`
        .contact-page {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .contact-hero {
          position: relative;
          padding: 8rem 0 3rem;
          overflow: hidden;
        }
        .contact-hero-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 560px;
          height: 320px;
          background: radial-gradient(ellipse, var(--accent-muted), transparent 70%);
          pointer-events: none;
        }
        .contact-hero-inner {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 760px;
        }
        .contact-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.1rem, 5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin: 0 0 1.1rem;
        }
        .contact-hero-desc {
          font-size: 1.08rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 620px;
          margin: 0 auto;
        }
        .contact-body {
          padding-bottom: clamp(4rem, 8vw, 7rem);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 0.85fr 1.15fr; gap: 2.5rem; align-items: start; }
        }
        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-sidebar-card {
          padding: 1.75rem;
          border-radius: 20px;
        }
        .contact-sidebar-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 1.25rem;
        }
        .contact-info-row {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          text-decoration: none;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--border-subtle);
          transition: transform 0.2s ease;
        }
        .contact-info-row:last-child { border-bottom: none; }
        .contact-info-row:hover { transform: translateX(2px); }
        .contact-info-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--accent-muted);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-info-label {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.15rem;
        }
        .contact-info-value {
          display: block;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.5;
          word-break: break-word;
        }
        .contact-whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 100px;
          background: linear-gradient(135deg, #25d366, #128c7e);
          color: #fff;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .contact-whatsapp-btn:hover { transform: scale(1.02); }
        .contact-map-card {
          height: 190px;
          border-radius: 20px;
          overflow: hidden;
        }
        .contact-form-wrap {
          position: relative;
        }
        .contact-success {
          padding: 3.5rem 2.5rem;
          text-align: center;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100%;
          justify-content: center;
        }
        .contact-success-icon {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          color: var(--success);
          border: 1px solid rgba(34, 197, 94, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .contact-success-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.75rem;
          color: var(--text-primary);
          margin: 0 0 0.85rem;
        }
        .contact-success-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 400px;
          margin: 0;
        }
        .contact-form {
          padding: 2.25rem;
          border-radius: 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .contact-form-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-signature);
          border-radius: 24px 24px 0 0;
        }
        .contact-form-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.4rem;
          color: var(--text-primary);
          margin: 0.25rem 0 0.25rem;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .contact-select { cursor: pointer; }
        .form-label {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.5rem;
        }
        .form-error {
          display: block;
          font-size: 0.78rem;
          color: #f87171;
          margin-top: 0.4rem;
        }
        .contact-submit-btn {
          justify-content: center;
          padding: 15px;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
        .contact-spinner-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .contact-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          display: inline-block;
          animation: contact-spin 0.8s linear infinite;
        }
        .contact-form-error-text {
          text-align: center;
          margin-top: 0.25rem;
        }
        @keyframes contact-spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
