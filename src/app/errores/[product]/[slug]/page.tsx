import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { CommandCopy } from "@/components/content/command-copy";
import { FAQList } from "@/components/content/faq-list";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { errorEntries, getErrorEntry } from "@/features/solutions/errors";
import { articles } from "@/features/solutions/articles";
import {
  breadcrumbJsonLd,
  errorArticleJsonLd,
  faqJsonLd
} from "@/lib/seo/json-ld";

type ErrorPageProps = {
  params: Promise<{ product: string; slug: string }>;
};

export function generateStaticParams() {
  return errorEntries.map((entry) => ({
    product: entry.productSlug,
    slug: entry.slug
  }));
}

export async function generateMetadata({
  params
}: ErrorPageProps): Promise<Metadata> {
  const { product, slug } = await params;
  const entry = getErrorEntry(product, slug);
  if (!entry) return {};

  return {
    title: entry.seo.title,
    description: entry.seo.description,
    alternates: {
      canonical: entry.seo.canonicalPath
    }
  };
}

export default async function ErrorDetailPage({ params }: ErrorPageProps) {
  const { product, slug } = await params;
  const entry = getErrorEntry(product, slug);
  if (!entry) notFound();

  const related = articles.filter((article) =>
    entry.relatedSlugs.includes(article.slug)
  );
  const breadcrumbs = [
    { label: "Centro de errores", href: "/errores" },
    {
      label: entry.product,
      href: `/errores/${entry.productSlug}/${entry.slug}`
    },
    { label: entry.code, href: `/errores/${entry.productSlug}/${entry.slug}` }
  ];

  return (
    <>
      <JsonLd
        data={[
          errorArticleJsonLd(entry),
          faqJsonLd(entry.faq),
          breadcrumbJsonLd(breadcrumbs)
        ]}
      />
      <Container className="py-10">
        <Breadcrumbs items={breadcrumbs} />
        <article className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">
              {entry.product}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950 dark:text-white">
              {entry.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-200">
              {entry.description}
            </p>
            <dl className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Código
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {entry.code}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Producto
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {entry.product}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Revisión
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {entry.reviewedAt}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-950 dark:text-white">
                  Versiones afectadas
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200">
                  {entry.affectedVersions.join(", ")}
                </dd>
              </div>
            </dl>

            <ErrorSection title="Síntomas" items={entry.symptoms} />
            <ErrorSection
              title="Causas probables"
              items={entry.probableCauses}
            />
            <ErrorSection title="Diagnóstico" items={entry.diagnosis} ordered />
            <ErrorSection
              title="Solución recomendada"
              items={entry.recommendedSolution}
              ordered
            />
            {entry.commands.length ? (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Comandos
                </h2>
                <div className="mt-4 grid gap-4">
                  {entry.commands.map((command) => (
                    <CommandCopy
                      key={`${command.label}-${command.value}`}
                      label={command.label}
                      value={command.value}
                    />
                  ))}
                </div>
              </section>
            ) : null}
            <ErrorSection
              title="Soluciones alternativas"
              items={entry.alternatives}
            />
            <ErrorSection title="Advertencias" items={entry.warnings} />
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Preguntas frecuentes
              </h2>
              <div className="mt-4">
                <FAQList items={entry.faq} />
              </div>
            </section>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <AdSlot placement="error" />
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

function ErrorSection({
  items,
  ordered,
  title
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
        {title}
      </h2>
      <ListTag className="mt-4 grid gap-3 pl-5 text-slate-700 dark:text-slate-200">
        {items.map((item) => (
          <li className={ordered ? "list-decimal" : "list-disc"} key={item}>
            {item}
          </li>
        ))}
      </ListTag>
    </section>
  );
}
