"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, Settings2, Check, X } from "lucide-react";

const STORAGE_KEY = "liminiq-cookie-consent";
export const COOKIE_CONSENT_EVENT = "liminiq:cookie-consent";

export interface CookieConsent {
  essential: true;
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

function updateGoogleConsentMode(analytics: boolean, marketing: boolean) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    });
  }
}

function persistConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Ignore storage failures
  }
  updateGoogleConsentMode(consent.analytics, consent.marketing);
  window.dispatchEvent(new CustomEvent<CookieConsent>(COOKIE_CONSENT_EVENT, { detail: consent }));
}

export function CookieBar() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      updateGoogleConsentMode(existing.analytics, existing.marketing);
    }
  }, []);

  function choose(analytics: boolean, marketing: boolean) {
    persistConsent({ essential: true, analytics, marketing, timestamp: Date.now() });
    setVisible(false);
    setShowManage(false);
  }

  function handleSaveCustom() {
    choose(analyticsChecked, marketingChecked);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie and Privacy Consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-lg sm:px-0 sm:pb-0"
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-bg-secondary/98 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-[var(--accent)]">
                  <Cookie size={17} />
                </span>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary">
                    Privacy & Cookie Choices (GDPR & CCPA)
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    We use cookies to analyze traffic, protect against CSRF attacks, and optimize your experience. Choose your preferences or learn more in our{" "}
                    <Link href="/privacy-policy" className="text-[var(--accent)] underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Manage Preferences Accordion */}
            {showManage && (
              <div className="flex flex-col gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-bg-elevated p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-text-primary">Strictly Necessary</span>
                  <span className="font-mono text-[10px] uppercase text-[var(--signal)] font-bold">Always Active</span>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border-subtle)]/60 pt-2">
                  <label htmlFor="analytics-toggle" className="cursor-pointer text-text-secondary">
                    Analytics & Performance (PageSpeed & Aggregated Usage)
                  </label>
                  <input
                    id="analytics-toggle"
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="cursor-pointer rounded border-[var(--border-subtle)] text-[var(--accent)] focus:ring-0"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border-subtle)]/60 pt-2">
                  <label htmlFor="marketing-toggle" className="cursor-pointer text-text-secondary">
                    Marketing & Conversion Signals
                  </label>
                  <input
                    id="marketing-toggle"
                    type="checkbox"
                    checked={marketingChecked}
                    onChange={(e) => setMarketingChecked(e.target.checked)}
                    className="cursor-pointer rounded border-[var(--border-subtle)] text-[var(--accent)] focus:ring-0"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {showManage ? (
                <>
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="flex-1 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManage(false)}
                    className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-primary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => choose(false, false)}
                    className="flex-1 rounded-full border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManage(true)}
                    className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-[var(--accent)] hover:text-text-primary"
                    title="Configure specific cookie categories"
                  >
                    <Settings2 size={13} className="inline mr-1" /> Manage
                  </button>
                  <button
                    type="button"
                    onClick={() => choose(true, true)}
                    className="flex-1 rounded-full bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    Accept All
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
