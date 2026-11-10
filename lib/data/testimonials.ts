export interface TestimonialData {
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  service: string;
  avatar?: string | null;
  active?: boolean;
}

/** Standardized client testimonials for schema and database seed. */
export const TESTIMONIALS: TestimonialData[] = [
  {
    name: "Deepak Nair",
    company: "CloudStack IT",
    role: "VP of Engineering",
    quote:
      "LIMINIQ architected our multi-tenant SaaS from scratch — clean codebase, secure APIs, and we shipped two weeks ahead of schedule.",
    rating: 5,
    service: "Custom Software",
    active: true,
  },
  {
    name: "Marcus Vance",
    company: "ApexFlow Technologies",
    role: "CRO",
    quote:
      "Their autonomous LLM lead triage system reduced our sales team's manual qualification time by over 70%. Inbound prospects now get routed and scheduled in under 30 seconds.",
    rating: 5,
    service: "AI Automation",
    active: true,
  },
  {
    name: "Arjun Kapoor",
    company: "LearnSphere EdTech",
    role: "Founder",
    quote:
      "Meta & Google ROAS went from 1.2x to 4.8x in eight weeks. Structured campaign architecture and creative testing delivered immense pipeline growth.",
    rating: 5,
    service: "Digital Marketing",
    active: true,
  },
  {
    name: "Tariq Al-Mansoor",
    company: "PropSearch Middle East",
    role: "Managing Director",
    quote:
      "We needed a production-grade proptech listing platform with instant faceted search on mobile. LIMINIQ delivered on a strict milestone contract with complete code handover.",
    rating: 5,
    service: "Web & E-commerce",
    active: true,
  },
  {
    name: "Priya Sharma",
    company: "HealthFirst Clinics",
    role: "Marketing Director",
    quote:
      "We rank #1 for 45 high-intent keywords and patient inquiries doubled in six months. Transparent reporting and a team that genuinely understands healthcare SEO.",
    rating: 5,
    service: "SEO & SEM",
    active: true,
  },
  {
    name: "Sarah Lindqvist",
    company: "Nordic StyleHub",
    role: "Head of Digital Commerce",
    quote:
      "Our Next.js storefront loads in under 0.8s on 4G and checkout abandonment dropped 40%. The technical precision exceeded our European agency benchmarks.",
    rating: 4.8,
    service: "Web & E-commerce",
    active: true,
  },
];

export const TESTIMONIAL_SERVICES = [
  "Custom Software",
  "AI Automation",
  "Digital Marketing",
  "SEO & SEM",
  "Web & E-commerce",
] as const;

export const MIN_TESTIMONIAL_RATING = 4;

export function clampTestimonialRating(rating: number): number {
  const value = Number(rating) || 5;
  return Math.min(5, Math.max(MIN_TESTIMONIAL_RATING, value));
}
