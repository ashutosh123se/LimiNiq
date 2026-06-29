export interface TestimonialData {
  name: string
  company: string
  role: string
  quote: string
  rating: number
  service: string
  avatar?: string | null
  active?: boolean
}

/** One client profile per service — ratings vary between 4 and 5 only. */
export const TESTIMONIALS: TestimonialData[] = [
  {
    name: 'Deepak Nair',
    company: 'CloudStack IT',
    role: 'CTO',
    quote:
      'LIMINIQ architected our multi-tenant SaaS from scratch — clean codebase, secure APIs, and we shipped two weeks ahead of schedule.',
    rating: 5,
    service: 'Custom Software',
  },
  {
    name: 'Arjun Kapoor',
    company: 'LearnSphere EdTech',
    role: 'Founder',
    quote:
      "Meta ROAS went from 1.2x to 4.8x in eight weeks. Strong campaign structure and creative testing — onboarding took a little longer than expected.",
    rating: 4.5,
    service: 'Digital Marketing',
  },
  {
    name: 'Priya Sharma',
    company: 'HealthFirst Clinics',
    role: 'Marketing Director',
    quote:
      "We rank #1 for 45 high-intent keywords and patient inquiries doubled in six months. Transparent reporting and a team that actually understands healthcare SEO.",
    rating: 5,
    service: 'SEO & SEM',
  },
  {
    name: 'Tanvi Choudhary',
    company: 'StyleHub Fashion',
    role: 'E-Commerce Head',
    quote:
      'Our Next.js storefront loads in under 0.8s and cart abandonment fell 40%. Minor post-launch polish took an extra week, but the core build is excellent.',
    rating: 4.5,
    service: 'Web & E-commerce',
  },
  {
    name: 'Karan Desai',
    company: 'FitTrack Health',
    role: 'Product Lead',
    quote:
      'The React Native app feels native on iOS and Android and push engagement is up 60%. Solid delivery — we refined the onboarding flow together after launch.',
    rating: 4,
    service: 'Mobile Apps',
  },
  {
    name: 'Neha Reddy',
    company: 'Finova Capital',
    role: 'Head of Product',
    quote:
      'Their design system and prototypes helped us close our Series A. Polished UI, clear user flows, and a brand identity that finally matches our product quality.',
    rating: 5,
    service: 'UI/UX Design',
  },
  {
    name: 'Imran Khan',
    company: 'Pulse Beverages',
    role: 'Brand Manager',
    quote:
      'Social creatives and pitch decks look premium and on-brand. Fast turnaround on ad sets — we went through one extra revision round on the launch kit.',
    rating: 4,
    service: 'Graphic Design',
  },
  {
    name: 'Lakshmi Venkat',
    company: 'SaaS Metrics Co.',
    role: 'Content Lead',
    quote:
      'Blog and landing-page copy lifted our domain authority within a quarter. Early drafts needed light edits, but the SEO direction and tone were exactly right.',
    rating: 4,
    service: 'Content & Copy',
  },
  {
    name: 'Amit Bhattacharya',
    company: 'LogiFlow Systems',
    role: 'Operations Director',
    quote:
      'Custom LLM chatbot and workflow automations cut support tickets by 35%. Cloud migration was smooth with a brief planned maintenance window — well communicated.',
    rating: 4.5,
    service: 'AI & Cloud',
  },
]

export const TESTIMONIAL_SERVICES = [
  'Custom Software',
  'Digital Marketing',
  'SEO & SEM',
  'Web & E-commerce',
  'Mobile Apps',
  'UI/UX Design',
  'Graphic Design',
  'Content & Copy',
  'AI & Cloud',
] as const

export const MIN_TESTIMONIAL_RATING = 4

export function clampTestimonialRating(rating: number): number {
  const value = Number(rating) || 5
  return Math.min(5, Math.max(MIN_TESTIMONIAL_RATING, value))
}
