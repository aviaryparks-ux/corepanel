// app/sitemap.ts - Dynamic Sitemap Generator
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devsolution.id";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Dynamic project pages (from CMS) - could be fetched at build time
  // For now, we'll add placeholder project URLs
  // You can expand this by fetching from /api/projects at build time
  const projectPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/projects/web-application`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/mobile-app`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Admin pages (noindex - don't show in search)
  const adminPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
  ];

  return [...staticPages, ...projectPages, ...adminPages];
}
