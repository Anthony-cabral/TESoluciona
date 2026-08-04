export function buildContentSecurityPolicy(
  nonce: string,
  isDevelopment: boolean
) {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    isDevelopment ? "'unsafe-eval'" : ""
  ].filter(Boolean);

  const connectSrc = [
    "'self'",
    isDevelopment ? "ws:" : "",
    isDevelopment ? "wss:" : "",
    isDevelopment ? "http://localhost:*" : "",
    isDevelopment ? "http://127.0.0.1:*" : ""
  ].filter(Boolean);

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    `script-src ${scriptSrc.join(" ")}`,
    `connect-src ${connectSrc.join(" ")}`,
    "upgrade-insecure-requests"
  ].join("; ");
}
