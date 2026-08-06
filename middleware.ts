import { NextRequest, NextResponse } from "next/server";

import { buildContentSecurityPolicy } from "@/lib/security/csp";

function getBasicAuthCredentials(header: string | null) {
  if (!header?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separator = decoded.indexOf(":");
    if (separator === -1) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1)
    };
  } catch {
    return null;
  }
}

function protectAdmin(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return null;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const username = process.env.ADMIN_USERNAME ?? (isProduction ? "" : "admin");
  const password =
    process.env.ADMIN_PASSWORD ?? (isProduction ? "" : "change-me-local-only");

  if (!username || !password) {
    return new NextResponse("Admin credentials are not configured.", {
      status: 503
    });
  }

  const credentials = getBasicAuthCredentials(
    request.headers.get("authorization")
  );
  if (
    credentials?.username === username &&
    credentials?.password === password
  ) {
    return null;
  }

  return new NextResponse("Authentication required.", {
    headers: {
      "WWW-Authenticate": 'Basic realm="Tesoluciona Admin"'
    },
    status: 401
  });
}

export function middleware(request: NextRequest) {
  const adminResponse = protectAdmin(request);
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response =
    adminResponse ??
    NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });

  response.headers.set(
    "Content-Security-Policy",
    buildContentSecurityPolicy(nonce, process.env.NODE_ENV !== "production")
  );
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand|ads.txt).*)"]
};
