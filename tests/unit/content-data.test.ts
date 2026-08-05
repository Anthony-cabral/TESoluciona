import { describe, expect, it } from "vitest";

import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";
import imageAttributions from "../../content/image-attributions.json";

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length);
}

describe("MVP content data", () => {
  it("contains the requested initial content volume", () => {
    expect(categories).toHaveLength(31);
    expect(articles.length).toBeGreaterThanOrEqual(40);
    expect(errorEntries.length).toBeGreaterThanOrEqual(10);
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
      expect(article.solutionSteps.length).toBeGreaterThanOrEqual(4);
      expect(article.appliesTo.length).toBeGreaterThan(0);
      expect(article.backupRecommendation).not.toHaveLength(0);
      expect(article.verification.length).toBeGreaterThan(0);
      expect(article.revertChanges.length).toBeGreaterThan(0);
      expect(article.faq.length).toBeGreaterThan(0);
      expect(article.seo.canonicalPath).toBe(`/articulos/${article.slug}`);
    }
  });

  it("documents public guide images with credits and safe licensing", () => {
    expect(imageAttributions.length).toBeGreaterThanOrEqual(6);

    const credits = new Set(imageAttributions.map((credit) => credit.id));
    const articleImages = articles.flatMap((article) =>
      article.solutionSteps.flatMap((step) => (step.image ? [step.image] : []))
    );

    expect(articleImages.length).toBeGreaterThanOrEqual(6);
    for (const image of articleImages) {
      expect(image.alt).not.toHaveLength(0);
      expect(image.caption).not.toHaveLength(0);
      expect(credits.has(image.creditId)).toBe(true);
    }

    for (const credit of imageAttributions) {
      expect(credit.commercialUseAllowed).toBe(true);
      expect(credit.modificationsAllowed).toBe(true);
      expect(credit.attributionText).not.toHaveLength(0);
    }
  });

  it("links all articles to existing categories", () => {
    const categorySlugs = new Set(categories.map((category) => category.slug));

    for (const article of articles) {
      expect(categorySlugs.has(article.categorySlug)).toBe(true);
    }
  });
});
