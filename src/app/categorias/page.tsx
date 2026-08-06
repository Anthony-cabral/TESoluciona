import type { Metadata } from "next";
import Link from "next/link";

import { CategoryIcon } from "@/components/icons/category-icon";
import { Container } from "@/components/layout/container";
import { categories } from "@/features/solutions/categories";

export const metadata: Metadata = {
  title: "Categorías",
  description:
    "Explora categorías de soluciones para Windows, Microsoft 365, redes, seguridad, navegadores y más."
};

export default function CategoriesPage() {
  return (
    <Container className="py-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Categorías
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Navega por temas técnicos y encuentra artículos, errores y
          herramientas relacionados.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            href={`/categorias/${category.slug}`}
            key={category.slug}
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200">
              <CategoryIcon name={category.icon} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
              {category.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
