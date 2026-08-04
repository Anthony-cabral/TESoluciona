import type { Metadata } from "next";

import { AdminWorkspace } from "@/features/admin/components/admin-workspace";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Administración",
  robots: {
    follow: false,
    index: false
  }
};

export default function AdminPage() {
  return (
    <Container className="py-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Panel editorial
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Gestión mínima de artículos, categorías, etiquetas, errores,
          herramientas, fuentes y búsquedas sin resultados. En producción debe
          conectarse a autenticación y auditoría persistente.
        </p>
      </div>
      <div className="mt-8">
        <AdminWorkspace />
      </div>
    </Container>
  );
}
