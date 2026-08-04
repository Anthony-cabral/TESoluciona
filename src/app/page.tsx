import Image from "next/image";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { listFeaturedContent } from "@/features/content/application/list-featured-content";
import { toolRoadmap } from "@/features/tools/data/tool-roadmap";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/seo/schema";

export const revalidate = 3600;

const platformPillars = [
  {
    title: "Conocimiento técnico",
    description:
      "Base preparada para artículos útiles, referencias verificables, FAQs y contenido con trazabilidad editorial.",
    tone: "border-signal-blue"
  },
  {
    title: "Herramientas online",
    description:
      "Arquitectura extensible para utilidades de red, texto, seguridad, datos, documentos e imágenes.",
    tone: "border-brand-500"
  },
  {
    title: "SEO responsable",
    description:
      "Metadata, sitemap, robots, JSON-LD e ISR desde el inicio, sin contenido artificial ni atajos de baja calidad.",
    tone: "border-signal-amber"
  }
] as const;

export default async function HomePage() {
  const featuredContent = await listFeaturedContent();
  const plannedTools = toolRoadmap.slice(0, 8);

  return (
    <>
      <JsonLd data={[getWebsiteJsonLd(), getOrganizationJsonLd()]} />
      <section className="border-b border-[color:var(--border)] bg-[color:var(--surface)]">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase text-brand-700">
              Plataforma tecnológica
            </p>
            <h1 className="text-4xl font-bold leading-tight text-ink-950 dark:text-white md:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-700 dark:text-slate-200">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                href="#arquitectura"
              >
                Ver base técnica
              </a>
              <a
                className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-ink-900 transition hover:border-brand-500 dark:text-white"
                href="/api/v1/health"
              >
                Estado API
              </a>
            </div>
          </div>

          <aside
            aria-label="Estado inicial de la plataforma"
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4">
              <Image
                alt=""
                aria-hidden="true"
                className="h-12 w-12"
                height="48"
                src="/brand/tesoluciona-mark.svg"
                width="48"
              />
              <div>
                <h2 className="text-base font-semibold text-ink-950 dark:text-white">
                  Bootstrap de Fase 1
                </h2>
                <p className="text-sm text-ink-500 dark:text-slate-300">
                  Base lista para crecer por módulos.
                </p>
              </div>
            </div>
            <dl className="mt-5 grid gap-4">
              {[
                ["Renderizado", "SSR + ISR"],
                ["Datos", "PostgreSQL + Prisma"],
                ["Caché", "Redis preparado"],
                ["Entrega", "Docker, Nginx, Vercel y Cloudflare"]
              ].map(([label, value]) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3"
                  key={label}
                >
                  <dt className="text-sm text-ink-500 dark:text-slate-300">
                    {label}
                  </dt>
                  <dd className="text-right text-sm font-semibold text-ink-900 dark:text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <section
        id="arquitectura"
        className="border-b border-[color:var(--border)]"
      >
        <Container className="py-12 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-ink-950 dark:text-white">
              Base modular y mantenible
            </h2>
            <p className="mt-3 leading-7 text-ink-700 dark:text-slate-200">
              La primera fase define el contrato del producto, separa dominio,
              aplicación e infraestructura, y deja puntos de extensión para
              contenido, herramientas, SEO, seguridad y rendimiento.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {platformPillars.map((pillar) => (
              <article
                className={`rounded-lg border-l-4 ${pillar.tone} border-y border-r border-[color:var(--border)] bg-[color:var(--surface)] p-5`}
                key={pillar.title}
              >
                <h3 className="text-lg font-semibold text-ink-950 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-slate-200">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="contenido"
        className="border-b border-[color:var(--border)] bg-[color:var(--surface)]"
      >
        <Container className="grid gap-8 py-12 md:grid-cols-2 md:py-16">
          <div id="herramientas">
            <h2 className="text-2xl font-bold text-ink-950 dark:text-white">
              Contenido inicial preparado
            </h2>
            <div className="mt-6 grid gap-4">
              {featuredContent.map((article) => (
                <article
                  className="rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] p-5"
                  key={article.slug}
                >
                  <p className="text-xs font-semibold uppercase text-brand-700">
                    {article.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink-950 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-slate-200">
                    {article.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-ink-950 dark:text-white">
              Roadmap de herramientas
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {plannedTools.map((tool) => (
                <li
                  className="rounded-md border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-3 text-sm font-medium text-ink-900 dark:text-white"
                  key={tool.slug}
                >
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
