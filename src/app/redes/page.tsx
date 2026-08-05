import type { Metadata } from "next";

import { TopicPage } from "@/components/content/topic-page";

export const metadata: Metadata = {
  title: "Soluciones de redes, WiFi, DNS y router | Tesoluciona",
  description:
    "Aprende a identificar la IP del router, renovar IP, limpiar DNS, comprobar puertos, hacer ping y cambiar servidores DNS."
};

export default function RedesPage() {
  return (
    <TopicPage
      categorySlugs={["redes", "routers", "wifi", "dns", "dhcp", "vpn"]}
      description="Diagnóstico y solución para IP, DNS, router, WiFi, puertos, ping, traceroute y conectividad."
      searchHint="Cómo saber la IP del router"
      title="Soluciones de redes, WiFi y DNS"
    />
  );
}
