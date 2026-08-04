import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeScript } from "@/components/theme/theme-script";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    type: "website",
    url: siteConfig.url
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    },
    index: true
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  }
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { color: "#f7faf9", media: "(prefers-color-scheme: light)" },
    { color: "#101418", media: "(prefers-color-scheme: dark)" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es-DO" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeScript />
        <a
          className="skip-link rounded-md bg-ink-950 px-4 py-3 text-sm font-semibold text-white"
          href="#main-content"
        >
          Saltar al contenido principal
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
