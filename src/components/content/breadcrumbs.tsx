import Link from "next/link";

type Breadcrumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-slate-600 dark:text-slate-300"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            className="hover:text-brand-700 dark:hover:text-brand-300"
            href="/"
          >
            Inicio
          </Link>
        </li>
        {items.map((item) => (
          <li className="flex items-center gap-2" key={item.href}>
            <span aria-hidden="true">/</span>
            <Link
              className="hover:text-brand-700 dark:hover:text-brand-300"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
