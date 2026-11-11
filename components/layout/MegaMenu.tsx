"use client";

import Link from "next/link";
import { ArrowRight, Bot, Code2, Globe, Layers, PenTool, Rocket, Smartphone, Sparkles, TrendingUp, Zap } from "lucide-react";
import { FlyoutRow, FlyoutShell, type FlyoutRowItem } from "./FlyoutShell";

const CORE_SERVICES: FlyoutRowItem[] = [
  {
    label: "AI Automation & Agents",
    href: "/services/ai-automation",
    description: "Autonomous LLM pipelines, tool calling & lead routing",
    icon: "Bot",
    tag: "POPULAR",
  },
  {
    label: "Custom Software & SaaS",
    href: "/services/custom-software-saas",
    description: "Multi-tenant web applications & scalable cloud APIs",
    icon: "Code2",
  },
  {
    label: "SaaS MVP Development",
    href: "/services/saas-mvp-development",
    description: "Go from concept to paying customers in 4 weeks",
    icon: "Rocket",
  },
  {
    label: "Workflow & ERP Automation",
    href: "/services/ai-automation",
    description: "Document OCR, CRM sync & automated business logic",
    icon: "Layers",
  },
];

const DIGITAL_SERVICES: FlyoutRowItem[] = [
  {
    label: "Website & Headless E-Com",
    href: "/services/website-ecommerce",
    description: "High-conversion Next.js storefronts & platforms",
    icon: "Globe",
  },
  {
    label: "Mobile App Engineering",
    href: "/services/mobile-app-development",
    description: "Cross-platform iOS & Android mobile platforms",
    icon: "Smartphone",
  },
  {
    label: "UI/UX & Design Systems",
    href: "/services/ui-ux-design-branding",
    description: "High-velocity product interfaces & design tokens",
    icon: "PenTool",
  },
  {
    label: "Technical SEO & Growth",
    href: "/services/seo-search-engine-marketing",
    description: "Organic search engine architecture & analytics",
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
      kicker="Services & Engineering"
      title="Production Software & AI Automation"
      chip="150+ Shipped"
      footer={{ label: "View all 10 engineering disciplines →", href: "/services" }}
      onNavigate={onNavigate}
      className={className}
    >
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Column 1: Core AI & Custom Software */}
        <div className="lg:col-span-4">
          <div className="mb-2 px-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
              ⚡ Core AI &amp; Software
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

        {/* Column 2: Digital Systems & Growth */}
        <div className="lg:col-span-4">
          <div className="mb-2 px-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              🚀 Digital Systems &amp; Scale
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

        {/* Column 3: Interactive Featured Assessment Card */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-white/12 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-black/40 p-4 backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-500/15 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-sky-200">
                <Sparkles size={11} className="text-sky-300" />
                Free Lead Magnet
              </span>
              <span className="font-mono text-[10px] text-emerald-400 font-bold">● Instant</span>
            </div>

            <h4 className="mt-3 text-sm font-bold text-white">
              Website &amp; Automation Audit
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300/80">
              Evaluate your site speed, Core Web Vitals, SEO, and identify manual workflows that can be cut by 50%+.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            <Link
              href="/tools/website-audit"
              onClick={onNavigate}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Run Free 30s Audit</span>
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              Senior engineering review • No obligation
            </p>
          </div>
        </div>
      </div>
    </FlyoutShell>
  );
}
