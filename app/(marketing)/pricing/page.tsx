import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileCheck2, Clock, Handshake } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { PricingCards } from "@/components/sections/PricingCards";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQAccordion } from "@/components/sections/services/FAQAccordion";
import { PRICING_TIERS } from "@/data/pricing";
import { faqsForPage } from "@/data/faqs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing & Starting Rates",
  description:
    "Starting rates for custom software (from ₹75,000), web projects (from ₹24,999), SEO (from ₹14,999/mo), and digital marketing (from ₹19,999/mo). Transparent pricing — final quote after a free discovery call.",
  path: "/pricing",
});

const COMPARISON_ROWS: { label: string; render: (tier: (typeof PRICING_TIERS)[number]) => ReactNode }[] = [
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
    label: "Support",
    render: (tier) => <span className="text-sm text-text-secondary">{tier.support}</span>,
  },
];

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: "No hidden fees" },
  { icon: FileCheck2, label: "Scoped in writing" },
  { icon: Clock, label: "Fixed delivery windows" },
  { icon: Handshake, label: "Cancel anytime on retainers" },
];

export default function PricingPage() {
  const faqs = faqsForPage("pricing");

  return (
    <div className="pricing-page">
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Straightforward pricing,
            <br />
            <span className="text-gradient">zero surprises.</span>
          </>
        }
        description="Every engagement starts with a free discovery call. What you see below is where the conversation starts — your final quote is scoped in writing before any work begins."
      >
        <Link href="/contact" className="btn-primary">
          Request Custom Quote <ArrowRight size={16} />
        </Link>
        <Link href="/services" className="btn-secondary">
          See what&apos;s included
        </Link>
      </PageHero>

      <PricingCards />

      {/* Comparison table */}
      <section className="section-padding pricing-compare-section">
        <div className="section-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="pill-badge mb-4 inline-flex">
              <span className="text-[var(--signal)]">✦</span> Side by side
            </span>
            <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-text-primary">
              What each tier <span className="heading-accent">actually includes</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Deliverables, delivery windows, revisions, and support — laid out plainly so there&apos;s no guessing.
            </p>
          </div>

          <div className="pricing-compare-scroll">
            <table className="pricing-compare-table">
              <thead>
                <tr>
                  <th className="pricing-compare-row-label" />
                  {PRICING_TIERS.map((tier) => (
                    <th key={tier.id}>
                      <div className="flex flex-col gap-1">
                        <span className="font-heading text-sm font-bold text-text-primary">{tier.label}</span>
                        <span className="text-xs font-semibold text-accent">
                          From {tier.priceFrom} / {tier.unit}
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
                    {PRICING_TIERS.map((tier) => (
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

      {faqs.length > 0 && (
        <section className="section-padding section-container pricing-faq">
          <FAQAccordion items={faqs} title="Pricing Questions" />
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
