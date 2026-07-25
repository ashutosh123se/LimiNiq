"use client";

import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";

function countStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g)?.length ?? (trimmed ? 1 : 0)) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  const speakingMinutes = Math.max(1, Math.ceil(words / 130));

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingMinutes, speakingMinutes };
}

export function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countStats(text), [text]);

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            Word / Character <span className="text-gradient">Counter</span>
          </>
        }
        description="Paste your copy to get live word, character, sentence, and reading-time counts — great for meta descriptions, ads, and blog drafts."
      />

      <div className="tool-grid-2">
        <div className="tool-panel glass-card-premium">
          <div className="tool-field">
            <label htmlFor="wc-text">Your Text</label>
            <textarea
              id="wc-text"
              className="form-input"
              style={{ minHeight: 340, resize: "vertical" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your content here…"
            />
          </div>
        </div>

        <div className="tool-panel glass-card">
          <div className="tool-result-row">
            <span>Words</span>
            <strong>{stats.words.toLocaleString()}</strong>
          </div>
          <div className="tool-result-row">
            <span>Characters</span>
            <strong>{stats.characters.toLocaleString()}</strong>
          </div>
          <div className="tool-result-row">
            <span>Characters (no spaces)</span>
            <strong>{stats.charactersNoSpaces.toLocaleString()}</strong>
          </div>
          <div className="tool-result-row">
            <span>Sentences</span>
            <strong>{stats.sentences.toLocaleString()}</strong>
          </div>
          <div className="tool-result-row">
            <span>Paragraphs</span>
            <strong>{stats.paragraphs.toLocaleString()}</strong>
          </div>
          <div className="tool-result-row">
            <span>Reading time</span>
            <strong>{stats.readingMinutes} min</strong>
          </div>
          <div className="tool-result-row">
            <span>Speaking time</span>
            <strong>{stats.speakingMinutes} min</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
