import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/config/site";
import { buildContentSecurityPolicy } from "@/lib/security/csp";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  toolJsonLd
} from "@/lib/seo/json-ld";
import { articles } from "@/features/solutions/articles";
import { tools } from "@/features/solutions/tools";

describe("SEO and security", () => {
  it("allows unsafe-eval only for development scripts", () => {
    const dev = buildContentSecurityPolicy("nonce-dev", true);
    const prod = buildContentSecurityPolicy("nonce-prod", false);

    expect(dev).toContain("script-src");
    expect(dev).toContain("'unsafe-eval'");
    expect(dev).not.toMatch(/default-src[^;]*unsafe-eval/);
    expect(dev).not.toContain("upgrade-insecure-requests");
    expect(prod).not.toContain("'unsafe-eval'");
    expect(prod).toContain("'nonce-nonce-prod'");
    expect(prod).not.toContain("style-src 'self' 'unsafe-inline'");
  });

  it("blocks non-indexable areas in robots", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;

    expect(rules?.disallow).toEqual(
      expect.arrayContaining(["/api/", "/admin", "/buscar"])
    );
  });

  it("creates sitemap entries for public routes only", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${siteConfig.url}/categorias/windows`);
    expect(urls).toContain(`${siteConfig.url}/windows`);
    expect(urls).toContain(`${siteConfig.url}/guias`);
    expect(urls).toContain(`${siteConfig.url}/creditos-de-imagenes`);
    expect(urls).toContain(
      `${siteConfig.url}/articulos/como-comprobar-si-windows-esta-activado`
    );
    expect(urls).toContain(`${siteConfig.url}/herramientas/json-formatter`);
    expect(urls.some((url) => url.includes("/admin"))).toBe(false);
    expect(urls.some((url) => url.includes("/buscar"))).toBe(false);
  });

  it("generates structured data for articles, tools, FAQs and breadcrumbs", () => {
    expect(articleJsonLd(articles[0]!)).toEqual(
      expect.objectContaining({ "@type": "Article" })
    );
    expect(toolJsonLd(tools[0]!)).toEqual(
      expect.objectContaining({ "@type": "SoftwareApplication" })
    );
    expect(faqJsonLd(articles[0]!.faq)).toEqual(
      expect.objectContaining({ "@type": "FAQPage" })
    );
    expect(
      breadcrumbJsonLd([{ href: "/categorias", label: "Categorías" }])
    ).toEqual(expect.objectContaining({ "@type": "BreadcrumbList" }));
  });
});
