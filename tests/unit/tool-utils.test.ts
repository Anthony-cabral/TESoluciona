import { describe, expect, it } from "vitest";

import {
  calculateIPv4,
  calculateSubnetForHosts
} from "@/features/tools/lib/ip";
import {
  evaluatePasswordStrength,
  generatePassword
} from "@/features/tools/lib/password";
import {
  countText,
  decodeBase64,
  encodeBase64,
  formatJson
} from "@/features/tools/lib/text";

describe("tool utilities", () => {
  it("calculates IPv4 network details", () => {
    expect(calculateIPv4("192.168.1.25/24")).toEqual(
      expect.objectContaining({
        broadcastAddress: "192.168.1.255",
        firstUsable: "192.168.1.1",
        networkAddress: "192.168.1.0",
        subnetMask: "255.255.255.0",
        usableHosts: 254
      })
    );
  });

  it("suggests a subnet for a host count", () => {
    expect(calculateSubnetForHosts(50)).toEqual(
      expect.objectContaining({
        cidr: 26,
        subnetMask: "255.255.255.192",
        usableHosts: 62
      })
    );
  });

  it("round-trips Base64 text with unicode", () => {
    const encoded = encodeBase64("Tesoluciona técnico");

    expect(decodeBase64(encoded)).toBe("Tesoluciona técnico");
  });

  it("formats valid JSON and rejects invalid JSON", () => {
    expect(formatJson('{"ok":true}')).toContain('"ok": true');
    expect(() => formatJson('{"ok":}')).toThrow(/JSON/);
  });

  it("generates and scores passwords without storing state", () => {
    const password = generatePassword({
      includeNumbers: true,
      includeSymbols: true,
      includeUppercase: true,
      length: 20
    });

    expect(password).toHaveLength(20);
    expect(evaluatePasswordStrength(password).score).toBeGreaterThanOrEqual(6);
  });

  it("counts words and characters", () => {
    expect(countText("Hola mundo. Prueba rápida")).toEqual(
      expect.objectContaining({
        characters: 25,
        charactersWithoutSpaces: 22,
        sentences: 2,
        words: 4
      })
    );
  });
});
