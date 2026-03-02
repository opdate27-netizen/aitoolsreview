import { tools } from "@/lib/tools"
import { blogPosts } from "@/lib/blog"
import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aitoolsreview.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/free-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE_URL}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Key comparison pages
  const compareRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/compare/jasper-ai-vs-writesonic`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/compare/jasper-ai-vs-copy-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/compare/writesonic-vs-copy-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/compare/canva-pro-vs-descript`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/compare/synthesia-vs-pictory`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ]

  return [...staticRoutes, ...toolRoutes, ...blogRoutes, ...compareRoutes]
}
