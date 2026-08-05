import { articles } from "@/features/solutions/articles";
import { categories } from "@/features/solutions/categories";
import { errorEntries } from "@/features/solutions/errors";
import { tools } from "@/features/solutions/tools";
import type { ContentType, SearchResult } from "@/features/solutions/types";

const typeLabels: Record<ContentType, string> = {
  article: "Artículo",
  category: "Categoría",
  error: "Error",
  guide: "Guía",
  tool: "Herramienta"
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function levenshteinDistance(left: string, right: string) {
  const a = normalize(left);
  const b = normalize(right);
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, () => 0)
  );

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function fuzzyTokenMatch(queryToken: string, candidateToken: string) {
  if (
    candidateToken.includes(queryToken) ||
    queryToken.includes(candidateToken)
  ) {
    return true;
  }

  if (queryToken.length < 4 || candidateToken.length < 4) {
    return false;
  }

  return levenshteinDistance(queryToken, candidateToken) <= 2;
}

function scoreSearchableText(query: string, fields: string[]) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return { score: 0, highlights: [] as string[] };

  const queryTokens = normalizedQuery.split(" ");
  const normalizedFields = fields.map(normalize);
  let score = 0;
  const highlights: string[] = [];

  normalizedFields.forEach((field, index) => {
    if (field.includes(normalizedQuery)) {
      score += index === 0 ? 80 : 45;
      highlights.push(fields[index]);
    }

    const fieldTokens = field.split(" ");
    queryTokens.forEach((token) => {
      const matched = fieldTokens.some((candidate) =>
        fuzzyTokenMatch(token, candidate)
      );
      if (matched) {
        score += index === 0 ? 16 : 8;
      }
    });
  });

  return { score, highlights: highlights.slice(0, 3) };
}

function commandText(
  commands: {
    label: string;
    value: string;
    explanation?: string;
    expectedOutput?: string;
    ifDifferent?: string;
  }[]
) {
  return commands
    .flatMap((command) => [
      command.label,
      command.value,
      command.explanation ?? "",
      command.expectedOutput ?? "",
      command.ifDifferent ?? ""
    ])
    .join(" ");
}

