import Link from "next/link";
import type { ReactElement } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  KeyRound,
  Search,
  ShieldCheck,
  Terminal
} from "lucide-react";

import { AdSlot } from "@/components/ads/ad-slot";
import { ContentCard } from "@/components/content/content-card";
import { CategoryIcon } from "@/components/icons/category-icon";
import { Container } from "@/components/layout/container";
import { SearchBox } from "@/components/search/search-box";
import { JsonLd } from "@/components/seo/json-ld";
import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/seo/schema";

export const revalidate = 3600;

const exampleSearches = [
  "Windows no está activado",
  "Error 0x80070005",
  "Cómo imprimir a doble cara",
  "Outlook no abre",
  "Cómo saber la IP del router",
  "Microsoft Defender está desactivado",
  "Cómo actualizar Google Chrome",
  "WiFi conectado sin Internet"
];

const usefulCommands = [
  {
    command: "slmgr /xpr",
    label: "Comprobar si Windows está activado de forma permanente"
  },
  {
    command: "ipconfig /all",
    label: "Ver IP, DNS, adaptador y puerta de enlace"
  },
  {
    command: "ipconfig /flushdns",
    label: "Limpiar la caché DNS del equipo"
  },
  {
    command: "sfc /scannow",
    label: "Revisar archivos protegidos de Windows"
  },
  {
    command: "DISM /Online /Cleanup-Image /RestoreHealth",
    label: "Reparar la imagen de Windows antes de repetir SFC"
  },
  {
    command: "Test-NetConnection ejemplo.com -Port 443",
    label: "Comprobar conectividad a un puerto TCP"
  }
];

const popularCategorySlugs = [
  "windows",
  "microsoft-365",
  "outlook",
  "redes",
  "impresoras",
  "ciberseguridad",
  "google-chrome",
  "powershell"
];

const topicSections = [
  {
    href: "/windows",
    title: "Soluciones de Windows",
    categorySlugs: ["windows"],
    description: "Activación, actualización, reparación, comandos y ajustes."
  },
  {
    href: "/microsoft-365",
    title: "Microsoft 365",
    categorySlugs: ["microsoft-365", "outlook"],
    description: "Outlook, Office, Teams, perfiles, firmas y reparación."
  },
  {
    href: "/redes",
    title: "Redes",
    categorySlugs: ["redes", "routers", "wifi", "dns"],
    description: "IP, DNS, puertos, router, ping y diagnóstico básico."
  },
  {
    href: "/impresoras",
    title: "Impresoras",
    categorySlugs: ["impresoras"],
    description: "Doble cara, preferencias, controladores y cola de impresión."
  }
];

