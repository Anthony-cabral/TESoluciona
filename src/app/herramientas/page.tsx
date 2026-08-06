import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { tools } from "@/features/solutions/tools";
import { ToolCenterClient } from "@/features/tools/components/tool-center-client";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Herramientas tecnologicas funcionales para PDF, imagenes, redes, seguridad, texto, JSON, Base64, URL, contrasenas y QR.",
  alternates: {
    canonical: "/herramientas"
  }
};

const categoryLabels: Record<string, string> = {
  ciberseguridad: "Seguridad",
  imagenes: "Imagenes",
  pdf: "PDF",
  powershell: "Desarrollo",
  redes: "Redes",
  sql: "Datos",
  word: "Texto"
};

export default function ToolsPage() {
  const activeTools = tools.filter((tool) => tool.status === "active");
  const categories = Array.from(
    new Set(
      activeTools.map(
        (tool) => categoryLabels[tool.categorySlug] ?? tool.categorySlug
      )
    )
  ).sort((left, right) => left.localeCompare(right));

  return (
    <Container className="py-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Herramientas
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Utilidades reales para convertir PDF e imagenes, trabajar con redes,
          seguridad, texto y datos. Las herramientas locales no suben tus
          archivos a Tesoluciona.
        </p>
      </div>
      <div className="mt-8">
        <ToolCenterClient categories={categories} tools={activeTools} />
      </div>
      <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
          Proximamente
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
          Video, audio, IA y procesamiento pesado se activaran por lotes cuando
          la cola de trabajos, limites y limpieza temporal esten completamente
          verificados.
        </p>
      </section>
    </Container>
  );
}
