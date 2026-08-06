import type {
  Article,
  ErrorEntry,
  ToolMetadata
} from "@/features/solutions/types";
import { siteConfig } from "@/config/site";

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `${siteConfig.url}${item.href}`
      }))
    ]
  };
}

export function articleJsonLd(article: Article) {
  const image = article.solutionSteps.find((step) => step.image)?.image;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    },
    ...(image ? { image: [`${siteConfig.url}${image.src}`] } : {}),
    mainEntityOfPage: `${siteConfig.url}${article.seo.canonicalPath}`
  };
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function toolJsonLd(tool: ToolMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    description: tool.description,
    url: `${siteConfig.url}${tool.seo.canonicalPath}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

export function errorArticleJsonLd(error: ErrorEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: error.title,
    description: error.description,
    dateModified: error.reviewedAt,
    mainEntityOfPage: `${siteConfig.url}${error.seo.canonicalPath}`,
    about: error.product
  };
}
