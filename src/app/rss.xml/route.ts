import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { articles } from "@/features/solutions/articles";

export function GET() {
  const items = articles
    .slice(0, 20)
    .map(
      (article) => `<item>
  <title><![CDATA[${article.title}]]></title>
  <link>${siteConfig.url}/articulos/${article.slug}</link>
  <guid>${siteConfig.url}/articulos/${article.slug}</guid>
  <description><![CDATA[${article.summary}]]></description>
  <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
</item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${siteConfig.name}</title>
  <link>${siteConfig.url}</link>
  <description>${siteConfig.description}</description>
  <language>es-DO</language>
  ${items}
</channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
