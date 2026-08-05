import type { ArticleImage } from "@/features/solutions/types";

import { FigureCaption } from "./figure-caption";
import { ImageCredit } from "./image-credit";
import { ImageLightbox } from "./image-lightbox";

type StepImageProps = {
  image: ArticleImage;
};

export function StepImage({ image }: StepImageProps) {
  return (
    <figure className="mt-5">
      <ImageLightbox image={image} />
      <FigureCaption>{image.caption}</FigureCaption>
      <ImageCredit creditId={image.creditId} />
    </figure>
  );
}
