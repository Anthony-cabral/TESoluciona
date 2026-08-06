"use client";

import QRCode from "qrcode";
import { Copy, Download, RefreshCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { getToolBySlug } from "@/features/solutions/tools";
import type { FileToolOperation } from "@/features/solutions/types";
import {
  downloadUrl,
  formatBytes,
  revokeObjectUrls,
  validateBrowserFiles,
  type GeneratedFile
} from "@/features/tools/lib/browser-file-processing";
import type { FileKind } from "@/features/tools/lib/file-validation";
import {
  compressImages,
  convertImages,
  resizeImages
} from "@/features/tools/lib/image-processing";
import {
  calculateIPv4,
  calculateSubnetForHosts
} from "@/features/tools/lib/ip";
import {
  evaluatePasswordStrength,
  generatePassword
} from "@/features/tools/lib/password";
import {
  compressPdfFile,
  imagesToPdf,
  mergePdfFiles,
  pdfToJpg,
  splitPdfFile
} from "@/features/tools/lib/pdf-processing";
import {
  countText,
  decodeBase64,
  encodeBase64,
  formatJson
} from "@/features/tools/lib/text";

type ToolRunnerProps = {
  slug: string;
};

export function ToolRunner({ slug }: ToolRunnerProps) {
  const metadata = getToolBySlug(slug);

  if (metadata?.operation) {
    return <FileTool operation={metadata.operation} slug={slug} />;
  }

  if (slug === "calculadora-ipv4") return <IPv4Tool />;
  if (slug === "calculadora-subred") return <SubnetTool />;
  if (slug === "generador-uuid") return <UuidTool />;
  if (slug === "generador-contrasenas") return <PasswordGeneratorTool />;
  if (slug === "fortaleza-contrasena") return <PasswordStrengthTool />;
  if (slug === "base64") return <Base64Tool />;
  if (slug === "url-encoder-decoder") return <UrlTool />;
  if (slug === "json-formatter") return <JsonTool />;
  if (slug === "contador-palabras") return <WordCounterTool />;
  if (slug === "generador-qr") return <QrTool />;

  return null;
}

function ToolShell({
  children,
  error,
  onClear,
  result
}: {
  children: ReactNode;
  error?: string;
  onClear: () => void;
  result?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="grid gap-4">{children}</div>
      {error ? (
        <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
          {error}
        </p>
      ) : null}
      {result ? <div className="mt-5">{result}</div> : null}
      <button
        className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700 dark:border-slate-600 dark:text-slate-100"
        onClick={onClear}
        type="button"
      >
        <RefreshCcw aria-hidden="true" className="h-4 w-4" />
        Limpiar
      </button>
    </div>
  );
}

function FileTool({
  operation,
  slug
}: {
  operation: FileToolOperation;
  slug: string;
}) {
  const metadata = getToolBySlug(slug);
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<GeneratedFile[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState("82");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const objectUrls = useRef<string[]>([]);
  const limits = metadata?.limits ?? {
    acceptedFormats: ["PDF"],
    maxFileSizeMb: 25,
    maxFiles: 1,
    outputFormats: ["PDF"]
  };
  const acceptedKinds = getAcceptedKinds(operation);

  useEffect(() => {
    return () => revokeObjectUrls(objectUrls.current);
  }, []);

  function clear() {
    revokeObjectUrls(objectUrls.current);
    objectUrls.current = [];
    setFiles([]);
    setResults([]);
    setError("");
    setBusy(false);
    setProgress(0);
    setQuality("82");
    setWidth("");
    setHeight("");
  }

  async function run() {
    try {
      setBusy(true);
      setError("");
      setProgress(5);
      revokeObjectUrls(objectUrls.current);
      objectUrls.current = [];
      setResults([]);

      await validateBrowserFiles({
        acceptedKinds,
        files,
        maxFileSizeMb: limits.maxFileSizeMb,
        maxFiles: limits.maxFiles
      });

      if (operation === "merge-pdf" && files.length < 2) {
        throw new Error("Selecciona al menos dos PDF para unir.");
      }

      const generated = await processFiles({
        files,
        height: Number.parseInt(height, 10),
        objectUrls: objectUrls.current,
        onProgress: setProgress,
        operation,
        quality: Math.min(95, Math.max(45, Number.parseInt(quality, 10))) / 100,
        width: Number.parseInt(width, 10)
      });

      setResults(generated);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo procesar.");
      setProgress(0);
    } finally {
      setBusy(false);
    }
  }

  const showQuality =
    operation === "png-to-jpg" || operation === "compress-image";
  const showSize = operation === "resize-image";

  return (
    <ToolShell
      error={error}
      onClear={clear}
      result={results.length ? <FileResultList files={results} /> : undefined}
    >
      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
        Archivos
        <input
          accept={getAcceptValue(acceptedKinds)}
          className="mt-2 block w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 file:mr-4 file:rounded-md file:border-0 file:bg-brand-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-brand-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
          multiple={limits.maxFiles > 1}
          onChange={(event) => {
            setFiles(Array.from(event.target.files ?? []));
            setResults([]);
            setError("");
            setProgress(0);
          }}
          type="file"
        />
      </label>

      <div className="rounded-md bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        <p>
          Formatos: {limits.acceptedFormats.join(", ")}. Salida:{" "}
          {limits.outputFormats.join(", ")}.
        </p>
        <p>
          Limite: {limits.maxFiles} archivo
          {limits.maxFiles === 1 ? "" : "s"} de hasta {limits.maxFileSizeMb} MB
          cada uno.
        </p>
        {files.length ? (
          <p>
            Seleccionados:{" "}
            {files
              .map((file) => `${file.name} (${formatBytes(file.size)})`)
              .join(", ")}
          </p>
        ) : null}
      </div>

      {showSize ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <TextInput
            label="Ancho en pixeles"
            onChange={setWidth}
            placeholder="1200"
            value={width}
          />
          <TextInput
            label="Alto en pixeles"
            onChange={setHeight}
            placeholder="800"
            value={height}
          />
        </div>
      ) : null}

      {showQuality ? (
        <TextInput
          label="Calidad JPG (45 a 95)"
          onChange={setQuality}
          placeholder="82"
          value={quality}
        />
      ) : null}

      {busy || progress > 0 ? (
        <div aria-live="polite">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full bg-brand-700 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            {busy ? `Procesando ${progress}%` : "Procesamiento completado"}
          </p>
        </div>
      ) : null}

      <PrimaryButton disabled={busy} onClick={run}>
        {busy ? "Procesando..." : getActionLabel(operation)}
      </PrimaryButton>
    </ToolShell>
  );
}

function FileResultList({ files }: { files: GeneratedFile[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-950 dark:text-white">
          Archivos generados
        </p>
        {files.length > 1 ? (
          <button
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-800 hover:border-brand-600 dark:border-slate-600 dark:text-slate-100"
            onClick={() => {
              for (const file of files) {
                downloadUrl(file.url, file.fileName);
              }
            }}
            type="button"
          >
            <Download aria-hidden="true" className="h-3.5 w-3.5" />
            Descargar todo
          </button>
        ) : null}
      </div>
      <ul className="mt-3 grid gap-2">
        {files.map((file) => (
          <li
            className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-sm text-slate-800 dark:bg-slate-900 dark:text-slate-100"
            key={`${file.fileName}-${file.url}`}
          >
            <span>
              {file.fileName} · {formatBytes(file.size)}
            </span>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-800"
              onClick={() => downloadUrl(file.url, file.fileName)}
              type="button"
            >
              <Download aria-hidden="true" className="h-3.5 w-3.5" />
              Descargar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function processFiles(input: {
  files: File[];
  height: number;
  objectUrls: string[];
  onProgress: (value: number) => void;
  operation: FileToolOperation;
  quality: number;
  width: number;
}) {
  if (input.operation === "images-to-pdf") {
    return imagesToPdf({
      files: input.files,
      objectUrls: input.objectUrls,
      onProgress: input.onProgress,
      outputName: "imagenes-a-pdf.pdf"
    });
  }

  if (input.operation === "jpg-to-pdf") {
    return imagesToPdf({
      files: input.files,
      jpgOnly: true,
      objectUrls: input.objectUrls,
      onProgress: input.onProgress,
      outputName: "jpg-a-pdf.pdf"
    });
  }

  if (input.operation === "merge-pdf") {
    return mergePdfFiles(input);
  }

  if (input.operation === "split-pdf") {
    return splitPdfFile({
      file: input.files[0],
      objectUrls: input.objectUrls,
      onProgress: input.onProgress
    });
  }

  if (input.operation === "compress-pdf") {
    input.onProgress(45);
    return compressPdfFile({
      file: input.files[0],
      objectUrls: input.objectUrls
    });
  }

  if (input.operation === "pdf-to-jpg") {
    return pdfToJpg({
      file: input.files[0],
      objectUrls: input.objectUrls,
      onProgress: input.onProgress
    });
  }

  if (input.operation === "jpg-to-png") {
    return convertImages({
      files: input.files,
      mimeType: "image/png",
      objectUrls: input.objectUrls,
      onProgress: input.onProgress
    });
  }

  if (input.operation === "png-to-jpg") {
    return convertImages({
      files: input.files,
      mimeType: "image/jpeg",
      objectUrls: input.objectUrls,
      onProgress: input.onProgress,
      quality: input.quality
    });
  }

  if (input.operation === "resize-image") {
    if (!Number.isFinite(input.width) && !Number.isFinite(input.height)) {
      throw new Error("Indica ancho, alto o ambos para redimensionar.");
    }

    return resizeImages({
      files: input.files,
      height: Number.isFinite(input.height) ? input.height : undefined,
      objectUrls: input.objectUrls,
      onProgress: input.onProgress,
      width: Number.isFinite(input.width) ? input.width : undefined
    });
  }

  return compressImages({
    files: input.files,
    objectUrls: input.objectUrls,
    onProgress: input.onProgress,
    quality: input.quality
  });
}

function getAcceptedKinds(operation: FileToolOperation): FileKind[] {
  if (operation === "images-to-pdf") return ["jpg", "png", "webp"];
  if (operation === "jpg-to-pdf" || operation === "jpg-to-png") return ["jpg"];
  if (operation === "png-to-jpg") return ["png"];
  if (operation === "resize-image" || operation === "compress-image") {
    return ["jpg", "png", "webp"];
  }

  return ["pdf"];
}

function getAcceptValue(kinds: FileKind[]) {
  return kinds
    .flatMap((kind) => {
      if (kind === "jpg") return [".jpg", ".jpeg", "image/jpeg"];
      if (kind === "png") return [".png", "image/png"];
      if (kind === "webp") return [".webp", "image/webp"];
      return [".pdf", "application/pdf"];
    })
    .join(",");
}

function getActionLabel(operation: FileToolOperation) {
  const labels: Record<FileToolOperation, string> = {
    "compress-image": "Comprimir imagen",
    "compress-pdf": "Comprimir PDF",
    "images-to-pdf": "Convertir a PDF",
    "jpg-to-pdf": "Convertir JPG a PDF",
    "jpg-to-png": "Convertir JPG a PNG",
    "merge-pdf": "Unir PDF",
    "pdf-to-jpg": "Convertir PDF a JPG",
    "png-to-jpg": "Convertir PNG a JPG",
    "resize-image": "Redimensionar imagen",
    "split-pdf": "Dividir PDF"
  };

  return labels[operation];
}

function TextInput({
  label,
  onChange,
  placeholder,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
      {label}
      <input
        className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function TextArea({
  label,
  onChange,
  placeholder,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
      {label}
      <textarea
        className="mt-2 min-h-36 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function ResultBox({ value }: { value: string }) {
  async function copy() {
    await navigator.clipboard.writeText(value);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-950 dark:text-white">
          Resultado
        </p>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-800 hover:border-brand-600 dark:border-slate-600 dark:text-slate-100"
          onClick={copy}
          type="button"
        >
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
          Copiar
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-100">
        {value}
      </pre>
    </div>
  );
}

function IPv4Tool() {
  const [input, setInput] = useState("192.168.1.25/24");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    try {
      const value = calculateIPv4(input);
      setResult(
        [
          `IP: ${value.ip}`,
          `CIDR: /${value.cidr}`,
          `Máscara: ${value.subnetMask}`,
          `Wildcard: ${value.wildcardMask}`,
          `Red: ${value.networkAddress}`,
          `Broadcast: ${value.broadcastAddress}`,
          `Primer host: ${value.firstUsable}`,
          `Último host: ${value.lastUsable}`,
          `Direcciones totales: ${value.totalAddresses}`,
          `Hosts útiles: ${value.usableHosts}`
        ].join("\n")
      );
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo calcular.");
      setResult("");
    }
  }

  return (
    <ToolShell
      error={error}
      onClear={() => {
        setInput("");
        setResult("");
        setError("");
      }}
      result={result ? <ResultBox value={result} /> : undefined}
    >
      <TextInput
        label="IPv4 con CIDR"
        onChange={setInput}
        placeholder="192.168.1.25/24"
        value={input}
      />
      <PrimaryButton onClick={calculate}>Calcular</PrimaryButton>
    </ToolShell>
  );
}

function SubnetTool() {
  const [hosts, setHosts] = useState("50");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    try {
      const value = calculateSubnetForHosts(Number(hosts));
      setResult(
        [
          `Hosts solicitados: ${value.hostsRequested}`,
          `Prefijo sugerido: /${value.cidr}`,
          `Máscara: ${value.subnetMask}`,
          `Direcciones totales: ${value.totalAddresses}`,
          `Hosts útiles: ${value.usableHosts}`
        ].join("\n")
      );
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo calcular.");
      setResult("");
    }
  }

  return (
    <ToolShell
      error={error}
      onClear={() => {
        setHosts("");
        setResult("");
        setError("");
      }}
      result={result ? <ResultBox value={result} /> : undefined}
    >
      <TextInput
        label="Cantidad de hosts"
        onChange={setHosts}
        placeholder="50"
        value={hosts}
      />
      <PrimaryButton onClick={calculate}>Calcular subred</PrimaryButton>
    </ToolShell>
  );
}

function UuidTool() {
  const [result, setResult] = useState("");

  return (
    <ToolShell
      onClear={() => setResult("")}
      result={result ? <ResultBox value={result} /> : undefined}
    >
      <PrimaryButton onClick={() => setResult(crypto.randomUUID())}>
        Generar UUID
      </PrimaryButton>
    </ToolShell>
  );
}

function PasswordGeneratorTool() {
  const [length, setLength] = useState("20");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function generate() {
    try {
      setResult(
        generatePassword({
          length: Number(length),
          includeNumbers: true,
          includeSymbols: true,
          includeUppercase: true
        })
      );
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo generar.");
    }
  }

  return (
    <ToolShell
      error={error}
      onClear={() => {
        setLength("20");
        setResult("");
        setError("");
      }}
      result={result ? <ResultBox value={result} /> : undefined}
    >
      <TextInput
        label="Longitud"
        onChange={setLength}
        placeholder="20"
        value={length}
      />
      <PrimaryButton onClick={generate}>Generar contraseña</PrimaryButton>
    </ToolShell>
  );
}

function PasswordStrengthTool() {
  const [password, setPassword] = useState("");
  const result = password ? evaluatePasswordStrength(password) : null;

  return (
    <ToolShell
      onClear={() => setPassword("")}
      result={
        result ? (
          <ResultBox
            value={[
              `Fortaleza: ${result.label}`,
              `Puntaje: ${result.score}/9`,
              result.feedback.length
                ? `Mejoras: ${result.feedback.join(" ")}`
                : "No se detectaron mejoras básicas."
            ].join("\n")}
          />
        ) : undefined
      }
    >
      <TextInput
        label="Contraseña o muestra similar"
        onChange={setPassword}
        placeholder="Escribe una contraseña de prueba"
        value={password}
      />
    </ToolShell>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function run(mode: "encode" | "decode") {
    try {
      setResult(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo procesar.");
      setResult("");
    }
  }

  return (
    <ToolShell
      error={error}
      onClear={() => {
        setInput("");
        setResult("");
        setError("");
      }}
      result={result ? <ResultBox value={result} /> : undefined}
    >
      <TextArea
        label="Texto"
        onChange={setInput}
        placeholder="Tesoluciona"
        value={input}
      />
      <div className="flex flex-wrap gap-3">
        <PrimaryButton onClick={() => run("encode")}>Codificar</PrimaryButton>
        <SecondaryButton onClick={() => run("decode")}>
          Decodificar
        </SecondaryButton>
      </div>
    </ToolShell>
  );
}

function UrlTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function run(mode: "encode" | "decode") {
    try {
      setResult(
        mode === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input)
      );
      setError("");
    } catch {
      setError("La cadena URL no se pudo decodificar. Revisa los porcentajes.");
      setResult("");
    }
  }

  return (
    <ToolShell
      error={error}
      onClear={() => {
        setInput("");
        setResult("");
        setError("");
      }}
      result={result ? <ResultBox value={result} /> : undefined}
    >
      <TextArea
        label="Texto o parámetro URL"
        onChange={setInput}
        value={input}
      />
      <div className="flex flex-wrap gap-3">
        <PrimaryButton onClick={() => run("encode")}>Codificar</PrimaryButton>
        <SecondaryButton onClick={() => run("decode")}>
          Decodificar
        </SecondaryButton>
      </div>
    </ToolShell>
  );
}

function JsonTool() {
  const [input, setInput] = useState('{"ok":true}');
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function validate() {
    try {
      setResult(formatJson(input));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "JSON inválido.");
      setResult("");
    }
  }

  return (
    <ToolShell
      error={error}
      onClear={() => {
        setInput("");
        setResult("");
        setError("");
      }}
      result={result ? <ResultBox value={result} /> : undefined}
    >
      <TextArea label="JSON" onChange={setInput} value={input} />
      <PrimaryButton onClick={validate}>Validar y formatear</PrimaryButton>
    </ToolShell>
  );
}

function WordCounterTool() {
  const [input, setInput] = useState("");
  const result = countText(input);

  return (
    <ToolShell
      onClear={() => setInput("")}
      result={
        input ? (
          <ResultBox
            value={[
              `Palabras: ${result.words}`,
              `Caracteres: ${result.characters}`,
              `Caracteres sin espacios: ${result.charactersWithoutSpaces}`,
              `Frases: ${result.sentences}`,
              `Lectura estimada: ${result.readingTimeMinutes} min`
            ].join("\n")}
          />
        ) : undefined
      }
    >
      <TextArea label="Texto" onChange={setInput} value={input} />
    </ToolShell>
  );
}

function QrTool() {
  const [input, setInput] = useState("https://tesoluciona.local");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    try {
      if (!input.trim()) {
        throw new Error("Escribe texto o una URL para generar el QR.");
      }
      setResult(await QRCode.toDataURL(input, { margin: 2, width: 256 }));
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo generar el QR."
      );
      setResult("");
    }
  }

  return (
    <ToolShell
      error={error}
      onClear={() => {
        setInput("");
        setResult("");
        setError("");
      }}
      result={
        result ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Código QR generado"
              className="mx-auto h-64 w-64"
              src={result}
            />
            <a
              className="mt-4 inline-flex rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
              download="tesoluciona-qr.png"
              href={result}
            >
              Descargar QR
            </a>
          </div>
        ) : undefined
      }
    >
      <TextArea label="Texto o URL" onChange={setInput} value={input} />
      <PrimaryButton onClick={generate}>Generar QR</PrimaryButton>
    </ToolShell>
  );
}

function PrimaryButton({
  children,
  disabled = false,
  onClick
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex w-fit rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex w-fit rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700 dark:border-slate-600 dark:text-slate-100"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
