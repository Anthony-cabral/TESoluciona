import { describe, expect, it } from "vitest";

import { tools } from "@/features/solutions/tools";
import {
  activeTools,
  roadmapToolGroups
} from "@/features/tools/data/tool-roadmap";
import { toolCategories } from "@/features/tools/domain/tool-definition";

describe("expanded tools catalog in MVP", () => {
  it("implements the first batch with independent public routes", () => {
    const expectedSlugs = [
      "imagenes-a-pdf",
      "jpg-a-pdf",
      "unir-pdf",
      "dividir-pdf",
      "comprimir-pdf",
      "pdf-a-jpg",
      "jpg-a-png",
      "png-a-jpg",
      "redimensionar-imagen",
      "comprimir-imagen"
    ];

    for (const slug of expectedSlugs) {
      const tool = tools.find((candidate) => candidate.slug === slug);
      expect(tool, `Missing ${slug}`).toBeDefined();
      expect(tool?.status).toBe("active");
      expect(tool?.seo.canonicalPath).toBe(`/herramientas/${slug}`);
    }
  });

  it("declares privacy and limits for every batch one tool", () => {
    const batchOneTools = tools.filter((tool) => tool.batch === "batch-1");

    expect(batchOneTools).toHaveLength(10);

    for (const tool of batchOneTools) {
      expect(tool.instructions?.length).toBeGreaterThan(0);
      expect(tool.examples.length).toBeGreaterThan(0);
      expect(tool.faq.length).toBeGreaterThan(0);
      expect(tool.limits?.maxFileSizeMb).toBeGreaterThan(0);
      expect(tool.limits?.acceptedFormats.length).toBeGreaterThan(0);
      expect(tool.privacy?.localOnly).toBe(true);
      expect(tool.privacy?.uploadsFiles).toBe(false);
      expect(tool.privacy?.usesThirdParties).toBe(false);
    }
  });

  it("documents every requested top-level category", () => {
    const roadmapCategories = new Set(
      roadmapToolGroups.map((group) => group.category)
    );

    for (const category of toolCategories) {
      expect(roadmapCategories.has(category)).toBe(true);
    }
  });

  it("keeps the roadmap derived from active tools", () => {
    expect(activeTools.map((tool) => tool.slug)).toEqual(
      tools.filter((tool) => tool.status === "active").map((tool) => tool.slug)
    );
  });
});
