"use client";

import {
  createGeneratedFile,
  renderImageToBlob,
  replaceExtension,
  type GeneratedFile
} from "@/features/tools/lib/browser-file-processing";

type ProgressCallback = (value: number) => void;

export async function convertImages(input: {
  files: File[];
  mimeType: "image/jpeg" | "image/png";
  objectUrls: string[];
  onProgress: ProgressCallback;
  quality?: number;
}) {
  const results: GeneratedFile[] = [];
  const extension = input.mimeType === "image/png" ? "png" : "jpg";

  for (const [index, file] of input.files.entries()) {
    const blob = await renderImageToBlob(file, input.mimeType, {
      quality: input.quality ?? 0.9
    });
    results.push(
      createGeneratedFile({
        blob,
        fileName: replaceExtension(file.name, extension),
        objectUrls: input.objectUrls
      })
    );
    input.onProgress(Math.round(((index + 1) / input.files.length) * 90));
  }

  return results;
}

export async function resizeImages(input: {
  files: File[];
  height?: number;
  objectUrls: string[];
  onProgress: ProgressCallback;
  width?: number;
}) {
  const results: GeneratedFile[] = [];

  for (const [index, file] of input.files.entries()) {
    const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await renderImageToBlob(file, mimeType, {
      height: input.height,
      quality: 0.88,
      width: input.width
    });
    results.push(
      createGeneratedFile({
        blob,
        fileName: replaceExtension(
          file.name,
          mimeType === "image/png" ? "redimensionado.png" : "redimensionado.jpg"
        ),
        objectUrls: input.objectUrls
      })
    );
    input.onProgress(Math.round(((index + 1) / input.files.length) * 90));
  }

  return results;
}

export async function compressImages(input: {
  files: File[];
  objectUrls: string[];
  onProgress: ProgressCallback;
  quality: number;
}) {
  const results: GeneratedFile[] = [];

  for (const [index, file] of input.files.entries()) {
    const blob = await renderImageToBlob(file, "image/jpeg", {
      quality: input.quality
    });
    results.push(
      createGeneratedFile({
        blob,
        fileName: replaceExtension(file.name, "comprimido.jpg"),
        objectUrls: input.objectUrls
      })
    );
    input.onProgress(Math.round(((index + 1) / input.files.length) * 90));
  }

  return results;
}
