import type { Metadata } from "next";

import { ContentCard } from "@/components/content/content-card";
import { Container } from "@/components/layout/container";
import { SearchBox } from "@/components/search/search-box";
import { errorEntries } from "@/features/solutions/errors";

export const metadata: Metadata = {
  title: "Centro de errores",
  description:
    "Busca códigos y mensajes de error de Windows, Outlook, Chrome, SQL Server y otros productos.",
  alternates: {
    canonical: "/errores"
  }
};

export default function ErrorsPage() {
  return (
    <Container className="py-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Centro de errores
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Busca códigos como 0x80070005, mensajes de Outlook, errores de Chrome
          o problemas de autenticación en SQL Server.
        </p>
      </div>
      <SearchBox className="mt-8 max-w-3xl" id="error-search" size="large" />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {errorEntries.map((entry) => (
          <ContentCard
            description={entry.description}
            eyebrow={entry.product}
            href={`/errores/${entry.productSlug}/${entry.slug}`}
            key={`${entry.productSlug}-${entry.slug}`}
            meta={`Revisado ${entry.reviewedAt}`}
            title={entry.title}
          />
        ))}
      </div>
    </Container>
  );
}
