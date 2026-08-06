import { tools } from "@/features/solutions/tools";
import type {
  ToolCategory,
  ToolDefinition,
  ToolOperation
} from "@/features/tools/domain/tool-definition";

const categoryBySlug: Record<string, ToolCategory> = {
  android: "Productividad",
  ciberseguridad: "Seguridad",
  dns: "Desarrollo",
  imagenes: "Imagenes",
  pdf: "PDF",
  powershell: "Desarrollo",
  redes: "Redes",
  sql: "Datos",
  word: "Texto"
};

const roadmapCategories: Record<ToolCategory, string[]> = {
  Audio: [
    "Audio a MP3",
    "Recortar audio",
    "Normalizar audio",
    "Transcribir audio"
  ],
  Calculadoras: ["Edad", "Dias entre fechas", "Porcentajes", "Prestamos"],
  Conversores: ["CSV a Excel", "Markdown a PDF", "Unidades", "Zonas horarias"],
  Datos: ["CSV a JSON", "JSON a CSV", "XML a JSON", "YAML a JSON"],
  Desarrollo: [
    "JWT decoder",
    "Regex tester",
    "Cron generator",
    "Open Graph preview"
  ],
  Documentos: ["Excel a CSV", "CSV Viewer", "Markdown a PDF", "Excel Viewer"],
  Imagenes: ["HEIC a JPG", "AVIF a JPG", "SVG a PNG", "Quitar EXIF"],
  "Inteligencia artificial": [
    "Resumir texto",
    "Quitar fondo",
    "Mejorar resolucion",
    "Transcribir video"
  ],
  PDF: ["Rotar PDF", "Extraer texto de PDF", "Marca de agua", "Proteger PDF"],
  Productividad: [
    "Pomodoro",
    "Notas locales",
    "Lista de tareas",
    "Firma de correo"
  ],
  Redes: ["IPv4", "IPv6", "DNS lookup", "SSL checker"],
  Seguridad: ["Password generator", "Hash checker", "Bcrypt", "Fortaleza"],
  Texto: ["Contador de palabras", "Diff", "Slug generator", "Markdown a HTML"],
  Video: ["Video a MP4", "Video a MP3", "Recortar video", "Comprimir video"]
};

export const activeTools: ToolDefinition[] = tools
  .filter((tool) => tool.status === "active")
  .map((tool) => ({
    batch: tool.batch ?? "mvp",
    category: categoryBySlug[tool.categorySlug] ?? "Productividad",
    description: tool.description,
    examples: tool.examples,
    faq: tool.faq,
    instructions: tool.instructions ?? tool.useCases,
    limits: tool.limits ?? {
      acceptedFormats: ["Texto"],
      maxFileSizeMb: 1,
      maxFiles: 1,
      outputFormats: ["Texto"]
    },
    name: tool.name,
    operation: tool.operation as ToolOperation | undefined,
    popular: tool.popular ?? false,
    privacy: tool.privacy ?? {
      localOnly: true,
      processingMode: "local",
      retention: "No se almacena informacion en el servidor.",
      uploadsFiles: false,
      usesAi: false,
      usesThirdParties: false
    },
    recent: tool.recent ?? false,
    relatedSlugs: tool.relatedSlugs ?? [],
    seo: tool.seo,
    slug: tool.slug,
    status: "active",
    summary: tool.summary ?? tool.description,
    tags: tool.tags
  }));

export const toolRoadmap = activeTools;

export const roadmapToolGroups = Object.entries(roadmapCategories).map(
  ([category, items]) => ({
    category: category as ToolCategory,
    tools: items
  })
);

export function getRelatedTools(tool: ToolDefinition) {
  const related = new Set(tool.relatedSlugs);

  return activeTools
    .filter(
      (candidate) =>
        candidate.slug !== tool.slug &&
        (related.has(candidate.slug) || candidate.category === tool.category)
    )
    .slice(0, 4);
}
