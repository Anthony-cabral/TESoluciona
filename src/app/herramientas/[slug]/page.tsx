import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { FAQList } from "@/components/content/faq-list";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolRunner } from "@/features/tools/components/tool-runner";
import { getToolBySlug, tools } from "@/features/solutions/tools";
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
          <ToolRunner slug={tool.slug} />
          <aside className="grid gap-6 lg:self-start">
            <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Cómo usarla
              </h2>
              <ul className="mt-3 grid gap-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {tool.useCases.map((item) => (
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
