"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

export function MetaTagPreview() {
  const [title, setTitle] = useState("LIMINIQ — Website Development, SEO & Digital Marketing Agency");
  const [description, setDescription] = useState(
    "Custom software, SaaS, websites, SEO, and digital marketing engineered for measurable growth."
  );
  const [url, setUrl] = useState("www.liminiq.com");
  const [image, setImage] = useState("");

  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const titleTooLong = title.length > 60;
  const descTooLong = description.length > 160;

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            SEO Meta Tag <span className="text-gradient">Previewer</span>
          </>
        }
        description="See exactly how your title and description will look in Google search results and social share cards before you publish."
      />

      <div className="tool-grid-2">
        <div className="tool-panel glass-card-premium">
          <div className="tool-field">
            <label htmlFor="mt-title">Page Title ({title.length}/60)</label>
            <input
              id="mt-title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
            />
            {titleTooLong && <span style={{ fontSize: "0.75rem", color: "#f59e0b" }}>Google typically truncates past ~60 characters.</span>}
          </div>
          <div className="tool-field">
            <label htmlFor="mt-desc">Meta Description ({description.length}/160)</label>
            <textarea
              id="mt-desc"
              className="form-input"
              style={{ minHeight: 100, resize: "vertical" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
            />
            {descTooLong && <span style={{ fontSize: "0.75rem", color: "#f59e0b" }}>Google typically truncates past ~160 characters.</span>}
          </div>
          <div className="tool-field">
            <label htmlFor="mt-url">URL</label>
            <input id="mt-url" className="form-input" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="tool-field">
            <label htmlFor="mt-image">Social Image URL (optional)</label>
            <input
              id="mt-image"
              className="form-input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://yoursite.com/og-image.jpg"
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Google Search Result
            </span>
            <div className="glass-card" style={{ padding: "1.25rem", marginTop: "0.6rem", background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Globe size={14} color="#4d5156" />
                <span style={{ fontFamily: "arial, sans-serif", fontSize: "0.8rem", color: "#4d5156" }}>{displayUrl || "yoursite.com"}</span>
              </div>
              <div style={{ fontFamily: "arial, sans-serif", fontSize: "1.15rem", color: "#1a0dab", lineHeight: 1.3, marginBottom: 3 }}>
                {(title || "Your Page Title").slice(0, 65)}
              </div>
              <div style={{ fontFamily: "arial, sans-serif", fontSize: "0.85rem", color: "#4d5156", lineHeight: 1.5 }}>
                {(description || "Your meta description will appear here.").slice(0, 165)}
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Social Share Card (OG / Twitter)
            </span>
            <div className="glass-card" style={{ overflow: "hidden", marginTop: "0.6rem" }}>
              <div
                style={{
                  height: 160,
                  background: image ? `url(${image}) center/cover` : "linear-gradient(135deg, #3B5BFF, #7B61FF)",
                }}
              />
              <div style={{ padding: "0.9rem 1.1rem" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 4 }}>
                  {displayUrl || "yoursite.com"}
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: 4 }}>
                  {(title || "Your Page Title").slice(0, 70)}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {(description || "Your description will appear here.").slice(0, 120)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
