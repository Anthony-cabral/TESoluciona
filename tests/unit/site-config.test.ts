import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";

describe("siteConfig", () => {
  it("keeps the product name in a central configuration", () => {
    expect(siteConfig.name).toBe("Tesoluciona");
  });

  it("normalizes the public site URL", () => {
    expect(siteConfig.url.endsWith("/")).toBe(false);
  });
});
