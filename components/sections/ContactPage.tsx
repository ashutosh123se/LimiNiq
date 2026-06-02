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
    { icon: <Mail size={20} />, label: "Email", value: "hello@liminiq.com", href: "mailto:hello@liminiq.com" },
    { icon: <Phone size={20} />, label: "Phone", value: "9431471654", href: "tel:9431471654" },
    { icon: <MapPin size={20} />, label: "Location", value: "Shivangi KunjB38A, Madipur JJ Colony, Block A, Janta Colony, Paschim Vihar, Delhi, 110063", href: "https://maps.google.com/?q=Shivangi+KunjB38A,+Madipur+JJ+Colony,+Block+A,+Janta+Colony,+Paschim+Vihar,+Delhi,+110063" },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-primary)", fontWeight: 500, wordBreak: "break-word" }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="glass-card" style={{ padding: "2rem", borderRadius: 16 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Follow Our Journey</h3>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {[
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, href: "https://linkedin.com/company/liminiq", color: "#0077b5" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, href: "https://instagram.com/liminiq", color: "#e1306c" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: "https://twitter.com/liminiq", color: "#1da1f2" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, href: "https://github.com/liminiq", color: "#333333" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn group"
                    style={{ textDecoration: "none", width: 48, height: 48, borderRadius: "50%", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", position: "relative", overflow: "hidden" }}
                  >
                    <span style={{ position: "relative", zIndex: 1, display: "flex" }} className="social-icon-wrapper">{s.icon}</span>
                    <div className="social-bg" style={{ position: "absolute", inset: 0, background: s.color, opacity: 0, transition: "opacity 0.3s" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map Block */}
            <div
              className="glass-card"
              style={{
                height: 250,
                borderRadius: 16,
                position: "relative",
                overflow: "hidden"
              }}
            >
              <iframe 
                src="https://maps.google.com/maps?q=Shivangi%20KunjB38A,%20Madipur%20JJ%20Colony,%20Block%20A,%20Janta%20Colony,%20Paschim%20Vihar,%20Delhi,%20110063&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(100%) opacity(70%)" }}
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right column — form */}
          <div style={{ position: "relative" }}>
            {/* Background Ambient Glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "120%", height: "120%", background: "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0, filter: "blur(60px)" }} />
            
            <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
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
                className="glass-card form-container"
                style={{ padding: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem", borderRadius: 24, position: "relative" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, var(--accent-primary), #3b82f6)", borderRadius: "24px 24px 0 0" }} />
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
                  className="btn-primary submit-btn"
                  style={{ 
                    justifyContent: "center", 
                    padding: "16px", 
                    fontSize: "1.05rem", 
                    marginTop: "1rem",
                    background: "linear-gradient(135deg, var(--accent-primary), #3b82f6)",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(109, 40, 217, 0.4)",
                    transition: "all 0.3s ease"
                  }}
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
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 0.8fr 1.2fr !important; }
        }
        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .form-container {
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5) !important;
          background: var(--glass-1) !important;
          backdrop-filter: blur(24px) saturate(160%) !important;
          border: 1px solid var(--glass-border) !important;
        }
        .premium-input {
          background: rgba(255,255,255,0.03) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          color: var(--text-primary) !important;
        }
        .premium-input option {
          background-color: var(--bg-surface) !important;
          color: var(--text-primary) !important;
        }
        .premium-input:focus {
          background: rgba(255,255,255,0.08) !important;
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 4px rgba(59,91,255,0.15), inset 0 0 0 1px var(--accent-primary) !important;
          transform: translateY(-1px);
        }
        .contact-tile {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .contact-tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(109, 40, 217, 0.1) !important;
          border-color: rgba(109, 40, 217, 0.3) !important;
          background: rgba(20,20,30,0.8) !important;
        }
        .contact-tile:hover .tile-icon {
          color: white !important;
          background: var(--accent-primary) !important;
          border-color: var(--accent-primary) !important;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(109, 40, 217, 0.5);
        }
        .tile-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .social-btn:hover {
          border-color: transparent !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .social-btn:hover .social-bg {
          opacity: 1 !important;
        }
        .social-btn:hover .social-icon-wrapper {
          color: white !important;
        }
        .service-pill {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .service-pill:hover {
          border-color: var(--accent-primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(109, 40, 217, 0.15);
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(109, 40, 217, 0.6) !important;
          filter: brightness(1.1);
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
