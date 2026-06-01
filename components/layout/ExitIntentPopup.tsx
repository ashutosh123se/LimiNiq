"use client";

import { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("liminiq-exit-popup");
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setIsVisible(true);
        sessionStorage.setItem("liminiq-exit-popup", "1");
      }
    };

    // Only trigger after 5s on page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,15,44,0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-card"
            style={{ maxWidth: 480, width: "100%", padding: "2.5rem", position: "relative", textAlign: "center" }}
          >
            <button
              onClick={handleClose}
              style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", fontSize: "1.2rem" }}
              aria-label="Close popup"
            >
              ✕
            </button>

            {/* Glow accent */}
            <div style={{ width: 60, height: 60, background: "var(--gradient-hero)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <span style={{ fontSize: "1.75rem" }}>🎯</span>
            </div>

            {!submitted ? (
              <>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", color: "var(--text-primary)", margin: "0 0 0.75rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                  Wait — Get a Free Audit!
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Before you go, let us analyse your website for free. We&apos;ll send a 47-point audit report directly to your inbox — no strings attached.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="form-input"
                    style={{ flex: 1, minWidth: 200 }}
                  />
                  <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
                    Get Free Audit
                  </button>
                </form>

                <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "var(--text-tertiary)", marginTop: "0.75rem" }}>
                  🔒 No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  You&apos;re on the list!
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  We&apos;ll send your audit report within 24 hours. Keep an eye on your inbox.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
