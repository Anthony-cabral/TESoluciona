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
    "Encuentra soluciones claras para errores, configuraciones, comandos, herramientas y guías paso a paso.",
  mainNavigation: [
    { href: "/categorias", label: "Categorías" },
    { href: "/herramientas", label: "Herramientas" },
    { href: "/errores", label: "Centro de errores" },
    { href: "/guias", label: "Guías" }
  ],
  footerNavigation: [
    { href: "/sobre-nosotros", label: "Sobre Tesoluciona" },
    { href: "/contacto", label: "Contacto" },
    { href: "/politica-de-privacidad", label: "Política de privacidad" },
    { href: "/politica-de-cookies", label: "Política de cookies" },
    { href: "/terminos", label: "Términos y condiciones" },
    { href: "/aviso-legal", label: "Aviso legal" },
    { href: "/transparencia-editorial", label: "Transparencia editorial" },
    { href: "/preferencias-privacidad", label: "Preferencias de privacidad" },
    { href: "/creditos-de-imagenes", label: "Créditos de imágenes" },
    { href: "/sitemap.xml", label: "Sitemap" },
    { href: "/rss.xml", label: "RSS" }
  ]
} as const;
