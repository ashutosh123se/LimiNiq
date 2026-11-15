"use client";

import Link from "next/link";
import { ArrowRight, Bot, Code2, Globe, Layers, PenTool, Rocket, Smartphone, Sparkles, TrendingUp } from "lucide-react";
import { FlyoutRow, FlyoutShell, type FlyoutRowItem } from "./FlyoutShell";

const CORE_SERVICES: FlyoutRowItem[] = [
  {
    label: "AI Automation & Agents",
    href: "/services/ai-automation",
    description: "Autonomous LLM pipelines & tool calling",
    icon: "Bot",
    tag: "AI",
  },
  {
    label: "Custom Software & SaaS",
    href: "/services/custom-software-saas",
    description: "Production web apps & scalable backends",
    icon: "Code2",
  },
  {
    label: "SaaS MVP Development",
    href: "/services/saas-mvp-development",
    description: "Concept to paying customers in 4 weeks",
    icon: "Rocket",
  },
  {
    label: "Workflow & ERP Automation",
    href: "/services/ai-automation",
    description: "Document OCR, CRM sync & business logic",
    icon: "Layers",
  },
];

const DIGITAL_SERVICES: FlyoutRowItem[] = [
  {
    label: "Website & Headless E-Com",
    href: "/services/website-ecommerce",
    description: "High-speed Next.js storefronts & platforms",
    icon: "Globe",
  },
  {
    label: "Mobile App Engineering",
    href: "/services/mobile-app-development",
    description: "Cross-platform iOS & Android mobile apps",
    icon: "Smartphone",
  },
  {
    label: "UI/UX & Design Systems",
    href: "/services/ui-ux-design-branding",
    description: "Figma-to-code interfaces & product tokens",
    icon: "PenTool",
  },
  {
    label: "Technical SEO & Growth",
    href: "/services/seo-search-engine-marketing",
    description: "Search engine architecture & analytics",
    icon: "TrendingUp",
  },
];

interface MegaMenuProps {
  onNavigate?: () => void;
  className?: string;
}

export function MegaMenu({ onNavigate, className }: MegaMenuProps) {
  return (
    <FlyoutShell
      kicker="Engineering Services"
      title="Production Software & AI Automation"
      chip="8 Disciplines"
      footer={{ label: "View all service specifications & pricing →", href: "/services" }}
      onNavigate={onNavigate}
      className={className}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Column 1: AI & Custom Software */}
        <div>
          <div className="mb-1.5 px-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
              ⚡ AI &amp; Software Architecture
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {CORE_SERVICES.map((item) => (
              <FlyoutRow
                key={item.label}
                item={item}
                onNavigate={onNavigate}
                layoutId="flyout-services-core"
              />
            ))}
          </div>
        </div>

        {/* Column 2: Digital Systems & Scale */}
        <div>
          <div className="mb-1.5 px-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              🚀 Digital Platforms &amp; Scale
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {DIGITAL_SERVICES.map((item) => (
              <FlyoutRow
                key={item.label}
                item={item}
                onNavigate={onNavigate}
                layoutId="flyout-services-digital"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Micro-Banner for Free Audit */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10 px-3.5 py-2 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-sky-300 shrink-0" />
          <span className="text-slate-300 font-medium text-[11.5px]">
            Need a performance or automation audit?
          </span>
        </div>
        <Link
          href="/tools/website-audit"
          onClick={onNavigate}
          className="font-bold text-sky-300 hover:text-white transition-colors text-[11.5px] flex items-center gap-1 shrink-0 ml-2"
        >
          Free 30s Check <ArrowRight size={11} />
        </Link>
      </div>
    </FlyoutShell>
  );
}
