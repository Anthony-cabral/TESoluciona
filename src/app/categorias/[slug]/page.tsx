import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentCard } from "@/components/content/content-card";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { CategoryIcon } from "@/components/icons/category-icon";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { articles } from "@/features/solutions/articles";
import { getCategoryBySlug, categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: {
      canonical: `/categorias/${category.slug}`
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryArticles = articles.filter(
    (article) => article.categorySlug === category.slug
  );
  const categoryErrors = errorEntries.filter(
    (entry) => entry.categorySlug === category.slug
  );
  const categoryTools = tools.filter(
    (tool) => tool.categorySlug === category.slug && tool.status === "active"
  );
  const breadcrumbs = [
    { label: "Categorías", href: "/categorias" },
    { label: category.name, href: `/categorias/${category.slug}` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Container className="py-10">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-start">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200">
            <CategoryIcon className="h-7 w-7" name={category.icon} />
          </span>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
              {category.name}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
              {category.description}
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            Artículos destacados
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryArticles.slice(0, 6).map((article) => (
              <ContentCard
                description={article.summary}
                eyebrow="Guía"
                href={`/articulos/${article.slug}`}
                key={article.slug}
                meta={`${article.readingTimeMinutes} min · ${article.difficulty}`}
                title={article.title}
              />
            ))}
          </div>
        </section>

        {categoryErrors.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Errores relacionados
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {categoryErrors.map((entry) => (
                <ContentCard
                  description={entry.description}
                  eyebrow={entry.product}
                  href={`/errores/${entry.productSlug}/${entry.slug}`}
                  key={`${entry.productSlug}-${entry.slug}`}
                  title={entry.title}
                />
              ))}
            </div>
          </section>
        ) : null}

        {categoryTools.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Herramientas relacionadas
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {categoryTools.map((tool) => (
                <ContentCard
                  description={tool.description}
                  eyebrow="Herramienta"
                  href={`/herramientas/${tool.slug}`}
                  key={tool.slug}
                  title={tool.name}
                />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
