export interface FAQ {
  question: string;
  answer: string;
  page: "home" | "services" | "pricing" | string;
}

export const FAQS: FAQ[] = [
  {
    question: "What is LIMINIQ and what services does it offer?",
    answer:
      "LIMINIQ is India's software-led agency founded in 2019. We build custom software and SaaS, websites and e-commerce, mobile apps, UI/UX and branding, plus SEO, digital marketing, content, and AI/automation/cloud solutions.",
    page: "home",
  },
  {
    question: "Where is LIMINIQ located and who do you work with?",
    answer:
      "We are based in Paschim Vihar, Delhi 110063, India, and work with startups and growing brands across SaaS, healthcare, edtech, real estate, e-commerce, fintech, hospitality, and B2B services — serving clients globally.",
    page: "home",
  },
  {
    question: "How much does a custom software or SaaS project cost?",
    answer:
      "Custom software and SaaS engagements start from ₹75,000 per project. Final quotes are scoped after a free discovery call based on complexity, integrations, and timeline.",
    page: "pricing",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope. Lean SaaS MVPs and marketing sites can ship in weeks; larger multi-tenant platforms and full growth retainers run on milestone schedules agreed during discovery.",
    page: "services",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer post-launch support, SEO/marketing retainers, and continuous optimization so products keep compounding after go-live.",
    page: "services",
  },
  {
    question: "What industries does LIMINIQ specialize in?",
    answer:
      "We work across SaaS/startups, healthcare, edtech, real estate/proptech, e-commerce/D2C, fintech, hospitality/food, and professional B2B services — with case studies and reviews tied to those verticals.",
    page: "home",
  },
  {
    question: "How do I start a project with LIMINIQ?",
    answer:
      "Book a free audit and strategy session via the contact form or WhatsApp (+91 9431471654). We review fit and goals, run a site/product snapshot, and share a prioritized growth roadmap — no pressure pitch.",
    page: "home",
  },
  {
    question: "What makes LIMINIQ different from other agencies?",
    answer:
      "We abandoned the traditional agency model for a boutique, senior-led delivery culture: software and SaaS at the core, backed by data-driven marketing. You own the code, pricing is transparent, and we optimize for measurable ROI.",
    page: "home",
  },
];

export function faqsForPage(page: string) {
  return FAQS.filter((f) => f.page === page || f.page === "home");
}
