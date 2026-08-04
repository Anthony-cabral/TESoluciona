import type { ToolMetadata } from "@/features/solutions/types";

export const tools: ToolMetadata[] = [
  {
    type: "tool",
    name: "Calculadora IPv4",
    slug: "calculadora-ipv4",
    categorySlug: "redes",
    description:
      "Calcula red, broadcast, máscara, wildcard y rango útil desde una IPv4 con CIDR.",
    useCases: [
      "Documentar una red local.",
      "Validar un segmento antes de configurar DHCP.",
      "Entender una dirección CIDR."
    ],
    examples: ["192.168.1.25/24", "10.0.5.10/22"],
    faq: [
      {
        question: "¿Guarda la IP?",
        answer: "No. El cálculo se realiza localmente en tu navegador."
      }
    ],
    tags: ["ip", "ipv4", "cidr", "redes"],
    seo: {
      title: "Calculadora IPv4 online",
      description: "Calcula subredes IPv4, broadcast y rango útil localmente.",
      canonicalPath: "/herramientas/calculadora-ipv4"
    },
    keywords: ["calculadora ipv4", "cidr", "subred"],
    status: "active"
  },
  {
    type: "tool",
    name: "Calculadora de subred",
    slug: "calculadora-subred",
    categorySlug: "redes",
    description: "Sugiere prefijo CIDR según cantidad de hosts requeridos.",
    useCases: [
      "Planificar VLAN pequeñas.",
      "Elegir máscara para una oficina.",
      "Evitar desperdicio de direcciones."
    ],
    examples: ["50 hosts", "200 hosts"],
    faq: [
      {
        question: "¿Incluye red y broadcast?",
        answer:
          "Sí. El cálculo reserva esas direcciones para redes IPv4 tradicionales."
      }
    ],
    tags: ["subred", "cidr", "hosts"],
    seo: {
      title: "Calculadora de subred online",
      description: "Calcula prefijo, máscara y capacidad de una subred IPv4.",
      canonicalPath: "/herramientas/calculadora-subred"
    },
    keywords: ["calculadora subred", "hosts cidr"],
    status: "active"
  },
  {
    type: "tool",
    name: "Generador UUID",
    slug: "generador-uuid",
    categorySlug: "powershell",
    description:
      "Genera UUID v4 en el navegador usando crypto.randomUUID cuando está disponible.",
    useCases: [
      "Crear identificadores de prueba.",
      "Preparar datos de desarrollo.",
      "Nombrar recursos únicos."
    ],
    examples: ["550e8400-e29b-41d4-a716-446655440000"],
    faq: [
      {
        question: "¿Son criptográficamente seguros?",
        answer: "El navegador usa la API Crypto cuando está disponible."
      }
    ],
    tags: ["uuid", "desarrollo"],
    seo: {
      title: "Generador UUID v4",
      description: "Genera UUID v4 localmente en el navegador.",
      canonicalPath: "/herramientas/generador-uuid"
    },
    keywords: ["uuid", "guid"],
    status: "active"
  },
  {
    type: "tool",
    name: "Generador de contraseñas",
    slug: "generador-contrasenas",
    categorySlug: "ciberseguridad",
    description:
      "Crea contraseñas fuertes localmente, sin enviarlas al servidor.",
    useCases: [
      "Cuentas nuevas.",
      "Rotación segura.",
      "Contraseñas temporales."
    ],
    examples: ["20 caracteres con símbolos", "Frase larga con números"],
    faq: [
      {
        question: "¿Se almacenan las contraseñas?",
        answer: "No. Se generan y muestran solo en tu navegador."
      }
    ],
    tags: ["contraseña", "seguridad"],
    seo: {
      title: "Generador de contraseñas seguras",
      description:
        "Genera contraseñas fuertes localmente y sin almacenamiento.",
      canonicalPath: "/herramientas/generador-contrasenas"
    },
    keywords: ["password generator", "contraseña segura"],
    status: "active"
  },
  {
    type: "tool",
    name: "Comprobador de fortaleza de contraseña",
    slug: "fortaleza-contrasena",
    categorySlug: "ciberseguridad",
    description:
      "Evalúa longitud, variedad y patrones comunes sin guardar la contraseña.",
    useCases: [
      "Revisar una contraseña antes de usarla.",
      "Explicar por qué una clave es débil."
    ],
    examples: ["CorrectHorseBatteryStaple2026!", "P@ssw0rd"],
    faq: [
      {
        question: "¿Debo pegar mi contraseña real?",
        answer: "Es mejor probar una similar, no una contraseña real en uso."
      }
    ],
    tags: ["contraseña", "fortaleza", "seguridad"],
    seo: {
      title: "Comprobador de fortaleza de contraseña",
      description: "Evalúa contraseñas localmente con mensajes claros.",
      canonicalPath: "/herramientas/fortaleza-contrasena"
    },
    keywords: ["fortaleza contraseña", "password strength"],
    status: "active"
  },
  {
    type: "tool",
    name: "Base64 encoder/decoder",
    slug: "base64",
    categorySlug: "powershell",
    description:
      "Codifica y decodifica texto Base64 con validación de errores.",
    useCases: [
      "Revisar payloads.",
      "Decodificar cadenas de configuración.",
      "Preparar ejemplos técnicos."
    ],
    examples: ["VGVzb2x1Y2lvbmE=", "Tesoluciona"],
    faq: [
      {
        question: "¿Base64 cifra datos?",
        answer: "No. Base64 solo codifica; cualquiera puede decodificarlo."
      }
    ],
    tags: ["base64", "codificación"],
    seo: {
      title: "Codificador y decodificador Base64",
      description: "Convierte texto a Base64 y viceversa localmente.",
      canonicalPath: "/herramientas/base64"
    },
    keywords: ["base64 encode", "base64 decode"],
    status: "active"
  },
  {
    type: "tool",
    name: "URL encoder/decoder",
    slug: "url-encoder-decoder",
    categorySlug: "dns",
    description: "Codifica o decodifica cadenas URL de forma segura.",
    useCases: [
      "Preparar parámetros query.",
      "Leer URLs codificadas.",
      "Depurar redirecciones."
    ],
    examples: ["hola mundo", "q=error%200x80070005"],
    faq: [
      {
        question: "¿Modifica la URL completa?",
        answer:
          "Puedes codificar texto o parámetros; revisa antes de usarlo en producción."
      }
    ],
    tags: ["url", "encode", "decode"],
    seo: {
      title: "URL encoder y decoder",
      description: "Codifica y decodifica texto para URLs.",
      canonicalPath: "/herramientas/url-encoder-decoder"
    },
    keywords: ["url encode", "url decode"],
    status: "active"
  },
  {
    type: "tool",
    name: "Formateador y validador JSON",
    slug: "json-formatter",
    categorySlug: "sql",
    description: "Valida JSON, lo formatea y muestra errores comprensibles.",
    useCases: [
      "Revisar respuestas API.",
      "Formatear configuración.",
      "Detectar comas o llaves faltantes."
    ],
    examples: ['{"ok":true}', "[1,2,3]"],
    faq: [
      {
        question: "¿Envía mi JSON al servidor?",
        answer: "No. El parseo se realiza localmente en tu navegador."
      }
    ],
    tags: ["json", "formatter", "api"],
    seo: {
      title: "Formateador JSON online",
      description: "Valida y formatea JSON localmente.",
      canonicalPath: "/herramientas/json-formatter"
    },
    keywords: ["json formatter", "validar json"],
    status: "active"
  },
  {
    type: "tool",
    name: "Contador de palabras y caracteres",
    slug: "contador-palabras",
    categorySlug: "word",
    description:
      "Cuenta palabras, caracteres, frases y tiempo estimado de lectura.",
    useCases: [
      "Revisar textos.",
      "Preparar resúmenes.",
      "Medir contenido para documentación."
    ],
    examples: ["Pega un párrafo técnico.", "Revisa una descripción SEO."],
    faq: [
      {
        question: "¿Cuenta espacios?",
        answer: "Muestra caracteres con y sin espacios."
      }
    ],
    tags: ["palabras", "caracteres", "texto"],
    seo: {
      title: "Contador de palabras y caracteres",
      description: "Cuenta palabras, caracteres y tiempo de lectura.",
      canonicalPath: "/herramientas/contador-palabras"
    },
    keywords: ["word counter", "contador caracteres"],
    status: "active"
  },
  {
    type: "tool",
    name: "Generador de códigos QR",
    slug: "generador-qr",
    categorySlug: "android",
    description:
      "Genera un QR descargable para texto o enlaces, procesado en el navegador.",
    useCases: [
      "Compartir una URL.",
      "Crear QR para WiFi o eventos.",
      "Probar códigos en soporte."
    ],
    examples: ["https://tesoluciona.local", "WIFI:T:WPA;S:Red;P:clave;;"],
    faq: [
      {
        question: "¿El QR se genera en el servidor?",
        answer: "No. La imagen se genera localmente en el navegador."
      }
    ],
    tags: ["qr", "url", "wifi"],
    seo: {
      title: "Generador de QR online",
      description: "Genera códigos QR localmente para texto y enlaces.",
      canonicalPath: "/herramientas/generador-qr"
    },
    keywords: ["qr generator", "codigo qr"],
    status: "active"
  }
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug && tool.status === "active");
}
