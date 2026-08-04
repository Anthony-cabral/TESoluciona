import { describe, expect, it } from "vitest";

import { listFeaturedContent } from "@/features/content/application/list-featured-content";
import type { ArticleRepository } from "@/features/content/domain/article-repository";

describe("listFeaturedContent", () => {
  it("returns featured content sorted by Spanish title", async () => {
    const repository: ArticleRepository = {
      async listFeatured() {
        return [
          {
            slug: "zeta",
            title: "Zeta",
            excerpt: "Último contenido",
            category: "Prueba",
            difficulty: "beginner",
            readingTimeMinutes: 2
          },
          {
            slug: "alfa",
            title: "Alfa",
            excerpt: "Primer contenido",
            category: "Prueba",
            difficulty: "beginner",
            readingTimeMinutes: 1
          }
        ];
      }
    };

    await expect(listFeaturedContent(repository)).resolves.toEqual([
      expect.objectContaining({ slug: "alfa" }),
      expect.objectContaining({ slug: "zeta" })
    ]);
  });
});
