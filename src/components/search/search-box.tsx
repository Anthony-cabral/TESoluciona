"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { getSearchSuggestions } from "@/features/solutions/search";

type SearchBoxProps = {
  className?: string;
  defaultValue?: string;
  id?: string;
  size?: "default" | "large";
};

const historyKey = "tesoluciona-search-history";

function readSearchHistory() {
  if (typeof window === "undefined") return [];

  try {
    const stored = JSON.parse(localStorage.getItem(historyKey) ?? "[]");
    return Array.isArray(stored)
      ? stored.filter((item) => typeof item === "string").slice(0, 6)
      : [];
  } catch {
    return [];
  }
}

export function SearchBox({
  className = "",
  defaultValue = "",
  id = "site-search",
  size = "default"
}: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [history, setHistory] = useState<string[]>(readSearchHistory);
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const matches = getSearchSuggestions(query).slice(0, 6);
    const combined = [...history, ...matches].filter(Boolean);
    return Array.from(new Set(combined)).slice(0, 8);
  }, [history, query]);

  function submitSearch(value = query) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const nextHistory = [
      trimmed,
      ...history.filter((item) => item !== trimmed)
    ].slice(0, 6);
    setHistory(nextHistory);
    localStorage.setItem(historyKey, JSON.stringify(nextHistory));
    router.push(`/buscar?q=${encodeURIComponent(trimmed)}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitSearch();
  }

  return (
    <form
      className={`relative ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="sr-only" htmlFor={id}>
        Buscar soluciones
      </label>
      <div className="flex rounded-lg border border-slate-300 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-500/30 dark:border-slate-600 dark:bg-slate-950">
        <span className="inline-flex items-center px-3 text-slate-500 dark:text-slate-300">
          <Search aria-hidden="true" className="h-5 w-5" />
        </span>
        <input
          autoComplete="off"
          className={`w-full bg-transparent text-slate-950 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-slate-400 ${
            size === "large" ? "h-14 text-base md:text-lg" : "h-11 text-sm"
          }`}
          id={id}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Busca un error, programa, comando o problema..."
          value={query}
        />
        {query ? (
          <button
            aria-label="Limpiar búsqueda"
            className="inline-flex h-auto w-11 items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            onClick={() => setQuery("")}
            type="button"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : null}
        <button
          className="m-1 inline-flex items-center justify-center rounded-md bg-brand-700 px-4 text-sm font-semibold text-white transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          type="submit"
        >
          Buscar
        </button>
      </div>

      {focused && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-950">
          <p className="border-b border-slate-200 px-4 py-2 text-xs font-semibold uppercase text-slate-600 dark:border-slate-700 dark:text-slate-300">
            Sugerencias e historial
          </p>
          <ul className="max-h-72 overflow-auto py-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-800 hover:bg-brand-50 hover:text-brand-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => submitSearch(suggestion)}
                  type="button"
                >
                  <Search
                    aria-hidden="true"
                    className="h-4 w-4 text-brand-700"
                  />
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
}
