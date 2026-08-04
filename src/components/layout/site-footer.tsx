import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <Container className="flex flex-col gap-4 py-8 text-sm text-ink-500 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Base técnica en
          desarrollo.
        </p>
        <nav aria-label="Enlaces secundarios">
          <ul className="flex flex-wrap gap-4">
            {siteConfig.footerNavigation.map((item) => (
              <li key={item.href}>
                <a className="hover:text-brand-700" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
