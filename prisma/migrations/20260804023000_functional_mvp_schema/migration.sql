-- Functional MVP schema expansion for Tesoluciona.
-- Review in a staging database before applying to production.

CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "UserStatus" AS ENUM ('INVITED', 'ACTIVE', 'SUSPENDED', 'DELETED');
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ARCHIVED');
CREATE TYPE "SearchResultStatus" AS ENUM ('FOUND', 'NO_RESULTS');

CREATE TABLE "User" (
  "id" UUID NOT NULL,
  "email" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "passwordHash" TEXT,
  "status" "UserStatus" NOT NULL DEFAULT 'INVITED',
  "lastLoginAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Role" (
  "id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Permission" (
  "id" UUID NOT NULL,
  "action" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "UserRole" (
  "userId" UUID NOT NULL,
  "roleId" UUID NOT NULL,
  CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId", "roleId")
);

CREATE TABLE "RolePermission" (
  "roleId" UUID NOT NULL,
  "permissionId" UUID NOT NULL,
  CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId", "permissionId")
);

ALTER TABLE "Author" ADD COLUMN "userId" UUID;
ALTER TABLE "Author" ADD COLUMN "avatarUrl" TEXT;
ALTER TABLE "Author" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Category" ADD COLUMN "icon" TEXT NOT NULL DEFAULT 'FileText';
ALTER TABLE "Category" ADD COLUMN "imageUrl" TEXT;
ALTER TABLE "Category" ADD COLUMN "seoTitle" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Category" ADD COLUMN "seoDescription" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Category" ADD COLUMN "canonicalPath" TEXT;
ALTER TABLE "Category" ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
ALTER TABLE "Category" ADD COLUMN "deletedAt" TIMESTAMP(3);

UPDATE "Category"
SET
  "description" = COALESCE("description", ''),
  "seoTitle" = COALESCE(NULLIF("seoTitle", ''), "name" || ': guías y soluciones'),
  "seoDescription" = COALESCE(NULLIF("seoDescription", ''), COALESCE("description", ''));

ALTER TABLE "Category" ALTER COLUMN "description" SET NOT NULL;

ALTER TABLE "Article" ADD COLUMN "summary" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Article" ADD COLUMN "introduction" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Article" ADD COLUMN "symptoms" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "causes" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "prerequisites" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "primarySteps" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "alternatives" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "warnings" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "verification" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Article" ADD COLUMN "commands" JSONB;
ALTER TABLE "Article" ADD COLUMN "seoTitle" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Article" ADD COLUMN "seoDescription" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Article" ADD COLUMN "canonicalPath" TEXT;
ALTER TABLE "Article" ADD COLUMN "deletedAt" TIMESTAMP(3);

UPDATE "Article"
SET
  "summary" = COALESCE(NULLIF("summary", ''), "excerpt"),
  "introduction" = COALESCE(NULLIF("introduction", ''), "excerpt"),
  "simpleExplanation" = COALESCE("simpleExplanation", ''),
  "technicalExplanation" = COALESCE("technicalExplanation", ''),
  "seoTitle" = COALESCE(NULLIF("seoTitle", ''), "title"),
  "seoDescription" = COALESCE(NULLIF("seoDescription", ''), "excerpt"),
  "canonicalPath" = COALESCE(NULLIF("canonicalPath", ''), '/articulos/' || "slug");

ALTER TABLE "Article" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Article" ALTER COLUMN "status" TYPE "ContentStatus" USING "status"::TEXT::"ContentStatus";
ALTER TABLE "Article" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
ALTER TABLE "Article" ALTER COLUMN "simpleExplanation" SET DEFAULT '';
ALTER TABLE "Article" ALTER COLUMN "simpleExplanation" SET NOT NULL;
ALTER TABLE "Article" ALTER COLUMN "technicalExplanation" SET DEFAULT '';
ALTER TABLE "Article" ALTER COLUMN "technicalExplanation" SET NOT NULL;
ALTER TABLE "Article" ALTER COLUMN "canonicalPath" SET NOT NULL;

CREATE TABLE "ArticleRevision" (
  "id" UUID NOT NULL,
  "articleId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "contentJson" JSONB NOT NULL,
  "reason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdById" UUID,
  CONSTRAINT "ArticleRevision_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ErrorEntry" (
  "id" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "productSlug" TEXT NOT NULL,
  "product" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "symptoms" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "probableCauses" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "diagnosis" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "affectedVersions" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "warnings" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "commands" JSONB,
  "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
  "seoTitle" TEXT NOT NULL,
  "seoDescription" TEXT NOT NULL,
  "canonicalPath" TEXT NOT NULL,
  "reviewedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "ErrorEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ErrorSolution" (
  "id" UUID NOT NULL,
  "errorId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "steps" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "commands" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ErrorSolution_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Tool" (
  "id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "categorySlug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "status" "ToolStatus" NOT NULL DEFAULT 'PLANNED',
  "metadata" JSONB,
  "seoTitle" TEXT NOT NULL,
  "seoDescription" TEXT NOT NULL,
  "canonicalPath" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FAQ" (
  "id" UUID NOT NULL,
  "ownerType" TEXT NOT NULL,
  "ownerId" UUID NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "position" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Source" (
  "id" UUID NOT NULL,
  "ownerType" TEXT NOT NULL,
  "ownerId" UUID NOT NULL,
  "label" TEXT NOT NULL,
  "publisher" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "lastChecked" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RelatedContent" (
  "id" UUID NOT NULL,
  "fromType" TEXT NOT NULL,
  "fromId" UUID NOT NULL,
  "toType" TEXT NOT NULL,
  "toId" UUID NOT NULL,
  "reason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RelatedContent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SearchQuery" (
  "id" UUID NOT NULL,
  "query" TEXT NOT NULL,
  "normalizedQuery" TEXT NOT NULL,
  "resultCount" INTEGER NOT NULL,
  "status" "SearchResultStatus" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userAgentHash" TEXT,
  "ipHash" TEXT,
  CONSTRAINT "SearchQuery_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SearchSuggestion" (
  "id" UUID NOT NULL,
  "query" TEXT NOT NULL,
  "targetUrl" TEXT NOT NULL,
  "weight" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SearchSuggestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Comment" (
  "id" UUID NOT NULL,
  "articleId" UUID NOT NULL,
  "userId" UUID,
  "parentId" UUID,
  "body" TEXT NOT NULL,
  "status" "CommentStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Rating" (
  "id" UUID NOT NULL,
  "userId" UUID,
  "contentType" TEXT NOT NULL,
  "contentId" UUID NOT NULL,
  "score" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Favorite" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "contentType" TEXT NOT NULL,
  "contentId" UUID NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReadingHistory" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "contentType" TEXT NOT NULL,
  "contentId" UUID NOT NULL,
  "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReadingHistory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "NewsletterSubscription" (
  "id" UUID NOT NULL,
  "email" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "consentVersion" TEXT,
  "confirmedAt" TIMESTAMP(3),
  "unsubscribedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "NewsletterSubscription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Redirect" (
  "id" UUID NOT NULL,
  "sourcePath" TEXT NOT NULL,
  "targetPath" TEXT NOT NULL,
  "statusCode" INTEGER NOT NULL DEFAULT 301,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
  "id" UUID NOT NULL,
  "userId" UUID,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entityId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Role_slug_key" ON "Role"("slug");
CREATE UNIQUE INDEX "Permission_slug_key" ON "Permission"("slug");
CREATE UNIQUE INDEX "Author_userId_key" ON "Author"("userId");
CREATE UNIQUE INDEX "Article_canonicalPath_key" ON "Article"("canonicalPath");
CREATE UNIQUE INDEX "ErrorEntry_productSlug_slug_key" ON "ErrorEntry"("productSlug", "slug");
CREATE UNIQUE INDEX "ErrorEntry_canonicalPath_key" ON "ErrorEntry"("canonicalPath");
CREATE UNIQUE INDEX "Tool_slug_key" ON "Tool"("slug");
CREATE UNIQUE INDEX "Tool_canonicalPath_key" ON "Tool"("canonicalPath");
CREATE UNIQUE INDEX "RelatedContent_fromType_fromId_toType_toId_key" ON "RelatedContent"("fromType", "fromId", "toType", "toId");
CREATE UNIQUE INDEX "SearchSuggestion_query_targetUrl_key" ON "SearchSuggestion"("query", "targetUrl");
CREATE UNIQUE INDEX "Favorite_userId_contentType_contentId_key" ON "Favorite"("userId", "contentType", "contentId");
CREATE UNIQUE INDEX "NewsletterSubscription_email_key" ON "NewsletterSubscription"("email");
CREATE UNIQUE INDEX "Redirect_sourcePath_key" ON "Redirect"("sourcePath");

ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Author" ADD CONSTRAINT "Author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ArticleRevision" ADD CONSTRAINT "ArticleRevision_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ErrorSolution" ADD CONSTRAINT "ErrorSolution_errorId_fkey" FOREIGN KEY ("errorId") REFERENCES "ErrorEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
