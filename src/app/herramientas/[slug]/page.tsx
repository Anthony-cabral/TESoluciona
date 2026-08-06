import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { FAQList } from "@/components/content/faq-list";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { getToolBySlug, tools } from "@/features/solutions/tools";
import { ToolRunner } from "@/features/tools/components/tool-runner";
import { breadcrumbJsonLd, faqJsonLd, toolJsonLd } from "@/lib/seo/json-ld";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools
    .filter((tool) => tool.status === "active")
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    alternates: {
      canonical: tool.seo.canonicalPath
    }
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const breadcrumbs = [
    { label: "Herramientas", href: "/herramientas" },
    { label: tool.name, href: `/herramientas/${tool.slug}` }
  ];
  const instructions = tool.instructions ?? tool.useCases;

  return (
    <>
      <JsonLd
        data={[
          toolJsonLd(tool),
          faqJsonLd(tool.faq),
          breadcrumbJsonLd(breadcrumbs)
        ]}
      />
      <Container className="py-10">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">
            Herramienta
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">
            {tool.name}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
            {tool.description}
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-5">
            <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
              <h2 className="font-semibold">Privacidad de la herramienta</h2>
              <p className="mt-2">
                {tool.privacy?.retention ??
                  "Esta herramienta procesa los datos localmente cuando es posible. No pegues contrasenas reales, tokens, claves privadas ni informacion confidencial."}
              </p>
              {tool.privacy ? (
                <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold">Procesamiento</dt>
                    <dd>{tool.privacy.localOnly ? "Local" : "Servidor"}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Terceros</dt>
                    <dd>
                      {tool.privacy.usesThirdParties
                        ? "Usa terceros"
                        : "No usa terceros"}
                    </dd>
                  </div>
                </dl>
              ) : null}
            </section>
            <ToolRunner slug={tool.slug} />
          </div>
          <aside className="grid gap-6 lg:self-start">
            <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Como usarla
              </h2>
              <ul className="mt-3 grid gap-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {instructions.map((item) => (
                  <li className="list-disc" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Ejemplos
              </h2>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                {tool.examples.map((item) => (
                  <li key={item}>
                    <code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">
                      {item}
                    </code>
                  </li>
                ))}
              </ul>
            </section>
            {tool.limits ? (
              <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <h2 className="font-semibold text-slate-950 dark:text-white">
                  Limites y formatos
                </h2>
                <dl className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <div>
                    <dt className="font-semibold text-slate-900 dark:text-white">
                      Entrada
                    </dt>
                    <dd>{tool.limits.acceptedFormats.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900 dark:text-white">
                      Salida
                    </dt>
                    <dd>{tool.limits.outputFormats.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900 dark:text-white">
                      Tamano maximo
                    </dt>
                    <dd>
                      {tool.limits.maxFiles} archivo
                      {tool.limits.maxFiles === 1 ? "" : "s"} de hasta{" "}
                      {tool.limits.maxFileSizeMb} MB
                    </dd>
                  </div>
                </dl>
              </section>
            ) : null}
          </aside>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            Preguntas frecuentes
          </h2>
          <div className="mt-4 max-w-3xl">
            <FAQList items={tool.faq} />
          </div>
        </section>
      </Container>
    </>
  );
}
