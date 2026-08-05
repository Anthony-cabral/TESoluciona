import type { Metadata } from "next";

import { TopicPage } from "@/components/content/topic-page";

export const metadata: Metadata = {
  title: "Soluciones para impresoras | Tesoluciona",
  description:
    "Guías para impresión a doble cara, preferencias de impresora, controladores, cola de impresión y problemas frecuentes."
};

export default function ImpresorasPage() {
  return (
    <TopicPage
      categorySlugs={["impresoras", "drivers"]}
      description="Soluciones para configurar impresión a doble cara, revisar controladores y resolver problemas comunes de impresión."
      searchHint="Cómo imprimir a doble cara"
      title="Soluciones para impresoras"
    />
  );
}
