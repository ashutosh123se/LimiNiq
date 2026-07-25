export interface Testimonial {
  id: string;
  name: string;
  timeAgo: string;
  quote: string;
  serviceTag: string;
  roleCompany: string;
  rating?: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "deepak-nair",
    name: "Deepak Nair",
    timeAgo: "1 week ago",
    quote:
      "LIMINIQ architected our multi-tenant SaaS from scratch — clean codebase, secure APIs, and we shipped two weeks ahead of schedule.",
    serviceTag: "Custom Software",
    roleCompany: "CTO, CloudStack IT",
    rating: 5,
  },
  {
    id: "arjun-kapoor",
    name: "Arjun Kapoor",
    timeAgo: "2 weeks ago",
    quote:
      "Meta ROAS went from 1.2x to 4.8x in eight weeks. Strong campaign structure and creative testing — onboarding took a little longer than expected.",
    serviceTag: "Digital Marketing",
    roleCompany: "Founder, LearnSphere EdTech",
    rating: 4.5,
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    timeAgo: "3 weeks ago",
    quote:
      "We rank #1 for 45 high-intent keywords and patient inquiries doubled in six months. Transparent reporting and a team that actually understands healthcare SEO.",
    serviceTag: "SEO & SEM",
    roleCompany: "Marketing Director, HealthFirst Clinics",
    rating: 5,
  },
  {
    id: "tanvi-choudhary",
    name: "Tanvi Choudhary",
    timeAgo: "1 month ago",
    quote:
      "Our Next.js storefront loads in under 0.8s and cart abandonment fell 40%. Minor post-launch polish took an extra week, but the core build is excellent.",
    serviceTag: "Web & E-commerce",
    roleCompany: "E-Commerce Head, StyleHub Fashion",
    rating: 4.5,
  },
  {
    id: "karan-desai",
    name: "Karan Desai",
    timeAgo: "5 weeks ago",
    quote:
      "The React Native app feels native on iOS and Android and push engagement is up 60%. Solid delivery — we refined the onboarding flow together after launch.",
    serviceTag: "Mobile Apps",
    roleCompany: "Product Lead, FitTrack Health",
    rating: 5,
  },
  {
    id: "neha-reddy",
    name: "Neha Reddy",
    timeAgo: "2 months ago",
    quote:
      "Their design system and prototypes helped us close our Series A. Polished UI, clear user flows, and a brand identity that finally matches our product quality.",
    serviceTag: "UI/UX Design",
    roleCompany: "Head of Product, Finova Capital",
    rating: 5,
  },
  {
    id: "imran-khan",
    name: "Imran Khan",
    timeAgo: "6 weeks ago",
    quote:
      "Social creatives and pitch decks look premium and on-brand. Fast turnaround on ad sets — we went through one extra revision round on the launch kit.",
    serviceTag: "Graphic Design",
    roleCompany: "Brand Manager, Pulse Beverages",
    rating: 4.5,
  },
  {
    id: "lakshmi-venkat",
    name: "Lakshmi Venkat",
    timeAgo: "3 months ago",
    quote:
      "Blog and landing-page copy lifted our domain authority within a quarter. Early drafts needed light edits, but the SEO direction and tone were exactly right.",
    serviceTag: "Content & Copy",
    roleCompany: "Content Lead, SaaS Metrics Co.",
    rating: 4.5,
  },
  {
    id: "amit-bhattacharya",
    name: "Amit Bhattacharya",
    timeAgo: "1 month ago",
    quote:
      "Custom LLM chatbot and workflow automations cut support tickets by 35%. Cloud migration was smooth with a brief planned maintenance window — well communicated.",
    serviceTag: "AI & Cloud",
    roleCompany: "Operations Director, LogiFlow Systems",
    rating: 5,
  },
];

export function getTestimonialById(id: string) {
  return TESTIMONIALS.find((t) => t.id === id);
}
