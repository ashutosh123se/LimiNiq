import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Work & Deliveries",
  description:
    "Software platforms, web products, and marketing systems built by LIMINIQ for clients across India — LeadFlow AI, PropSearch, StockSense, and more.",
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
