import { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { TOOLS } from "@/data/tools";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SITE_URL } from "@/lib/site";
import { CONTACT_SERVICE_SLUGS } from "@/lib/contactServices";
import { BLOG_CATEGORY_FILTERS } from "@/lib/data/blogCategories";
import { getAllUnifiedPosts, getTopics } from "@/lib/blog/posts";
import { slugifyHeading } from "@/lib/blog/mdx";

export const revalidate = 86400; // Cache for 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Blog posts — merges Prisma (DB) posts with static content/blog/*.mdx posts.
  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  let blogTopicSlugs: string[] = [];
  try {
    const unified = await getAllUnifiedPosts();
    blogPosts = unified.map((post) => ({
      slug: post.slug,
      updatedAt: post.updatedAt ?? post.publishedAt,
    }));
    blogTopicSlugs = getTopics(unified).map((topic) => slugifyHeading(topic));
  } catch {
    console.warn("Could not fetch blog posts for sitemap");
  }

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Services — includes core pillars and supporting services (e.g. saas-mvp-development).
  const serviceUrls = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: service.isCorePillar ? 0.85 : 0.75,
  }));

  const contactServiceUrls = CONTACT_SERVICE_SLUGS.map((slug) => ({
    url: `${baseUrl}/contact/service/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const industryUrls = INDUSTRIES.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const toolUrls = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudyUrls = CASE_STUDIES.map((study) => ({
    url: `${baseUrl}/portfolio/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const blogCategoryUrls = BLOG_CATEGORY_FILTERS.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const blogTopicUrls = blogTopicSlugs.map((slug) => ({
    url: `${baseUrl}/blog/topic/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return [
    ...staticUrls,
    ...serviceUrls,
    ...contactServiceUrls,
    ...industryUrls,
    ...toolUrls,
    ...caseStudyUrls,
    ...blogCategoryUrls,
    ...blogTopicUrls,
    ...blogUrls,
  ];
}
