# Variables de entorno

Usa `.env.example` como plantilla. No confirmes `.env` en Git.

## App

- `APP_ENV`: `development`, `test` o `production`.
- `NEXT_PUBLIC_SITE_NAME`: nombre público de la plataforma.
- `NEXT_PUBLIC_SITE_URL`: URL pública absoluta.
- `NEXT_PUBLIC_APP_VERSION`: versión visible para healthcheck.

## Base de datos

- `DATABASE_URL`: conexión PostgreSQL usada por Prisma.

## Caché

- `REDIS_URL`: conexión Redis para caché y futuras colas ligeras.

## Seguridad futura

- `RATE_LIMIT_WINDOW_SECONDS`: ventana del rate limit.
- `RATE_LIMIT_MAX_REQUESTS`: límite de solicitudes por ventana.
