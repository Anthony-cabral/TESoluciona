export const toolStatuses = ["planned", "beta", "active", "disabled"] as const;

export type ToolStatus = (typeof toolStatuses)[number];

export const toolCategories = [
  "PDF",
  "Imagenes",
  "Video",
  "Audio",
  "Texto",
  "Documentos",
  "Desarrollo",
  "Redes",
  "Seguridad",
  "Productividad",
  "Datos",
  "Conversores",
  "Calculadoras",
  "Inteligencia artificial"
] as const;

export type ToolCategory = (typeof toolCategories)[number];

export type ToolProcessingMode = "local" | "server" | "hybrid" | "provider";

export type ToolBatch = "mvp" | "batch-1" | "batch-2" | "batch-3" | "roadmap";

export type ToolOperation =
  | "images-to-pdf"
  | "jpg-to-pdf"
  | "merge-pdf"
  | "split-pdf"
  | "compress-pdf"
  | "pdf-to-jpg"
  | "jpg-to-png"
  | "png-to-jpg"
  | "resize-image"
  | "compress-image";

export type ToolPrivacy = {
  processingMode: ToolProcessingMode;
  localOnly: boolean;
  uploadsFiles: boolean;
  retention: string;
  usesAi: boolean;
  usesThirdParties: boolean;
  thirdPartyDetails?: string;
};

export type ToolLimits = {
  maxFiles: number;
  maxFileSizeMb: number;
  acceptedFormats: string[];
  outputFormats: string[];
};

export type ToolDefinition = {
  name: string;
  slug: string;
  category: ToolCategory;
  status: ToolStatus;
  batch: ToolBatch;
  operation?: ToolOperation;
  summary: string;
  description: string;
  tags: string[];
  popular: boolean;
  recent: boolean;
  relatedSlugs: string[];
  instructions: string[];
  examples: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  limits: ToolLimits;
  privacy: ToolPrivacy;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
};

export function isToolActive(tool: ToolDefinition) {
  return tool.status === "active";
}
