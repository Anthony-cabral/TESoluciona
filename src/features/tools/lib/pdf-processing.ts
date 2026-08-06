"use client";

import { PDFDocument } from "pdf-lib";

import {
  createGeneratedFile,
  getImageDimensions,
  renderImageToBlob,
  replaceExtension,
  type GeneratedFile
} from "@/features/tools/lib/browser-file-processing";

type ProgressCallback = (value: number) => void;

function bytesToArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export async function imagesToPdf(input: {
  files: File[];
  jpgOnly?: boolean;
  objectUrls: string[];
  onProgress: ProgressCallback;
  outputName: string;
}) {
  const pdf = await PDFDocument.create();

  for (const [index, file] of input.files.entries()) {
    const dimensions = await getImageDimensions(file);
    const source =
      file.type === "image/png" && !input.jpgOnly
        ? new Uint8Array(await file.arrayBuffer())
        : new Uint8Array(
            await (
              await renderImageToBlob(file, "image/jpeg", { quality: 0.92 })
            ).arrayBuffer()
          );
    const image =
      file.type === "image/png" && !input.jpgOnly
        ? await pdf.embedPng(source)
        : await pdf.embedJpg(source);
    const page = pdf.addPage([dimensions.width, dimensions.height]);
    page.drawImage(image, {
      height: dimensions.height,
      width: dimensions.width,
      x: 0,
      y: 0
    });
    input.onProgress(Math.round(((index + 1) / input.files.length) * 80));
  }

  const bytes = await pdf.save({ useObjectStreams: true });
  return [
    createGeneratedFile({
      blob: new Blob([bytesToArrayBuffer(bytes)], { type: "application/pdf" }),
      fileName: input.outputName,
      objectUrls: input.objectUrls
    })
  ];
}

export async function mergePdfFiles(input: {
  files: File[];
  objectUrls: string[];
  onProgress: ProgressCallback;
}) {
  const merged = await PDFDocument.create();

  for (const [index, file] of input.files.entries()) {
    const source = await PDFDocument.load(await file.arrayBuffer(), {
      ignoreEncryption: false
    });
    const pages = await merged.copyPages(source, source.getPageIndices());
    for (const page of pages) {
      merged.addPage(page);
    }
    input.onProgress(Math.round(((index + 1) / input.files.length) * 80));
  }

  const bytes = await merged.save({ useObjectStreams: true });
  return [
    createGeneratedFile({
      blob: new Blob([bytesToArrayBuffer(bytes)], { type: "application/pdf" }),
      fileName: "pdf-unido.pdf",
      objectUrls: input.objectUrls
    })
  ];
}

export async function splitPdfFile(input: {
  file: File;
  objectUrls: string[];
  onProgress: ProgressCallback;
}) {
  const source = await PDFDocument.load(await input.file.arrayBuffer(), {
    ignoreEncryption: false
  });
  const results: GeneratedFile[] = [];
  const pageCount = source.getPageCount();

  for (let index = 0; index < pageCount; index += 1) {
    const output = await PDFDocument.create();
    const [page] = await output.copyPages(source, [index]);
    output.addPage(page);
    const bytes = await output.save({ useObjectStreams: true });
    results.push(
      createGeneratedFile({
        blob: new Blob([bytesToArrayBuffer(bytes)], {
          type: "application/pdf"
        }),
        fileName: replaceExtension(input.file.name, `pagina-${index + 1}.pdf`),
        objectUrls: input.objectUrls
      })
    );
    input.onProgress(Math.round(((index + 1) / pageCount) * 90));
  }

  return results;
}

export async function compressPdfFile(input: {
  file: File;
  objectUrls: string[];
}) {
  const sourceBytes = await input.file.arrayBuffer();
  const source = await PDFDocument.load(sourceBytes, {
    ignoreEncryption: false,
    updateMetadata: false
  });
  source.setTitle("");
  source.setSubject("");
  source.setKeywords([]);
  source.setProducer("Tesoluciona local PDF optimizer");
  const bytes = await source.save({
    addDefaultPage: false,
    objectsPerTick: 50,
    useObjectStreams: true
  });

  return [
    createGeneratedFile({
      blob: new Blob([bytesToArrayBuffer(bytes)], { type: "application/pdf" }),
      fileName: replaceExtension(input.file.name, "optimizado.pdf"),
      objectUrls: input.objectUrls
    })
  ];
}

export async function pdfToJpg(input: {
  file: File;
  objectUrls: string[];
  onProgress: ProgressCallback;
}) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
  const data = new Uint8Array(await input.file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  const document = await task.promise;
  const results: GeneratedFile[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = window.document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("No se pudo preparar el lienzo para renderizar el PDF.");
    }

    await page.render({ canvas, canvasContext: context, viewport }).promise;
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.9);
    });

    if (!blob) {
      throw new Error(`No se pudo generar la pagina ${pageNumber}.`);
    }

    results.push(
      createGeneratedFile({
        blob,
        fileName: replaceExtension(input.file.name, `pagina-${pageNumber}.jpg`),
        objectUrls: input.objectUrls
      })
    );
    input.onProgress(Math.round((pageNumber / document.numPages) * 90));
  }

  await task.destroy();
  return results;
}
