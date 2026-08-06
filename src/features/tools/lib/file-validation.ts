export type FileKind = "pdf" | "jpg" | "png" | "webp";

export type UploadCandidate = {
  name: string;
  size: number;
  type: string;
};

export type FileValidationResult = {
  ok: boolean;
  errors: string[];
};

const kindExtensions: Record<FileKind, string[]> = {
  jpg: [".jpg", ".jpeg"],
  pdf: [".pdf"],
  png: [".png"],
  webp: [".webp"]
};

const kindMimeTypes: Record<FileKind, string[]> = {
  jpg: ["image/jpeg"],
  pdf: ["application/pdf"],
  png: ["image/png"],
  webp: ["image/webp"]
};

export const defaultLocalFileLimitBytes = 25 * 1024 * 1024;

export function mbToBytes(sizeMb: number) {
  return sizeMb * 1024 * 1024;
}

export function detectFileKindFromName(name: string): FileKind | null {
  const normalized = name.toLowerCase();

  for (const [kind, extensions] of Object.entries(kindExtensions)) {
    if (extensions.some((extension) => normalized.endsWith(extension))) {
      return kind as FileKind;
    }
  }

  return null;
}

export function detectFileKindFromMime(type: string): FileKind | null {
  const normalized = type.toLowerCase();

  for (const [kind, mimeTypes] of Object.entries(kindMimeTypes)) {
    if (mimeTypes.includes(normalized)) {
      return kind as FileKind;
    }
  }

  return null;
}

export function detectFileKindFromBytes(bytes: Uint8Array): FileKind | null {
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  ) {
    return "pdf";
  }

  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) {
    return "jpg";
  }

  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }

  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }

  return null;
}

export function validateUploadMetadata(input: {
  acceptedKinds: FileKind[];
  file: UploadCandidate;
  maxFileSizeBytes?: number;
}): FileValidationResult {
  const errors: string[] = [];
  const maxFileSizeBytes = input.maxFileSizeBytes ?? defaultLocalFileLimitBytes;
  const kindByName = detectFileKindFromName(input.file.name);
  const kindByMime = input.file.type
    ? detectFileKindFromMime(input.file.type)
    : null;

  if (input.file.size <= 0) {
    errors.push("El archivo esta vacio.");
  }

  if (input.file.size > maxFileSizeBytes) {
    errors.push(
      `El archivo supera el limite de ${Math.floor(maxFileSizeBytes / 1024 / 1024)} MB.`
    );
  }

  if (!kindByName || !input.acceptedKinds.includes(kindByName)) {
    errors.push("La extension del archivo no coincide con formatos admitidos.");
  }

  if (!kindByMime || !input.acceptedKinds.includes(kindByMime)) {
    errors.push("El tipo MIME del archivo no coincide con formatos admitidos.");
  }

  if (kindByName && kindByMime && kindByName !== kindByMime) {
    errors.push("La extension y el tipo MIME del archivo no coinciden.");
  }

  return {
    errors,
    ok: errors.length === 0
  };
}

export function validateFileSignature(input: {
  acceptedKinds: FileKind[];
  bytes: Uint8Array;
}): FileValidationResult {
  const kindByBytes = detectFileKindFromBytes(input.bytes);

  if (!kindByBytes || !input.acceptedKinds.includes(kindByBytes)) {
    return {
      errors: [
        "La firma binaria del archivo no coincide con formatos admitidos."
      ],
      ok: false
    };
  }

  return { errors: [], ok: true };
}
