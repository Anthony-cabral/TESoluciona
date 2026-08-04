export type ContentStatus = "draft" | "review" | "published" | "archived";

export type Difficulty = "basico" | "intermedio" | "avanzado";

export type ContentType = "article" | "error" | "guide" | "tool" | "category";

export type CommandSnippet = {
  label: string;
  value: string;
  language?: "powershell" | "cmd" | "text" | "json";
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
  symptoms: string[];
  causes: string[];
  prerequisites: string[];
  primarySteps: string[];
  alternatives: string[];
  commands: CommandSnippet[];
  warnings: string[];
  verification: string[];
  faq: FAQ[];
  relatedSlugs: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
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
  useCases: string[];
  examples: string[];
  faq: FAQ[];
  tags: string[];
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
