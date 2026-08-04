import { defineConfig } from "prisma/config";

const fallbackDatabaseUrl =
  "postgresql://tesoluciona:tesoluciona_local_password@localhost:5432/tesoluciona?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: process.env.DATABASE_URL ?? fallbackDatabaseUrl
  }
});
