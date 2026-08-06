import { CASE_STUDIES } from "@/data/caseStudies";
import { INDUSTRIES } from "@/data/industries";
import { TOOLS } from "@/data/tools";

export type NavDropdownItem = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export type NavLink = {
  label: string;
  href: string;
  /** Full-width services mega panel */
  mega?: boolean;
  /** Compact flyout submenu */
  dropdown?: {
    title?: string;
    items: NavDropdownItem[];
    footer?: { label: string; href: string };
  };
};

/** Slim primary nav — extra destinations live in Company / Services. */
export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services", mega: true },
  {
    label: "Work",
    href: "/portfolio",
    dropdown: {
      title: "Selected work",
      items: CASE_STUDIES.slice(0, 5).map((c) => ({
        label: c.title,
        href: `/portfolio/${c.slug}`,
        description: c.category,
        icon: c.category === "Software" ? "Code2" : c.category === "Web" ? "Globe" : "BarChart3",
      })),
      footer: { label: "View full archive →", href: "/portfolio" },
    },
  },
  {
    label: "Company",
    href: "/about",
    dropdown: {
      title: "Company",
      items: [
        { label: "About", href: "/about", description: "Founded 2019 · Delhi", icon: "BookOpen" },
        { label: "Industries", href: "/industries", description: "Who we build for", icon: "Building2" },
        { label: "Free tools", href: "/tools", description: "12 utilities", icon: "Wrench" },
        { label: "Blog", href: "/blog", description: "Notes from the lab", icon: "FileText" },
        { label: "Careers", href: "/careers", description: "Join the craft", icon: "Briefcase" },
        { label: "Contact", href: "/contact", description: "Reply within 24h", icon: "Mail" },
      ],
    },
  },
  { label: "Pricing", href: "/pricing" },
];

/** Full link set for mobile drawer (every destination still reachable). */
export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: true },
  {
    label: "Work",
    href: "/portfolio",
    dropdown: {
      title: "Selected work",
      items: CASE_STUDIES.slice(0, 6).map((c) => ({
        label: c.title,
        href: `/portfolio/${c.slug}`,
        description: c.category,
        icon: c.category === "Software" ? "Code2" : c.category === "Web" ? "Globe" : "BarChart3",
      })),
      footer: { label: "View full archive →", href: "/portfolio" },
    },
  },
  {
    label: "Industries",
    href: "/industries",
    dropdown: {
      title: "Who we build for",
      items: INDUSTRIES.map((i) => ({
        label: i.name,
        href: `/industries/${i.slug}`,
        description: i.heroCopy.slice(0, 64) + "…",
        icon: "Building2",
      })),
      footer: { label: "All industries →", href: "/industries" },
    },
  },
  {
    label: "Tools",
    href: "/tools",
    dropdown: {
      title: "Free tools",
      items: TOOLS.slice(0, 6).map((t) => ({
        label: t.name,
        href: `/tools/${t.slug}`,
        description: t.category,
        icon: "Wrench",
      })),
      footer: { label: "Browse all 12 tools →", href: "/tools" },
    },
  },
  {
    label: "About",
    href: "/about",
    dropdown: {
      title: "Company",
      items: [
        { label: "Our story", href: "/about", description: "Founded 2019 · Delhi", icon: "BookOpen" },
        { label: "The team", href: "/about#team", description: "Builders & strategists", icon: "Users" },
        { label: "Careers", href: "/careers", description: "Join the craft", icon: "Briefcase" },
        { label: "Contact", href: "/contact", description: "Reply within 24h", icon: "Mail" },
      ],
    },
  },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export const MEGA_MENU = {
  columns: [
    {
      title: "Software & SaaS",
      items: [
        { label: "Custom Software & SaaS Development", href: "/services/custom-software-saas", icon: "Code2" },
        { label: "SaaS MVP Development", href: "/services/saas-mvp-development", icon: "Rocket" },
        { label: "Enterprise Web Portals", href: "/services/custom-software-saas", icon: "LayoutDashboard" },
        { label: "Legacy System Modernization", href: "/services/custom-software-saas", icon: "RefreshCw" },
        { label: "Custom ERP & CRM Solutions", href: "/services/custom-software-saas", icon: "Database" },
      ],
    },
    {
      title: "Web & Commerce",
      items: [
        { label: "Website & E-commerce Development", href: "/services/website-ecommerce", icon: "Globe" },
        { label: "Next.js / React Builds", href: "/services/website-ecommerce", icon: "Component" },
        { label: "Website Redesign", href: "/services/website-ecommerce", icon: "Paintbrush" },
        { label: "Website Maintenance", href: "/services/website-ecommerce", icon: "Wrench" },
      ],
    },
    {
      title: "Mobile & Design",
      items: [
        { label: "Mobile App Development", href: "/services/mobile-app-development", icon: "Smartphone" },
        { label: "UI/UX Design & Branding", href: "/services/ui-ux-design-branding", icon: "PenTool" },
        { label: "Graphic Design & Creative", href: "/services/graphic-design-creative", icon: "Palette" },
      ],
    },
    {
      title: "Marketing & Growth",
      items: [
        { label: "Digital Marketing", href: "/services/digital-marketing", icon: "BarChart3" },
        { label: "SEO & Search Engine Marketing", href: "/services/seo-search-engine-marketing", icon: "TrendingUp" },
        { label: "Content Creation & Copywriting", href: "/services/content-creation", icon: "FileText" },
        { label: "AI, Automation & Cloud Solutions", href: "/services/ai-automation-cloud", icon: "Cpu" },
      ],
    },
  ],
  footerCta: { label: "All services →", href: "/services" },
  promo: { stat: "150+ Projects Delivered", cta: "Start a project →", href: "/contact" },
} as const;

export const FOOTER_SERVICES = [
  { label: "Website & E-commerce", href: "/services/website-ecommerce" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "SaaS Development", href: "/services/custom-software-saas" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "SEO Services", href: "/services/seo-search-engine-marketing" },
];

export const FOOTER_COMPANY = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const WHATSAPP_URL =
  "https://wa.me/919431471654?text=" +
  encodeURIComponent("Hi LIMINIQ, I have a question about my project.");
