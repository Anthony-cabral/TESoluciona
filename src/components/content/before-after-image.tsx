import type { ArticleImage } from "@/features/solutions/types";

import { StepImage } from "./step-image";

type BeforeAfterImageProps = {
  after: ArticleImage;
  before: ArticleImage;
};

export function BeforeAfterImage({ after, before }: BeforeAfterImageProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StepImage image={before} />
      <StepImage image={after} />
    </div>
  );
}
