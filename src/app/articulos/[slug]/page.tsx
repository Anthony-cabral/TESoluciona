import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { CommandCopy } from "@/components/content/command-copy";
import { FAQList } from "@/components/content/faq-list";
import { StepImage } from "@/components/content/step-image";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { articles, getArticleBySlug } from "@/features/solutions/articles";
import { getCategoryBySlug } from "@/features/solutions/categories";
import type {
  CommandSnippet,
  PendingImageRequirement
} from "@/features/solutions/types";
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
              <MetaItem label="Autor" value={article.author} />
              <MetaItem label="Revisión técnica" value={article.reviewer} />
              <MetaItem label="Actualizado" value={article.updatedAt} />
              <MetaItem
                label="Lectura"
                value={`${article.readingTimeMinutes} minutos`}
              />
              <MetaItem label="Dificultad" value={article.difficulty} />
              <MetaItem label="Aplica a" value={article.appliesTo.join(", ")} />
            </dl>

            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
              <strong>Antes de empezar:</strong> {article.backupRecommendation}
            </div>

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

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Solución principal paso a paso
              </h2>
              <div className="mt-5 grid gap-6">
                {article.solutionSteps.map((step, index) => (
                  <section
                    className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                    key={step.id}
                  >
                    <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                      Paso {index + 1}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-700 dark:text-slate-200">
                      {step.objective}
                    </p>
                    {step.menuPath ? (
                      <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                        Ruta:{" "}
                        <code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">
                          {step.menuPath}
                        </code>
                      </p>
                    ) : null}
                    <ol className="mt-4 grid gap-2 pl-5 text-slate-700 dark:text-slate-200">
                      {step.instructions.map((instruction) => (
                        <li className="list-decimal" key={instruction}>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                    {step.command ? (
                      <CommandPanel command={step.command} compact />
                    ) : null}
                    {step.image ? <StepImage image={step.image} /> : null}
                    {step.imageRequirement ? (
                      <PendingImageNotice requirement={step.imageRequirement} />
                    ) : null}
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      <StepNote
                        label="Resultado esperado"
                        value={step.expectedResult}
                      />
                      <StepNote label="Error común" value={step.commonError} />
                      <StepNote
                        label="Cómo continuar"
                        value={step.howToContinue}
                      />
                    </div>
                  </section>
                ))}
              </div>
            </section>

            {article.commands.length ? (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Comandos copiables
                </h2>
                <div className="mt-4 grid gap-4">
                  {article.commands.map((command) => (
                    <CommandPanel
                      command={command}
                      key={`${command.label}-${command.value}`}
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
              title="Cómo revertir cambios"
              items={article.revertChanges}
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

            <ArticleSection
              title="Historial de cambios"
              items={article.changeHistory}
              list
            />
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-28 lg:self-start">
            <AdSlot placement="article" />
            <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Confianza editorial
              </h2>
              <p className="mt-3 text-slate-700 dark:text-slate-200">
                Revisamos estas guías para evitar comandos inseguros,
                activadores no autorizados y cambios que oculten el problema en
                vez de resolverlo.
              </p>
              <Link
                className="mt-3 inline-flex font-semibold text-brand-700 hover:text-brand-900 dark:text-brand-300"
                href="/transparencia-editorial"
              >
                Ver transparencia editorial
              </Link>
            </div>
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

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-slate-950 dark:text-white">{label}</dt>
      <dd className="mt-1 text-slate-700 dark:text-slate-200">{value}</dd>
    </div>
  );
}

function CommandPanel({
  command,
  compact
}: {
  command: CommandSnippet;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mt-5" : ""}>
      <CommandCopy label={command.label} value={command.value} />
      {command.explanation ? (
        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
          {command.explanation}
        </p>
      ) : null}
      {command.expectedOutput ? (
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
          <strong>Salida esperada:</strong> {command.expectedOutput}
        </p>
      ) : null}
      {command.ifDifferent ? (
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
          <strong>Si aparece diferente:</strong> {command.ifDifferent}
        </p>
      ) : null}
    </div>
  );
}

function StepNote({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800">
      <p className="font-semibold text-slate-950 dark:text-white">{label}</p>
      <p className="mt-1 leading-6 text-slate-700 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

function PendingImageNotice({
  requirement
}: {
  requirement: PendingImageRequirement;
}) {
  return (
    <aside className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-100">
      <p className="font-semibold">Imagen pendiente de licencia</p>
      <p className="mt-2">
        Este paso necesita una captura real antes de mostrar apoyo visual:
        {" "}
        {requirement.requiredImage}
      </p>
      <p className="mt-2">
        Motivo: {requirement.reason} Revision: {requirement.reviewedAt}.
      </p>
    </aside>
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
  if (!items.length) return null;
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
