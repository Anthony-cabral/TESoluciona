import type { ToolMetadata } from "@/features/solutions/types";

const localFilePrivacy = {
  localOnly: true,
  processingMode: "local" as const,
  retention:
    "No se conservan archivos; los resultados viven en memoria hasta limpiar la herramienta o cerrar la pestana.",
  uploadsFiles: false,
  usesAi: false,
  usesThirdParties: false
};

const pdfFaq = [
  {
    question: "Mis archivos se suben al servidor?",
    answer:
      "No. En este lote el procesamiento se realiza localmente en tu navegador."
  },
  {
    question: "Puedo usar documentos confidenciales?",
    answer:
      "La herramienta no los sube, pero evita trabajar con documentos sensibles en equipos compartidos o navegadores no confiables."
  }
];

const imageFaq = [
  {
    question: "La imagen pierde calidad?",
    answer:
      "Las conversiones pueden recomprimir la imagen segun el formato de salida. Para compresion y JPG puedes ajustar la calidad."
  },
  {
    question: "Se conservan metadatos EXIF?",
    answer:
      "Al procesar con Canvas, los metadatos se descartan en la salida generada."
  }
];

function createBatchOneTool(
  input: Omit<
    ToolMetadata,
    "batch" | "keywords" | "privacy" | "recent" | "seo" | "status" | "type"
  >
): ToolMetadata {
  return {
    ...input,
    batch: "batch-1",
    keywords: input.tags,
    privacy: localFilePrivacy,
    recent: true,
    seo: {
      canonicalPath: `/herramientas/${input.slug}`,
      description: input.summary ?? input.description,
      title: `${input.name} online privado`
    },
    status: "active",
    type: "tool"
  };
}

