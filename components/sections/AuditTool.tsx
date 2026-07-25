"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Search,
  Smartphone,
  Lock,
  Eye,
  Loader2,
  ArrowRight,
  ScanSearch,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AuditDimension {
  key: "performance" | "seo" | "mobile" | "security" | "accessibility";
  score: number;
}

interface AuditResult {
  url: string;
  hostname: string;
  overall: number;
  dimensions: AuditDimension[];
  heuristics: { https: boolean; viewportMeta: boolean; securityHeaders: boolean };
  demo: boolean;
  scannedAt: string;
}

const DIMENSION_META: Record<
  AuditDimension["key"],
  { label: string; description: string; icon: typeof Zap }
> = {
  performance: { label: "Performance", description: "Load speed & Core Web Vitals", icon: Zap },
  seo: { label: "SEO", description: "Meta, structure & indexability", icon: Search },
  mobile: { label: "Mobile UX", description: "Responsiveness & viewport", icon: Smartphone },
  security: { label: "Security", description: "HTTPS & response headers", icon: Lock },
  accessibility: { label: "Accessibility", description: "WCAG & ARIA signals", icon: Eye },
};

const SCAN_MESSAGES = [
  "Resolving target host…",
  "Checking HTTPS & security headers…",
  "Scanning viewport & mobile signals…",
  "Analyzing SEO structure…",
  "Compiling final scorecard…",
];

function scoreColor(score: number) {
  if (score >= 80) return "var(--signal)";
  if (score >= 55) return "var(--signal-amber)";
  return "#f87171";
}

function ScoreDial({ dimension }: { dimension: AuditDimension }) {
  const meta = DIMENSION_META[dimension.key];
  const Icon = meta.icon;
  const color = scoreColor(dimension.score);
  const circumference = 2 * Math.PI * 34;

  return (
    <div className="glass-card flex flex-col items-center gap-3 p-5 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border-subtle)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - dimension.score / 100) }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-xl font-extrabold text-text-primary">{dimension.score}</span>
          <span className="text-[0.6rem] text-text-muted">/100</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-text-secondary">
        <Icon size={14} strokeWidth={1.8} />
        <span className="font-heading text-sm font-bold text-text-primary">{meta.label}</span>
      </div>
      <p className="text-[0.72rem] leading-snug text-text-muted">{meta.description}</p>
    </div>
  );
}

