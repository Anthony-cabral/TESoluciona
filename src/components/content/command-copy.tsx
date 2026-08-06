"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CommandCopyProps = {
  label: string;
  value: string;
};

export function CommandCopy({ label, value }: CommandCopyProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-slate-950 text-white dark:border-slate-700">
      <div className="flex items-center justify-between gap-3 border-b border-slate-700 px-4 py-2">
        <span className="text-xs font-semibold uppercase text-slate-300">
          {label}
        </span>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-3 py-1 text-xs font-semibold text-white hover:border-brand-300 hover:text-brand-200"
          onClick={copy}
          type="button"
        >
          {copied ? (
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <Copy aria-hidden="true" className="h-3.5 w-3.5" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-sm">
        <code>{value}</code>
      </pre>
    </div>
  );
}
