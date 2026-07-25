"use client";

import { StatCounter } from "@/components/ui/StatCounter";

/** Splits a result value like "−70%" or "2 weeks early" into an animatable numeric part. */
function parseStatValue(value: string): { prefix: string; number: number; suffix: string } | null {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

export function CaseStudyResults({ results }: { results: { label: string; value: string }[] }) {
  return (
    <div className="cs-results-grid">
      {results.map((r) => {
        const parsed = parseStatValue(r.value);
        return (
          <div key={r.label} className="cs-result-card glass-card">
            <span className="cs-result-value">
              {parsed ? (
                <StatCounter value={parsed.number} prefix={parsed.prefix} suffix={parsed.suffix} />
              ) : (
                r.value
              )}
            </span>
            <span className="cs-result-label">{r.label}</span>
          </div>
        );
      })}

      <style>{`
        .cs-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.85rem;
        }
        .cs-result-card {
          padding: 1.5rem 1.25rem;
          border-radius: 16px;
          text-align: center;
        }
        .cs-result-value {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: var(--signal);
          margin-bottom: 0.4rem;
        }
        .cs-result-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
}
