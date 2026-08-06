import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";

import imageAttributions from "../../../content/image-attributions.json";

export const metadata: Metadata = {
  title: "Creditos de imagenes | Tesoluciona",
  description:
    "Registro de imagenes aprobadas, autores, fuentes originales, licencias y modificaciones utilizadas en las guias de Tesoluciona."
};

export default function ImageCreditsPage() {
  const approvedCredits = imageAttributions.filter(
    (credit) => credit.reviewStatus === "approved"
  );

  return (
    <Container className="py-10">
      <article className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Creditos de imagenes
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Esta pagina documenta unicamente imagenes aprobadas para publicacion.
          Cada recurso fue revisado desde su fuente original antes de
          almacenarse localmente en Tesoluciona.
        </p>

        <div className="mt-8 grid gap-5">
          {approvedCredits.map((credit) => (
            <section
              className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 md:grid-cols-[11rem_minmax(0,1fr)]"
              id={credit.id}
              key={credit.id}
            >
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
                <Image
                  alt={`Miniatura de ${credit.fileName}`}
                  className="aspect-[16/10] h-auto w-full object-contain"
                  height={110}
                  src={`/images/solutions/${credit.fileName}`}
                  width={176}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  {credit.fileName}
                </h2>
                <dl className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-200 md:grid-cols-2">
                  <CreditItem label="Articulo">
                    <Link
                      className="font-semibold text-brand-700 hover:text-brand-900 dark:text-brand-300"
                      href={`/articulos/${credit.articleSlug}`}
                    >
                      {credit.articleSlug}
                    </Link>
                    <span className="ml-2 text-slate-500 dark:text-slate-400">
                      Paso {credit.stepNumber}
                    </span>
                  </CreditItem>
                  <CreditItem label="Autor">{credit.author}</CreditItem>
                  <CreditItem label="Titular">
                    {credit.copyrightHolder}
                  </CreditItem>
                  <CreditItem label="Fuente original">
                    <ExternalLink href={credit.originalSourceUrl}>
                      Abrir fuente
                    </ExternalLink>
                  </CreditItem>
                  <CreditItem label="Licencia">
                    <ExternalLink href={credit.licenseUrl}>
                      {credit.licenseName}
                    </ExternalLink>
                  </CreditItem>
                  <CreditItem label="Archivo directo">
                    <ExternalLink href={credit.directFileUrl}>
                      Ver archivo
                    </ExternalLink>
                  </CreditItem>
                  <CreditItem label="Uso comercial">
                    {credit.commercialUseAllowed ? "Permitido" : "No permitido"}
                  </CreditItem>
                  <CreditItem label="Modificaciones">
                    {credit.modificationsAllowed
                      ? "Permitidas"
                      : "No permitidas"}
                  </CreditItem>
                  <CreditItem label="Atribucion">
                    {credit.attributionRequired ? "Requerida" : "No requerida"}
                  </CreditItem>
                  <CreditItem label="Share-alike">
                    {credit.shareAlikeRequired ? "Requerido" : "No requerido"}
                  </CreditItem>
                  <CreditItem label="Consultado">
                    {credit.retrievedAt}
                  </CreditItem>
                  <CreditItem label="Revision">
                    {credit.reviewStatus}
                  </CreditItem>
                </dl>
                <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  <strong>Modificaciones:</strong> {credit.modificationsMade}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  <strong>Atribucion:</strong> {credit.attributionText}
                </p>
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}

function CreditItem({
  children,
  label
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div>
      <dt className="font-semibold text-slate-950 dark:text-white">{label}</dt>
      <dd className="mt-1 break-words">{children}</dd>
    </div>
  );
}

function ExternalLink({
  children,
  href
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      className="font-semibold text-brand-700 hover:text-brand-900 dark:text-brand-300"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
