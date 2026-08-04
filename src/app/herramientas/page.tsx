import type { Metadata } from "next";

import { ContentCard } from "@/components/content/content-card";
import { Container } from "@/components/layout/container";
import { tools } from "@/features/solutions/tools";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Herramientas tecnológicas funcionales para redes, seguridad, texto, JSON, Base64, URL, contraseñas y QR.",
  alternates: {
    canonical: "/herramientas"
  }
};

export default function ToolsPage() {
  const activeTools = tools.filter((tool) => tool.status === "active");

  return (
    <Container className="py-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Herramientas
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Utilidades que funcionan en el navegador, con validación clara y sin
          almacenar contraseñas ni contenido sensible.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeTools.map((tool) => (
          <ContentCard
            description={tool.description}
            eyebrow="Herramienta"
            href={`/herramientas/${tool.slug}`}
            key={tool.slug}
            title={tool.name}
          />
        ))}
      </div>
      <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
          Próximamente
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
          JWT Decoder, XML Formatter, YAML Formatter, Regex Tester, Markdown
          Preview, Diff Checker, minificadores e Image/PDF Tools se publicarán
          cuando estén completamente funcionales.
        </p>
      </section>
    </Container>
  );
}
