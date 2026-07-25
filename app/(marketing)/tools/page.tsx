import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ToolsGrid } from "@/components/tools/ToolsGrid";
import { TOOLS } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Marketing & Developer Tools",
  description:
    "12 free tools from LIMINIQ — website audits, ROAS calculator, meta tag previewer, favicon and QR generators, invoice generator, JSON formatter, and more.",
  path: "/tools",
});

const CATEGORIES = Array.from(new Set(TOOLS.map((tool) => tool.category)));

export default function ToolsPage() {
  return (
    <div className="tools-index">
      <PageHero
        eyebrow="Free Tools"
        title={
          <>
            Tools built by people who
            <br />
            <span className="text-gradient">ship, not just consult.</span>
          </>
        }
        description="Twelve free utilities for marketing, SEO, and everyday dev work — no signup, no email gate, no watermark."
      />

      <section className="section-container section-padding tools-index-section">
        <ToolsGrid tools={TOOLS} categories={CATEGORIES} />
      </section>

      <FinalCTA />

      <style>{`
        .tools-index {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .tools-index-section {
          padding-top: 0;
        }
      `}</style>
    </div>
  );
}
