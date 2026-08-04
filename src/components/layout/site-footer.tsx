import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <Container className="grid gap-8 py-10 text-sm text-slate-700 dark:text-slate-200 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-lg font-bold text-slate-950 dark:text-white">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xl leading-7">
            Guías, errores y herramientas para resolver problemas de tecnología
            con pasos claros, comandos verificables y fuentes revisables.
          </p>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {siteConfig.name}. Contenido en
            revisión editorial continua.
          </p>
        </div>
        <nav aria-label="Enlaces legales y de confianza">
          <ul className="grid gap-3 sm:grid-cols-2">
            {siteConfig.footerNavigation.map((item) => (
              <li key={item.href}>
                <a
                  className="hover:text-brand-700 dark:hover:text-brand-300"
                  href={item.href}
                >
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
