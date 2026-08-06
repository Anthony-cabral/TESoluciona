CREATE TYPE "JobStatus" AS ENUM ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'EXPIRED');

CREATE TABLE "Job" (
  "id" UUID NOT NULL,
  "toolSlug" TEXT NOT NULL,
  "status" "JobStatus" NOT NULL DEFAULT 'QUEUED',
  "progress" INTEGER NOT NULL DEFAULT 0,
  "requesterHash" TEXT,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "maxAttempts" INTEGER NOT NULL DEFAULT 2,
  "timeoutSeconds" INTEGER NOT NULL DEFAULT 900,
  "metadata" JSONB,
  "queuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "startedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "cancelledAt" TIMESTAMP(3),
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JobFile" (
  "id" UUID NOT NULL,
  "jobId" UUID NOT NULL,
  "role" TEXT NOT NULL,
  "originalName" TEXT,
  "storedName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "checksum" TEXT,
  "storageKey" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "JobFile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JobResult" (
  "id" UUID NOT NULL,
  "jobId" UUID NOT NULL,
  "label" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "storageKey" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "JobResult_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JobError" (
  "id" UUID NOT NULL,
  "jobId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "retryable" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "JobError_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Job_status_queuedAt_idx" ON "Job"("status", "queuedAt");
CREATE INDEX "Job_toolSlug_idx" ON "Job"("toolSlug");
CREATE INDEX "Job_expiresAt_idx" ON "Job"("expiresAt");
CREATE INDEX "Job_requesterHash_queuedAt_idx" ON "Job"("requesterHash", "queuedAt");
CREATE INDEX "JobFile_jobId_idx" ON "JobFile"("jobId");
CREATE INDEX "JobFile_storageKey_idx" ON "JobFile"("storageKey");
CREATE INDEX "JobResult_jobId_idx" ON "JobResult"("jobId");
CREATE INDEX "JobResult_expiresAt_idx" ON "JobResult"("expiresAt");
CREATE INDEX "JobError_jobId_idx" ON "JobError"("jobId");
CREATE INDEX "JobError_code_idx" ON "JobError"("code");

ALTER TABLE "JobFile" ADD CONSTRAINT "JobFile_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JobResult" ADD CONSTRAINT "JobResult_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JobError" ADD CONSTRAINT "JobError_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
