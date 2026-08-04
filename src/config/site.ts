const fallbackUrl = "http://localhost:3000";

function normalizeSiteUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Tesoluciona",
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0",
  locale: "es-DO",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl),
  description:
    "Portal de soluciones tecnológicas con conocimiento técnico, herramientas útiles y una experiencia web rápida, segura y accesible.",
  mainNavigation: [
    { href: "#arquitectura", label: "Arquitectura" },
    { href: "#contenido", label: "Contenido" },
    { href: "#herramientas", label: "Herramientas" }
  ],
  footerNavigation: [
    { href: "/robots.txt", label: "Robots" },
    { href: "/sitemap.xml", label: "Sitemap" },
    { href: "/api/v1/health", label: "API" }
  ]
} as const;
