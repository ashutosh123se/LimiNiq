"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length: number, options: Record<keyof typeof CHAR_SETS, boolean>): string {
  const pool = (Object.keys(options) as (keyof typeof CHAR_SETS)[])
    .filter((key) => options[key])
    .map((key) => CHAR_SETS[key])
    .join("");

  if (!pool) return "";

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, (value) => pool[value % pool.length]).join("");
}

function scorePassword(password: string, options: Record<keyof typeof CHAR_SETS, boolean>): { label: string; color: string; percent: number } {
  const variety = Object.values(options).filter(Boolean).length;
  const score = Math.min(100, password.length * 4 + variety * 10);

  if (score < 40) return { label: "Weak", color: "#f87171", percent: score };
  if (score < 70) return { label: "Okay", color: "#f59e0b", percent: score };
  if (score < 90) return { label: "Strong", color: "var(--signal)", percent: score };
  return { label: "Very strong", color: "var(--signal)", percent: score };
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function regenerate() {
    setPassword(generatePassword(length, options));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  async function handleCopy() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const strength = scorePassword(password, options);

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            Password <span className="text-gradient">Generator</span>
          </>
        }
        description="Generate cryptographically random passwords with full control over length and character sets — nothing leaves your browser."
      />

      <div className="tool-panel glass-card-premium">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            padding: "1.1rem 1.25rem",
            background: "#0b0d14",
            border: "1px solid var(--border-subtle)",
            borderRadius: 14,
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--text-primary)", wordBreak: "break-all" }}>
            {password || "—"}
          </span>
          <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
            <button type="button" onClick={regenerate} className="tool-copy-btn" aria-label="Regenerate">
              <RefreshCw size={17} />
            </button>
            <button type="button" onClick={handleCopy} className="tool-copy-btn" aria-label="Copy password">
              {copied ? <Check size={17} color="var(--signal)" /> : <Copy size={17} />}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ height: 6, borderRadius: 100, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${strength.percent}%`, background: strength.color, transition: "width 0.3s ease" }} />
          </div>
          <span style={{ fontSize: "0.78rem", color: strength.color, fontFamily: "var(--font-heading)", fontWeight: 700 }}>
            {strength.label}
          </span>
        </div>

        <div className="tool-field">
          <label>Length: {length}</label>
          <input
            type="range"
            min={6}
            max={48}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent)" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem", marginTop: "0.5rem" }}>
          {(Object.keys(CHAR_SETS) as (keyof typeof CHAR_SETS)[]).map((key) => (
            <label
              key={key}
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--text-secondary)", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) => setOptions((prev) => ({ ...prev, [key]: e.target.checked }))}
                style={{ accentColor: "var(--accent)", width: 16, height: 16 }}
              />
              {key === "uppercase" && "Uppercase (A-Z)"}
              {key === "lowercase" && "Lowercase (a-z)"}
              {key === "numbers" && "Numbers (0-9)"}
              {key === "symbols" && "Symbols (!@#...)"}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
