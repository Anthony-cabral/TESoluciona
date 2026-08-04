# Tesoluciona

Tesoluciona es un portal web para encontrar soluciones tecnologicas, guias paso a paso, codigos de error y herramientas practicas para soporte de Windows, Microsoft 365, redes, navegadores, dispositivos y seguridad.

## Stack

- Next.js con App Router, SSR, ISR y metadata dinamica.
- React y TypeScript estricto.
- Tailwind CSS para el sistema base de estilos.
- Route Handlers de Next.js para API REST modular.
- PostgreSQL con Prisma ORM.
- Redis preparado para cache.
- Docker, Nginx, Vercel y guia para Cloudflare/VPS.

## MVP actual

- Home como portal de busqueda de soluciones.
- Buscador funcional en `/buscar?q=consulta` con sugerencias, historial local, filtros y tolerancia basica a errores.
- 31 categorias publicas en `/categorias/[slug]`.
- 30 articulos iniciales completos en `/articulos/[slug]`.
- Centro de errores con 8 fichas iniciales en `/errores/[product]/[slug]`.
- 10 herramientas funcionales en `/herramientas/[slug]`.
- Panel editorial minimo protegido en `/admin`.
- Paginas legales y de confianza editables.
- Sitemap, RSS, robots, canonical y JSON-LD por tipo de contenido.
- CSP diferenciada para desarrollo y produccion.

## Requisitos locales

- Node.js 22 o superior.
- npm 10 o superior.
- Docker Desktop, si quieres levantar PostgreSQL, Redis y Nginx localmente.

## Configuracion

1. Copia `.env.example` a `.env`.
2. Ajusta `DATABASE_URL`, `REDIS_URL`, `NEXT_PUBLIC_SITE_NAME` y `NEXT_PUBLIC_SITE_URL`.
3. Instala dependencias con `npm ci`.
4. Genera Prisma Client con `npm run prisma:generate`.
5. Ejecuta migraciones con `npm run prisma:migrate`.
6. Carga datos iniciales con `npm run prisma:seed`.

## Comandos

```bash
npm run dev
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run prisma:validate
npm run prisma:seed
```

## Docker

```bash
docker compose up --build
```

La aplicacion queda disponible detras de Nginx en `http://localhost:8080`.

## Configuracion central del nombre

El nombre publico del producto se define en `src/config/site.ts` y puede sobreescribirse con `NEXT_PUBLIC_SITE_NAME`.

## Administracion local

`/admin` esta protegido por Basic Auth. En desarrollo usa los valores de `.env.example`; en produccion debes definir `ADMIN_USERNAME` y `ADMIN_PASSWORD` con valores propios antes de desplegar.

## Documentacion

- `docs/ARCHITECTURE.md`
- `docs/GIT_WORKFLOW.md`
- `docs/DEPLOYMENT.md`
- `docs/ENVIRONMENT.md`
- `docs/SECURITY_CSP.md`

## Licencia

No se incluye una licencia hasta que el propietario del proyecto indique cual debe aplicarse.
