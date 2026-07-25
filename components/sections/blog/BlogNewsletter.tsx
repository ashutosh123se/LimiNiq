"use client";

import { useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="blog-newsletter">
      <div className="section-container">
        <div className="blog-newsletter-panel glass-card-premium">
          <div className="blog-newsletter-icon">
            <Mail size={22} strokeWidth={1.6} />
          </div>
          <div className="blog-newsletter-copy">
            <h3>Get the LIMINIQ Growth Playbook</h3>
            <p>One email a month — engineering, SEO, and marketing insights, no fluff.</p>
          </div>

          {status === "success" ? (
            <p className="blog-newsletter-success">You&apos;re subscribed — welcome aboard.</p>
          ) : (
            <form onSubmit={handleSubmit} className="blog-newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="form-input"
                aria-label="Email address"
              />
              <button type="submit" disabled={status === "loading"} className="btn-primary">
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Subscribe
              </button>
            </form>
          )}
          {status === "error" && <p className="blog-newsletter-error">Something went wrong. Please try again.</p>}
        </div>
      </div>

      <style>{`
        .blog-newsletter { padding: 2rem 0 5rem; }
        .blog-newsletter-panel {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.75rem;
          padding: clamp(1.75rem, 3vw, 2.5rem);
          border-radius: 24px;
        }
        .blog-newsletter-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-muted);
          flex-shrink: 0;
        }
        .blog-newsletter-copy h3 {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.35rem;
        }
        .blog-newsletter-copy p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .blog-newsletter-form {
          display: flex;
          gap: 0.6rem;
          min-width: 320px;
        }
        .blog-newsletter-form .form-input {
          width: auto;
          flex: 1;
        }
        .blog-newsletter-success {
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--signal);
          grid-column: 2 / 4;
        }
        .blog-newsletter-error {
          grid-column: 1 / -1;
          color: #f87171;
          font-size: 0.8rem;
          margin: 0;
        }
        @media (max-width: 820px) {
          .blog-newsletter-panel {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .blog-newsletter-icon { margin: 0 auto; }
          .blog-newsletter-form { min-width: 0; width: 100%; }
        }
      `}</style>
    </section>
  );
}
