# Changelog

Todas las modificaciones notables de este proyecto se documentaran en este archivo.

El formato sigue Keep a Changelog y el versionado seguira SemVer cuando existan releases.

## [Unreleased]

### Added

- Bootstrap inicial de la plataforma Tesoluciona.
- Base Next.js con App Router, TypeScript y Tailwind CSS.
- Prisma, PostgreSQL y Redis preparados para fases futuras.
- Docker, Nginx, Vercel, CI y documentacion inicial.
- Portal funcional con home redisenada, buscador, categorias, articulos, errores y herramientas.
- 30 articulos iniciales, 31 categorias, 8 errores documentados y 10 herramientas activas.
- Panel editorial minimo protegido en `/admin`.
- Paginas legales, AdSlot desactivado, `ads.txt`, RSS, sitemap y JSON-LD.
- Seed de Prisma para cargar el contenido inicial.
- Pruebas unitarias para busqueda, contenido, herramientas, SEO, CSP y contraste.

### Fixed

- CSP diferenciada para desarrollo y produccion, con `unsafe-eval` limitado a desarrollo.
- Contraste visual base para modo claro y oscuro.
