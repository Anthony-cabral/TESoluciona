import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";

describe("siteConfig", () => {
  it("keeps the product name in a central configuration", () => {
    expect(siteConfig.name).toBe("Tesoluciona");
  });

  it("normalizes the public site URL", () => {
    expect(siteConfig.url.endsWith("/")).toBe(false);
  });

  it("does not expose admin or community links in public navigation", () => {
    const publicHrefs = siteConfig.mainNavigation.map((item) => item.href);

    expect(publicHrefs).toContain("/guias");
    expect(publicHrefs).not.toContain("/admin");
    expect(publicHrefs).not.toContain("/comunidad");
  });
});
