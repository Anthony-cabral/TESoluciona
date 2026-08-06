import type { Metadata } from "next";

import { ContentCard } from "@/components/content/content-card";
import { Container } from "@/components/layout/container";
import { SearchBox } from "@/components/search/search-box";
import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";

export const metadata: Metadata = {
  title: "Guías paso a paso | Tesoluciona",
  description:
    "Biblioteca de guías tecnológicas con instrucciones, comandos copiables, advertencias y verificación final."
};

export default function GuidesPage() {
  const categoryBySlug = new Map(
    categories.map((category) => [category.slug, category.name])
  );
  const guides = [...articles].sort(
    (left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  );

  return (
    <Container className="py-10">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">
          Biblioteca
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
          Guías paso a paso
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">
          Encuentra soluciones completas con requisitos previos, comandos,
          advertencias, alternativas, verificación final y artículos
          relacionados.
        </p>
        <SearchBox
          className="mx-auto mt-8 max-w-3xl"
          id="guides-search"
          size="large"
        />
      </section>

      <section className="mt-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((article) => (
            <ContentCard
              description={article.summary}
              eyebrow={categoryBySlug.get(article.categorySlug) ?? "Guía"}
              href={`/articulos/${article.slug}`}
              key={article.slug}
              meta={`${article.readingTimeMinutes} min · ${article.difficulty} · actualizado ${article.updatedAt}`}
              title={article.title}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
