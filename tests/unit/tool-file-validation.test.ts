import { describe, expect, it } from "vitest";

import {
  detectFileKindFromBytes,
  validateFileSignature,
  validateUploadMetadata
} from "@/features/tools/lib/file-validation";

const pdfHeader = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
const jpgHeader = new Uint8Array([0xff, 0xd8, 0xff, 0xe0]);
const pngHeader = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a
]);

describe("tool file validation", () => {
  it("detects supported signatures", () => {
    expect(detectFileKindFromBytes(pdfHeader)).toBe("pdf");
    expect(detectFileKindFromBytes(jpgHeader)).toBe("jpg");
    expect(detectFileKindFromBytes(pngHeader)).toBe("png");
  });

  it("rejects empty files", () => {
    const result = validateUploadMetadata({
      acceptedKinds: ["pdf"],
      file: {
        name: "documento.pdf",
        size: 0,
        type: "application/pdf"
      }
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("El archivo esta vacio.");
  });

  it("rejects files over the configured limit", () => {
    const result = validateUploadMetadata({
      acceptedKinds: ["jpg"],
      file: {
        name: "foto.jpg",
        size: 6 * 1024 * 1024,
        type: "image/jpeg"
      },
      maxFileSizeBytes: 5 * 1024 * 1024
    });

    expect(result.ok).toBe(false);
    expect(result.errors.join(" ")).toContain("supera el limite");
  });

  it("rejects fake extensions and MIME mismatches", () => {
    const result = validateUploadMetadata({
      acceptedKinds: ["pdf"],
      file: {
        name: "documento.pdf",
        size: 1024,
        type: "image/png"
      }
    });

    expect(result.ok).toBe(false);
    expect(result.errors.join(" ")).toContain("MIME");
  });

  it("rejects corrupt signatures", () => {
    const result = validateFileSignature({
      acceptedKinds: ["pdf"],
      bytes: new Uint8Array([0x00, 0x01, 0x02, 0x03])
    });

    expect(result.ok).toBe(false);
  });
});
