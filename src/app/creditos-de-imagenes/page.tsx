import type { Metadata } from "next";

import { Container } from "@/components/layout/container";

import imageAttributions from "../../../content/image-attributions.json";

export const metadata: Metadata = {
  title: "Créditos de imágenes | Tesoluciona",
  description:
    "Registro de imágenes, mockups, fuentes, licencias y permisos utilizados en las guías de Tesoluciona."
};

export default function ImageCreditsPage() {
  return (
    <Container className="py-10">
      <article className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Créditos de imágenes
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Esta página documenta las imágenes utilizadas en las guías. En esta
          fase se usan mockups originales creados por Tesoluciona en entorno de
          laboratorio, sin capturas de pantallas privadas ni datos reales de
          usuarios.
        </p>

        <div className="mt-8 grid gap-5">
          {imageAttributions.map((credit) => (
            <section
              className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
              id={credit.id}
              key={credit.id}
            >
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                {credit.fileName}
              </h2>
              <dl className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-200 md:grid-cols-2">
                <CreditItem label="Autor" value={credit.author} />
                <CreditItem label="Licencia" value={credit.license} />
                <CreditItem
                  label="Artículo asociado"
                  value={credit.articleSlug}
                />
                <CreditItem label="Fuente" value={credit.sourceUrl} />
                <CreditItem label="Revisado" value={credit.retrievedAt} />
                <CreditItem
                  label="Uso comercial"
                  value={credit.commercialUseAllowed ? "Permitido" : "No"}
                />
                <CreditItem
                  label="Modificaciones"
                  value={credit.modificationsAllowed ? "Permitidas" : "No"}
                />
              </dl>
              <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {credit.attributionText}
              </p>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}

function CreditItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-slate-950 dark:text-white">{label}</dt>
      <dd className="mt-1 break-words">{value}</dd>
    </div>
  );
}
