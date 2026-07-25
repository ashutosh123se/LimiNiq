"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CareersForm() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [message, setMessage] = useState("");

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
          service: role || "Careers — General interest",
          message: portfolioUrl ? `${message}\n\nPortfolio / URL: ${portfolioUrl}` : message,
          source: "careers",
        }),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="cf-wrap glass-card-premium">
      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cf-success"
          >
            <span className="cf-success-icon">
              <CheckCircle2 size={28} />
            </span>
            <h3>Thanks for reaching out!</h3>
            <p>
              We&apos;ve saved your details and will contact you as soon as a role opens up that fits your
              profile.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            className="cf-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="cf-form-title">Send us your details</h3>
            <p className="cf-form-sub">
              No open roles right now — but tell us about yourself and we&apos;ll reach out the moment
              there&apos;s a fit.
            </p>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">Full name</label>
                <input
                  id="cf-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">Email address</label>
                <input
                  id="cf-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-role">Role you&apos;re interested in</label>
                <input
                  id="cf-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Frontend Engineer"
                  className="form-input"
                />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-portfolio">Portfolio / LinkedIn / GitHub URL</label>
                <input
                  id="cf-portfolio"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://"
                  className="form-input"
                />
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="cf-message">A bit about you</label>
              <textarea
                id="cf-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What you build, what you're looking for, and why LIMINIQ."
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </div>

            <button type="submit" disabled={formState === "loading"} className="btn-primary cf-submit">
              {formState === "loading" ? "Sending…" : "Send my details"}
              {formState !== "loading" && <ArrowRight size={18} />}
            </button>

            {formState === "error" && (
              <p className="cf-error">Something went wrong. Please try again or email hello@liminiq.com directly.</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <style>{`
        .cf-wrap {
          max-width: 640px;
          margin: 0 auto;
          padding: clamp(1.75rem, 4vw, 2.75rem);
          border-radius: 26px;
        }
        .cf-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .cf-form-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }
        .cf-form-sub {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: -0.5rem 0 0;
        }
        .cf-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .cf-field label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
        .cf-submit {
          justify-content: center;
          margin-top: 0.25rem;
        }
        .cf-error {
          text-align: center;
          font-size: 0.85rem;
          color: #f87171;
          margin: 0;
        }
        .cf-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          text-align: center;
          padding: 2rem 0;
        }
        .cf-success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          color: var(--signal);
          background: rgba(34, 211, 238, 0.1);
          border: 1px solid rgba(34, 211, 238, 0.25);
        }
        .cf-success h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }
        .cf-success p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 380px;
          margin: 0;
        }

        @media (min-width: 600px) {
          .cf-row { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