const mvpTools: ToolMetadata[] = [
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

const batchOneTools: ToolMetadata[] = [
  createBatchOneTool({
    categorySlug: "pdf",
    description:
      "Convierte una o varias imagenes JPG, PNG o WebP en un PDF descargable, con una pagina por imagen.",
    examples: [
      "Crear un PDF con fotos de documentos",
      "Enviar varias capturas en un solo archivo"
    ],
    faq: pdfFaq,
    instructions: [
      "Selecciona una o varias imagenes.",
      "Revisa que el orden sea correcto antes de procesar.",
      "Pulsa Convertir y descarga el PDF generado."
    ],
    limits: {
      acceptedFormats: ["JPG", "PNG", "WebP"],
      maxFileSizeMb: 25,
      maxFiles: 20,
      outputFormats: ["PDF"]
    },
    name: "Imagenes a PDF",
    operation: "images-to-pdf",
    popular: true,
    relatedSlugs: ["jpg-a-pdf", "unir-pdf"],
    slug: "imagenes-a-pdf",
    summary:
      "Crea un PDF localmente a partir de varias imagenes, sin subirlas a Tesoluciona.",
    tags: ["pdf", "imagenes", "conversion", "privado"],
    useCases: [
      "Agrupar fotos de documentos.",
      "Enviar varias capturas en un solo PDF.",
      "Convertir imagenes sin usar servicios externos."
    ]
  }),
  createBatchOneTool({
    categorySlug: "pdf",
    description:
      "Convierte una o varias imagenes JPG en un PDF con una pagina por archivo.",
    examples: ["Convertir una foto escaneada en PDF", "Agrupar recibos JPG"],
    faq: pdfFaq,
    instructions: [
      "Selecciona archivos JPG o JPEG.",
      "Comprueba que no esten vacios ni corruptos.",
      "Genera el PDF y descargalo."
    ],
    limits: {
      acceptedFormats: ["JPG", "JPEG"],
      maxFileSizeMb: 25,
      maxFiles: 20,
      outputFormats: ["PDF"]
    },
    name: "JPG a PDF",
    operation: "jpg-to-pdf",
    popular: true,
    relatedSlugs: ["imagenes-a-pdf", "jpg-a-png"],
    slug: "jpg-a-pdf",
    summary: "Convierte imagenes JPG a PDF desde el navegador.",
    tags: ["jpg", "pdf", "conversion"],
    useCases: [
      "Crear PDF desde fotos escaneadas.",
      "Agrupar JPG de un tramite.",
      "Generar un PDF local sin subir archivos."
    ]
  }),
  createBatchOneTool({
    categorySlug: "pdf",
    description:
      "Une varios documentos PDF en un solo archivo manteniendo el orden seleccionado.",
    examples: ["Unir anexos", "Combinar reportes PDF"],
    faq: pdfFaq,
    instructions: [
      "Selecciona dos o mas PDF.",
      "Confirma el orden de seleccion.",
      "Une los archivos y descarga el resultado."
    ],
    limits: {
      acceptedFormats: ["PDF"],
      maxFileSizeMb: 25,
      maxFiles: 10,
      outputFormats: ["PDF"]
    },
    name: "Unir PDF",
    operation: "merge-pdf",
    popular: true,
    relatedSlugs: ["dividir-pdf", "comprimir-pdf"],
    slug: "unir-pdf",
    summary: "Combina varios PDF localmente en un unico archivo.",
    tags: ["pdf", "unir", "documentos"],
    useCases: [
      "Unir anexos en un solo archivo.",
      "Preparar un reporte con varias fuentes.",
      "Combinar PDF sin subir documentos."
    ]
  }),
  createBatchOneTool({
    categorySlug: "pdf",
    description:
      "Divide un PDF en archivos independientes, uno por pagina, sin subir el documento.",
    examples: ["Separar facturas", "Extraer paginas individuales"],
    faq: pdfFaq,
    instructions: [
      "Selecciona un PDF.",
      "La herramienta generara un archivo por pagina.",
      "Descarga las paginas que necesites."
    ],
    limits: {
      acceptedFormats: ["PDF"],
      maxFileSizeMb: 25,
      maxFiles: 1,
      outputFormats: ["PDF"]
    },
    name: "Dividir PDF",
    operation: "split-pdf",
    popular: true,
    relatedSlugs: ["unir-pdf", "pdf-a-jpg"],
    slug: "dividir-pdf",
    summary: "Separa un PDF en paginas individuales desde tu navegador.",
    tags: ["pdf", "dividir", "paginas"],
    useCases: [
      "Separar paginas de un documento.",
      "Extraer facturas o anexos individuales.",
      "Generar archivos por pagina localmente."
    ]
  }),
  createBatchOneTool({
    categorySlug: "pdf",
    description:
      "Optimiza la estructura interna de un PDF. No rompe contrasenas ni promete recomprimir imagenes internas.",
    examples: [
      "Reducir metadatos y estructura",
      "Reintentar guardado optimizado"
    ],
    faq: [
      ...pdfFaq,
      {
        question: "Siempre reduce el tamano?",
        answer:
          "No. Esta compresion local es basica; algunos PDF ya estan optimizados y pueden quedar igual o crecer ligeramente."
      }
    ],
    instructions: [
      "Selecciona un PDF no protegido.",
      "Procesa el archivo localmente.",
      "Compara el tamano original y el optimizado."
    ],
    limits: {
      acceptedFormats: ["PDF"],
      maxFileSizeMb: 25,
      maxFiles: 1,
      outputFormats: ["PDF"]
    },
    name: "Comprimir PDF",
    operation: "compress-pdf",
    popular: true,
    relatedSlugs: ["unir-pdf", "dividir-pdf"],
    slug: "comprimir-pdf",
    summary: "Intenta optimizar un PDF localmente sin enviar documentos.",
    tags: ["pdf", "comprimir", "privacidad"],
    useCases: [
      "Probar una optimizacion rapida.",
      "Reducir metadatos del PDF.",
      "Comprobar si un PDF puede quedar mas ligero."
    ]
  }),
  createBatchOneTool({
    categorySlug: "pdf",
    description:
      "Renderiza las paginas de un PDF como imagenes JPG descargables.",
    examples: ["Crear miniaturas", "Extraer una pagina como imagen"],
    faq: pdfFaq,
    instructions: [
      "Selecciona un PDF.",
      "Espera a que se rendericen las paginas.",
      "Descarga las imagenes JPG generadas."
    ],
    limits: {
      acceptedFormats: ["PDF"],
      maxFileSizeMb: 20,
      maxFiles: 1,
      outputFormats: ["JPG"]
    },
    name: "PDF a JPG",
    operation: "pdf-to-jpg",
    popular: true,
    relatedSlugs: ["dividir-pdf", "jpg-a-pdf"],
    slug: "pdf-a-jpg",
    summary: "Convierte paginas de PDF a JPG en el navegador.",
    tags: ["pdf", "jpg", "imagenes"],
    useCases: [
      "Crear miniaturas de paginas.",
      "Extraer una pagina como imagen.",
      "Compartir una pagina PDF como JPG."
    ]
  }),
  createBatchOneTool({
    categorySlug: "imagenes",
    description: "Convierte imagenes JPG a PNG usando Canvas local.",
    examples: ["Crear PNG para edicion", "Convertir capturas JPG"],
    faq: imageFaq,
    instructions: [
      "Selecciona uno o varios JPG.",
      "Convierte los archivos.",
      "Descarga los PNG generados."
    ],
    limits: {
      acceptedFormats: ["JPG", "JPEG"],
      maxFileSizeMb: 15,
      maxFiles: 20,
      outputFormats: ["PNG"]
    },
    name: "JPG a PNG",
    operation: "jpg-to-png",
    popular: true,
    relatedSlugs: ["png-a-jpg", "comprimir-imagen"],
    slug: "jpg-a-png",
    summary: "Convierte JPG a PNG sin subir imagenes.",
    tags: ["jpg", "png", "imagenes"],
    useCases: [
      "Preparar una imagen para edicion.",
      "Convertir capturas JPG a PNG.",
      "Procesar varias imagenes localmente."
    ]
  }),
  createBatchOneTool({
    categorySlug: "imagenes",
    description: "Convierte PNG a JPG con fondo blanco para transparencias.",
    examples: ["Preparar imagenes para correo", "Reducir peso de PNG grandes"],
    faq: imageFaq,
    instructions: [
      "Selecciona uno o varios PNG.",
      "Ajusta la calidad si quieres menor peso.",
      "Descarga los JPG generados."
    ],
    limits: {
      acceptedFormats: ["PNG"],
      maxFileSizeMb: 15,
      maxFiles: 20,
      outputFormats: ["JPG"]
    },
    name: "PNG a JPG",
    operation: "png-to-jpg",
    popular: true,
    relatedSlugs: ["jpg-a-png", "redimensionar-imagen"],
    slug: "png-a-jpg",
    summary: "Convierte PNG a JPG localmente.",
    tags: ["png", "jpg", "imagenes"],
    useCases: [
      "Reducir el peso de PNG grandes.",
      "Convertir imagenes para formularios.",
      "Exportar PNG con transparencia sobre fondo blanco."
    ]
  }),
  createBatchOneTool({
    categorySlug: "imagenes",
    description:
      "Cambia el ancho y alto de imagenes JPG, PNG o WebP respetando proporcion cuando indiques solo una dimension.",
    examples: ["Crear miniaturas", "Reducir imagenes para web"],
    faq: imageFaq,
    instructions: [
      "Selecciona imagenes.",
      "Indica ancho, alto o ambos.",
      "Procesa y descarga los resultados."
    ],
    limits: {
      acceptedFormats: ["JPG", "PNG", "WebP"],
      maxFileSizeMb: 15,
      maxFiles: 20,
      outputFormats: ["JPG", "PNG"]
    },
    name: "Redimensionar imagen",
    operation: "resize-image",
    popular: true,
    relatedSlugs: ["comprimir-imagen", "png-a-jpg"],
    slug: "redimensionar-imagen",
    summary: "Redimensiona imagenes en tu navegador sin subir archivos.",
    tags: ["imagenes", "resize", "miniaturas"],
    useCases: [
      "Crear miniaturas.",
      "Reducir imagenes para web.",
      "Ajustar dimensiones para formularios."
    ]
  }),
  createBatchOneTool({
    categorySlug: "imagenes",
    description:
      "Comprime imagenes generando una version JPG optimizada con calidad configurable.",
    examples: ["Reducir peso para web", "Preparar imagenes para formularios"],
    faq: imageFaq,
    instructions: [
      "Selecciona imagenes JPG, PNG o WebP.",
      "Elige la calidad de salida.",
      "Descarga las versiones comprimidas."
    ],
    limits: {
      acceptedFormats: ["JPG", "PNG", "WebP"],
      maxFileSizeMb: 15,
      maxFiles: 20,
      outputFormats: ["JPG"]
    },
    name: "Comprimir imagen",
    operation: "compress-image",
    popular: true,
    relatedSlugs: ["redimensionar-imagen", "jpg-a-png"],
    slug: "comprimir-imagen",
    summary: "Reduce peso de imagenes localmente con calidad configurable.",
    tags: ["imagenes", "compresion", "web"],
    useCases: [
      "Reducir peso para web.",
      "Preparar imagenes para envio.",
      "Crear versiones JPG optimizadas."
    ]
  })
];

export const tools: ToolMetadata[] = [...mvpTools, ...batchOneTools];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug && tool.status === "active");
}
