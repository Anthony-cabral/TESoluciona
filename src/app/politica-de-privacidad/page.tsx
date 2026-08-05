import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/features/legal/legal-pages";

export const metadata: Metadata = {
  title: "Política de privacidad | Tesoluciona",
  description:
    "Borrador editable de política de privacidad con campos pendientes para el propietario del sitio.",
  alternates: {
    canonical: "/politica-de-privacidad"
  }
};

export default function PrivacyPolicyPage() {
  return <LegalPage page={getLegalPage("privacidad")!} />;
}
