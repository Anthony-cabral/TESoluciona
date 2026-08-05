# Render preview deployment

Use this document to create a temporary Render Web Service from the branch `feature/public-solutions-mvp`.

## Render settings

- Runtime: Node
- Branch: `feature/public-solutions-mvp`
- Build Command: `npm ci && npm run prisma:generate && npm run build`
- Start Command: `npm run start -- --hostname 0.0.0.0 --port $PORT`
- Health Check Path: `/api/health`
- Auto Deploy: disabled for temporary review

## Environment variables

Public non-sensitive values may be stored directly in Render:

- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_NAME=Tesoluciona`
- `NEXT_PUBLIC_APP_VERSION=0.1.0`
- `NEXT_PUBLIC_SITE_URL`: set this manually after Render gives you the HTTPS preview URL.

Private values must be configured manually in Render and must not be committed:

- `DATABASE_URL`: optional for the current static preview; required when using Prisma-backed content.
- `REDIS_URL`: optional for the current static preview; required when enabling Redis-backed cache features.
- `ADMIN_USERNAME`: required if `/admin` will be opened.
- `ADMIN_PASSWORD`: required if `/admin` will be opened.

## Temporary preview fallbacks

The public pages, search, articles, errors and tools use static content in this phase, so the preview can run without PostgreSQL or Redis. `/api/health` returns HTTP 200 and reports `missing_env` for database/cache when those variables are absent.

When persistent editorial data is needed, create a Render PostgreSQL database and set `DATABASE_URL` from Render's internal connection string. Do not write that value into Git.
