"use client";

import {
  type FileKind,
  mbToBytes,
  validateFileSignature,
  validateUploadMetadata
} from "@/features/tools/lib/file-validation";

export type GeneratedFile = {
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
};

export type ImageTransformOptions = {
  height?: number;
  quality?: number;
  width?: number;
};

export async function validateBrowserFiles(input: {
  acceptedKinds: FileKind[];
  files: File[];
  maxFileSizeMb: number;
  maxFiles: number;
}) {
  if (!input.files.length) {
    throw new Error("Selecciona al menos un archivo.");
  }

  if (input.files.length > input.maxFiles) {
    throw new Error(`Selecciona como maximo ${input.maxFiles} archivos.`);
  }

  for (const file of input.files) {
    const metadata = validateUploadMetadata({
      acceptedKinds: input.acceptedKinds,
      file,
      maxFileSizeBytes: mbToBytes(input.maxFileSizeMb)
    });

    if (!metadata.ok) {
      throw new Error(`${file.name}: ${metadata.errors.join(" ")}`);
    }

    const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const signature = validateFileSignature({
      acceptedKinds: input.acceptedKinds,
      bytes: header
    });

    if (!signature.ok) {
      throw new Error(`${file.name}: ${signature.errors.join(" ")}`);
    }
  }
}

export function createGeneratedFile(input: {
  blob: Blob;
  fileName: string;
  objectUrls: string[];
}): GeneratedFile {
  const url = URL.createObjectURL(input.blob);
  input.objectUrls.push(url);

  return {
    fileName: input.fileName,
    mimeType: input.blob.type || "application/octet-stream",
    size: input.blob.size,
    url
  };
}

export function downloadUrl(url: string, fileName: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
}

export function revokeObjectUrls(urls: string[]) {
  for (const url of urls) {
    URL.revokeObjectURL(url);
  }
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function replaceExtension(fileName: string, extension: string) {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const withoutExtension = safeName.replace(/\.[^.]+$/, "");
  return `${withoutExtension || "archivo"}.${extension}`;
}

export async function renderImageToBlob(
  file: File,
  mimeType: "image/jpeg" | "image/png",
  options: ImageTransformOptions = {}
) {
  const bitmap = await createImageBitmap(file);
  const ratio = bitmap.width / bitmap.height;
  const width =
    options.width ??
    (options.height ? Math.round(options.height * ratio) : bitmap.width);
  const height =
    options.height ??
    (options.width ? Math.round(options.width / ratio) : bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("No se pudo preparar el lienzo de procesamiento.");
  }

  if (mimeType === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mimeType, options.quality ?? 0.86);
  });

  if (!blob) {
    throw new Error("No se pudo generar la imagen de salida.");
  }

  return blob;
}

export async function getImageDimensions(file: File) {
  const bitmap = await createImageBitmap(file);
  const dimensions = { height: bitmap.height, width: bitmap.width };
  bitmap.close();
  return dimensions;
}
