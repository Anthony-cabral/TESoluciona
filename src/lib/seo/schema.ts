import { siteConfig } from "@/config/site";

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/buscar?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/tesoluciona-mark.svg`
  };
}
