import { PrismaPg } from "@prisma/adapter-pg";
import {
  ArticleDifficulty,
  ContentStatus,
  PrismaClient,
  ToolStatus
} from "@prisma/client";

import { articles } from "../src/features/solutions/articles";
import { categories } from "../src/features/solutions/categories";
import { errorEntries } from "../src/features/solutions/errors";
import { tools } from "../src/features/solutions/tools";
import { slugify } from "../src/lib/slug";
import imageAttributions from "../content/image-attributions.json";

const adapter = new PrismaPg({
  connectionString:
    process.env.DATABASE_URL ??
    "postgresql://tesoluciona:tesoluciona_local_password@localhost:5432/tesoluciona?schema=public"
});

const prisma = new PrismaClient({ adapter });

const difficultyMap = {
  avanzado: ArticleDifficulty.ADVANCED,
  basico: ArticleDifficulty.BEGINNER,
  intermedio: ArticleDifficulty.INTERMEDIATE
} as const;

const statusMap = {
  archived: ContentStatus.ARCHIVED,
  draft: ContentStatus.DRAFT,
  published: ContentStatus.PUBLISHED,
  review: ContentStatus.REVIEW
} as const;

const imageCreditById = new Map(
  imageAttributions.map((credit) => [credit.id, credit])
);

