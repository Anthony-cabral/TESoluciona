import type { ArticleImage } from "@/features/solutions/types";

import { StepImage } from "./step-image";

type AnnotatedScreenshotProps = {
  image: ArticleImage;
};

export function AnnotatedScreenshot({ image }: AnnotatedScreenshotProps) {
  return <StepImage image={image} />;
}
