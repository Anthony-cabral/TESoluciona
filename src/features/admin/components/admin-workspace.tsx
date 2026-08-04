"use client";

import { Archive, CheckCircle, Edit3, FilePlus, Save } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";

type EditorialArticle = {
  title: string;
  slug: string;
  summary: string;
  categorySlug: string;
  status: "draft" | "published" | "archived";
  updatedAt: string;
};

const storageKey = "tesoluciona-admin-articles";
const noResultsKey = "tesoluciona-search-no-results";

function createSeededArticles(): EditorialArticle[] {
  return articles.slice(0, 12).map((article) => ({
    categorySlug: article.categorySlug,
    slug: article.slug,
    status: article.status === "published" ? "published" : "draft",
    summary: article.summary,
    title: article.title,
    updatedAt: article.updatedAt
  }));
}

function readStoredArticles() {
  if (typeof window === "undefined") return createSeededArticles();

  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : createSeededArticles();
  } catch {
    return createSeededArticles();
  }
}

export function AdminWorkspace() {
  const [items, setItems] = useState<EditorialArticle[]>(readStoredArticles);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [form, setForm] = useState<EditorialArticle>({
    categorySlug: "windows",
    slug: "",
    status: "draft",
    summary: "",
    title: "",
    updatedAt: new Date().toISOString().slice(0, 10)
  });
  const [noResults, setNoResults] = useState<string[]>([]);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(noResultsKey) ?? "[]");
        setNoResults(
          Array.isArray(stored)
            ? stored.filter((item) => typeof item === "string")
            : []
        );
      } catch {
        setNoResults([]);
      }
    });
  }, []);

  function persist(nextItems: EditorialArticle[]) {
    setItems(nextItems);
    localStorage.setItem(storageKey, JSON.stringify(nextItems));
  }

  function save(status = form.status) {
    const safeSlug =
      form.slug ||
      form.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const nextArticle = {
      ...form,
      slug: safeSlug,
      status,
      updatedAt: new Date().toISOString().slice(0, 10)
    };

    const exists = items.some((item) => item.slug === safeSlug);
    const nextItems = exists
      ? items.map((item) => (item.slug === safeSlug ? nextArticle : item))
      : [nextArticle, ...items];

    persist(nextItems);
    setSelectedSlug(safeSlug);
    setForm(nextArticle);
  }

  function newArticle() {
    setSelectedSlug("");
    setForm({
      categorySlug: "windows",
      slug: "",
      status: "draft",
      summary: "",
      title: "",
      updatedAt: new Date().toISOString().slice(0, 10)
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
          onClick={newArticle}
          type="button"
        >
          <FilePlus aria-hidden="true" className="h-4 w-4" />
          Crear artículo
        </button>
        <div className="mt-5 grid gap-2">
          {items.map((item) => (
            <button
              className={`rounded-md px-3 py-2 text-left text-sm ${
                selectedSlug === item.slug
                  ? "bg-brand-700 text-white"
                  : "bg-slate-100 text-slate-800 hover:bg-brand-50 dark:bg-slate-800 dark:text-slate-100"
              }`}
              key={item.slug}
              onClick={() => {
                setSelectedSlug(item.slug);
                setForm(item);
              }}
              type="button"
            >
              <span className="font-semibold">{item.title}</span>
              <span className="mt-1 block text-xs opacity-80">
                {item.status}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="grid gap-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Edit3 aria-hidden="true" className="h-5 w-5 text-brand-700" />
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              Editor de artículo
            </h2>
          </div>
          <div className="mt-5 grid gap-4">
            <AdminInput
              label="Título"
              onChange={(value) => setForm({ ...form, title: value })}
              value={form.title}
            />
            <AdminInput
              label="Slug"
              onChange={(value) => setForm({ ...form, slug: value })}
              value={form.slug}
            />
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Categoría
              <select
                className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
                onChange={(event) =>
                  setForm({ ...form, categorySlug: event.target.value })
                }
                value={form.categorySlug}
              >
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Resumen
              <textarea
                className="mt-2 min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
                onChange={(event) =>
                  setForm({ ...form, summary: event.target.value })
                }
                value={form.summary}
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <AdminAction
                icon={Save}
                label="Guardar borrador"
                onClick={() => save("draft")}
              />
              <AdminAction
                icon={CheckCircle}
                label="Publicar"
                onClick={() => save("published")}
              />
              <AdminAction
                icon={Archive}
                label="Archivar"
                onClick={() => save("archived")}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <AdminList
            items={categories.map(
              (category) => `${category.name} (${category.slug})`
            )}
            title="Categorías"
          />
          <AdminList
            items={Array.from(
              new Set(articles.flatMap((article) => article.tags))
            ).slice(0, 30)}
            title="Etiquetas"
          />
          <AdminList
            items={errorEntries.map(
              (entry) => `${entry.product}: ${entry.code}`
            )}
            title="Errores"
          />
          <AdminList
            items={tools.map((tool) => `${tool.name} · ${tool.status}`)}
            title="Herramientas"
          />
          <AdminList
            items={Array.from(
              new Set(
                articles.flatMap((article) =>
                  article.references.map((reference) => reference.publisher)
                )
              )
            )}
            title="Fuentes"
          />
          <AdminList
            items={
              noResults.length
                ? noResults
                : ["Sin consultas sin resultados registradas localmente."]
            }
            title="Búsquedas sin resultados"
          />
        </section>
      </div>
    </div>
  );
}

function AdminInput({
  label,
  onChange,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
      {label}
      <input
        className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function AdminAction({
  icon: Icon,
  label,
  onClick
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700 dark:border-slate-600 dark:text-slate-100"
      onClick={onClick}
      type="button"
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      {label}
    </button>
  );
}

function AdminList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="font-semibold text-slate-950 dark:text-white">{title}</h2>
      <ul className="mt-4 grid max-h-64 gap-2 overflow-auto text-sm text-slate-700 dark:text-slate-200">
        {items.map((item) => (
          <li
            className="rounded bg-slate-50 px-3 py-2 dark:bg-slate-800"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
