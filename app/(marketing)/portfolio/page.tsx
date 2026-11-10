import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies & Engineering Deliveries | AI & SaaS | LIMINIQ",
  description:
    "Explore case studies in AI automation, multi-tenant SaaS, and web platforms built by LIMINIQ for clients across the US, UK, UAE, and Europe — including LeadFlow AI, PropSearch, and StockSense.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="pf-index">
      <PageHero
        eyebrow="Delivery Archive"
        title={
          <>
            Work That <span className="text-gradient">Ships</span>
          </>
        }
        description="Every project below is a real delivery from our studio — software, web, and growth systems built end to end, by the senior team that shipped them."
      >
        <Link href="/contact" className="btn-primary">
          Start a project
        </Link>
      </PageHero>

      <PortfolioGrid />

      <FinalCTA />

      <style>{`
        .pf-index {
          background: var(--bg-primary);
          overflow-x: clip;
        }
      `}</style>
    </div>
  );
}
