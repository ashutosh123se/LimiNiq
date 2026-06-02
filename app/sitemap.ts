import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { SERVICES_DATA } from '@/lib/data/services';

export const revalidate = 86400; // Cache for 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://liminiq.com';

  // Fetch dynamic blog posts
  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  try {
    blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    console.warn("Could not fetch blog posts for sitemap");
  }

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceSlugs = Object.keys(SERVICES_DATA);
  const serviceUrls = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...serviceUrls, ...blogUrls];
}
