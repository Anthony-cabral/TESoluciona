# Despliegue

## Vercel

El proyecto incluye `vercel.json` y usa Next.js como framework. Variables requeridas:

- `DATABASE_URL`
- `REDIS_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_VERSION`

Comando de build:

```bash
npm run build
```

## VPS con Docker y Nginx

1. Configura `.env` a partir de `.env.example`.
2. Ejecuta:

```bash
docker compose up --build -d
```

3. Publica Nginx detrás de HTTPS administrado por el proxy o por Cloudflare.

## Cloudflare

Cloudflare debe configurarse como capa de DNS, TLS, caché perimetral, Brotli, reglas de seguridad y protección DDoS. Recomendaciones iniciales:

- SSL/TLS en modo Full Strict cuando el origen tenga certificado válido.
- Brotli activado en Speed > Optimization.
- HTTP/2 y HTTP/3 activados.
- Cache Rules para assets bajo `/_next/static/*`.
- WAF administrado con reglas de seguridad comunes.

## Nginx

La configuración base activa Gzip y caché para assets estáticos de Next.js. `infra/nginx/conf.d/brotli.conf.example` contiene la configuración Brotli para builds de Nginx con ese módulo.
