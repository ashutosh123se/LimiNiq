import { Code2, Globe, TrendingUp, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StartingPriceItem {
  id: string;
  slug: string;
  title: string;
  shortLabel: string;
  startingPrice: string;
  priceNote: string;
  summary: string;
  highlights: string[];
  color: string;
  icon: LucideIcon;
  featured?: boolean;
}

export const STARTING_PRICES: StartingPriceItem[] = [
  {
    id: "software",
    slug: "custom-software-saas",
    title: "Custom Software & SaaS",
    shortLabel: "Software & Systems",
    startingPrice: "₹75,000",
    priceNote: "project · final quote after discovery",
    summary: "Multi-tenant SaaS, ERP/CRM, legacy modernization, and enterprise platforms.",
    highlights: ["SaaS MVP", "Multi-tenant architecture", "API & cloud deployment"],
    color: "#7B61FF",
    icon: Code2,
    featured: true,
  },
  {
    id: "web",
    slug: "website-ecommerce",
    title: "Web & E-commerce",
    shortLabel: "Websites & Stores",
    startingPrice: "₹24,999",
    priceNote: "one-time · depends on scope",
    summary: "High-performance Next.js sites, headless commerce, and conversion-focused storefronts.",
    highlights: ["Next.js / React", "E-commerce", "Core Web Vitals"],
    color: "#3B5BFF",
    icon: Globe,
  },
  {
    id: "seo",
    slug: "seo-search-engine-marketing",
    title: "SEO & Search Marketing",
    shortLabel: "Organic Growth",
    startingPrice: "₹14,999",
    priceNote: "per month · retainer",
    summary: "Technical SEO, content strategy, and authority building for ranked organic traffic.",
    highlights: ["Technical audit", "Content & links", "SaaS SEO programs"],
    color: "#10B981",
    icon: TrendingUp,
  },
  {
    id: "marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortLabel: "Paid Acquisition",
    startingPrice: "₹19,999",
    priceNote: "per month · + ad spend",
    summary: "Google Ads, Meta Ads, and LinkedIn campaigns optimised for leads and ROAS.",
    highlights: ["Google & Meta Ads", "Landing page CRO", "Lead gen funnels"],
    color: "#0EA5E9",
    icon: BarChart3,
  },
];
