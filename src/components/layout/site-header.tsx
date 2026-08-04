import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SearchBox } from "@/components/search/search-box";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <Container className="grid min-h-16 gap-3 py-3 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <Link
          aria-label={siteConfig.name}
          className="flex items-center gap-3"
          href="/"
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-9 w-9"
            height="36"
            src="/brand/tesoluciona-mark.svg"
            width="36"
          />
          <span className="text-lg font-bold text-slate-950 dark:text-white">
            {siteConfig.name}
          </span>
        </Link>

        <SearchBox className="order-3 lg:order-none" id="header-search" />

        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <nav aria-label="Navegación principal">
            <ul className="hidden items-center gap-4 text-sm font-semibold text-slate-700 dark:text-slate-200 xl:flex">
              {siteConfig.mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="hover:text-brand-700 dark:hover:text-brand-300"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              className="hidden rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700 dark:border-slate-600 dark:text-slate-100 dark:hover:border-brand-300 md:inline-flex"
              href="/admin"
            >
              Iniciar sesión
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <nav aria-label="Navegación móvil" className="xl:hidden">
          <ul className="flex gap-3 overflow-x-auto pb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {siteConfig.mainNavigation.map((item) => (
              <li className="shrink-0" key={item.href}>
                <Link
                  className="hover:text-brand-700 dark:hover:text-brand-300"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
