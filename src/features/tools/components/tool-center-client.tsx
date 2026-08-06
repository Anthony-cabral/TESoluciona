"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { ToolMetadata } from "@/features/solutions/types";

type ToolCenterClientProps = {
  categories: string[];
  tools: ToolMetadata[];
};

const favoritesKey = "tesoluciona.toolFavorites";
const historyKey = "tesoluciona.toolHistory";

const categoryLabels: Record<string, string> = {
  ciberseguridad: "Seguridad",
  imagenes: "Imagenes",
  pdf: "PDF",
  powershell: "Desarrollo",
  redes: "Redes",
  sql: "Datos",
  word: "Texto"
};

export function ToolCenterClient({ categories, tools }: ToolCenterClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [favorites, setFavorites] = useState<string[]>(() =>
    readLocalList(favoritesKey)
  );
  const [history, setHistory] = useState<string[]>(() =>
    readLocalList(historyKey)
  );

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const label = getCategoryLabel(tool);
      const matchesCategory = category === "Todas" || label === category;
      const searchable = [
        tool.name,
        tool.summary ?? "",
        tool.description,
        ...tool.tags,
        ...tool.keywords,
        ...tool.useCases,
        ...tool.examples
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [category, query, tools]);

  const popularTools = tools.filter((tool) => tool.popular).slice(0, 6);
  const recentTools = tools.filter((tool) => tool.recent).slice(0, 6);
  const favoriteTools = tools.filter((tool) => favorites.includes(tool.slug));
  const historyTools = history
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is ToolMetadata => Boolean(tool));

  function toggleFavorite(slug: string) {
    const next = favorites.includes(slug)
      ? favorites.filter((item) => item !== slug)
      : [slug, ...favorites].slice(0, 20);
    setFavorites(next);
    window.localStorage.setItem(favoritesKey, JSON.stringify(next));
  }

  function rememberTool(slug: string) {
    const next = [slug, ...history.filter((item) => item !== slug)].slice(
      0,
      12
    );
    setHistory(next);
    window.localStorage.setItem(historyKey, JSON.stringify(next));
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <label className="grid gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            Buscar herramienta
            <input
              className="rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:shadow-focus dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="PDF, JPG, comprimir, redimensionar..."
              type="search"
              value={query}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            Categoria
            <select
              className="rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-brand-500 focus:shadow-focus dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              <option>Todas</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-4 rounded-md bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900 dark:bg-brand-900/30 dark:text-brand-100">
          Privacidad: las herramientas activas de archivos procesan en tu
          navegador cuando es posible. No se suben documentos ni imagenes a
          Tesoluciona en el Lote 1.
        </p>
      </section>

      <ToolSection
        favorites={favorites}
        onOpen={rememberTool}
        onToggleFavorite={toggleFavorite}
        title="Herramientas disponibles"
        tools={filteredTools}
      />

      {favoriteTools.length ? (
        <ToolSection
          favorites={favorites}
          onOpen={rememberTool}
          onToggleFavorite={toggleFavorite}
          title="Favoritos locales"
          tools={favoriteTools}
        />
      ) : null}

      {historyTools.length ? (
        <ToolSection
          favorites={favorites}
          onOpen={rememberTool}
          onToggleFavorite={toggleFavorite}
          title="Historial local"
          tools={historyTools}
        />
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <ToolSection
          favorites={favorites}
          onOpen={rememberTool}
          onToggleFavorite={toggleFavorite}
          title="Populares"
          tools={popularTools}
        />
        <ToolSection
          favorites={favorites}
          onOpen={rememberTool}
          onToggleFavorite={toggleFavorite}
          title="Recientes"
          tools={recentTools}
        />
      </div>
    </div>
  );
}

function ToolSection({
  favorites,
  onOpen,
  onToggleFavorite,
  title,
  tools
}: {
  favorites: string[];
  onOpen: (slug: string) => void;
  onToggleFavorite: (slug: string) => void;
  title: string;
  tools: ToolMetadata[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
        {title}
      </h2>
      {tools.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              key={tool.slug}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-brand-700 dark:text-brand-300">
                    {getCategoryLabel(tool)} · Operativa
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-slate-950 dark:text-white">
                    {tool.name}
                  </h3>
                </div>
                <button
                  aria-label={
                    favorites.includes(tool.slug)
                      ? `Quitar ${tool.name} de favoritos`
                      : `Agregar ${tool.name} a favoritos`
                  }
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-600 dark:text-white dark:hover:text-brand-200"
                  onClick={() => onToggleFavorite(tool.slug)}
                  type="button"
                >
                  {favorites.includes(tool.slug) ? "Guardada" : "Guardar"}
                </button>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {tool.summary ?? tool.description}
              </p>
              <dl className="mt-4 grid gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between gap-3">
                  <dt>Procesamiento</dt>
                  <dd>{tool.privacy?.localOnly ? "Local" : "Servidor"}</dd>
                </div>
                {tool.limits ? (
                  <div className="flex justify-between gap-3">
                    <dt>Limite</dt>
                    <dd>
                      {tool.limits.maxFiles} archivo
                      {tool.limits.maxFiles === 1 ? "" : "s"} ·{" "}
                      {tool.limits.maxFileSizeMb} MB
                    </dd>
                  </div>
                ) : null}
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.tags.slice(0, 4).map((tag) => (
                  <span
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                className="mt-5 inline-flex rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
                href={`/herramientas/${tool.slug}`}
                onClick={() => onOpen(tool.slug)}
              >
                Abrir herramienta
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          No hay herramientas activas que coincidan con esos filtros.
        </p>
      )}
    </section>
  );
}

function getCategoryLabel(tool: ToolMetadata) {
  return categoryLabels[tool.categorySlug] ?? tool.categorySlug;
}

function readLocalList(key: string) {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}
