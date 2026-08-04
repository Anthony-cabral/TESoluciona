# Variables de entorno

Usa `.env.example` como plantilla. No confirmes `.env` en Git.

## App

- `APP_ENV`: `development`, `test` o `production`.
- `NEXT_PUBLIC_SITE_NAME`: nombre publico de la plataforma.
- `NEXT_PUBLIC_SITE_URL`: URL publica absoluta.
- `NEXT_PUBLIC_APP_VERSION`: version visible para healthcheck.

## Base de datos

- `DATABASE_URL`: conexion PostgreSQL usada por Prisma.

## Cache

- `REDIS_URL`: conexion Redis para cache y futuras colas ligeras.

## Administracion

- `ADMIN_USERNAME`: usuario de Basic Auth para `/admin`.
- `ADMIN_PASSWORD`: contrasena de Basic Auth para `/admin`. Cambiar siempre en produccion.

## Seguridad futura

- `RATE_LIMIT_WINDOW_SECONDS`: ventana del rate limit.
- `RATE_LIMIT_MAX_REQUESTS`: limite de solicitudes por ventana.
