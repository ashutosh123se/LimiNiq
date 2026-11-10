import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Clock,
  Handshake,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { PricingCards } from "@/components/sections/PricingCards";
import { InternationalWorkflow } from "@/components/sections/InternationalWorkflow";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQAccordion } from "@/components/sections/services/FAQAccordion";
import { PRICING_TIERS, ENGAGEMENT_MODELS } from "@/data/pricing";
import { faqsForPage } from "@/data/faqs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing & Starting Rates | AI & Custom Software",
  description:
    "Transparent starting rates for AI automation (from $2,500), custom software & SaaS (from $5,000), MVP sprints (from $3,500), and dedicated engineering pods ($2,000/mo). Multi-currency USD/GBP/EUR/INR, milestone-gated billing, and 100% IP ownership.",
  path: "/pricing",
});

const MODEL_ICONS: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Users,
  Clock,
};

const COMPARISON_ROWS: {
  label: string;
  render: (tier: (typeof PRICING_TIERS)[number]) => ReactNode;
}[] = [
  {
    label: "Deliverables",
    render: (tier) => (
      <ul className="flex flex-col gap-1.5 text-left">
        {tier.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-1.5 text-xs text-text-secondary sm:text-sm">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {d}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "Timeline",
    render: (tier) => <span className="text-sm text-text-secondary">{tier.timeline}</span>,
  },
  {
    label: "Revisions",
    render: (tier) => <span className="text-sm text-text-secondary">{tier.revisions}</span>,
  },
  {
    label: "Support & Warranty",
    render: (tier) => <span className="text-sm text-text-secondary">{tier.support}</span>,
  },
  {
    label: "Code & IP Ownership",
    render: () => (
      <span className="inline-flex items-center gap-1 font-semibold text-xs text-[var(--signal)]">
        <CheckCircle2 size={13} /> 100% Client Owned
      </span>
    ),
  },
];

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: "No hidden fees" },
  { icon: FileCheck2, label: "Scoped in writing" },
  { icon: Clock, label: "Milestone-gated delivery" },
  { icon: Handshake, label: "100% IP ownership upon sign-off" },
];

export default function PricingPage() {
  const faqs = faqsForPage("pricing");
  const coreTiers = PRICING_TIERS.filter((t) => t.category === "core");

  return (
    <div className="pricing-page">
      <PageHero
        eyebrow="Pricing & Engagement Models"
        title={
          <>
            Transparent rates, fixed milestones,
            <br />
            <span className="text-gradient">zero surprises.</span>
          </>
        }
        description="Every project starts with a direct technical discovery call with our senior architects. What you see below is where the conversation begins — locked milestones, multi-currency invoicing, and 100% code ownership."
      >
        <Link href="/contact" className="btn-primary">
          Schedule Technical Discovery <ArrowRight size={16} />
        </Link>
        <Link href="/services" className="btn-secondary">
          Explore AI & Software Capabilities
        </Link>
      </PageHero>

      {/* Main Interactive Pricing Cards with Currency Switcher */}
      <PricingCards />

      {/* Engagement Models Section */}
      <section className="section-padding relative overflow-hidden bg-bg-secondary/30 border-t border-[var(--border-subtle)]">
        <div className="section-container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="pill-badge mb-4 inline-flex">
              <Sparkles size={13} className="text-[var(--accent)]" /> Flexible Delivery
            </span>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-text-primary">
              Three Proven <span className="heading-accent">Engagement Models</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Whether you need a defined turn-key product, dedicated full-stack speed, or ongoing AI maintenance, we adapt to your team&apos;s velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model) => {
              const Icon = MODEL_ICONS[model.iconName] || ShieldCheck;
              return (
                <div
                  key={model.id}
                  className="glass-card relative flex flex-col justify-between overflow-hidden p-7 transition-all duration-300 hover:border-[var(--accent)]"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--accent)] mb-5">
                      <Icon size={24} />
                    </div>

                    <h3 className="font-heading text-xl font-bold text-text-primary">
                      {model.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[var(--accent)]">
                      {model.tagline}
                    </p>
                    <p className="mt-3 text-xs text-text-muted leading-relaxed">
                      {model.bestFor}
                    </p>

                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-[var(--border-subtle)] pt-5">
                      {model.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--signal)]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--border-subtle)]">
                    <Link
                      href={`/contact?engagement=${model.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-text-primary transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
                    >
                      Discuss This Model <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-padding pricing-compare-section">
        <div className="section-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="pill-badge mb-4 inline-flex">
              <span className="text-[var(--signal)]">✦</span> Side by side
            </span>
            <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-text-primary">
              Core Capabilities <span className="heading-accent">Side by Side</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Deliverables, timelines, revisions, support, and IP ownership — laid out clearly with no ambiguity.
            </p>
          </div>

          <div className="pricing-compare-scroll">
            <table className="pricing-compare-table">
              <thead>
                <tr>
                  <th className="pricing-compare-row-label">Feature / Tier</th>
                  {coreTiers.map((tier) => (
                    <th key={tier.id}>
                      <div className="flex flex-col gap-1">
                        <span className="font-heading text-sm font-bold text-text-primary">{tier.label}</span>
                        <span className="text-xs font-semibold text-accent">
                          From {tier.prices.USD.amount} / {tier.prices.USD.unit}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className="pricing-compare-row-label">{row.label}</td>
                    {coreTiers.map((tier) => (
                      <td key={tier.id}>{row.render(tier)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {TRUST_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/[0.03] px-4 py-2 text-xs font-medium text-text-secondary"
              >
                <chip.icon size={14} className="text-[var(--signal)]" />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* International Client Operations & Legal Safeguards */}
      <InternationalWorkflow />

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-padding section-container pricing-faq">
          <FAQAccordion items={faqs} title="Frequently Asked Pricing & Legal Questions" />
        </section>
      )}

      <FinalCTA />

      <style>{`
        .pricing-page {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .pricing-compare-section {
          padding-top: 0;
        }
        .pricing-compare-scroll {
          overflow-x: auto;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
        }
        .pricing-compare-table {
          width: 100%;
          min-width: 720px;
          border-collapse: collapse;
          background: var(--bg-elevated);
        }
        .pricing-compare-table th,
        .pricing-compare-table td {
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          vertical-align: top;
          text-align: center;
        }
        .pricing-compare-table thead th {
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
        }
        .pricing-compare-table tbody tr:last-child td {
          border-bottom: none;
        }
        .pricing-compare-row-label {
          text-align: left !important;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.015);
        }
        .pricing-faq {
          padding-top: 0;
        }
      `}</style>
    </div>
  );
}
