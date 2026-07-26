"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, TrendingUp, CheckCircle2 } from "lucide-react";
import { revealVariants, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TRENDING_CHIPS = [
  "Core Web Vitals",
  "Entity SEO",
  "AI in SaaS",
  "Meta Ads 2026",
  "Next.js Performance",
];

interface FeaturedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  gradient: string;
}

const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    slug: "core-web-vitals-2026-developer-playbook",
    title: "Core Web Vitals 2026: The Complete Developer's Playbook",
    excerpt:
      "LCP, INP, and CLS keep evolving — here's exactly how we get client sites into the green across all three, every time.",
    category: "Web Dev",
    readTime: "8 min",
    gradient: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
  },
  {
    slug: "entity-seo-knowledge-graph-strategy",
    title: "Entity SEO: Why Google's Knowledge Graph Is Your Biggest Ranking Lever",
    excerpt:
      "Keyword-stuffing is dead. The real 2026 ranking game is entity authority — here's the LIMINIQ framework we use.",
    category: "SEO",
    readTime: "12 min",
    gradient: "linear-gradient(135deg, #2563EB, #60A5FA)",
  },
];

interface PollOption {
  id: string;
  label: string;
  votes: number;
}

const POLL_QUESTION = "What's your #1 growth priority in 2026?";
const POLL_STORAGE_KEY = "liminiq_home_poll_vote";

const BASE_POLL_OPTIONS: PollOption[] = [
  { id: "software", label: "Custom software / SaaS", votes: 42 },
  { id: "seo", label: "SEO & organic traffic", votes: 38 },
  { id: "ads", label: "Paid ads & marketing", votes: 29 },
  { id: "design", label: "Design & brand refresh", votes: 14 },
];

function PollWidget() {
  const [options, setOptions] = useState<PollOption[]>(BASE_POLL_OPTIONS);
  const [votedId, setVotedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(POLL_STORAGE_KEY);
      if (stored) setVotedId(stored);
    } catch {
      // localStorage unavailable — poll still works, just won't persist
    }
    setHydrated(true);
  }, []);

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  const castVote = async (optionId: string) => {
    if (votedId) return;
    setVotedId(optionId);
    setOptions((prev) =>
      prev.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o))
    );
    try {
      localStorage.setItem(POLL_STORAGE_KEY, optionId);
    } catch {
      // ignore persistence failures
    }
    try {
      await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollVote: optionId, pollSlug: "home-growth-priority-2026" }),
      }).catch(() => {});
    } catch {
      // best-effort sync only — poll already recorded locally
    }
  };

  return (
    <div className="glass-card-premium flex h-full flex-col p-6">
      <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-[var(--signal)]">
        <TrendingUp size={12} /> Community Poll
      </span>
      <h3 className="mb-4 font-heading text-base font-bold leading-snug text-text-primary">
        {POLL_QUESTION}
      </h3>

      <div className="flex flex-1 flex-col gap-2">
        {options.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const isSelected = votedId === option.id;
          const showResults = Boolean(votedId) && hydrated;

          return (
            <button
              key={option.id}
              type="button"
              disabled={Boolean(votedId)}
              onClick={() => castVote(option.id)}
              className={cn(
                "relative overflow-hidden rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                isSelected
                  ? "border-[var(--accent)] text-text-primary"
                  : "border-[var(--border-subtle)] text-text-secondary hover:border-[var(--border-hover)]",
                votedId && !isSelected && "opacity-70"
              )}
            >
              {showResults && (
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 -z-0"
                  style={{ background: "var(--accent-muted)" }}
                />
              )}
              <span className="relative z-10 flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5">
                  {isSelected && <CheckCircle2 size={14} className="text-[var(--accent)]" />}
                  {option.label}
                </span>
                {showResults && <span className="font-mono text-xs text-text-muted">{pct}%</span>}
              </span>
            </button>
          );
        })}
      </div>

      <span className="mt-4 text-xs text-text-muted">
        {totalVotes.toLocaleString("en-IN")} votes {votedId ? "· Thanks for voting!" : "· Tap to vote"}
      </span>
    </div>
  );
}

function ArticleCard({ article }: { article: FeaturedArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="glass-card group flex h-full flex-col overflow-hidden"
    >
      <div
        className="relative h-36 shrink-0"
        style={{ background: article.gradient }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="line-clamp-2 font-heading text-lg font-bold leading-snug text-text-primary transition-colors group-hover:text-[var(--accent)]">
          {article.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>
        <div className="mt-2 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs text-text-muted">
          <span>{article.readTime} read</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[var(--accent)]">
            Read article <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogTeaser() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <motion.p variants={revealVariants} className="section-number mb-3">
              § 09 · from the journal
            </motion.p>
            <motion.h2
              variants={revealVariants}
              className="font-[family-name:var(--font-heading)] text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-text-primary"
            >
              Ideas worth <span className="heading-accent">reading.</span>
            </motion.h2>
          </div>
          <motion.div variants={revealVariants}>
            <Link href="/blog" className="btn-secondary text-sm">
              View All <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <Flame size={13} className="text-red-400" /> Trending
          </span>
          {TRENDING_CHIPS.map((chip) => (
            <Link
              key={chip}
              href={`/blog/topic/${chip.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-[var(--border-subtle)] bg-white px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-[var(--border-hover)] hover:text-text-primary"
            >
              {chip}
            </Link>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {FEATURED_ARTICLES.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
          <PollWidget />
        </div>
      </div>
    </section>
  );
}
