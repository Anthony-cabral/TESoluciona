export const fileProcessingPolicy = {
  cleanup: {
    deleteInputsAfterCompletion: true,
    deleteOnCancellation: true,
    deleteOnFailure: true,
    temporaryTtlMinutes: 60
  },
  limits: {
    maxBatchOneFiles: 20,
    maxLocalFileSizeMb: 25,
    maxServerFileSizeMb: 250,
    maxVideoFileSizeMb: 500
  },
  queue: {
    maxAttempts: 2,
    progressIntervalMs: 1000,
    timeoutSeconds: 900
  },
  rateLimit: {
    anonymousJobsPerHour: 10,
    anonymousLocalToolsPerMinute: 60
  },
  storage: {
    publicUrlsForInputs: false,
    randomizeFileNames: true,
    redactOriginalNamesInLogs: true
  }
} as const;

export type FileProcessingPolicy = typeof fileProcessingPolicy;
