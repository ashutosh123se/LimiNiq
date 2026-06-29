export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface TrendingTopicItem {
  id: string;
  label: string;
  slug: string;
  description?: string;
  emoji?: string;
  color: string;
  href?: string;
}

export const FALLBACK_TRENDING_TOPICS: TrendingTopicItem[] = [
  { id: "1", label: "Custom SaaS MVPs", slug: "custom-saas", emoji: "🚀", color: "#7B61FF", description: "Building lean SaaS products in 2026" },
  { id: "2", label: "AI in Marketing", slug: "ai-marketing", emoji: "✨", color: "#00C8A0", description: "How teams use AI for ROAS" },
  { id: "3", label: "Technical SEO", slug: "technical-seo", emoji: "📈", color: "#3B5BFF", description: "Crawl, index, rank" },
  { id: "4", label: "Next.js Performance", slug: "nextjs-perf", emoji: "⚡", color: "#F59E0B", description: "Core Web Vitals wins" },
  { id: "5", label: "Headless Commerce", slug: "headless-commerce", emoji: "🛒", color: "#EC4899", description: "Composable storefronts" },
];

export const FALLBACK_POLLS = [
  {
    id: "poll-1",
    slug: "biggest-growth-priority-2026",
    title: "What's your #1 growth priority in 2026?",
    excerpt: "Cast your vote — see what other founders and marketers are prioritising this year.",
    category: "Insights",
    author: "LIMINIQ Team",
    postType: "POLL" as const,
    pollOptions: [
      { id: "opt-1", label: "Custom software / SaaS product", votes: 42 },
      { id: "opt-2", label: "SEO & organic traffic", votes: 38 },
      { id: "opt-3", label: "Paid ads & performance marketing", votes: 29 },
      { id: "opt-4", label: "Website redesign / conversion", votes: 24 },
    ],
  },
];
