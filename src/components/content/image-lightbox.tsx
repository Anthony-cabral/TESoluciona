"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

import type { ArticleImage } from "@/features/solutions/types";

type ImageLightboxProps = {
  image: ArticleImage;
};

export function ImageLightbox({ image }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="group block w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm focus-visible:ring-2 focus-visible:ring-brand-600 dark:border-slate-700 dark:bg-slate-900"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Image
          alt={image.alt}
          className="h-auto w-full transition group-hover:scale-[1.01]"
          height={image.height}
          loading="lazy"
          src={image.src}
          width={image.width}
        />
        <span className="sr-only">Ampliar imagen</span>
      </button>

      {open ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4"
          role="dialog"
        >
          <div className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-lg bg-white p-3 dark:bg-slate-900">
            <button
              aria-label="Cerrar imagen ampliada"
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white hover:bg-brand-700"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <Image
              alt={image.alt}
              className="h-auto w-full rounded-md"
              height={image.height}
              priority
              src={image.src}
              width={image.width}
            />
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
              {image.caption}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
