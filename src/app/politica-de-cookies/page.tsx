import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/features/legal/legal-pages";

export const metadata: Metadata = {
  title: "Política de cookies | Tesoluciona",
  description:
    "Borrador editable de política de cookies y preferencias de consentimiento para Tesoluciona.",
  alternates: {
    canonical: "/politica-de-cookies"
  }
};

export default function CookiePolicyPage() {
  return <LegalPage page={getLegalPage("cookies")!} />;
}
