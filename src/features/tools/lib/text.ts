export function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  const binary = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join(
    ""
  );

  if (typeof btoa === "function") {
    return btoa(binary);
  }

  return Buffer.from(value, "utf8").toString("base64");
}

export function decodeBase64(value: string) {
  try {
    const binary =
      typeof atob === "function"
        ? atob(value)
        : Buffer.from(value, "base64").toString("binary");
    const bytes = Uint8Array.from(
      binary,
      (character) => character.codePointAt(0) ?? 0
    );
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error("El texto no parece Base64 válido.");
  }
}

export function formatJson(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`JSON inválido: ${error.message}`);
    }
    throw new Error("JSON inválido.");
  }
}

export function countText(value: string) {
  const trimmed = value.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((sentence) => sentence.trim()).length
    : 0;

  return {
    words,
    characters: value.length,
    charactersWithoutSpaces: value.replace(/\s/g, "").length,
    sentences,
    readingTimeMinutes: Math.max(1, Math.ceil(words / 220))
  };
}
