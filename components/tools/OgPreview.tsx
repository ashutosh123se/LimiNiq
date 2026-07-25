"use client";

import { useState } from "react";
import { Loader2, ScanSearch } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

interface ScrapedMeta {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
}

export function OgPreview() {
  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState<ScrapedMeta | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/tools/og-scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Couldn't fetch that link.");
      setMeta(data);
      setStatus("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const hostname = meta ? (() => {
    try {
      return new URL(meta.url).hostname;
    } catch {
      return meta.url;
    }
  })() : "";

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            Open Graph <span className="text-gradient">Preview Tool</span>
          </>
        }
        description="Paste any live URL to see exactly how the link will appear when shared on Facebook, LinkedIn, X, and Discord."
      />

      <form onSubmit={handleSubmit} className="tool-panel glass-card-premium" style={{ marginBottom: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          className="form-input"
          style={{ flex: 1, minWidth: 220 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourwebsite.com/page"
          required
        />
        <button type="submit" className="btn-primary" disabled={status === "loading"}>
          {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <ScanSearch size={16} />}
          Fetch Preview
        </button>
      </form>

      {error && <p style={{ color: "#f87171", marginBottom: "1.5rem" }}>{error}</p>}

      {meta && (
        <div className="glass-card" style={{ maxWidth: 480, overflow: "hidden" }}>
          <div
            style={{
              height: 220,
              background: meta.image ? `url(${meta.image}) center/cover` : "linear-gradient(135deg, #3B5BFF, #7B61FF)",
            }}
          />
          <div style={{ padding: "1.1rem 1.25rem" }}>
            <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 6 }}>
              {meta.siteName || hostname}
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", fontSize: "1rem", marginBottom: 6 }}>
              {meta.title || "No title tag found"}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {meta.description || "No description tag found."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
