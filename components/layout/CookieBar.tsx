"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "liminiq-cookie-consent";
export const COOKIE_CONSENT_EVENT = "liminiq:cookie-consent";

export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

/** Reads the stored consent choice, if any. Safe to call on the server (returns null). */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

/** Convenience helper for gating GA / analytics scripts. */
export function hasAnalyticsConsent(): boolean {
  return Boolean(getCookieConsent()?.analytics);
}

function persistConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Ignore storage failures (e.g. private browsing quota errors).
  }
  window.dispatchEvent(new CustomEvent<CookieConsent>(COOKIE_CONSENT_EVENT, { detail: consent }));
}

export function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent()) return;
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  function choose(analytics: boolean, marketing: boolean) {
    persistConsent({ analytics, marketing, timestamp: Date.now() });
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:px-0 sm:pb-0"
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-bg-secondary/98 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Cookie size={17} />
              </span>
              <p className="text-sm leading-relaxed text-text-secondary">
                We use cookies to improve your experience and understand how visitors use LIMINIQ.
                Choose what you&apos;re comfortable with.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => choose(false, false)}
                className="flex-1 rounded-full border border-border-subtle px-4 py-2.5 text-xs font-semibold text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => choose(true, false)}
                className="flex-1 rounded-full border border-border-subtle px-4 py-2.5 text-xs font-semibold text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
              >
                Analytics only
              </button>
              <button
                type="button"
                onClick={() => choose(true, true)}
                className="flex-1 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
