import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";
import { legalPages } from "@/features/legal/legal-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/categorias",
    "/herramientas",
    "/errores",
    ...legalPages.map((page) => `/${page.slug}`)
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7
  }));

  return [
    ...staticRoutes,
    ...categories.map((category) => ({
      url: `${siteConfig.url}/categorias/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.url}/articulos/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85
    })),
    ...errorEntries.map((entry) => ({
      url: `${siteConfig.url}/errores/${entry.productSlug}/${entry.slug}`,
      lastModified: new Date(entry.reviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...tools
      .filter((tool) => tool.status === "active")
      .map((tool) => ({
        url: `${siteConfig.url}/herramientas/${tool.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75
      }))
  ];
}
