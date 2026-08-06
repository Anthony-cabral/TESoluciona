-- Public solution guide expansion: reviewers, structured steps, commands and image licensing.
-- No secrets or private screenshot data are stored by this migration.

CREATE TABLE "Reviewer" (
  "id" UUID NOT NULL,
  "displayName" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "role" TEXT,
  "bio" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Reviewer_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Article" ADD COLUMN "reviewerId" UUID;

CREATE TABLE "SolutionStep" (
  "id" UUID NOT NULL,
  "articleId" UUID NOT NULL,
  "position" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "objective" TEXT NOT NULL,
  "instructions" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "menuPath" TEXT,
  "expectedResult" TEXT NOT NULL,
  "commonError" TEXT NOT NULL,
  "howToContinue" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SolutionStep_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CommandBlock" (
  "id" UUID NOT NULL,
  "articleId" UUID NOT NULL,
  "stepId" UUID,
  "position" INTEGER NOT NULL DEFAULT 0,
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "language" TEXT NOT NULL DEFAULT 'text',
  "explanation" TEXT,
  "expectedOutput" TEXT,
  "ifDifferent" TEXT,
  "sensitive" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CommandBlock_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ImageLicense" (
  "id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "licenseUrl" TEXT,
  "commercialUseAllowed" BOOLEAN NOT NULL DEFAULT false,
  "modificationsAllowed" BOOLEAN NOT NULL DEFAULT false,
  "requiresAttribution" BOOLEAN NOT NULL DEFAULT true,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ImageLicense_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ArticleImage" (
  "id" UUID NOT NULL,
  "articleId" UUID NOT NULL,
  "stepId" UUID,
  "licenseId" UUID,
  "approvedById" UUID,
  "sourceId" TEXT NOT NULL,
  "fileName" TEXT NOT NULL,
  "src" TEXT NOT NULL,
  "alt" TEXT NOT NULL,
  "caption" TEXT NOT NULL,
  "width" INTEGER NOT NULL,
  "height" INTEGER NOT NULL,
  "sourceType" TEXT NOT NULL,
  "sourceUrl" TEXT,
  "attributionText" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ArticleImage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Reviewer_slug_key" ON "Reviewer"("slug");
CREATE INDEX "Article_reviewerId_idx" ON "Article"("reviewerId");
CREATE UNIQUE INDEX "SolutionStep_articleId_position_key" ON "SolutionStep"("articleId", "position");
CREATE INDEX "SolutionStep_articleId_idx" ON "SolutionStep"("articleId");
CREATE INDEX "CommandBlock_articleId_position_idx" ON "CommandBlock"("articleId", "position");
CREATE INDEX "CommandBlock_stepId_idx" ON "CommandBlock"("stepId");
CREATE UNIQUE INDEX "ImageLicense_slug_key" ON "ImageLicense"("slug");
CREATE UNIQUE INDEX "ArticleImage_sourceId_key" ON "ArticleImage"("sourceId");
CREATE INDEX "ArticleImage_articleId_idx" ON "ArticleImage"("articleId");
CREATE INDEX "ArticleImage_stepId_idx" ON "ArticleImage"("stepId");
CREATE INDEX "ArticleImage_licenseId_idx" ON "ArticleImage"("licenseId");
CREATE INDEX "ArticleImage_approvedById_idx" ON "ArticleImage"("approvedById");

ALTER TABLE "Article" ADD CONSTRAINT "Article_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Reviewer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SolutionStep" ADD CONSTRAINT "SolutionStep_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CommandBlock" ADD CONSTRAINT "CommandBlock_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CommandBlock" ADD CONSTRAINT "CommandBlock_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "SolutionStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "SolutionStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "ImageLicense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Reviewer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
