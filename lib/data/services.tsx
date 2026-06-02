import React from 'react'
import { Globe, Smartphone, Code2, PenTool, Palette, BarChart3, TrendingUp, FileText, Video, Cpu } from "lucide-react";

export interface ServiceData {
  id: string
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  icon: React.ReactNode
  description: string
  features: string[]
  process: { title: string, desc: string }[]
  coverImage: string
  color: string
}

export const SERVICES: ServiceData[] = [
  {
    id: 'web-development',
    slug: 'website-ecommerce',
    title: 'Website & E-commerce Development',
    shortTitle: 'Web & E-commerce',
    subtitle: "Custom-built, high-performance web applications and e-commerce platforms that convert visitors into customers.",
    icon: <Globe size={24} strokeWidth={1.5} />,
    description: "We don't just build websites; we engineer digital experiences. Our development process prioritizes speed, security, and scalability, ensuring your platform performs flawlessly under pressure while delivering an intuitive user journey.",
    features: [
      "Custom React / Next.js Applications",
      "Headless CMS Integration",
      "E-commerce Platforms (Shopify, Custom)",
      "Progressive Web Apps (PWAs)",
      "API Development & Integration",
      "Performance Optimization (Core Web Vitals)",
    ],
    process: [
      { title: "Discovery", desc: "Understanding your business goals and technical requirements." },
      { title: "Architecture", desc: "Planning the tech stack, database schema, and system flow." },
      { title: "Development", desc: "Agile sprints with weekly deliverables and transparent progress." },
      { title: "Testing", desc: "Rigorous QA across devices, browsers, and load conditions." },
      { title: "Deployment", desc: "Seamless launch with zero downtime and continuous integration." },
    ],
    coverImage: "/images/services/ecommerce_dev.png",
    color: '#3B5BFF'
  },
  {
    id: 'mobile-app',
    slug: 'mobile-app-development',
    title: 'Mobile Application Development',
    shortTitle: 'Mobile Apps',
    subtitle: "Native and cross-platform mobile experiences that engage users and dominate the app stores.",
    icon: <Smartphone size={24} strokeWidth={1.5} />,
    description: "We build intuitive, high-performance mobile apps for iOS and Android. Using React Native and Flutter, we deliver seamless native-like experiences with rapid development cycles.",
    features: [
      "iOS & Android Development",
      "Cross-Platform Solutions (React Native/Flutter)",
      "Mobile UI/UX Design",
      "App Store Optimization (ASO)",
      "Push Notifications & Engagement",
      "Backend API & Database Architecture",
    ],
    process: [
      { title: "Ideation", desc: "Mapping user journeys and defining core app features." },
      { title: "Prototyping", desc: "Creating interactive wireframes and UI designs." },
      { title: "Engineering", desc: "Building the front-end and robust backend infrastructure." },
      { title: "QA Testing", desc: "Testing across multiple devices and OS versions." },
      { title: "Launch", desc: "App store submission and post-launch support." },
    ],
    coverImage: "/images/services/mobile_app_dev.png",
    color: '#00C8A0'
  },
  {
    id: 'custom-software',
    slug: 'custom-software-saas',
    title: 'Custom Software & SaaS Development',
    shortTitle: 'Custom Software',
    subtitle: "Scalable, secure, and robust cloud applications engineered to solve complex business problems.",
    icon: <Code2 size={24} strokeWidth={1.5} />,
    description: "Whether you're building a multi-tenant SaaS product from scratch or modernizing legacy software, our engineering team architects solutions that scale globally and securely.",
    features: [
      "Multi-Tenant SaaS Architecture",
      "Enterprise Web Portals",
      "Legacy System Modernization",
      "Custom ERP & CRM Solutions",
      "Secure API Infrastructure",
      "Cloud Deployment & DevOps",
    ],
    process: [
      { title: "Scoping", desc: "Detailed requirements gathering and feasibility analysis." },
      { title: "System Design", desc: "Architecting the database, API, and cloud infrastructure." },
      { title: "Development", desc: "Iterative development with CI/CD pipelines." },
      { title: "Security Audit", desc: "Vulnerability testing and data compliance checks." },
      { title: "Scaling", desc: "Monitoring performance and scaling server infrastructure." },
    ],
    coverImage: "/images/services/saas_dev.png",
    color: '#7B61FF'
  },
  {
    id: 'ui-ux',
    slug: 'ui-ux-design-branding',
    title: 'UI/UX Design & Branding',
    shortTitle: 'UI/UX Design',
    subtitle: "Award-winning interfaces and brand identities that leave a lasting impression.",
    icon: <PenTool size={24} strokeWidth={1.5} />,
    description: "Great design isn't just about looking good—it's about how it works. We craft user-centric interfaces and compelling brand narratives that build trust and drive conversions.",
    features: [
      "User Experience (UX) Research",
      "User Interface (UI) Design",
      "Wireframing & Prototyping",
      "Brand Identity & Guidelines",
      "Logo Design & Typography",
      "Design System Creation",
    ],
    process: [
      { title: "Research", desc: "Analyzing competitors, user behavior, and market trends." },
      { title: "Wireframing", desc: "Mapping out the structure and user flow." },
      { title: "Visual Design", desc: "Applying color theory, typography, and brand elements." },
      { title: "Prototyping", desc: "Creating interactive prototypes for user testing." },
      { title: "Handoff", desc: "Delivering pixel-perfect assets to the engineering team." },
    ],
    coverImage: "/images/services/ui_ux_design.png",
    color: '#F59E0B'
  },
  {
    id: 'graphic-design',
    slug: 'graphic-design-creative',
    title: 'Graphic Design & Creative Services',
    shortTitle: 'Graphic Design',
    subtitle: "Visually striking creative assets that capture attention and communicate your message.",
    icon: <Palette size={24} strokeWidth={1.5} />,
    description: "From marketing collateral to social media graphics, our creative team produces high-quality visual content that aligns perfectly with your brand identity.",
    features: [
      "Social Media Graphics",
      "Marketing Collateral & Brochures",
      "Pitch Decks & Presentations",
      "Custom Illustrations",
      "Ad Creative & Banners",
      "Packaging Design",
    ],
    process: [
      { title: "Briefing", desc: "Understanding the creative goals and target audience." },
      { title: "Concepts", desc: "Developing initial mood boards and design directions." },
      { title: "Creation", desc: "Crafting the visual assets with precision." },
      { title: "Refinement", desc: "Iterating based on feedback to ensure perfection." },
      { title: "Delivery", desc: "Providing final files in all required formats." },
    ],
    coverImage: "/images/services/graphic_design.png",
    color: '#E11D48'
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing & Lead Generation',
    shortTitle: 'Digital Marketing',
    subtitle: "Precision-targeted campaigns that maximize ROI and scale your revenue.",
    icon: <BarChart3 size={24} strokeWidth={1.5} />,
    description: "Stop guessing with your ad spend. Our performance marketing strategies leverage advanced targeting, compelling creative, and rigorous A/B testing to lower acquisition costs and maximize lifetime value.",
    features: [
      "Google Ads (Search, Display, Shopping)",
      "Meta Ads (Facebook, Instagram)",
      "LinkedIn B2B Lead Gen",
      "Conversion Rate Optimization (CRO)",
      "Email Automation & Sequences",
      "Advanced Analytics & Attribution",
    ],
    process: [
      { title: "Analysis", desc: "Auditing past performance and identifying target personas." },
      { title: "Creative", desc: "Developing ad copy, visuals, and landing pages." },
      { title: "Launch", desc: "Structuring campaigns for optimal budget distribution." },
      { title: "Optimization", desc: "Daily bid management and A/B testing to lower CAC." },
      { title: "Scaling", desc: "Increasing spend profitably once winners are identified." },
    ],
    coverImage: "/images/services/digital_marketing.png",
    color: '#0EA5E9'
  },
  {
    id: 'seo',
    slug: 'seo-search-engine-marketing',
    title: 'SEO & Search Engine Marketing',
    shortTitle: 'SEO & SEM',
    subtitle: "Data-driven SEO strategies that dominate search results and drive qualified traffic.",
    icon: <TrendingUp size={24} strokeWidth={1.5} />,
    description: "Visibility is everything. We combine technical SEO, content strategy, and authoritative link building to secure top rankings for high-intent keywords. No black-hat tricks, just sustainable organic growth.",
    features: [
      "Technical SEO Audits & Fixes",
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Content Strategy & Creation",
      "High-Authority Link Building",
      "Local SEO & Google Business",
    ],
    process: [
      { title: "Audit", desc: "Deep technical analysis to identify blockers and opportunities." },
      { title: "Strategy", desc: "Mapping high-value keywords to search intent." },
      { title: "Optimization", desc: "Fixing technical debt and optimizing existing content." },
      { title: "Authority", desc: "Building high-quality backlinks from relevant domains." },
      { title: "Reporting", desc: "Transparent tracking of rankings, traffic, and conversions." },
    ],
    coverImage: "/images/services/seo_marketing.png",
    color: '#10B981'
  },
  {
    id: 'content-creation',
    slug: 'content-creation',
    title: 'Content Creation & Copywriting',
    shortTitle: 'Content & Copy',
    subtitle: "Compelling narratives and SEO-optimized content that engages and converts.",
    icon: <FileText size={24} strokeWidth={1.5} />,
    description: "Content is the voice of your brand. We produce high-quality blogs, website copy, whitepapers, and social content that resonates with your audience and establishes industry authority.",
    features: [
      "SEO Blog Writing",
      "Website Copywriting",
      "Email Newsletter Content",
      "Whitepapers & E-books",
      "Social Media Captions",
      "Product Descriptions",
    ],
    process: [
      { title: "Discovery", desc: "Learning your brand voice, tone, and industry nuances." },
      { title: "Planning", desc: "Creating a comprehensive content calendar." },
      { title: "Drafting", desc: "Writing engaging, value-driven, and optimized content." },
      { title: "Editing", desc: "Rigorous proofreading and stylistic refinement." },
      { title: "Publishing", desc: "Formatting and distributing content across channels." },
    ],
    coverImage: "/images/services/content_creation.png",
    color: '#8B5CF6'
  },
  {
    id: 'video-production',
    slug: 'video-production',
    title: 'Video Production & Editing',
    shortTitle: 'Video Production',
    subtitle: "Cinematic videos and dynamic animations that bring your brand to life.",
    icon: <Video size={24} strokeWidth={1.5} />,
    description: "Video is the most engaging medium online. From corporate promos to social media reels and explainer animations, we handle the entire production pipeline to deliver scroll-stopping visuals.",
    features: [
      "Promotional & Brand Videos",
      "Social Media Reels & Shorts",
      "2D/3D Motion Graphics",
      "Explainer Animations",
      "Corporate Interviews",
      "Video Editing & Color Grading",
    ],
    process: [
      { title: "Pre-Production", desc: "Scriptwriting, storyboarding, and planning." },
      { title: "Production", desc: "Filming with professional gear or generating animations." },
      { title: "Editing", desc: "Cutting, pacing, and assembling the narrative." },
      { title: "Post-Production", desc: "Adding VFX, motion graphics, color grading, and sound." },
      { title: "Delivery", desc: "Exporting optimized formats for various platforms." },
    ],
    coverImage: "/images/services/video_production.png",
    color: '#EC4899'
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation-cloud',
    title: 'AI, Automation & Cloud Solutions',
    shortTitle: 'AI & Cloud',
    subtitle: "Future-proof your business with cutting-edge artificial intelligence and cloud architecture.",
    icon: <Cpu size={24} strokeWidth={1.5} />,
    description: "We help businesses leverage AI to automate workflows, analyze vast datasets, and scale infrastructure securely on AWS, GCP, or Azure.",
    features: [
      "Custom AI Chatbots (LLM Integration)",
      "Workflow Automation (Zapier/Make)",
      "Machine Learning Models",
      "Cloud Migration (AWS/Azure/GCP)",
      "Serverless Architecture",
      "Data Analytics & Pipelines",
    ],
    process: [
      { title: "Assessment", desc: "Identifying bottlenecks ripe for automation or AI integration." },
      { title: "Architecture", desc: "Designing secure cloud and data pipelines." },
      { title: "Integration", desc: "Connecting APIs and training AI models on your data." },
      { title: "Deployment", desc: "Rolling out solutions with minimal disruption." },
      { title: "Maintenance", desc: "Monitoring AI accuracy and cloud resource utilization." },
    ],
    coverImage: "/images/services/ai_automation.png",
    color: '#14B8A6'
  }
]
