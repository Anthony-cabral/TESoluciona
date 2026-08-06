import { describe, expect, it } from "vitest";

import { fileProcessingPolicy } from "@/features/tools/server/file-processing-policy";

describe("file processing policy", () => {
  it("defines cleanup, cancellation and expiration defaults", () => {
    expect(fileProcessingPolicy.cleanup.deleteInputsAfterCompletion).toBe(true);
    expect(fileProcessingPolicy.cleanup.deleteOnCancellation).toBe(true);
    expect(fileProcessingPolicy.cleanup.deleteOnFailure).toBe(true);
    expect(fileProcessingPolicy.cleanup.temporaryTtlMinutes).toBeGreaterThan(0);
  });

  it("limits concurrency and abuse for future server jobs", () => {
    expect(fileProcessingPolicy.queue.maxAttempts).toBeLessThanOrEqual(3);
    expect(fileProcessingPolicy.queue.timeoutSeconds).toBeGreaterThan(0);
    expect(fileProcessingPolicy.rateLimit.anonymousJobsPerHour).toBeGreaterThan(
      0
    );
  });

  it("keeps uploaded inputs private by default", () => {
    expect(fileProcessingPolicy.storage.publicUrlsForInputs).toBe(false);
    expect(fileProcessingPolicy.storage.randomizeFileNames).toBe(true);
    expect(fileProcessingPolicy.storage.redactOriginalNamesInLogs).toBe(true);
  });
});
