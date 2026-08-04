import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-6 py-3">
        <Link
          className="flex items-center gap-3"
          href="/"
          aria-label={siteConfig.name}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-9 w-9"
            height="36"
            src="/brand/tesoluciona-mark.svg"
            width="36"
          />
          <span className="text-lg font-bold text-ink-950 dark:text-white">
            {siteConfig.name}
          </span>
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="hidden items-center gap-5 text-sm font-medium text-ink-700 dark:text-slate-200 md:flex">
            {siteConfig.mainNavigation.map((item) => (
              <li key={item.href}>
                <a className="hover:text-brand-700" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
