import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  KeyRound,
  Mail,
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
  "Error 0x80070005",
  "Windows no está activado",
  "Configurar impresión a doble cara",
  "Actualizar Google Chrome",
  "Saber la dirección IP del router",
  "Reparar Microsoft Defender",
  "Configurar Outlook",
  "Problemas de WiFi"
];

const usefulCommands = [
  {
    command: "ipconfig",
    label: "Ver IP, máscara y puerta de enlace"
  },
  {
    command: "ipconfig /flushdns",
    label: "Limpiar caché DNS"
  },
  {
    command: "sfc /scannow",
    label: "Revisar archivos del sistema"
  },
  {
    command: "Test-NetConnection host -Port 443",
    label: "Comprobar puerto TCP"
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

export default function HomePage() {
  const popularCategories = categories.filter((category) =>
    popularCategorySlugs.includes(category.slug)
  );
  const topSolutions = articles.slice(0, 6);
  const recentGuides = articles.slice(10, 16);
  const securityArticles = articles.filter(
    (article) => article.categorySlug === "ciberseguridad"
  );
  const frequentErrors = errorEntries.slice(0, 6);
  const featuredTools = tools.slice(0, 6);

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
              Busca errores, configuraciones, comandos, herramientas y guías
              paso a paso para Windows, Microsoft 365, redes, dispositivos y
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
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-200"
                  href={`/buscar?q=${encodeURIComponent(example)}`}
                  key={example}
                >
                  {example}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800"
                href="/buscar?q=windows"
              >
                Buscar solución
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-brand-600 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:border-brand-300"
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
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Categorías populares
              </h2>
              <p className="mt-2 text-slate-700 dark:text-slate-200">
                Entra directo al tema que necesitas resolver.
              </p>
            </div>
            <Link
              className="hidden text-sm font-semibold text-brand-700 hover:text-brand-900 dark:text-brand-300 md:inline"
              href="/categorias"
            >
              Ver todas
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularCategories.map((category) => (
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
        </Container>
      </section>

      <section className="bg-white dark:bg-slate-950">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BookOpen aria-hidden="true" className="h-6 w-6 text-brand-700" />
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Soluciones más consultadas
              </h2>
            </div>
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
            <div className="flex items-center gap-3">
              <AlertTriangle
                aria-hidden="true"
                className="h-6 w-6 text-amber-600"
              />
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Errores frecuentes
              </h2>
            </div>
            <div className="mt-6 grid gap-3">
              {frequentErrors.map((error) => (
                <Link
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
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
          <div className="flex items-center gap-3">
            <KeyRound aria-hidden="true" className="h-6 w-6 text-brand-700" />
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Herramientas destacadas
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 py-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Guías recientes
            </h2>
            <div className="mt-6 grid gap-4">
              {recentGuides.map((article) => (
                <ContentCard
                  description={article.summary}
                  eyebrow="Guía"
                  href={`/articulos/${article.slug}`}
                  key={article.slug}
                  title={article.title}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Terminal aria-hidden="true" className="h-6 w-6 text-brand-700" />
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Comandos útiles
              </h2>
            </div>
            <div className="mt-6 grid gap-3">
              {usefulCommands.map((item) => (
                <div
                  className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                  key={item.command}
                >
                  <code className="rounded bg-slate-950 px-2 py-1 text-sm text-white">
                    {item.command}
                  </code>
                  <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-6 w-6 text-brand-700"
                />
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Artículos de seguridad
                </h2>
              </div>
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
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Container className="grid gap-8 py-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Preguntas frecuentes
            </h2>
            <div className="mt-6 grid gap-3">
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
                  "¿Las guías reemplazan soporte profesional?",
                  "No. Son guías prácticas para diagnóstico y solución inicial, con advertencias cuando una acción requiere revisión especializada."
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
          </div>
          <form className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <Mail aria-hidden="true" className="h-6 w-6 text-brand-700" />
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Newsletter
              </h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
              Recibe nuevas guías, herramientas y alertas editoriales. Este
              formulario queda preparado; la suscripción real se conectará con
              consentimiento y proveedor aprobado.
            </p>
            <label className="mt-5 block text-sm font-semibold text-slate-800 dark:text-slate-100">
              Correo electrónico
              <input
                className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
                placeholder="correo@ejemplo.com"
                type="email"
              />
            </label>
            <button
              className="mt-4 rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
              type="button"
            >
              Avisarme cuando esté disponible
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
