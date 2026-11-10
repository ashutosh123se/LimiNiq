export interface FAQ {
  question: string;
  answer: string;
  page: "home" | "services" | "pricing" | string;
}

export const FAQS: FAQ[] = [
  {
    question: "What does LIMINIQ do and what is your core specialty?",
    answer:
      "LIMINIQ is an engineering-first AI automation and custom software development company. We specialize in building autonomous AI agent workflows, SaaS platforms, high-performance web applications, and mission-critical cloud integrations that cut operational work by 50%+.",
    page: "home",
  },
  {
    question: "How do you work with international clients across different timezones?",
    answer:
      "We regularly collaborate with clients across North America (EST/PST), the United Kingdom (GMT), Europe (CET), and the Middle East (GST). Our senior engineers maintain 4 to 6 hours of synchronous daily overlap for standups, architecture reviews, and sprint demos, paired with transparent asynchronous communication in Slack and Linear.",
    page: "home",
  },
  {
    question: "How much does an AI automation or custom software project cost?",
    answer:
      "Scoped automation pipelines typically start from $2,500 (or ₹1,25,000), custom SaaS platforms from $5,000 (or ₹2,50,000), and rapid 4-week MVP sprints from $3,500 (or ₹1,75,000). We also provide dedicated senior engineering pods starting at $2,000/month. Exact investments are locked in writing with a milestone-based Statement of Work (SOW) after a free technical discovery call.",
    page: "pricing",
  },
  {
    question: "What currencies and payment methods do you accept?",
    answer:
      "We accept international payments in USD, GBP, EUR, AUD, CAD, and INR. Clients can pay via Stripe (credit/debit cards), Wise, bank wire transfers (SWIFT, ACH, SEPA), or PayPal with clear milestone-gated invoices.",
    page: "pricing",
  },
  {
    question: "Do I own 100% of the code and intellectual property?",
    answer:
      "Yes, completely. You retain full, unencumbered ownership of all source code, models, database schemas, architectural blueprints, and cloud configurations upon final milestone signoff. We sign a comprehensive IP assignment agreement as part of our Master Services Agreement.",
    page: "pricing",
  },
  {
    question: "How long does a typical project take to ship?",
    answer:
      "Focused AI automation workflows and rapid SaaS MVPs typically ship in 3 to 6 weeks. Larger enterprise platforms and multi-tenant systems run in 2-week agile sprints over 8 to 14 weeks with continuous staging demos.",
    page: "services",
  },
  {
    question: "Do you offer post-launch support and maintenance SLAs?",
    answer:
      "Yes. Every custom software project includes a 30 to 60-day post-launch warranty with zero-cost bug fixes. We also offer ongoing engineering retainers covering model monitoring, vector database tuning, security patches, and guaranteed 4-hour SLA response times.",
    page: "services",
  },
  {
    question: "How do we get started?",
    answer:
      "Schedule a 30-minute technical discovery call with our senior architects or submit a project brief. We will review your goals, conduct an initial feasibility assessment, and deliver a clear milestone roadmap within 24 to 48 hours — with zero sales pressure.",
    page: "home",
  },
];

export function faqsForPage(page: string) {
  return FAQS.filter((f) => f.page === page || f.page === "home");
}
