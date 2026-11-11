export interface TeamMember {
  name: string;
  role: string;
  photoSrc: string;
  experience: string;
  specialties: string[];
  linkedinUrl?: string;
  bio: string;
  quote: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Ashutosh Shekhar",
    role: "Founder & CEO",
    experience: "7+ years experience",
    specialties: ["Product Strategy", "SaaS Architecture", "Client Delivery"],
    // TODO: Add verified personal LinkedIn URL once provided by founder
    photoSrc: "/images/team/ashutosh.png",
    bio: "Founder and CEO of LIMINIQ. Sets product direction, international client strategy, and the benchmark for engineering execution across software and AI automation contracts since 2019.",
    quote: "Ship systems that compound — code and pipeline together.",
  },
  {
    name: "Ayush Shekhar",
    role: "Technical Head & Architect",
    experience: "6+ years experience",
    specialties: ["Next.js & React", "Autonomous LLM Agents", "PostgreSQL & Cloud"],
    // TODO: Add verified personal LinkedIn URL once provided by founder
    photoSrc: "/images/team/ayush.png",
    bio: "Leads systems architecture and engineering for SaaS, AI agents, and enterprise cloud infrastructure. Obsessed with clean APIs, low latency, and zero-compromise security.",
    quote: "If it isn't maintainable in six months, it isn't done.",
  },
  {
    name: "Akanksha Singh",
    role: "Head of Growth & Search",
    experience: "5+ years experience",
    specialties: ["Technical SEO", "Conversion Rate Optimization (CRO)", "Paid Funnels"],
    // TODO: Add verified personal LinkedIn URL once provided by founder
    photoSrc: "/images/team/akanksha.jpg",
    bio: "Directs programmatic SEO, paid performance funnels, and data attribution. Transforms product launches into compounding pipelines with verifiable analytics.",
    quote: "Creative without measurement is just decoration.",
  },
  {
    name: "Aman Kumar",
    role: "Head of Design & Motion",
    experience: "5+ years experience",
    specialties: ["Design Systems", "Interactive UI", "Brand Motion"],
    // TODO: Add verified personal LinkedIn URL once provided by founder
    photoSrc: "/images/team/aman.png",
    bio: "Crafts design systems, micro-interactions, and motion design that make digital products feel fluid and premium without sacrificing Core Web Vitals.",
    quote: "Motion should clarify hierarchy — never distract from it.",
  },
];
