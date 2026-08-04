import Link from "next/link";

type ContentCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
};

export function ContentCard({
  eyebrow,
  title,
  description,
  href,
  meta
}: ContentCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase text-brand-700 dark:text-brand-300">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-950 dark:text-white">
        <Link
          className="hover:text-brand-700 dark:hover:text-brand-300"
          href={href}
        >
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
        {description}
      </p>
      {meta ? (
        <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          {meta}
        </p>
      ) : null}
    </article>
  );
}
