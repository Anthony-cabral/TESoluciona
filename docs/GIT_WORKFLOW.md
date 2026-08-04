# Flujo Git

## Ramas principales

- `main`: rama estable y protegida conceptualmente. No se desarrolla directamente aquí.
- `develop`: rama de integración para trabajo aprobado.
- `feature/*`, `fix/*`, `docs/*`, `test/*`, `chore/*`, `security/*`, `seo/*`, `performance/*`, `legal/*`, `refactor/*`: ramas de trabajo.
- `release/*`: preparación de versiones estables hacia `main`.
- `hotfix/*`: correcciones críticas creadas desde `main` y sincronizadas luego con `develop`.

## Inicio de tarea

```bash
git status
git checkout develop
git pull --ff-only
git checkout -b feature/nombre-del-cambio
```

Si no hay remoto configurado, omite `pull` y continúa localmente.

## Antes de cada commit

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

También revisa que no existan secretos, `.env`, logs locales ni archivos generados innecesarios.

## Commits

Usa Conventional Commits:

```text
feat: agrega una capacidad nueva
fix: corrige un defecto
docs: actualiza documentación
test: agrega o corrige pruebas
chore: cambia configuración o tareas de mantenimiento
security: mejora controles de seguridad
seo: mejora metadata, datos estructurados o indexación
perf: mejora rendimiento
```

## Integración

Las ramas de trabajo se integran primero hacia `develop`. La integración hacia `main` ocurre solo mediante `release/*`, después de revisión y aprobación.

## Comandos prohibidos sin autorización explícita

```text
git reset --hard
git clean -fd
git push --force
git branch -D
```

## Publicación de rama

```bash
git push -u origin feature/nombre-del-cambio
```

El pull request debe apuntar a `develop`, incluir pruebas realizadas, migraciones, variables nuevas, riesgos y plan de reversión.
