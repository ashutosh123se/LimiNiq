"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, BookOpen, Briefcase, Building2, Code2, FileText, Globe, Mail, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import type { NavDropdownItem } from "@/data/navigation";
import { FlyoutRow, FlyoutShell, type FlyoutRowItem } from "./FlyoutShell";

interface NavDropdownProps {
  title?: string;
  items: NavDropdownItem[];
  footer?: { label: string; href: string };
  onNavigate?: () => void;
}

export function NavDropdown({ title, items, footer, onNavigate }: NavDropdownProps) {
  const isWork = title?.toLowerCase().includes("work");
  const isCompany = title?.toLowerCase().includes("company");

  // Custom Work Showcase Layout
  if (isWork) {
    const workItems: FlyoutRowItem[] = [
      {
        label: "LeadFlow AI",
        href: "/portfolio/leadflow-ai",
        description: "Autonomous lead orchestration & scoring · −70% routing time",
        icon: "Bot",
        tag: "FLAGSHIP AI",
      },
      {
        label: "PropSearch Real Estate",
        href: "/portfolio/propsearch-real-estate",
        description: "High-speed property marketplace · 1.1s Mobile LCP",
        icon: "Globe",
        tag: "WEB PLATFORM",
      },
      {
        label: "StockSense Analytics",
        href: "/portfolio/stocksense-analytics",
        description: "Institutional charting & streaming feeds · WebSocket",
        icon: "BarChart3",
        tag: "FINTECH",
      },
      {
        label: "BurgerVerse Global",
        href: "/portfolio/burgerverse",
        description: "Headless social-commerce ordering app",
        icon: "Sparkles",
        tag: "E-COMMERCE",
      },
    ];

    return (
      <FlyoutShell
        kicker="Case Studies & Proof"
        title="Production Deployments & Metrics"
        chip="Verified Impact"
        footer={{ label: "View all 15+ case studies & client outcomes →", href: "/portfolio" }}
        onNavigate={onNavigate}
        className="w-full"
      >
        <div className="grid gap-1">
          {workItems.map((item) => (
            <FlyoutRow
              key={item.label}
              item={item}
              onNavigate={onNavigate}
              layoutId="flyout-work"
            />
          ))}
        </div>
      </FlyoutShell>
    );
  }

  // Custom Company 2-Column Layout
  if (isCompany) {
    const companyTeam: FlyoutRowItem[] = [
      {
        label: "Our Story & Team",
        href: "/about",
        description: "Senior engineering team based in Delhi",
        icon: "BookOpen",
      },
      {
        label: "Industries We Serve",
        href: "/industries",
        description: "SaaS, HealthTech, FinTech & PropTech",
        icon: "Building2",
      },
      {
        label: "Careers & Culture",
        href: "/careers",
        description: "Join our senior engineering craft",
        icon: "Briefcase",
      },
      {
        label: "Contact & Discovery",
        href: "/contact",
        description: "Direct scheduling with lead architects",
        icon: "Mail",
      },
    ];

    const companyResources: FlyoutRowItem[] = [
      {
        label: "12 Free Developer Tools",
        href: "/tools",
        description: "Audits, ROAS calculator & meta preview",
        icon: "Wrench",
        tag: "FREE",
      },
      {
        label: "Engineering Blog",
        href: "/blog",
        description: "Technical notes on AI, Next.js & CWV",
        icon: "FileText",
      },
      {
        label: "IP & Code Ownership",
        href: "/terms-of-service",
        description: "100% code ownership, NDA within 1 hour",
        icon: "ShieldCheck",
      },
    ];

    return (
      <FlyoutShell
        kicker="LIMINIQ"
        title="Engineering Culture & Resources"
        chip="Senior Squad"
        footer={{ label: "Book a discovery call with senior engineers →", href: "/contact" }}
        onNavigate={onNavigate}
        className="w-full"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-2 px-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
                About the Team
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              {companyTeam.map((item) => (
                <FlyoutRow
                  key={item.label}
                  item={item}
                  onNavigate={onNavigate}
                  layoutId="flyout-company-team"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 px-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                Ecosystem &amp; Trust
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              {companyResources.map((item) => (
                <FlyoutRow
                  key={item.label}
                  item={item}
                  onNavigate={onNavigate}
                  layoutId="flyout-company-resources"
                />
              ))}
            </div>
          </div>
        </div>
      </FlyoutShell>
    );
  }

  // Fallback generic dropdown
  return (
    <FlyoutShell
      kicker={title ?? "Explore"}
      title={title ?? "Explore"}
      footer={footer}
      onNavigate={onNavigate}
      className="w-full"
    >
      <ul className="flex max-h-[min(70vh,440px)] flex-col gap-0.5 overflow-y-auto">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <FlyoutRow
              item={item}
              onNavigate={onNavigate}
              layoutId="flyout-generic"
            />
          </li>
        ))}
      </ul>
    </FlyoutShell>
  );
}
