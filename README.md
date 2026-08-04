# Tesoluciona

Tesoluciona es una plataforma web de soluciones tecnológicas creada con Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma y Redis. Esta fase inicial deja una base funcional, modular y preparada para crecer por módulos sin construir todavía comunidad, IA, panel administrativo completo, AdSense real ni herramientas online completas.

## Stack

- Next.js con App Router, SSR e ISR.
- React y TypeScript estricto.
- Tailwind CSS para el sistema base de estilos.
- Route Handlers de Next.js para API REST modular.
- PostgreSQL con Prisma ORM.
- Redis preparado para caché.
- Docker, Nginx, Vercel y guía para Cloudflare/VPS.

## Requisitos locales

- Node.js 22 o superior.
- npm 10 o superior.
- Docker Desktop, si quieres levantar PostgreSQL, Redis y Nginx localmente.

## Configuración

1. Copia `.env.example` a `.env`.
2. Ajusta `DATABASE_URL`, `REDIS_URL`, `NEXT_PUBLIC_SITE_NAME` y `NEXT_PUBLIC_SITE_URL`.
3. Instala dependencias con `npm ci`.
4. Genera Prisma Client con `npm run prisma:generate`.

## Comandos

```bash
npm run dev
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

## Docker

```bash
docker compose up --build
```

La aplicación queda disponible detrás de Nginx en `http://localhost:8080`.

## Configuración central del nombre

El nombre público del producto se define en `src/config/site.ts` y puede sobreescribirse con `NEXT_PUBLIC_SITE_NAME`.

## Documentación

- `docs/ARCHITECTURE.md`
- `docs/GIT_WORKFLOW.md`
- `docs/DEPLOYMENT.md`
- `docs/ENVIRONMENT.md`

## Licencia

No se incluye una licencia hasta que el propietario del proyecto indique cuál debe aplicarse.
