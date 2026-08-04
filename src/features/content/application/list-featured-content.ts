import type {
  ArticleRepository,
  ArticleSummary
} from "@/features/content/domain/article-repository";
import { staticArticleRepository } from "@/features/content/infrastructure/static-article-repository";

export async function listFeaturedContent(
  repository: ArticleRepository = staticArticleRepository
): Promise<ArticleSummary[]> {
  const articles = await repository.listFeatured();

  return [...articles].sort((current: ArticleSummary, next: ArticleSummary) =>
    current.title.localeCompare(next.title, "es")
  );
}
