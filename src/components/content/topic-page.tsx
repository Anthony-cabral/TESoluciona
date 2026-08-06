import Link from "next/link";

import { ContentCard } from "@/components/content/content-card";
import { CategoryIcon } from "@/components/icons/category-icon";
import { Container } from "@/components/layout/container";
import { SearchBox } from "@/components/search/search-box";
import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";

type TopicPageProps = {
  title: string;
  description: string;
  categorySlugs: string[];
  searchHint: string;
};

export function TopicPage({
  categorySlugs,
  description,
  searchHint,
  title
}: TopicPageProps) {
  const topicCategories = categories.filter((category) =>
    categorySlugs.includes(category.slug)
  );
  const topicArticles = articles.filter((article) =>
    categorySlugs.includes(article.categorySlug)
  );
  const topicErrors = errorEntries.filter((entry) =>
    categorySlugs.includes(entry.categorySlug)
  );
  const topicTools = tools.filter(
    (tool) =>
      tool.status === "active" && categorySlugs.includes(tool.categorySlug)
  );

  return (
    <Container className="py-10">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">
          Tesoluciona
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">
          {description}
        </p>
        <SearchBox
          className="mx-auto mt-8 max-w-3xl"
          defaultValue={searchHint}
          id={`topic-search-${categorySlugs[0]}`}
          size="large"
        />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
          Categorías relacionadas
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topicCategories.map((category) => (
            <Link
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
              href={`/categorias/${category.slug}`}
              key={category.slug}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200">
                <CategoryIcon name={category.icon} />
              </span>
              <h3 className="mt-4 font-semibold text-slate-950 dark:text-white">
                {category.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            Guías y soluciones
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {topicArticles.map((article) => (
              <ContentCard
                description={article.summary}
                eyebrow={article.categorySlug}
                href={`/articulos/${article.slug}`}
                key={article.slug}
                meta={`${article.readingTimeMinutes} min · ${article.difficulty}`}
                title={article.title}
              />
            ))}
          </div>
        </div>

        <aside className="grid gap-8 lg:self-start">
          <section>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              Errores relacionados
            </h2>
            <div className="mt-4 grid gap-3">
              {topicErrors.length ? (
                topicErrors.map((entry) => (
                  <Link
                    className="rounded-lg border border-slate-200 bg-white p-4 hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
                    href={`/errores/${entry.productSlug}/${entry.slug}`}
                    key={`${entry.productSlug}-${entry.slug}`}
                  >
                    <p className="font-semibold text-slate-950 dark:text-white">
                      {entry.code}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                      {entry.title}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
                  No hay errores específicos en esta sección todavía.
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              Herramientas útiles
            </h2>
            <div className="mt-4 grid gap-3">
              {topicTools.length ? (
                topicTools.map((tool) => (
                  <Link
                    className="rounded-lg border border-slate-200 bg-white p-4 hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
                    href={`/herramientas/${tool.slug}`}
                    key={tool.slug}
                  >
                    <p className="font-semibold text-slate-950 dark:text-white">
                      {tool.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                      {tool.description}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
                  Las herramientas activas aparecerán aquí cuando apliquen a
                  este tema.
                </p>
              )}
            </div>
          </section>
        </aside>
      </section>
    </Container>
  );
}
