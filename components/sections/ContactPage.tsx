"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE_CONTACT } from "@/lib/site";
import { WHATSAPP_URL } from "@/data/navigation";
import { isContactServiceSlug } from "@/lib/contactServices";

const AUDIT_SERVICE_SLUG = "website-ecommerce";

const BUDGETS = ["Under ₹10K", "₹10K–₹30K", "₹30K–₹75K", "₹75K–₹2L", "₹2L+", "Not sure yet"];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget"),
  message: z.string().min(20, "Please tell us a bit more about your project (min 20 characters)"),
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
    // 1. Explicit prop (from /contact/service/[slug]) or ?service= query param.
    const querySlug = initialServiceSlug ?? searchParams.get("service");
    if (querySlug && isContactServiceSlug(querySlug)) {
      setValue("service", querySlug);
      return;
    }
    // 2. #audit hash — the "Get Free Audit" CTA used across Nav/Mobile/Sticky bar.
    if (typeof window !== "undefined" && window.location.hash === "#audit") {
      setValue("service", AUDIT_SERVICE_SLUG);
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
          source: "contact_page",
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      setSubmitState(res.ok ? "success" : "error");
    } catch {
      setSubmitState("error");
    }
  };

  const CONTACT_INFO = [
    { icon: <Mail size={18} />, label: "Email", value: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}` },
    { icon: <Phone size={18} />, label: "Phone", value: SITE_CONTACT.phone, href: `tel:${SITE_CONTACT.phoneTel}` },
    {
      icon: <MapPin size={18} />,
      label: "Address",
      value: `${SITE_CONTACT.streetAddress}, ${SITE_CONTACT.addressLocality} ${SITE_CONTACT.postalCode}`,
      href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONTACT.mapsQuery)}`,
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-glow" aria-hidden />
        <div className="section-container contact-hero-inner">
          <span className="pill-badge shimmer mb-6 inline-flex">
            <span className="text-[var(--signal)]">✦</span> Get in Touch
          </span>
          <h1 className="contact-hero-title">
            Let&apos;s build something <span className="text-gradient">worth shipping.</span>
          </h1>
          <p className="contact-hero-desc">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored plan —
            no generic pitch decks, no pressure.
          </p>
          <span className="contact-hero-badge">
            <Clock size={13} /> We reply within 24 hours
          </span>
        </div>
      </section>

      {/* Main content */}
      <div className="section-container contact-body">
        <div className="contact-grid">
          {/* Sidebar */}
          <div className="contact-sidebar">
            <div className="glass-card contact-sidebar-card">
              <h3 className="contact-sidebar-title">Contact details</h3>
              <div className="flex flex-col gap-3">
                {CONTACT_INFO.map((c) => (
                  <a key={c.label} href={c.href} className="contact-info-row">
                    <span className="contact-info-icon">{c.icon}</span>
                    <span>
                      <span className="contact-info-label">{c.label}</span>
                      <span className="contact-info-value">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-whatsapp-btn">
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="glass-card contact-map-card">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_CONTACT.mapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) opacity(70%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LIMINIQ office — Paschim Vihar, Delhi"
              />
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card-premium contact-success"
              >
                <div className="contact-success-icon">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="contact-success-title">Brief received!</h3>
                <p className="contact-success-desc">
                  Thank you for reaching out. Our team will review your brief and get back to you within 24
                  hours with a tailored proposal.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card-premium contact-form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="contact-form-top-bar" />
                <h2 className="contact-form-title">Project Brief</h2>

                <input {...register("honeypot")} style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

                <div className="contact-form-row">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input {...register("name")} className="form-input" placeholder="Arjun Mehta" />
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input {...register("email")} type="email" className="form-input" placeholder="you@company.com" />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="form-label">Phone Number</label>
                  <input {...register("phone")} className="form-input" placeholder="+91 98765 43210" />
                </div>

                <div className="contact-form-row">
                  <div>
                    <label className="form-label">Service *</label>
                    <select {...register("service")} className="form-input contact-select">
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && <span className="form-error">{errors.service.message}</span>}
                  </div>
                  <div>
                    <label className="form-label">Project Budget *</label>
                    <select {...register("budget")} className="form-input contact-select">
                      <option value="">Select budget</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    {errors.budget && <span className="form-error">{errors.budget.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="form-label">Tell us about your project *</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="form-input"
                    placeholder="Describe your goals, current challenges, and what success looks like..."
                    style={{ resize: "vertical", paddingTop: "1rem" }}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                <button type="submit" disabled={submitState === "loading"} className="btn-primary contact-submit-btn">
                  {submitState === "loading" ? (
                    <span className="contact-spinner-row">
                      <span className="contact-spinner" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      Submit Project Brief <ArrowRight size={18} />
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
          max-width: 720px;
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
          max-width: 560px;
          margin: 0 auto;
        }
        .contact-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1.5rem;
          padding: 0.4rem 0.9rem;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--success);
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
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
          margin-top: 1.5rem;
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
          height: 220px;
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
