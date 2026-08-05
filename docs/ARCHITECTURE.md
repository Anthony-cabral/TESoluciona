# Arquitectura

Tesoluciona usa Next.js con App Router como framework central para soportar SEO, paginas indexables, SSR, ISR, metadata dinamica, sitemap y datos estructurados.

## Capas

- `src/app`: rutas, layouts, metadata y Route Handlers.
- `src/components`: componentes de interfaz reutilizables y accesibles.
- `src/config`: configuracion central del producto.
- `src/features/*/domain`: tipos, entidades y contratos del dominio.
- `src/features/*/application`: casos de uso y orquestacion.
- `src/features/*/infrastructure`: adaptadores concretos, repositorios y fuentes de datos.
- `src/infrastructure`: clientes compartidos de base de datos, cache y servicios externos.
- `src/server/api`: logica modular para endpoints REST.
- `src/lib`: utilidades transversales.

## Principios

- Mantener contratos del dominio independientes de frameworks.
- Usar Repository Pattern para aislar persistencia.
- Evitar logica de negocio dentro de componentes visuales.
- Tipar entradas y salidas de API.
- Mantener modulos pequenos y reversibles.

## Datos

Prisma define los modelos editoriales y operativos del MVP:

- Identidad y permisos: `User`, `Role`, `Permission`, `UserRole`, `RolePermission`.
- Editorial: `Author`, `Reviewer`, `Article`, `ArticleRevision`, `Category`, `Tag`, `ArticleTag`, `SolutionStep`, `CommandBlock`, `ArticleImage`, `ImageLicense`.
- Soporte: `ErrorEntry`, `ErrorSolution`, `Tool`, `FAQ`, `Source`, `RelatedContent`.
- Actividad: `SearchQuery`, `SearchSuggestion`, `Comment`, `Rating`, `Favorite`, `ReadingHistory`, `NewsletterSubscription`, `Redirect`, `AuditLog`.

El contenido inicial vive en `src/features/solutions/*` y se puede cargar a PostgreSQL con `npm run prisma:seed`. La configuracion de conexion vive en `prisma.config.ts`, compatible con Prisma 7. Los creditos de imagenes se registran en `content/image-attributions.json` y el flujo editorial esta documentado en `docs/SCREENSHOT_WORKFLOW.md`.

## Portal publico

La navegacion publica evita rutas privadas o no implementadas. El admin queda protegido en `/admin` y fuera del sitemap, robots e interfaz publica. Las rutas tematicas (`/guias`, `/windows`, `/microsoft-365`, `/redes`, `/impresoras`, `/navegadores`, `/seguridad`) agregan contenido por necesidad del usuario sin duplicar contenido de baja calidad.

## Cache

Redis queda preparado mediante un cliente lazy que solo conecta cuando existe `REDIS_URL`. Next.js aporta SSR e ISR; la home usa `revalidate = 3600`.

## SEO

La base incluye metadata global y por pagina, Open Graph, Twitter Cards, canonical, robots, sitemap, RSS, breadcrumbs y JSON-LD para WebSite, Organization, Article, TechArticle, FAQPage, BreadcrumbList y SoftwareApplication. Las busquedas internas, administracion y areas sin contenido indexable quedan fuera del indice.

## Seguridad

La CSP se construye en `src/lib/security/csp.ts` y se aplica desde `middleware.ts` con nonce por respuesta. En desarrollo se permite `unsafe-eval` solo en `script-src` para Hot Module Replacement; en produccion se elimina. El panel `/admin` usa Basic Auth como proteccion minima hasta implementar autenticacion completa. Rate limiting, CSRF, 2FA, auditoria avanzada y reCAPTCHA quedan como modulos posteriores.
