"use client";

import QRCode from "qrcode";
import { Copy, RefreshCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

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

type ToolRunnerProps = {
  slug: string;
};

export function ToolRunner({ slug }: ToolRunnerProps) {
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
  onClick
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex w-fit rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
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
