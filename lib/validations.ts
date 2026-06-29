import { z } from "zod";

// ── Lead / Contact ──────────────────────────────────────────
export const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  services: z.array(z.string()).min(1),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  source: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
  page_url: z.string().optional(),
  session_duration: z.number().optional(),
  pages_visited: z.array(z.string()).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export const auditRequestSchema = z.object({
  email: z.string().email(),
  website: z.string().url().optional(),
  name: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

// ── Blog ─────────────────────────────────────────────────────
export const pollOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(120),
  votes: z.number().int().min(0).default(0),
});

export const blogPostSchema = z.object({
  title: z.string().min(5).max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(1),
  category: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  author: z.string().min(2),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  metaTitle: z.string().max(70).optional(),
  metaDesc: z.string().max(160).optional(),
  postType: z.enum(["ARTICLE", "POLL"]).default("ARTICLE"),
  trending: z.boolean().default(false),
  pollOptions: z.array(pollOptionSchema).optional(),
  pollEndsAt: z.string().datetime().optional().nullable(),
});

export const trendingTopicSchema = z.object({
  label: z.string().min(2).max(80),
  description: z.string().max(200).optional(),
  emoji: z.string().max(4).optional(),
  color: z.string().max(20).default("#3B5BFF"),
  href: z.string().url().optional().or(z.literal("")),
  active: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const pollVoteSchema = z.object({
  optionId: z.string().min(1),
});

// ── Admin ─────────────────────────────────────────────────────
export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const adminPasswordResetSchema = z.object({
  password: z.string().min(8).max(128),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// ── Lead update ───────────────────────────────────────────────
export const leadUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "CONVERTED", "LOST", "ARCHIVED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
  followUpDate: z.string().datetime().optional(),
});

export const activitySchema = z.object({
  type: z.string().min(1),
  note: z.string().min(1).max(1000),
});

// ── Portfolio ─────────────────────────────────────────────────
export const portfolioItemSchema = z.object({
  title: z.string().min(3).max(200),
  client: z.string().min(2).max(100),
  category: z.string().min(1),
  description: z.string().min(20),
  metrics: z.record(z.string()),
  coverImage: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;
