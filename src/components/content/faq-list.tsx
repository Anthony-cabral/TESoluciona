import type { FAQ } from "@/features/solutions/types";

export function FAQList({ items }: { items: FAQ[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
          key={item.question}
        >
          <summary className="cursor-pointer font-semibold text-slate-950 dark:text-white">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
