import type { Metadata } from "next";

import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Comunidad",
  description: "La comunidad de Tesoluciona está en preparación.",
  robots: {
    follow: false,
    index: false
  }
};

export default function CommunityPage() {
  return (
    <Container className="py-10">
      <div className="max-w-3xl rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          Comunidad
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          La comunidad tipo preguntas y respuestas se publicará en una fase
          posterior, cuando moderación, seguridad y reputación estén listos.
        </p>
      </div>
    </Container>
  );
}
