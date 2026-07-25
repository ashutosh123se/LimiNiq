import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { INDUSTRIES } from "@/data/industries";
import { getIcon } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Industries We Serve",
  description:
    "LIMINIQ builds software, websites, and growth systems for SaaS & startups, healthcare, edtech, real estate, e-commerce, fintech, hospitality, and B2B services — across India and globally.",
  path: "/industries",
});

const INDUSTRY_ICONS: Record<string, string> = {
  "saas-startups": "Rocket",
  "healthcare-wellness": "HeartPulse",
  edtech: "GraduationCap",
  "real-estate-proptech": "Building2",
  "ecommerce-d2c": "ShoppingBag",
  fintech: "Landmark",
  "hospitality-food": "UtensilsCrossed",
  "professional-services-b2b": "Briefcase",
};

export default function IndustriesPage() {
  return (
    <div className="ind-index">
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Sector expertise,
            <br />
            <span className="text-gradient">not guesswork.</span>
          </>
        }
        description="We've shipped software, web experiences, and growth campaigns across eight verticals — each with its own buyer behavior, compliance nuance, and growth levers."
      >
        <Link href="/contact" className="btn-primary">
          Talk to our team
        </Link>
        <Link href="/portfolio" className="btn-secondary">
          See our work
        </Link>
      </PageHero>

      <section className="section-container section-padding ind-index-section">
        <div className="ind-index-grid">
          {INDUSTRIES.map((industry) => {
            const Icon = getIcon(INDUSTRY_ICONS[industry.slug]);
            return (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="ind-index-card glass-card-premium"
              >
                <div className="ind-index-card-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h2 className="ind-index-card-title">{industry.name}</h2>
                <p className="ind-index-card-copy">{industry.heroCopy}</p>
                <span className="ind-index-card-link">
                  Explore <ArrowUpRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <FinalCTA />

      <style>{`
        .ind-index {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .ind-index-section {
          padding-top: 0;
        }
        .ind-index-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1rem;
        }
        .ind-index-card {
          position: relative;
          padding: 1.75rem;
          border-radius: 20px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          min-height: 200px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .ind-index-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover, var(--accent));
        }
        .ind-index-card-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-muted);
          border: 1px solid var(--border-subtle);
          margin-bottom: 0.25rem;
        }
        .ind-index-card-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }
        .ind-index-card-copy {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .ind-index-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
