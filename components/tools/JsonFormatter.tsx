"use client";

import { useState } from "react";
import { Braces, Check, Copy, Minimize2, Sparkles } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

const SAMPLE = `{"name":"LIMINIQ","services":["Software","SEO","Marketing"],"founded":2019,"active":true}`;

export function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function format(minify: boolean) {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
      setOutput("");
    }
  }

  function validate() {
    try {
      JSON.parse(input);
      setError("");
      setOutput("✓ Valid JSON.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
      setOutput("");
    }
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            JSON Formatter <span className="text-gradient">& Validator</span>
          </>
        }
        description="Paste any JSON to format, minify, or validate it instantly — entirely in your browser, nothing sent to a server."
      />

      <div className="tool-grid-2">
        <div className="tool-panel glass-card-premium">
          <div className="tool-field">
            <label htmlFor="json-input">Input JSON</label>
            <textarea
              id="json-input"
              className="form-input"
              style={{ minHeight: 300, fontFamily: "var(--font-mono)", fontSize: "0.85rem", resize: "vertical" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            <button type="button" onClick={() => format(false)} className="btn-primary">
              <Sparkles size={15} /> Format
            </button>
            <button type="button" onClick={() => format(true)} className="btn-secondary">
              <Minimize2 size={15} /> Minify
            </button>
            <button type="button" onClick={validate} className="btn-secondary">
              <Braces size={15} /> Validate
            </button>
          </div>
        </div>

        <div className="tool-panel glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Output
            </label>
            {output && (
              <button type="button" onClick={copyOutput} className="tool-copy-btn">
                {copied ? <Check size={15} color="var(--signal)" /> : <Copy size={15} />}
              </button>
            )}
          </div>
          {error ? (
            <div className="tool-output" style={{ color: "#f87171" }}>{error}</div>
          ) : (
            <div className="tool-output">{output || "Formatted output will appear here."}</div>
          )}
        </div>
      </div>
    </div>
  );
}
