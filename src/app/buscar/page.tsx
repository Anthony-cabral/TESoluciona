import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContentCard } from "@/components/content/content-card";
import { Container } from "@/components/layout/container";
import { NoResultsRecorder } from "@/components/search/no-results-recorder";
import { SearchBox } from "@/components/search/search-box";
import { categories } from "@/features/solutions/categories";
import { searchContent } from "@/features/solutions/search";
import type { ContentType } from "@/features/solutions/types";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    tipo?: string;
    categoria?: string;
    page?: string;
  }>;
};

const validTypes: ContentType[] = [
  "article",
  "guide",
  "error",
  "tool",
  "category"
];

export const metadata: Metadata = {
  title: "Buscar soluciones",
  description:
    "Busca guías, errores, categorías y herramientas en Tesoluciona.",
  robots: {
    follow: false,
    index: false
  }
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const type = validTypes.includes(params.tipo as ContentType)
    ? (params.tipo as ContentType)
    : undefined;
  const categorySlug = params.categoria;
  const page = Number(params.page ?? "1");
  const search = searchContent(query, {
    type,
    categorySlug,
    page,
    pageSize: 8
  });
  const totalPages = Math.max(1, Math.ceil(search.total / search.pageSize));

  return (
    <Container className="py-10">
      <NoResultsRecorder query={query} total={search.total} />
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Buscar soluciones
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Encuentra artículos, errores, herramientas, categorías y guías por
          título, descripción, código o palabras clave.
        </p>
      </div>
      <SearchBox
        className="mt-8 max-w-3xl"
        defaultValue={query}
        id="search-results-input"
        size="large"
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 lg:self-start">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Filtros
          </h2>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
              Tipo de contenido
            </p>
            <div className="mt-3 grid gap-2">
              <FilterLink
                href={`/buscar?q=${encodeURIComponent(query)}`}
                active={!type}
              >
                Todo
              </FilterLink>
              {validTypes.map((item) => (
                <FilterLink
                  active={type === item}
                  href={`/buscar?q=${encodeURIComponent(query)}&tipo=${item}`}
                  key={item}
                >
                  {search.typeLabels[item]}
                </FilterLink>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
              Categoría
            </p>
            <div className="mt-3 grid max-h-80 gap-2 overflow-auto">
              {categories.slice(0, 16).map((category) => (
                <FilterLink
                  active={categorySlug === category.slug}
                  href={`/buscar?q=${encodeURIComponent(query)}&categoria=${category.slug}`}
                  key={category.slug}
                >
                  {category.name}
                </FilterLink>
              ))}
            </div>
          </div>
        </aside>

        <section>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                {query ? `Resultados para “${query}”` : "Escribe una búsqueda"}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {search.total} resultado(s), ordenados por relevancia.
              </p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Página {search.page} de {totalPages}
            </p>
          </div>

          {search.results.length ? (
            <div className="mt-6 grid gap-4">
              {search.results.map((result) => (
                <ContentCard
                  description={result.description}
                  eyebrow={`${search.typeLabels[result.type]} · ${result.category}`}
                  href={result.url}
                  key={`${result.type}-${result.id}`}
                  meta={`Actualizado ${result.updatedAt} · Relevancia ${result.relevance}`}
                  title={result.title}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-950 dark:text-white">
                No encontramos resultados exactos
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Prueba con menos palabras, un código de error completo o el
                nombre de la aplicación afectada.
              </p>
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mt-8 flex gap-3" aria-label="Paginación">
              {search.page > 1 ? (
                <Link
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-brand-600 dark:border-slate-600"
                  href={`/buscar?q=${encodeURIComponent(query)}&page=${search.page - 1}`}
                >
                  Anterior
                </Link>
              ) : null}
              {search.page < totalPages ? (
                <Link
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-brand-600 dark:border-slate-600"
                  href={`/buscar?q=${encodeURIComponent(query)}&page=${search.page + 1}`}
                >
                  Siguiente
                </Link>
              ) : null}
            </nav>
          ) : null}

          {search.relatedSuggestions.length ? (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                Sugerencias relacionadas
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {search.relatedSuggestions.map((suggestion) => (
                  <Link
                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    href={`/buscar?q=${encodeURIComponent(suggestion)}`}
                    key={suggestion}
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </Container>
  );
}

function FilterLink({
  active,
  children,
  href
}: {
  active: boolean;
  children: ReactNode;
  href: string;
}) {
  return (
    <Link
      className={`rounded-md px-3 py-2 text-sm font-medium ${
        active
          ? "bg-brand-700 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
