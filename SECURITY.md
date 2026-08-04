# Seguridad

## Reporte de vulnerabilidades

Si encuentras una vulnerabilidad, repórtala de forma privada al mantenedor del repositorio. No publiques detalles explotables en issues públicos.

## Alcance inicial

La Fase 1 prepara controles base:

- Cabeceras de seguridad en Next.js y Nginx.
- Separación de variables de entorno.
- `.gitignore` para evitar secretos locales.
- CI con lint, typecheck, pruebas, build, auditoría de dependencias y escaneo de secretos.

## Pendientes de fases futuras

- Autenticación y autorización.
- Protección CSRF para formularios mutables.
- Rate limiting real por IP/usuario.
- 2FA para administradores.
- Auditoría de acciones críticas.
- Backups y rotación de logs.
