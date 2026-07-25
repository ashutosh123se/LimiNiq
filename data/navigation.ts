export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: true },
  { label: "Work", href: "/portfolio" },
  { label: "Industries", href: "/industries" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
] as const;

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
