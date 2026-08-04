export const articleDifficulties = [
  "beginner",
  "intermediate",
  "advanced",
  "expert"
] as const;

export type ArticleDifficulty = (typeof articleDifficulties)[number];

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  difficulty: ArticleDifficulty;
  readingTimeMinutes: number;
};

export interface ArticleRepository {
  listFeatured(): Promise<ArticleSummary[]>;
}
