import type { Metadata } from "next";

import { TopicPage } from "@/components/content/topic-page";

export const metadata: Metadata = {
  title: "Soluciones para navegadores | Tesoluciona",
  description:
    "Guías para actualizar Chrome y Edge, borrar caché, revisar HTTPS y resolver problemas comunes del navegador."
};

export default function NavegadoresPage() {
  return (
    <TopicPage
      categorySlugs={["google-chrome", "microsoft-edge", "gmail"]}
      description="Soluciones para Chrome, Edge, caché, actualizaciones, navegación segura y problemas al abrir páginas."
      searchHint="Cómo actualizar Google Chrome"
      title="Soluciones para navegadores"
    />
  );
}
