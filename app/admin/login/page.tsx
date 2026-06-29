"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function normalizeCallbackUrl(url: string) {
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url, "https://liminiq.com");
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return "/admin";
  }
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = normalizeCallbackUrl(searchParams.get("callbackUrl") || "/admin");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await Promise.race([
        signIn("credentials", {
          email,
          password,
          redirect: false,
        }),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Login timed out. Check your connection and try again.")), 15000);
        }),
      ]);

      if (res?.error) {
        setError("Invalid email or password");
        return;
      }

      router.refresh();
      router.push(callbackUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A0F2C 0%, #1a1440 50%, #0A1F2C 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background effects */}


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 420, position: "relative" }}
      >
        <div className="glass-card-dark" style={{ padding: "2.5rem" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{
              width: 48, height: 48,
              background: "var(--gradient-hero)",
              borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 8px 24px rgba(59,91,255,0.4)",
            }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <text x="1" y="15" fontFamily="Syne, sans-serif" fontWeight="800" fontSize="12" fill="white">LN</text>
              </svg>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "white", margin: "0 0 0.25rem", letterSpacing: "-0.02em" }}>
              LIMINIQ Admin
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.45)" }}>
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@liminiq.com"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(59,91,255,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(59,91,255,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                  color: "#f87171",
                }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "var(--gradient-hero)",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "14px",
                fontFamily: "var(--font-heading)",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 4px 16px rgba(59,91,255,0.35)",
                opacity: loading ? 0.75 : 1,
                transition: "opacity 0.2s",
                marginTop: "0.25rem",
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  Signing in...
                </>
              ) : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", marginTop: "1.5rem" }}>
            Secured by LIMINIQ CRM
          </p>
          <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(255,255,255,0.18)", marginTop: "0.75rem", lineHeight: 1.5 }}>
            Default: admin@liminiq.com · LiminiqAdmin123!
          </p>
        </div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0A0F2C" }} />}>
      <LoginForm />
    </Suspense>
  );
}
