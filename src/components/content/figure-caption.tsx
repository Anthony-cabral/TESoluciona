import type { ReactNode } from "react";

type FigureCaptionProps = {
  children: ReactNode;
};

export function FigureCaption({ children }: FigureCaptionProps) {
  return (
    <figcaption className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
      {children}
    </figcaption>
  );
}
