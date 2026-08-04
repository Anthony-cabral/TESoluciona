import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SearchBox } from "@/components/search/search-box";

export default function NotFound() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase text-brand-700 dark:text-brand-300">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">
          No encontramos esta solución
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          La página puede haberse movido o todavía no existe. Busca el error,
          aplicación o comando que necesitas.
        </p>
        <SearchBox className="mt-8" id="not-found-search" size="large" />
        <Link
          className="mt-6 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700 dark:border-slate-600 dark:text-slate-100"
          href="/"
        >
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
}
