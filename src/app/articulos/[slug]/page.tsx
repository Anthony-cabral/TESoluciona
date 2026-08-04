import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { CommandCopy } from "@/components/content/command-copy";
import { FAQList } from "@/components/content/faq-list";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { articles, getArticleBySlug } from "@/features/solutions/articles";
import { getCategoryBySlug } from "@/features/solutions/categories";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/json-ld";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: {
      canonical: article.seo.canonicalPath
    },
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryBySlug(article.categorySlug);
  const related = articles.filter((item) =>
    article.relatedSlugs.includes(item.slug)
  );
  const breadcrumbs = [
    { label: "Categorías", href: "/categorias" },
    {
      label: category?.name ?? article.categorySlug,
      href: `/categorias/${article.categorySlug}`
    },
    { label: article.title, href: `/articulos/${article.slug}` }
  ];

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(article),
          faqJsonLd(article.faq),
          breadcrumbJsonLd(breadcrumbs)
        ]}
      />
      <Container className="py-10">
        <Breadcrumbs items={breadcrumbs} />
        <article className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">
              {category?.name ?? article.categorySlug}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950 dark:text-white">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-200">
              {article.summary}
            </p>
            <dl className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Autor
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {article.author}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Actualizado
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {article.updatedAt}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Lectura
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {article.readingTimeMinutes} minutos
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Dificultad
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {article.difficulty}
                </dd>
              </div>
            </dl>

            <ArticleSection
              title="Introducción"
              items={[article.introduction]}
            />
            <ArticleSection
              title="Explicación sencilla"
              items={[article.simpleExplanation]}
            />
            <ArticleSection
              title="Explicación técnica"
              items={[article.technicalExplanation]}
            />
            <ArticleSection title="Síntomas" items={article.symptoms} list />
            <ArticleSection
              title="Posibles causas"
              items={article.causes}
              list
            />
            <ArticleSection
              title="Requisitos previos"
              items={article.prerequisites}
              list
            />
            <ArticleSection
              title="Solución principal paso a paso"
              items={article.primarySteps}
              ordered
            />
            {article.commands.length ? (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Comandos copiables
                </h2>
                <div className="mt-4 grid gap-4">
                  {article.commands.map((command) => (
                    <CommandCopy
                      key={`${command.label}-${command.value}`}
                      label={command.label}
                      value={command.value}
                    />
                  ))}
                </div>
              </section>
            ) : null}
            <ArticleSection
              title="Soluciones alternativas"
              items={article.alternatives}
              list
            />
            <ArticleSection
              title="Advertencias"
              items={article.warnings}
              list
            />
            <ArticleSection
              title="Cómo verificar que quedó resuelto"
              items={article.verification}
              list
            />

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Preguntas frecuentes
              </h2>
              <div className="mt-4">
                <FAQList items={article.faq} />
              </div>
            </section>

            {article.references.length ? (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Referencias
                </h2>
                <ul className="mt-4 grid gap-3">
                  {article.references.map((reference) => (
                    <li key={reference.url}>
                      <a
                        className="font-semibold text-brand-700 hover:text-brand-900 dark:text-brand-300"
                        href={reference.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {reference.label} · {reference.publisher}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <AdSlot placement="article" />
            {related.length ? (
              <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <h2 className="font-semibold text-slate-950 dark:text-white">
                  Artículos relacionados
                </h2>
                <ul className="mt-4 grid gap-3 text-sm">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        className="text-brand-700 hover:text-brand-900 dark:text-brand-300"
                        href={`/articulos/${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </article>
      </Container>
    </>
  );
}

function ArticleSection({
  items,
  list,
  ordered,
  title
}: {
  title: string;
  items: string[];
  list?: boolean;
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
        {title}
      </h2>
      {list || ordered ? (
        <ListTag className="mt-4 grid gap-3 pl-5 text-slate-700 dark:text-slate-200">
          {items.map((item) => (
            <li className={ordered ? "list-decimal" : "list-disc"} key={item}>
              {item}
            </li>
          ))}
        </ListTag>
      ) : (
        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <p
              className="leading-8 text-slate-700 dark:text-slate-200"
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
