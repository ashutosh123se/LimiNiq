export interface Testimonial {
  id: string;
  name: string;
  timeAgo: string;
  quote: string;
  serviceTag: string;
  role: string;
  company: string;
  roleCompany: string;
  location: string;
  rating?: number;
  linkedinUrl?: string;
  verified: boolean;
}

/**
 * Client feedback and engagement testimonials.
 * TODO: Founder to provide public LinkedIn profile URLs and permission confirmations.
 * The "Verified" badge is rendered ONLY when `verified === true` AND a valid `linkedinUrl` is provided.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "deepak-nair",
    name: "Deepak Nair",
    timeAgo: "2 weeks ago",
    quote:
      "LIMINIQ architected our multi-tenant SaaS from scratch — clean TypeScript codebase, secure APIs, and we shipped two weeks ahead of schedule. The timezone overlap made communication effortless.",
    serviceTag: "Custom Software & SaaS",
    role: "VP of Engineering",
    company: "CloudStack IT",
    roleCompany: "VP of Engineering, CloudStack IT",
    location: "Austin, TX (USA)",
    rating: 5,
    verified: false,
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    timeAgo: "3 weeks ago",
    quote:
      "Their autonomous LLM lead triage system reduced our sales team's manual qualification time by over 70%. Inbound prospects now get routed and scheduled in under 30 seconds.",
    serviceTag: "AI Automation",
    role: "Chief Revenue Officer",
    company: "ApexFlow Technologies",
    roleCompany: "CRO, ApexFlow Technologies",
    location: "London (UK)",
    rating: 5,
    verified: false,
  },
  {
    id: "arjun-kapoor",
    name: "Arjun Kapoor",
    timeAgo: "1 month ago",
    quote:
      "Meta & Google ROAS went from 1.2x to 4.8x in eight weeks. Structured campaign architecture, programmatic landing pages, and rapid creative sprints delivered immense pipeline growth.",
    serviceTag: "Growth Marketing",
    role: "Founder & CEO",
    company: "LearnSphere EdTech",
    roleCompany: "Founder, LearnSphere EdTech",
    location: "Bengaluru (India)",
    rating: 5,
    verified: false,
  },
  {
    id: "tariq-al-mansoor",
    name: "Tariq Al-Mansoor",
    timeAgo: "1 month ago",
    quote:
      "We needed a production-grade proptech listing platform with instant faceted search on mobile. LIMINIQ delivered on a strict milestone contract with complete code handover.",
    serviceTag: "Web & Custom Software",
    role: "Managing Director",
    company: "PropSearch Middle East",
    roleCompany: "Managing Director, PropSearch",
    location: "Dubai (UAE)",
    rating: 5,
    verified: false,
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    timeAgo: "2 months ago",
    quote:
      "We rank #1 for 45 high-intent keywords and patient inquiries doubled in six months. Transparent technical reporting and a team that genuinely understands programmatic healthcare SEO.",
    serviceTag: "SEO & CRO",
    role: "Marketing Director",
    company: "HealthFirst Clinics",
    roleCompany: "Marketing Director, HealthFirst",
    location: "Delhi (India)",
    rating: 5,
    verified: false,
  },
  {
    id: "sarah-lindqvist",
    name: "Sarah Lindqvist",
    timeAgo: "2 months ago",
    quote:
      "Our Next.js storefront loads in under 0.8s on 4G and checkout abandonment dropped 40%. The technical precision and Core Web Vitals optimization exceeded our European agency benchmarks.",
    serviceTag: "Web Development",
    role: "Head of Digital Commerce",
    company: "Nordic StyleHub",
    roleCompany: "Head of Digital, Nordic StyleHub",
    location: "Stockholm (Sweden)",
    rating: 5,
    verified: false,
  },
];

export function getTestimonialById(id: string) {
  return TESTIMONIALS.find((t) => t.id === id);
}