export default function HomePage() {
  const popularCategories = categories.filter((category) =>
    popularCategorySlugs.includes(category.slug)
  );
  const topSolutions = articles.slice(0, 8);
  const stepByStepGuides = articles.filter((article) =>
    article.solutionSteps.some((step) => step.image || step.command)
  );
  const recentGuides = [...articles]
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    )
    .slice(0, 6);
  const securityArticles = articles
    .filter((article) => article.categorySlug === "ciberseguridad")
    .slice(0, 4);
  const frequentErrors = errorEntries.slice(0, 8);
  const featuredTools = tools
    .filter((tool) => tool.status === "active")
    .slice(0, 6);

  return (
    <>
      <JsonLd data={[getWebsiteJsonLd(), getOrganizationJsonLd()]} />
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Container className="py-12 md:py-18">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
              <Search aria-hidden="true" className="h-4 w-4" />
              Centro de soluciones tecnológicas
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              Encuentra soluciones claras para tus problemas tecnológicos
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">
              Busca errores, configuraciones, comandos y guías paso a paso para
              Windows, Microsoft 365, redes, impresoras, dispositivos y
              aplicaciones.
            </p>
            <SearchBox
              className="mx-auto mt-8 max-w-3xl"
              id="hero-search"
              size="large"
            />
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {exampleSearches.map((example) => (
                <Link
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-600 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-200"
                  href={`/buscar?q=${encodeURIComponent(example)}`}
                  key={example}
                >
                  {example}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                href="/buscar?q=windows%20no%20esta%20activado"
              >
                Buscar solución
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-brand-600 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:border-brand-300"
                href="/categorias"
              >
                Explorar categorías
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <Container className="py-12">
          <SectionHeading
            actionHref="/categorias"
            actionLabel="Ver todas"
            description="Entra directo al tema que necesitas resolver."
            title="Categorías populares"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularCategories.map((category) => (
              <Link
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:border-slate-700 dark:bg-slate-900"
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
        </Container>
      </section>

      <section className="bg-white dark:bg-slate-950">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <IconHeading icon={<BookOpen />} title="Soluciones más buscadas" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {topSolutions.map((article) => (
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
          <aside>
            <IconHeading
              icon={<AlertTriangle className="text-amber-600" />}
              title="Errores frecuentes"
            />
            <div className="mt-6 grid gap-3">
              {frequentErrors.map((error) => (
                <Link
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:border-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:border-slate-700 dark:bg-slate-900"
                  href={`/errores/${error.productSlug}/${error.slug}`}
                  key={`${error.productSlug}-${error.slug}`}
                >
                  <p className="font-semibold text-slate-950 dark:text-white">
                    {error.code}
                  </p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                    {error.title}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      <AdSlot placement="home" />

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Container className="py-12">
          <SectionHeading
            actionHref="/guias"
            actionLabel="Ver guías"
            description="Instrucciones verificables con pasos, comandos, advertencias y comprobación final."
            title="Guías paso a paso"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {stepByStepGuides.slice(0, 6).map((article) => (
              <ContentCard
                description={article.summary}
                eyebrow="Guía"
                href={`/articulos/${article.slug}`}
                key={article.slug}
                title={article.title}
              />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 py-12 lg:grid-cols-2">
          <div>
            <IconHeading icon={<Terminal />} title="Comandos útiles" />
            <div className="mt-6 grid gap-3">
              {usefulCommands.map((item) => (
                <div
                  className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                  key={item.command}
                >
                  <code className="break-words rounded bg-slate-950 px-2 py-1 text-sm text-white">
                    {item.command}
                  </code>
                  <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <IconHeading icon={<KeyRound />} title="Herramientas destacadas" />
            <div className="mt-6 grid gap-4">
              {featuredTools.map((tool) => (
                <ContentCard
                  description={tool.description}
                  eyebrow="Herramienta"
                  href={`/herramientas/${tool.slug}`}
                  key={tool.slug}
                  title={tool.name}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Container className="py-12">
          <SectionHeading
            description="Rutas directas para los problemas más comunes en soporte diario."
            title="Soluciones por tema"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {topicSections.map((topic) => {
              const topicArticles = articles
                .filter((article) =>
                  topic.categorySlugs.includes(article.categorySlug)
                )
                .slice(0, 3);

              return (
                <section
                  className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900"
                  key={topic.href}
                >
                  <h3 className="font-semibold text-slate-950 dark:text-white">
                    <Link
                      className="hover:text-brand-700 dark:hover:text-brand-300"
                      href={topic.href}
                    >
                      {topic.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {topic.description}
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm">
                    {topicArticles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          className="font-medium text-brand-700 hover:text-brand-900 dark:text-brand-300"
                          href={`/articulos/${article.slug}`}
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading
              actionHref="/guias"
              actionLabel="Ver más"
              description="Contenido actualizado para resolver problemas sin perder contexto técnico."
              title="Artículos recientes"
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {recentGuides.map((article) => (
                <ContentCard
                  description={article.summary}
                  eyebrow="Actualizado"
                  href={`/articulos/${article.slug}`}
                  key={article.slug}
                  title={article.title}
                />
              ))}
            </div>
          </div>
          <div>
            <IconHeading
              icon={<ShieldCheck />}
              title="Artículos de seguridad"
            />
            <div className="mt-6 grid gap-4">
              {securityArticles.map((article) => (
                <ContentCard
                  description={article.summary}
                  eyebrow="Seguridad"
                  href={`/articulos/${article.slug}`}
                  key={article.slug}
                  title={article.title}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Container className="py-12">
          <SectionHeading
            description="Respuestas rápidas antes de abrir una guía completa."
            title="Preguntas frecuentes"
          />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              [
                "¿Las herramientas guardan mis datos?",
                "No. Las herramientas iniciales procesan la información localmente en el navegador cuando es posible."
              ],
              [
                "¿Puedo usar comandos en equipos de empresa?",
                "Sí, pero consulta a TI antes de cambiar políticas, seguridad, DNS o permisos."
              ],
              [
                "¿Tesoluciona publica activadores de Windows?",
                "No. Las guías de activación solo cubren licencias digitales, claves válidas y documentación oficial."
              ]
            ].map(([question, answer]) => (
              <div
                className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                key={question}
              >
                <h3 className="font-semibold text-slate-950 dark:text-white">
                  {question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({
  actionHref,
  actionLabel,
  description,
  title
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-slate-700 dark:text-slate-200">
            {description}
          </p>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <Link
          className="hidden text-sm font-semibold text-brand-700 hover:text-brand-900 dark:text-brand-300 md:inline"
          href={actionHref}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

function IconHeading({ icon, title }: { icon: ReactElement; title: string }) {
  return (
    <div className="flex items-center gap-3 text-brand-700 dark:text-brand-300">
      {icon}
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
        {title}
      </h2>
    </div>
  );
}
