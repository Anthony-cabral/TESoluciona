# Arquitectura

Tesoluciona usa Next.js con App Router como framework central para soportar SEO, páginas indexables, SSR, ISR, metadata dinámica, sitemap y datos estructurados.

## Capas

- `src/app`: rutas, layouts, metadata y Route Handlers.
- `src/components`: componentes de interfaz reutilizables y accesibles.
- `src/config`: configuración central del producto.
- `src/features/*/domain`: tipos, entidades y contratos del dominio.
- `src/features/*/application`: casos de uso y orquestación.
- `src/features/*/infrastructure`: adaptadores concretos, repositorios y fuentes de datos.
- `src/infrastructure`: clientes compartidos de base de datos, caché y servicios externos.
- `src/server/api`: lógica modular para endpoints REST.
- `src/lib`: utilidades transversales.

## Principios

- Mantener contratos del dominio independientes de frameworks.
- Usar Repository Pattern para aislar persistencia.
- Evitar lógica de negocio dentro de componentes visuales.
- Tipar entradas y salidas de API.
- Mantener módulos pequeños y reversibles.

## Datos

Prisma define el esquema inicial para autores, categorías, etiquetas, artículos y definiciones de herramientas. El modelo evita implementar todavía autenticación o un panel administrativo completo, pero prepara la base editorial y extensible. La configuración de conexión vive en `prisma.config.ts`, compatible con Prisma 7.

## Caché

Redis queda preparado mediante un cliente lazy que solo conecta cuando existe `REDIS_URL`. Next.js aporta SSR e ISR; la home inicial usa `revalidate = 3600`.

## SEO

La base incluye metadata global, Open Graph, Twitter Cards, robots, sitemap y JSON-LD para WebSite y Organization. Las fases futuras deben ampliar breadcrumbs, canonical dinámico, RSS y datos estructurados por tipo de contenido.

## Seguridad

La fase inicial configura cabeceras de seguridad y mantiene secretos fuera del repositorio. Rate limiting, CSRF, 2FA, auditoría y reCAPTCHA quedan como módulos posteriores.
