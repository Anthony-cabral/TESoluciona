import type {
  ArticleRepository,
  ArticleSummary
} from "@/features/content/domain/article-repository";

const featuredArticles: ArticleSummary[] = [
  {
    slug: "como-diagnosticar-errores-web",
    title: "Cómo diagnosticar errores web",
    excerpt:
      "Plantilla editorial inicial para explicar causas, soluciones, comandos y referencias sin publicar contenido masivo.",
    category: "Centro de errores",
    difficulty: "beginner",
    readingTimeMinutes: 5
  },
  {
    slug: "guia-base-core-web-vitals",
    title: "Guía base de Core Web Vitals",
    excerpt:
      "Marco inicial para documentar rendimiento, métricas reales, optimización de imágenes y estabilidad visual.",
    category: "Rendimiento",
    difficulty: "intermediate",
    readingTimeMinutes: 7
  }
];

export const staticArticleRepository: ArticleRepository = {
  async listFeatured() {
    return featuredArticles;
  }
};
