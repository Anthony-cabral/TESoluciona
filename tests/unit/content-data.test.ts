import { describe, expect, it } from "vitest";

import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length);
}

describe("MVP content data", () => {
  it("contains the requested initial content volume", () => {
    expect(categories).toHaveLength(31);
    expect(articles).toHaveLength(30);
    expect(errorEntries).toHaveLength(8);
    expect(tools.filter((tool) => tool.status === "active")).toHaveLength(10);
  });

  it("uses unique slugs for indexable content", () => {
    expectUnique(categories.map((category) => category.slug));
    expectUnique(articles.map((article) => article.slug));
    expectUnique(tools.map((tool) => tool.slug));
    expectUnique(
      errorEntries.map((entry) => `${entry.productSlug}/${entry.slug}`)
    );
  });

  it("keeps articles complete enough for useful guides", () => {
    for (const article of articles) {
      expect(article.summary).not.toHaveLength(0);
      expect(article.introduction).not.toHaveLength(0);
      expect(article.simpleExplanation).not.toHaveLength(0);
      expect(article.technicalExplanation).not.toHaveLength(0);
      expect(article.primarySteps.length).toBeGreaterThanOrEqual(4);
      expect(article.verification.length).toBeGreaterThan(0);
      expect(article.faq.length).toBeGreaterThan(0);
      expect(article.seo.canonicalPath).toBe(`/articulos/${article.slug}`);
    }
  });

  it("links all articles to existing categories", () => {
    const categorySlugs = new Set(categories.map((category) => category.slug));

    for (const article of articles) {
      expect(categorySlugs.has(article.categorySlug)).toBe(true);
    }
  });
});
