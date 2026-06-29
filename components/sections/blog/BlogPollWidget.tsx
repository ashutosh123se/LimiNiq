"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, CheckCircle2 } from "lucide-react";
import type { PollOption } from "@/lib/data/blogEngagement";

interface BlogPollWidgetProps {
  postId: string;
  slug: string;
  title: string;
  excerpt?: string;
  options: PollOption[];
  pollEndsAt?: string | null;
  compact?: boolean;
  showLink?: boolean;
  embedded?: boolean;
}

export function BlogPollWidget({
  postId,
  slug,
  title,
  excerpt,
  options: initialOptions,
  pollEndsAt,
  compact = false,
  showLink = false,
  embedded = false,
}: BlogPollWidgetProps) {
  const [options, setOptions] = useState(initialOptions);
  const [votedId, setVotedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);
  const ended = pollEndsAt ? new Date(pollEndsAt) < new Date() : false;

  useEffect(() => {
    fetch(`/api/blog/${postId}/vote`)
      .then((r) => r.json())
      .then((d) => {
        if (d.votedOptionId) {
          setVotedId(d.votedOptionId);
          setHasVoted(true);
        }
      })
      .catch(() => {});
  }, [postId]);

  const vote = async (optionId: string) => {
    if (hasVoted || ended || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId }),
      });
      const data = await res.json();
      if (res.ok && data.pollOptions) {
        setOptions(data.pollOptions);
        setVotedId(optionId);
        setHasVoted(true);
      } else if (res.status === 409 && data.votedOptionId) {
        setVotedId(data.votedOptionId);
        setHasVoted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const displayOptions = embedded ? options.slice(0, 3) : options;

  return (
    <div className={`poll-widget glass-card-premium ${compact ? "poll-widget--compact" : ""} ${embedded ? "poll-widget--embedded" : ""}`}>
      {embedded && (
        <div className="poll-widget-cover">
          <div className="poll-widget-badge poll-widget-badge--cover">
            <BarChart3 size={14} />
            Community Poll
          </div>
        </div>
      )}

      <div className={embedded ? "poll-widget-body" : undefined}>
      {!embedded && (
        <div className="poll-widget-head">
          <div className="poll-widget-badge">
            <BarChart3 size={14} />
            Community Poll
          </div>
          {ended && <span className="poll-widget-ended">Closed</span>}
        </div>
      )}

      <h3 className="poll-widget-title">{title}</h3>
      {!compact && !embedded && excerpt && <p className="poll-widget-excerpt">{excerpt}</p>}

      <div className="poll-widget-options">
        {displayOptions.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const isSelected = votedId === option.id;
          const showResults = hasVoted || ended;

          return (
            <button
              key={option.id}
              type="button"
              disabled={hasVoted || ended || loading}
              onClick={() => vote(option.id)}
              className={`poll-option ${showResults ? "poll-option--results" : ""} ${isSelected ? "poll-option--selected" : ""}`}
            >
              {showResults && (
                <span className="poll-option-fill" style={{ width: `${pct}%` }} />
              )}
              <span className="poll-option-content">
                <span className="poll-option-label">
                  {isSelected && <CheckCircle2 size={14} />}
                  {option.label}
                </span>
                {showResults && (
                  <span className="poll-option-pct">{pct}% · {option.votes}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="poll-widget-footer">
        <span>{totalVotes} vote{totalVotes !== 1 ? "s" : ""}</span>
        {showLink && (
          <Link href={`/blog/${slug}`} className="poll-widget-link">
            Open poll →
          </Link>
        )}
      </div>
      </div>

      <style>{`
        .poll-widget {
          padding: 1.35rem;
          border-radius: 20px;
          border-color: rgba(123, 97, 255, 0.2);
          background: linear-gradient(135deg, rgba(123, 97, 255, 0.06), rgba(255,255,255,0.02));
        }

        .poll-widget--compact { padding: 1.15rem; }

        .poll-widget--embedded {
          padding: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 20px;
        }

        .poll-widget-cover {
          height: 140px;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(123, 97, 255, 0.35), rgba(0, 200, 160, 0.2));
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 0.75rem;
        }

        .poll-widget-badge--cover {
          position: static;
        }

        .poll-widget-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          min-height: 0;
        }

        .poll-widget--embedded .poll-widget-title {
          font-size: 1rem;
          min-height: calc(1.35em * 2);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .poll-widget--embedded .poll-widget-options {
          flex: 1;
        }

        .poll-widget--embedded .poll-option {
          padding: 0.6rem 0.85rem;
        }

        .poll-widget--embedded .poll-option-label {
          font-size: 0.84rem;
        }

        .poll-widget--embedded .poll-widget-footer {
          margin-top: auto;
          padding-top: 1rem;
          font-size: 0.82rem;
        }

        .poll-widget-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .poll-widget-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-violet);
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(123, 97, 255, 0.12);
          border: 1px solid rgba(123, 97, 255, 0.22);
        }

        .poll-widget-ended {
          font-size: 0.72rem;
          color: var(--text-tertiary);
        }

        .poll-widget-title {
          font-family: var(--font-heading);
          font-size: ${compact ? "1rem" : "1.15rem"};
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
          line-height: 1.35;
        }

        .poll-widget-excerpt {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 1rem;
        }

        .poll-widget-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .poll-option {
          position: relative;
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .poll-option:disabled { cursor: default; }

        .poll-option:not(:disabled):hover {
          border-color: rgba(123, 97, 255, 0.35);
        }

        .poll-option--selected {
          border-color: rgba(123, 97, 255, 0.45);
        }

        .poll-option-fill {
          position: absolute;
          inset: 0 auto 0 0;
          background: linear-gradient(90deg, rgba(123, 97, 255, 0.22), rgba(59, 91, 255, 0.12));
          transition: width 0.5s ease;
        }

        .poll-option-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
        }

        .poll-option-label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .poll-option-pct {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .poll-widget-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.85rem;
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }

        .poll-widget-link {
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 600;
        }

        .poll-widget-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
