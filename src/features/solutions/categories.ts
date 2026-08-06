import type { Category } from "@/features/solutions/types";

const categoryInput = [
  [
    "Windows",
    "windows",
    "Soluciones para activación, actualización, reparación y configuración de Windows.",
    "MonitorCog"
  ],
  [
    "Microsoft 365",
    "microsoft-365",
    "Guías para Office, Outlook, Teams y servicios de productividad de Microsoft.",
    "Cloud"
  ],
  [
    "Excel",
    "excel",
    "Ayuda para fórmulas, configuración regional, archivos y productividad en hojas de cálculo.",
    "Sheet"
  ],
  [
    "Word",
    "word",
    "Soluciones para documentos, formato, impresión, plantillas y errores frecuentes de Word.",
    "FileText"
  ],
  [
    "Outlook",
    "outlook",
    "Perfiles, firmas, errores de inicio, configuración de cuentas y rendimiento de Outlook.",
    "Mail"
  ],
  [
    "Google Chrome",
    "google-chrome",
    "Actualización, caché, extensiones, perfiles y errores del navegador Chrome.",
    "Chrome"
  ],
  [
    "Microsoft Edge",
    "microsoft-edge",
    "Guías para actualizar, reparar y configurar Microsoft Edge.",
    "Globe"
  ],
  [
    "Android",
    "android",
    "Soluciones para dispositivos Android, conectividad, apps y seguridad móvil.",
    "Smartphone"
  ],
  [
    "iPhone y iOS",
    "iphone-ios",
    "Guías para iPhone, iOS, conectividad, privacidad y aplicaciones.",
    "Smartphone"
  ],
  [
    "Impresoras",
    "impresoras",
    "Configuración, cola de impresión, doble cara, drivers y problemas comunes.",
    "Printer"
  ],
  [
    "Redes",
    "redes",
    "Diagnóstico de conectividad, IP, puertos, ping, traceroute y configuración básica.",
    "Network"
  ],
  [
    "Routers",
    "routers",
    "Acceso al router, IP de puerta de enlace, DNS y configuración doméstica o de oficina.",
    "Router"
  ],
  [
    "WiFi",
    "wifi",
    "Problemas de señal, conexión, contraseña, adaptadores y redes inalámbricas.",
    "Wifi"
  ],
  [
    "PowerShell",
    "powershell",
    "Comandos y scripts administrativos para Windows y Microsoft 365.",
    "Terminal"
  ],
  [
    "CMD",
    "cmd",
    "Comandos clásicos de Windows para diagnóstico y reparación.",
    "SquareTerminal"
  ],
  [
    "Active Directory",
    "active-directory",
    "Gestión de identidades, equipos, políticas y dominios Windows.",
    "Users"
  ],
  [
    "Windows Server",
    "windows-server",
    "Administración de servidores Windows, roles, servicios y mantenimiento.",
    "Server"
  ],
  [
    "Linux",
    "linux",
    "Comandos, permisos, red, servicios y resolución de problemas en Linux.",
    "HardDrive"
  ],
  [
    "VPN",
    "vpn",
    "Conectividad remota, túneles, DNS, credenciales y diagnóstico de VPN.",
    "Shield"
  ],
  [
    "DNS",
    "dns",
    "Resolución de nombres, caché DNS, servidores públicos y registros.",
    "Map"
  ],
  [
    "DHCP",
    "dhcp",
    "Asignación automática de direcciones IP y diagnóstico de leases.",
    "Cable"
  ],
  [
    "SQL",
    "sql",
    "Errores de conexión, autenticación, consultas y administración básica de bases de datos.",
    "Database"
  ],
  [
    "Hardware",
    "hardware",
    "Diagnóstico de componentes, rendimiento, temperatura y fallos físicos.",
    "Cpu"
  ],
  [
    "Drivers",
    "drivers",
    "Instalación, actualización y reversión segura de controladores.",
    "Download"
  ],
  [
    "BIOS",
    "bios",
    "Configuración básica, arranque, virtualización y precauciones antes de actualizar.",
    "CircuitBoard"
  ],
  [
    "Virtualización",
    "virtualizacion",
    "Hyper-V, WSL, Docker, máquinas virtuales y requisitos de CPU.",
    "Boxes"
  ],
  [
    "Inteligencia artificial",
    "inteligencia-artificial",
    "Uso responsable de herramientas de IA, privacidad y productividad.",
    "Brain"
  ],
  [
    "ChatGPT",
    "chatgpt",
    "Prompts, configuración, privacidad y buenas prácticas con ChatGPT.",
    "MessagesSquare"
  ],
  [
    "WhatsApp",
    "whatsapp",
    "Conectividad, copias de seguridad, WhatsApp Web y privacidad.",
    "MessageCircle"
  ],
  [
    "Gmail",
    "gmail",
    "Configuración, filtros, seguridad, recuperación y uso eficiente de Gmail.",
    "MailCheck"
  ],
  [
    "Ciberseguridad",
    "ciberseguridad",
    "Protección, HTTPS, contraseñas, antivirus, phishing y prácticas seguras.",
    "ShieldCheck"
  ]
] as const;

export const categories: Category[] = categoryInput.map(
  ([name, slug, description, icon]) => ({
    name,
    slug,
    description,
    icon,
    featuredArticleSlugs: [],
    recentArticleSlugs: [],
    relatedErrorSlugs: [],
    relatedToolSlugs: [],
    tags: [name.toLowerCase(), slug.replaceAll("-", " ")],
    seo: {
      title: `${name}: guías, errores y soluciones prácticas`,
      description
    }
  })
);

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
