import { NextResponse } from "next/server";

import { getHealthResponse } from "@/server/api/health/get-health";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getHealthResponse(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
