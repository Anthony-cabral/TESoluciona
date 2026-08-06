# Content Security Policy

Tesoluciona aplica CSP desde `middleware.ts` para poder generar un nonce por solicitud y adjuntarlo a scripts inline necesarios, como JSON-LD y el script mínimo de tema.

## Desarrollo

En desarrollo se permite temporalmente `unsafe-eval` solo en `script-src`, porque Next.js/Turbopack y Hot Module Replacement pueden necesitar evaluación dinámica durante `next dev`. También se permite conexión a `localhost`, `127.0.0.1`, `ws:` y `wss:` para HMR.

Esta excepción no debe copiarse a producción.

## Producción

En producción la CSP elimina `unsafe-eval`, mantiene `script-src` con nonce y `strict-dynamic`, bloquea objetos, limita `frame-ancestors` y conserva cabeceras defensivas adicionales en `next.config.mjs`.
