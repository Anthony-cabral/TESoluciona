# Contribución

Gracias por contribuir a Tesoluciona. Este proyecto sigue desarrollo por ramas, cambios pequeños y verificaciones antes de cada commit.

## Flujo

1. Trabaja desde `develop`.
2. Crea una rama con prefijo descriptivo, por ejemplo `feature/nombre-del-modulo`.
3. Mantén los cambios limitados al alcance de la tarea.
4. Ejecuta las verificaciones antes de confirmar.
5. Usa Conventional Commits.

## Verificaciones

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

## Convención de commits

Ejemplos válidos:

```text
feat(content): agrega modelo inicial de artículos
fix(api): corrige respuesta de healthcheck
docs: documenta despliegue en VPS
chore: actualiza configuración de lint
```

## Seguridad

No incluyas secretos, archivos `.env`, credenciales, datos personales reales ni backups sensibles.
