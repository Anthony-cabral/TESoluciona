import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");

function getCssVariable(scope: ":root" | ".dark", name: string) {
  const block = css.match(new RegExp(`\\${scope}\\s*\\{([^}]+)\\}`))?.[1] ?? "";
  const value = block.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
  if (!value) throw new Error(`Missing ${name} in ${scope}`);
  return value;
}

function hexToRgb(hex: string) {
  return {
    b: Number.parseInt(hex.slice(5, 7), 16) / 255,
    g: Number.parseInt(hex.slice(3, 5), 16) / 255,
    r: Number.parseInt(hex.slice(1, 3), 16) / 255
  };
}

function channel(value: number) {
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const rgb = hexToRgb(hex);
  return (
    0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b)
  );
}

function contrast(left: string, right: string) {
  const a = luminance(left);
  const b = luminance(right);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("base accessibility tokens", () => {
  it("keeps light and dark foreground contrast at WCAG AA or better", () => {
    expect(
      contrast(
        getCssVariable(":root", "--foreground"),
        getCssVariable(":root", "--background")
      )
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast(
        getCssVariable(".dark", "--foreground"),
        getCssVariable(".dark", "--background")
      )
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps muted text legible in light and dark modes", () => {
    expect(
      contrast(
        getCssVariable(":root", "--muted"),
        getCssVariable(":root", "--background")
      )
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast(
        getCssVariable(".dark", "--muted"),
        getCssVariable(".dark", "--background")
      )
    ).toBeGreaterThanOrEqual(4.5);
  });
});
