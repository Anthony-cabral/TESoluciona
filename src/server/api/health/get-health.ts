import { siteConfig } from "@/config/site";

export type HealthResponse = {
  status: "ok";
  service: string;
  version: string;
  timestamp: string;
  checks: {
    database: "configured" | "missing_env";
    cache: "configured" | "missing_env";
  };
};

export function getHealthResponse(): HealthResponse {
  return {
    status: "ok",
    service: siteConfig.name,
    version: siteConfig.version,
    timestamp: new Date().toISOString(),
    checks: {
      database: process.env.DATABASE_URL ? "configured" : "missing_env",
      cache: process.env.REDIS_URL ? "configured" : "missing_env"
    }
  };
}