export function AuditTool() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<"idle" | "scanning" | "done" | "error">("idle");
  const [messageIndex, setMessageIndex] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;

    setPhase("scanning");
    setError("");
    setMessageIndex(0);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, SCAN_MESSAGES.length - 1));
    }, 550);

    try {
      const [res] = await Promise.all([
        fetch("/api/tools/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: trimmed }),
        }),
        new Promise((resolve) => setTimeout(resolve, SCAN_MESSAGES.length * 550)),
      ]);

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Audit failed. Please try another URL.");

      setResult(data as AuditResult);
      setPhase("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setPhase("error");
    } finally {
      clearInterval(messageTimer);
    }
  };

  const resetAudit = () => {
    setPhase("idle");
    setUrl("");
    setResult(null);
    setError("");
    setMessageIndex(0);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute -left-32 top-10 h-80 w-80 rounded-full opacity-30 blur-[110px]"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -right-24 bottom-0 h-72 w-72 rounded-full opacity-20 blur-[100px]"
          style={{ background: "var(--signal)" }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <motion.span variants={revealVariants} className="pill-badge mb-4 inline-flex">
            <span className="text-[var(--signal)]">§03</span> Free Tool
          </motion.span>
          <motion.h2
            variants={revealVariants}
            className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
          >
            Instant Website <span className="heading-accent">Audit</span>
          </motion.h2>
          <motion.p variants={revealVariants} className="mx-auto mt-4 max-w-xl text-text-secondary">
            Drop your URL for a live snapshot across performance, SEO, mobile, security, and
            accessibility — no signup required.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="glass-card-premium mx-auto max-w-3xl overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] bg-black/40 px-5 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="flex-1 font-mono text-[0.7rem] text-text-muted">LIMINIQ Site Scanner</span>
            <span
              className={cn(
                "flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest",
                phase === "scanning" ? "text-[var(--accent)]" : "text-[var(--signal)]"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  phase === "scanning" ? "bg-[var(--accent)] audit-pulse" : "bg-[var(--signal)]"
                )}
              />
              {phase === "idle" && "Ready"}
              {phase === "scanning" && "Scanning"}
              {(phase === "done" || phase === "error") && "Complete"}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {(phase === "idle" || phase === "error") && (
                <motion.form
                  key="idle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={runAudit}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor="audit-url" className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                    Website URL
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex flex-1 items-center rounded-xl border border-[var(--border-subtle)] bg-white/[0.04] transition-colors focus-within:border-[var(--accent)]">
                      <span className="pl-4 font-mono text-sm text-text-muted">https://</span>
                      <input
                        id="audit-url"
                        type="text"
                        inputMode="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="yourwebsite.com"
                        required
                        className="w-full bg-transparent px-2 py-3.5 text-sm text-text-primary outline-none placeholder:text-text-muted"
                      />
                    </div>
                    <button type="submit" className="btn-primary shrink-0 justify-center">
                      <ScanSearch size={18} /> Run Audit
                    </button>
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <p className="text-xs text-text-muted">No signup required · Results in seconds</p>
                </motion.form>
              )}

              {phase === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-hover)] bg-[var(--accent-muted)] text-[var(--accent)]">
                      <Loader2 size={20} className="animate-spin" />
                    </span>
                    <div className="min-w-0">
                      <span className="block truncate font-mono text-sm text-text-primary">{url}</span>
                      <span className="text-xs text-text-muted">
                        Step {messageIndex + 1} of {SCAN_MESSAGES.length}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-signature)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${((messageIndex + 1) / SCAN_MESSAGES.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {SCAN_MESSAGES.map((msg, i) => (
                      <li
                        key={msg}
                        className={cn(
                          "flex items-center gap-2 text-sm transition-opacity",
                          i <= messageIndex ? "text-text-secondary opacity-100" : "text-text-muted opacity-40"
                        )}
                      >
                        {i < messageIndex ? (
                          <CheckCircle2 size={15} className="text-[var(--signal)]" />
                        ) : i === messageIndex ? (
                          <Loader2 size={15} className="animate-spin text-[var(--accent)]" />
                        ) : (
                          <span className="h-3.5 w-3.5 rounded-full border border-white/15" />
                        )}
                        {msg}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {phase === "done" && result && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0">
                      <span className="block truncate font-mono text-xs text-text-muted">{result.url}</span>
                      <span className="font-heading text-lg font-bold" style={{ color: scoreColor(result.overall) }}>
                        Overall score: {result.overall}/100
                      </span>
                    </div>
                    {result.demo && (
                      <span className="pill-badge shrink-0 !bg-white/5 !text-[0.65rem]">Demo estimate</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {result.dimensions.map((dim) => (
                      <ScoreDial key={dim.key} dimension={dim} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-xs text-text-secondary">
                      {result.heuristics.https ? (
                        <ShieldCheck size={14} className="text-[var(--signal)]" />
                      ) : (
                        <ShieldAlert size={14} className="text-red-400" />
                      )}
                      {result.heuristics.https ? "HTTPS enabled" : "HTTPS missing"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-xs text-text-secondary">
                      {result.heuristics.viewportMeta ? (
                        <ShieldCheck size={14} className="text-[var(--signal)]" />
                      ) : (
                        <ShieldAlert size={14} className="text-red-400" />
                      )}
                      {result.heuristics.viewportMeta ? "Viewport meta present" : "No viewport meta"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-xs text-text-secondary">
                      {result.heuristics.securityHeaders ? (
                        <ShieldCheck size={14} className="text-[var(--signal)]" />
                      ) : (
                        <ShieldAlert size={14} className="text-red-400" />
                      )}
                      {result.heuristics.securityHeaders ? "Security headers found" : "Security headers missing"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-5">
                    <p className="text-sm text-text-secondary">
                      Want the full breakdown with prioritized fixes?{" "}
                      <a href="/contact" className="font-semibold text-[var(--accent)]">
                        Talk to our team
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={resetAudit}
                      className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-text-muted transition-colors hover:text-text-primary"
                    >
                      <RotateCcw size={14} /> Audit another site
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mx-auto mt-4 flex max-w-3xl justify-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <ArrowRight size={12} /> Powered by Google PageSpeed Insights when configured
          </span>
        </div>
      </div>

      <style>{`
        .audit-pulse {
          animation: auditPulse 1.2s ease-in-out infinite;
        }
        @keyframes auditPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}
