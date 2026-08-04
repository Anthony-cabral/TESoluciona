import { Container } from "@/components/layout/container";
import type { LegalPage as LegalPageType } from "@/features/legal/legal-pages";

export function LegalPage({ page }: { page: LegalPageType }) {
  return (
    <Container className="py-10">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
          {page.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          {page.description}
        </p>
        <div className="mt-8 grid gap-6">
          {page.sections.map((section) => (
            <section
              className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
              key={section.heading}
            >
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                {section.heading}
              </h2>
              <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {section.body.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
