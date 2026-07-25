export interface TeamMember {
  name: string;
  role: string;
  photoSrc: string;
  bio: string;
  quote: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Ashutosh Shekhar",
    role: "CEO",
    photoSrc: "/images/team/ashutosh.jpg",
    bio: "Founder and CEO of LIMINIQ. Sets product direction, client strategy, and the standard for delivery quality across software and growth engagements since 2019.",
    quote: "Ship systems that compound — code and pipeline together.",
  },
  {
    name: "Ayush Shekhar",
    role: "Technical Head",
    photoSrc: "/images/team/ayush.jpg",
    bio: "Leads architecture and engineering for SaaS, web, and cloud builds. Obsessed with clean APIs, performance, and production-grade foundations.",
    quote: "If it isn't maintainable in six months, it isn't done.",
  },
  {
    name: "Akanksha Singh",
    role: "Marketing Head",
    photoSrc: "/images/team/akanksha.jpg",
    bio: "Owns SEO, paid acquisition, and growth strategy. Turns product launches into measurable pipelines with transparent reporting.",
    quote: "Creative without measurement is just decoration.",
  },
  {
    name: "Aman Kumar",
    role: "Animation Head",
    photoSrc: "/images/team/aman.jpg",
    bio: "Crafts motion, brand animation, and interaction design that make products feel premium without sacrificing performance.",
    quote: "Motion should clarify hierarchy — never distract from it.",
  },
];