export function searchContent(
  query: string,
  options?: {
    type?: ContentType;
    categorySlug?: string;
    page?: number;
    pageSize?: number;
  }
) {
  const pageSize = options?.pageSize ?? 10;
  const page = Math.max(1, options?.page ?? 1);
  const categoryBySlug = new Map(
    categories.map((category) => [category.slug, category])
  );

  const candidates: SearchResult[] = [
    ...articles.map((article) => {
      const category = categoryBySlug.get(article.categorySlug);
      const stepFields = article.solutionSteps.flatMap((step) => [
        step.title,
        step.objective,
        step.menuPath ?? "",
        step.expectedResult,
        step.commonError,
        step.howToContinue,
        ...step.instructions,
        ...(step.command ? [commandText([step.command])] : [])
      ]);
      const { score, highlights } = scoreSearchableText(query, [
        article.title,
        article.summary,
        article.simpleExplanation,
        article.technicalExplanation,
        article.categorySlug,
        article.appliesTo.join(" "),
        article.tags.join(" "),
        article.keywords.join(" "),
        article.symptoms.join(" "),
        article.causes.join(" "),
        article.primarySteps.join(" "),
        article.alternatives.join(" "),
        article.verification.join(" "),
        commandText(article.commands),
        article.faq.flatMap((item) => [item.question, item.answer]).join(" "),
        stepFields.join(" ")
      ]);
      return {
        id: article.slug,
        type: article.type,
        title: article.title,
        description: article.summary,
        url: `/articulos/${article.slug}`,
        category: category?.name ?? article.categorySlug,
        categorySlug: article.categorySlug,
        updatedAt: article.updatedAt,
        relevance: score,
        highlights,
        tags: article.tags
      };
    }),
    ...errorEntries.map((entry) => {
      const category = categoryBySlug.get(entry.categorySlug);
      const { score, highlights } = scoreSearchableText(query, [
        entry.code,
        entry.title,
        entry.description,
        entry.product,
        entry.tags.join(" "),
        entry.keywords.join(" "),
        entry.symptoms.join(" "),
        entry.probableCauses.join(" "),
        entry.diagnosis.join(" "),
        entry.recommendedSolution.join(" "),
        entry.alternatives.join(" "),
        commandText(entry.commands),
        entry.faq.flatMap((item) => [item.question, item.answer]).join(" ")
      ]);
      return {
        id: `${entry.productSlug}/${entry.slug}`,
        type: entry.type,
        title: entry.title,
        description: entry.description,
        url: `/errores/${entry.productSlug}/${entry.slug}`,
        category: category?.name ?? entry.product,
        categorySlug: entry.categorySlug,
        updatedAt: entry.reviewedAt,
        relevance:
          score + (normalize(query).includes(normalize(entry.code)) ? 140 : 0),
        highlights,
        tags: entry.tags
      };
    }),
    ...tools
      .filter((tool) => tool.status === "active")
      .map((tool) => {
        const category = categoryBySlug.get(tool.categorySlug);
        const { score, highlights } = scoreSearchableText(query, [
          tool.name,
          tool.description,
          tool.tags.join(" "),
          tool.keywords.join(" "),
          tool.useCases.join(" "),
          tool.examples.join(" "),
          tool.faq.flatMap((item) => [item.question, item.answer]).join(" ")
        ]);
        return {
          id: tool.slug,
          type: tool.type,
          title: tool.name,
          description: tool.description,
          url: `/herramientas/${tool.slug}`,
          category: category?.name ?? tool.categorySlug,
          categorySlug: tool.categorySlug,
          updatedAt: "2026-08-04",
          relevance: score,
          highlights,
          tags: tool.tags
        };
      }),
    ...categories.map((category) => {
      const { score, highlights } = scoreSearchableText(query, [
        category.name,
        category.description,
        category.tags.join(" ")
      ]);
      return {
        id: category.slug,
        type: "category" as const,
        title: category.name,
        description: category.description,
        url: `/categorias/${category.slug}`,
        category: "Categoría",
        categorySlug: category.slug,
        updatedAt: "2026-08-04",
        relevance: score,
        highlights,
        tags: category.tags
      };
    })
  ];

  const filtered = candidates
    .filter((result) => result.relevance > 0)
    .filter((result) => !options?.type || result.type === options.type)
    .filter(
      (result) =>
        !options?.categorySlug || result.categorySlug === options.categorySlug
    )
    .sort((left, right) => right.relevance - left.relevance);

  return {
    query,
    total: filtered.length,
    page,
    pageSize,
    results: filtered.slice((page - 1) * pageSize, page * pageSize),
    relatedSuggestions: getSearchSuggestions(query).slice(0, 8),
    typeLabels
  };
}

export function getSearchSuggestions(query = "") {
  const normalizedQuery = normalize(query);
  const suggestions = [
    "Windows no está activado",
    "Error 0x80070005",
    "Cómo imprimir a doble cara",
    "Outlook no abre",
    "Cómo saber la IP del router",
    "Microsoft Defender está desactivado",
    "Cómo actualizar Google Chrome",
    "WiFi conectado sin Internet",
    "Activar Windows 11",
    "Error 0xC004F213",
    ...articles.flatMap((article) => [
      article.title,
      ...article.keywords,
      ...article.appliesTo,
      ...article.commands.map((command) => command.label)
    ]),
    ...errorEntries.flatMap((entry) => [
      entry.code,
      entry.title,
      ...entry.tags
    ]),
    ...tools.map((tool) => tool.name),
    ...categories.map((category) => category.name)
  ];

  return Array.from(new Set(suggestions))
    .filter((suggestion) =>
      normalizedQuery ? normalize(suggestion).includes(normalizedQuery) : true
    )
    .slice(0, 12);
}
