import type { Metadata } from "next";

import { TopicPage } from "@/components/content/topic-page";

export const metadata: Metadata = {
  title: "Soluciones de ciberseguridad | Tesoluciona",
  description:
    "Guías para Microsoft Defender, contraseñas seguras, HTTPS y prácticas básicas de seguridad digital."
};

export default function SeguridadPage() {
  return (
    <TopicPage
      categorySlugs={["ciberseguridad", "windows", "chatgpt"]}
      description="Guías para revisar Microsoft Defender, crear contraseñas fuertes, verificar HTTPS y reducir riesgos comunes."
      searchHint="Microsoft Defender está desactivado"
      title="Soluciones de ciberseguridad"
    />
  );
}