async function seed() {
  const author = await prisma.author.upsert({
    create: {
      bio: "Equipo editorial de Tesoluciona especializado en soporte técnico, documentación y herramientas web.",
      displayName: "Equipo Tesoluciona",
      email: "editorial@example.invalid",
      slug: "equipo-tesoluciona"
    },
    update: {
      bio: "Equipo editorial de Tesoluciona especializado en soporte técnico, documentación y herramientas web.",
      displayName: "Equipo Tesoluciona"
    },
    where: { slug: "equipo-tesoluciona" }
  });

  const reviewer = await prisma.reviewer.upsert({
    create: {
      bio: "Revisión editorial y técnica de guías públicas sin datos privados de usuarios.",
      displayName: "Revisión técnica Tesoluciona",
      role: "Editor técnico",
      slug: "revision-tecnica-tesoluciona"
    },
    update: {
      bio: "Revisión editorial y técnica de guías públicas sin datos privados de usuarios.",
      displayName: "Revisión técnica Tesoluciona",
      role: "Editor técnico"
    },
    where: { slug: "revision-tecnica-tesoluciona" }
  });

  const originalImageLicense = await prisma.imageLicense.upsert({
    create: {
      commercialUseAllowed: true,
      modificationsAllowed: true,
      name: "Tesoluciona original asset",
      notes:
        "Mockups originales creados para documentación pública, sin capturas privadas ni datos reales.",
      requiresAttribution: true,
      slug: "tesoluciona-original-asset"
    },
    update: {
      commercialUseAllowed: true,
      modificationsAllowed: true,
      name: "Tesoluciona original asset",
      notes:
        "Mockups originales creados para documentación pública, sin capturas privadas ni datos reales.",
      requiresAttribution: true
    },
    where: { slug: "tesoluciona-original-asset" }
  });

  for (const category of categories) {
    await prisma.category.upsert({
      create: {
        canonicalPath: `/categorias/${category.slug}`,
        description: category.description,
        icon: category.icon,
        name: category.name,
        seoDescription: category.seo.description,
        seoTitle: category.seo.title,
        slug: category.slug,
        status: ContentStatus.PUBLISHED
      },
      update: {
        description: category.description,
        icon: category.icon,
        name: category.name,
        seoDescription: category.seo.description,
        seoTitle: category.seo.title,
        status: ContentStatus.PUBLISHED
      },
      where: { slug: category.slug }
    });
  }

  const categoryBySlug = new Map(
    (await prisma.category.findMany()).map((category) => [
      category.slug,
      category.id
    ])
  );

  for (const tool of tools) {
    const savedTool = await prisma.tool.upsert({
      create: {
        canonicalPath: tool.seo.canonicalPath,
        categorySlug: tool.categorySlug,
        description: tool.description,
        metadata: {
          examples: tool.examples,
          faq: tool.faq,
          keywords: tool.keywords,
          tags: tool.tags,
          useCases: tool.useCases
        },
        name: tool.name,
        seoDescription: tool.seo.description,
        seoTitle: tool.seo.title,
        slug: tool.slug,
        status:
          tool.status === "active" ? ToolStatus.ACTIVE : ToolStatus.PLANNED
      },
      update: {
        categorySlug: tool.categorySlug,
        description: tool.description,
        metadata: {
          examples: tool.examples,
          faq: tool.faq,
          keywords: tool.keywords,
          tags: tool.tags,
          useCases: tool.useCases
        },
        name: tool.name,
        seoDescription: tool.seo.description,
        seoTitle: tool.seo.title,
        status:
          tool.status === "active" ? ToolStatus.ACTIVE : ToolStatus.PLANNED
      },
      where: { slug: tool.slug }
    });

    await prisma.fAQ.deleteMany({
      where: { ownerId: savedTool.id, ownerType: "tool" }
    });
    await prisma.fAQ.createMany({
      data: tool.faq.map((item, index) => ({
        answer: item.answer,
        ownerId: savedTool.id,
        ownerType: "tool",
        position: index,
        question: item.question
      }))
    });
  }

  for (const article of articles) {
    const categoryId = categoryBySlug.get(article.categorySlug);
    if (!categoryId)
      throw new Error(`Missing category ${article.categorySlug}`);

    const savedArticle = await prisma.article.upsert({
      create: {
        alternatives: article.alternatives,
        authorId: author.id,
        canonicalPath: article.seo.canonicalPath,
        categoryId,
        causes: article.causes,
        commands: article.commands,
        difficulty: difficultyMap[article.difficulty],
        introduction: article.introduction,
        prerequisites: article.prerequisites,
        primarySteps: article.primarySteps,
        publishedAt: new Date(article.publishedAt),
        readingTimeMinutes: article.readingTimeMinutes,
        reviewerId: reviewer.id,
        seoDescription: article.seo.description,
        seoTitle: article.seo.title,
        simpleExplanation: article.simpleExplanation,
        slug: article.slug,
        status: statusMap[article.status],
        summary: article.summary,
        symptoms: article.symptoms,
        technicalExplanation: article.technicalExplanation,
        title: article.title,
        updatedAt: new Date(article.updatedAt),
        verification: article.verification,
        warnings: article.warnings
      },
      update: {
        alternatives: article.alternatives,
        categoryId,
        causes: article.causes,
        commands: article.commands,
        difficulty: difficultyMap[article.difficulty],
        introduction: article.introduction,
        prerequisites: article.prerequisites,
        primarySteps: article.primarySteps,
        publishedAt: new Date(article.publishedAt),
        readingTimeMinutes: article.readingTimeMinutes,
        reviewerId: reviewer.id,
        seoDescription: article.seo.description,
        seoTitle: article.seo.title,
        simpleExplanation: article.simpleExplanation,
        status: statusMap[article.status],
        summary: article.summary,
        symptoms: article.symptoms,
        technicalExplanation: article.technicalExplanation,
        title: article.title,
        verification: article.verification,
        warnings: article.warnings
      },
      where: { slug: article.slug }
    });

    await prisma.commandBlock.deleteMany({
      where: { articleId: savedArticle.id }
    });
    await prisma.articleImage.deleteMany({
      where: { articleId: savedArticle.id }
    });
    await prisma.solutionStep.deleteMany({
      where: { articleId: savedArticle.id }
    });

    for (const [stepIndex, step] of article.solutionSteps.entries()) {
      const savedStep = await prisma.solutionStep.create({
        data: {
          articleId: savedArticle.id,
          commonError: step.commonError,
          expectedResult: step.expectedResult,
          howToContinue: step.howToContinue,
          instructions: step.instructions,
          menuPath: step.menuPath,
          objective: step.objective,
          position: stepIndex,
          title: step.title
        }
      });

      if (step.command) {
        await prisma.commandBlock.create({
          data: {
            articleId: savedArticle.id,
            expectedOutput: step.command.expectedOutput,
            explanation: step.command.explanation,
            ifDifferent: step.command.ifDifferent,
            label: step.command.label,
            language: step.command.language ?? "text",
            position: stepIndex,
            stepId: savedStep.id,
            value: step.command.value
          }
        });
      }

      if (step.image) {
        const credit = imageCreditById.get(step.image.creditId);
        await prisma.articleImage.create({
          data: {
            alt: step.image.alt,
            approvedById: reviewer.id,
            articleId: savedArticle.id,
            attributionText:
              credit?.attributionText ??
              "Imagen documentada por Tesoluciona para guía pública.",
            caption: step.image.caption,
            fileName: step.image.fileName,
            height: step.image.height,
            licenseId: originalImageLicense.id,
            sourceId: step.image.id,
            sourceType: step.image.sourceType,
            sourceUrl: credit?.sourceUrl,
            src: step.image.src,
            stepId: savedStep.id,
            width: step.image.width
          }
        });
      }
    }

    for (const [commandIndex, command] of article.commands.entries()) {
      await prisma.commandBlock.create({
        data: {
          articleId: savedArticle.id,
          expectedOutput: command.expectedOutput,
          explanation: command.explanation,
          ifDifferent: command.ifDifferent,
          label: command.label,
          language: command.language ?? "text",
          position: commandIndex + article.solutionSteps.length,
          value: command.value
        }
      });
    }

    await prisma.articleTag.deleteMany({
      where: { articleId: savedArticle.id }
    });

    for (const tag of article.tags) {
      const savedTag = await prisma.tag.upsert({
        create: { name: tag, slug: slugify(tag) },
        update: { name: tag },
        where: { slug: slugify(tag) }
      });

      await prisma.articleTag.create({
        data: {
          articleId: savedArticle.id,
          tagId: savedTag.id
        }
      });
    }

    await prisma.fAQ.deleteMany({
      where: { ownerId: savedArticle.id, ownerType: "article" }
    });
    await prisma.fAQ.createMany({
      data: article.faq.map((item, index) => ({
        answer: item.answer,
        ownerId: savedArticle.id,
        ownerType: "article",
        position: index,
        question: item.question
      }))
    });

    await prisma.source.deleteMany({
      where: { ownerId: savedArticle.id, ownerType: "article" }
    });
    if (article.references.length) {
      await prisma.source.createMany({
        data: article.references.map((reference) => ({
          label: reference.label,
          ownerId: savedArticle.id,
          ownerType: "article",
          publisher: reference.publisher,
          url: reference.url
        }))
      });
    }
  }

  for (const entry of errorEntries) {
    const savedError = await prisma.errorEntry.upsert({
      create: {
        affectedVersions: entry.affectedVersions,
        canonicalPath: entry.seo.canonicalPath,
        code: entry.code,
        commands: entry.commands,
        description: entry.description,
        diagnosis: entry.diagnosis,
        probableCauses: entry.probableCauses,
        product: entry.product,
        productSlug: entry.productSlug,
        reviewedAt: new Date(entry.reviewedAt),
        seoDescription: entry.seo.description,
        seoTitle: entry.seo.title,
        slug: entry.slug,
        status: statusMap[entry.status],
        symptoms: entry.symptoms,
        title: entry.title,
        warnings: entry.warnings
      },
      update: {
        affectedVersions: entry.affectedVersions,
        code: entry.code,
        commands: entry.commands,
        description: entry.description,
        diagnosis: entry.diagnosis,
        probableCauses: entry.probableCauses,
        product: entry.product,
        reviewedAt: new Date(entry.reviewedAt),
        seoDescription: entry.seo.description,
        seoTitle: entry.seo.title,
        status: statusMap[entry.status],
        symptoms: entry.symptoms,
        title: entry.title,
        warnings: entry.warnings
      },
      where: {
        productSlug_slug: {
          productSlug: entry.productSlug,
          slug: entry.slug
        }
      }
    });

    await prisma.errorSolution.deleteMany({
      where: { errorId: savedError.id }
    });
    await prisma.errorSolution.createMany({
      data: [
        {
          errorId: savedError.id,
          kind: "recommended",
          steps: entry.recommendedSolution,
          title: "Solución recomendada"
        },
        {
          errorId: savedError.id,
          kind: "alternative",
          steps: entry.alternatives,
          title: "Soluciones alternativas"
        }
      ]
    });

    await prisma.fAQ.deleteMany({
      where: { ownerId: savedError.id, ownerType: "error" }
    });
    await prisma.fAQ.createMany({
      data: entry.faq.map((item, index) => ({
        answer: item.answer,
        ownerId: savedError.id,
        ownerType: "error",
        position: index,
        question: item.question
      }))
    });
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
