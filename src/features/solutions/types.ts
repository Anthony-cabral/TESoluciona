export type ContentStatus = "draft" | "review" | "published" | "archived";

export type Difficulty = "basico" | "intermedio" | "avanzado";

export type ContentType = "article" | "error" | "guide" | "tool" | "category";

export type CommandSnippet = {
  label: string;
  value: string;
  language?: "powershell" | "cmd" | "text" | "json";
  explanation?: string;
  expectedOutput?: string;
  ifDifferent?: string;
};

export type Reference = {
  label: string;
  url: string;
  publisher: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type ToolProcessingMode = "local" | "server" | "hybrid" | "provider";

export type ToolBatch = "mvp" | "batch-1" | "batch-2" | "batch-3" | "roadmap";

export type FileToolOperation =
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

export type ArticleImage = {
  id: string;
  fileName: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sourceType: "original-screenshot" | "external";
  creditId: string;
};

export type PendingImageRequirement = {
  status: "pending";
  requiredImage: string;
  reason: string;
  reviewedAt: string;
};

export type SolutionStep = {
  id: string;
  title: string;
  objective: string;
  instructions: string[];
  menuPath?: string;
  command?: CommandSnippet;
  image?: ArticleImage;
  imageRequirement?: PendingImageRequirement;
  expectedResult: string;
  commonError: string;
  howToContinue: string;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  featuredArticleSlugs: string[];
  recentArticleSlugs: string[];
  relatedErrorSlugs: string[];
  relatedToolSlugs: string[];
  tags: string[];
  seo: {
    title: string;
    description: string;
  };
};

export type Article = {
  type: "article" | "guide";
  title: string;
  slug: string;
  summary: string;
  introduction: string;
  simpleExplanation: string;
  technicalExplanation: string;
  appliesTo: string[];
  symptoms: string[];
  causes: string[];
  prerequisites: string[];
  backupRecommendation: string;
  primarySteps: string[];
  solutionSteps: SolutionStep[];
  alternatives: string[];
  commands: CommandSnippet[];
  warnings: string[];
  revertChanges: string[];
  verification: string[];
  faq: FAQ[];
  relatedSlugs: string[];
  author: string;
  reviewer: string;
  publishedAt: string;
  updatedAt: string;
  changeHistory: string[];
  readingTimeMinutes: number;
  difficulty: Difficulty;
  categorySlug: string;
  tags: string[];
  references: Reference[];
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
  keywords: string[];
  status: ContentStatus;
};

export type ErrorEntry = {
  type: "error";
  code: string;
  slug: string;
  productSlug: string;
  product: string;
  title: string;
  description: string;
  symptoms: string[];
  probableCauses: string[];
  diagnosis: string[];
  recommendedSolution: string[];
  alternatives: string[];
  commands: CommandSnippet[];
  warnings: string[];
  affectedVersions: string[];
  reviewedAt: string;
  faq: FAQ[];
  references: Reference[];
  relatedSlugs: string[];
  categorySlug: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
  keywords: string[];
  status: ContentStatus;
};

export type ToolMetadata = {
  type: "tool";
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  summary?: string;
  useCases: string[];
  instructions?: string[];
  examples: string[];
  faq: FAQ[];
  tags: string[];
  batch?: ToolBatch;
  operation?: FileToolOperation;
  popular?: boolean;
  recent?: boolean;
  relatedSlugs?: string[];
  limits?: ToolLimits;
  privacy?: ToolPrivacy;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
  keywords: string[];
  status: "active" | "coming-soon";
};

export type SearchResult = {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  category: string;
  categorySlug: string;
  updatedAt: string;
  relevance: number;
  highlights: string[];
  tags: string[];
};
