import type { Metadata } from "next";

import { TopicPage } from "@/components/content/topic-page";

export const metadata: Metadata = {
  title: "Soluciones para Microsoft 365 | Tesoluciona",
  description:
    "Guías para Outlook, Office, Teams, perfiles, firmas, reparación de aplicaciones y errores comunes de Microsoft 365."
};

export default function Microsoft365Page() {
  return (
    <TopicPage
      categorySlugs={["microsoft-365", "outlook", "word", "excel"]}
      description="Guías claras para Outlook, Office, Teams, firmas, perfiles y reparación de aplicaciones de Microsoft 365."
      searchHint="Outlook no abre"
      title="Soluciones para Microsoft 365"
    />
  );
}
