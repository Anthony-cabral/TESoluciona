import type { Metadata } from "next";

import { TopicPage } from "@/components/content/topic-page";

export const metadata: Metadata = {
  title: "Soluciones para Windows | Tesoluciona",
  description:
    "Guías para activar Windows, reparar Windows Update, usar SFC y DISM, revisar la versión instalada y resolver errores frecuentes."
};

export default function WindowsPage() {
  return (
    <TopicPage
      categorySlugs={["windows", "powershell", "cmd"]}
      description="Soluciones prácticas para activación, actualización, reparación, comandos de diagnóstico y configuración diaria de Windows."
      searchHint="Windows no está activado"
      title="Soluciones para Windows"
    />
  );
}
