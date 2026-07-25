"use client";

import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

type Style = "modern" | "playful" | "professional";

const PREFIXES: Record<Style, string[]> = {
  modern: ["Nova", "Nex", "Zeno", "Vela", "Arc", "Flux", "Orbit", "Lumen"],
  playful: ["Fizzy", "Bounce", "Snap", "Giggle", "Zippy", "Puddle", "Whimsy"],
  professional: ["Sterling", "Summit", "Meridian", "Anchor", "Vertex", "Keystone", "Beacon"],
};

const SUFFIXES: Record<Style, string[]> = {
  modern: ["ly", "ify", "io", "hub", "labs", "works", "loop"],
  playful: ["berry", "pop", "nest", "spark", "town", "buddy"],
  professional: ["Group", "Partners", "& Co", "Solutions", "Collective", "Studio"],
};

function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateNames(keywords: string[], style: Style, count = 12): string[] {
  const prefixes = PREFIXES[style];
  const suffixes = SUFFIXES[style];
  const names = new Set<string>();

  const seeds = keywords.length > 0 ? keywords.map(titleCase) : prefixes;

  let attempts = 0;
  while (names.size < count && attempts < 200) {
    attempts++;
    const pattern = Math.floor(Math.random() * 3);
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    let candidate = "";
    if (pattern === 0) candidate = `${prefix}${seed}`;
    else if (pattern === 1) candidate = style === "professional" ? `${seed} ${suffix}` : `${seed}${suffix}`;
    else candidate = `${prefix}${suffix}`;

    names.add(candidate);
  }

  return Array.from(names);
}

export function BusinessNameGenerator() {
  const [keywordsInput, setKeywordsInput] = useState("bright, cloud");
  const [style, setStyle] = useState<Style>("modern");
  const [names, setNames] = useState<string[]>(() => generateNames(["bright", "cloud"], "modern"));

  function handleGenerate() {
    const keywords = keywordsInput
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    setNames(generateNames(keywords, style));
  }

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            Business Name <span className="text-gradient">Generator</span>
          </>
        }
        description="Enter a few keywords and pick a style — get instant, brandable business name ideas to shortlist and check availability for."
      />

      <div className="tool-panel glass-card-premium" style={{ marginBottom: "1.5rem" }}>
        <div className="tool-field">
          <label htmlFor="bng-keywords">Keywords (comma-separated)</label>
          <input
            id="bng-keywords"
            className="form-input"
            value={keywordsInput}
            onChange={(e) => setKeywordsInput(e.target.value)}
            placeholder="e.g. bright, cloud, forge"
          />
        </div>
        <div className="tool-field">
          <label>Style</label>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {(["modern", "playful", "professional"] as Style[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className="blog-chip"
                style={
                  style === s
                    ? { background: "var(--accent-muted)", borderColor: "var(--border-hover)", color: "var(--text-primary)" }
                    : undefined
                }
              >
                {titleCase(s)}
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={handleGenerate} className="btn-primary" style={{ marginTop: "0.5rem" }}>
          <RefreshCw size={15} /> Generate Names
        </button>
      </div>

      <div className="tool-panel glass-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
          <Sparkles size={16} style={{ color: "var(--accent)" }} />
          <span className="font-heading" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Name Ideas</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
          {names.map((name) => (
            <div
              key={name}
              style={{
                padding: "0.9rem 1.1rem",
                borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border-subtle)",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                color: "var(--text-primary)",
                textAlign: "center",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
