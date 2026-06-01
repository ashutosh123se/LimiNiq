"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  budget: z.string().min(1, "Please select a budget"),
  timeline: z.string().min(1, "Please select a timeline"),
  source: z.string().optional(),
  message: z.string().min(20, "Please tell us more about your project (min 20 characters)"),
  honeypot: z.string().max(0, "Bot detected"),
});

type FormData = z.infer<typeof schema>;

const SERVICES = ["Website Development", "SEO", "Digital Marketing", "Full-Stack Suite"];
const BUDGETS = ["Under ₹10K", "₹10K–₹30K", "₹30K–₹75K", "₹75K–₹2L", "₹2L+"];
const TIMELINES = ["ASAP", "Within 1 month", "1–3 months", "3–6 months", "Flexible"];
const SOURCES = ["Google Search", "Social Media", "Referral", "Linkedin", "Instagram", "Other"];

export function ContactPage() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [], honeypot: "" },
  });

  const selectedServices = watch("services") || [];

  const toggleService = (service: string) => {
    const current = selectedServices;
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    setValue("services", updated);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          website: data.website,
          services: data.services,
          budget: data.budget,
          timeline: data.timeline,
          source: data.source,
          message: data.message,
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      setSubmitState(res.ok ? "success" : "error");
    } catch {
      setSubmitState("error");
    }
  };

  const CONTACT_INFO = [
    { icon: <Mail size={20} />, label: "Email", value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@liminiq.com", href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@liminiq.com"}` },
    { icon: <Phone size={20} />, label: "Phone", value: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 XXXXX XXXXX", href: `tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}` },
    { icon: <MapPin size={20} />, label: "Location", value: process.env.NEXT_PUBLIC_CONTACT_CITY || "India", href: "#" },
    { icon: <Clock size={20} />, label: "Hours", value: "Mon–Sat, 9am–7pm", href: "#" },
  ];

  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      {/* Hero */}
      <div style={{ padding: "6rem 0 2rem", position: "relative", overflow: "hidden" }}>
        <div className="section-container" style={{ position: "relative", textAlign: "center" }}>
          <div className="pill-badge" style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Get in Touch
          </div>
          <h1 className="text-hero" style={{ letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Let&apos;s Build <span style={{ color: "var(--text-secondary)" }}>Something</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored growth plan.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="section-container section-padding" style={{ paddingBottom: "8rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="contact-grid">
          
          {/* Left column — info tiles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Contact details Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {CONTACT_INFO.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="glass-card contact-tile group"
                  style={{ textDecoration: "none", padding: "1.5rem", borderRadius: 16, display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }} className="tile-icon">
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>{c.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-primary)", fontWeight: 500 }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="glass-card" style={{ padding: "2rem", borderRadius: 16 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Follow Our Journey</h3>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {[
                  { icon: "in", href: "https://linkedin.com/company/liminiq" },
                  { icon: "ig", href: "https://instagram.com/liminiq" },
                  { icon: "X", href: "https://twitter.com/liminiq" },
                  { icon: "gh", href: "https://github.com/liminiq" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    style={{ textDecoration: "none", width: 48, height: 48, borderRadius: "50%", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "all 0.2s", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem" }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Minimalist Graphic Block */}
            <div
              className="glass-card"
              style={{
                height: 180,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Globe grid pattern */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 0 40px rgba(109, 40, 217, 0.4)" }}>
                  <MapPin size={24} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)", fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Operating Worldwide
                </div>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div>
            {submitState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ padding: "4rem", textAlign: "center", borderRadius: 24, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
              >
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
                  Brief Received!
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 400 }}>
                  Thank you for reaching out. Our team will review your brief and get back to you within 24 hours with a tailored proposal.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card"
                style={{ padding: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem", borderRadius: 24 }}
              >
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Project Brief
                </h2>

                {/* Honeypot */}
                <input {...register("honeypot")} style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input {...register("name")} className="form-input premium-input" placeholder="Arjun Mehta" />
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input {...register("email")} type="email" className="form-input premium-input" placeholder="you@company.com" />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Phone + Company */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input {...register("phone")} className="form-input premium-input" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="form-label">Company / Website URL</label>
                    <input {...register("company")} className="form-input premium-input" placeholder="liminiq.com" />
                  </div>
                </div>

                {/* Services checkboxes */}
                <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  <label className="form-label">Services Interested In *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          padding: "10px 18px",
                          borderRadius: 30,
                          border: selectedServices.includes(s) ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                          background: selectedServices.includes(s) ? "rgba(109, 40, 217, 0.1)" : "var(--bg-surface)",
                          color: selectedServices.includes(s) ? "var(--text-primary)" : "var(--text-secondary)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        className="service-pill"
                      >
                        {selectedServices.includes(s) ? "✓ " : ""}{s}
                      </button>
                    ))}
                  </div>
                  {errors.services && <span className="form-error" style={{ marginTop: "0.5rem", display: "block" }}>{errors.services.message}</span>}
                </div>

                {/* Budget + Timeline */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div>
                    <label className="form-label">Project Budget *</label>
                    <div className="select-wrapper">
                      <select {...register("budget")} className="form-input premium-input" style={{ cursor: "pointer", appearance: "none" }}>
                        <option value="">Select budget</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    {errors.budget && <span className="form-error">{errors.budget.message}</span>}
                  </div>
                  <div>
                    <label className="form-label">Timeline *</label>
                    <div className="select-wrapper">
                      <select {...register("timeline")} className="form-input premium-input" style={{ cursor: "pointer", appearance: "none" }}>
                        <option value="">Select timeline</option>
                        {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    {errors.timeline && <span className="form-error">{errors.timeline.message}</span>}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginTop: "0.5rem" }}>
                  <label className="form-label">Tell us about your project *</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="form-input premium-input"
                    placeholder="Describe your goals, current challenges, and what success looks like..."
                    style={{ resize: "vertical", paddingTop: "1rem" }}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="btn-primary"
                  style={{ justifyContent: "center", padding: "16px", fontSize: "1.05rem", marginTop: "1rem" }}
                >
                  {submitState === "loading" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                      Submitting...
                    </span>
                  ) : (
                    <>Submit Project Brief <ArrowRight size={18} /></>
                  )}
                </button>

                {submitState === "error" && (
                  <p className="form-error" style={{ textAlign: "center", marginTop: "0.5rem" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </motion.form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 0.8fr 1.2fr !important; }
        }
        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .premium-input {
          background: rgba(255,255,255,0.02) !important;
          border: 1px solid var(--border-subtle) !important;
          transition: all 0.2s ease !important;
        }
        .premium-input:focus {
          background: rgba(109, 40, 217, 0.02) !important;
          border-color: rgba(109, 40, 217, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1) !important;
        }
        .contact-tile:hover .tile-icon {
          color: var(--accent-primary) !important;
          background: rgba(109, 40, 217, 0.1) !important;
          border-color: rgba(109, 40, 217, 0.2) !important;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.05) !important;
          color: var(--text-primary) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
        .service-pill:hover {
          border-color: rgba(109, 40, 217, 0.5) !important;
        }
        .select-wrapper {
          position: relative;
        }
        .select-wrapper::after {
          content: "▼";
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.7rem;
          color: var(--text-tertiary);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
