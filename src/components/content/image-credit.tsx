import Link from "next/link";

type ImageCreditProps = {
  creditId: string;
};

export function ImageCredit({ creditId }: ImageCreditProps) {
  return (
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
      Imagen:{" "}
      <Link
        className="font-semibold text-brand-700 hover:text-brand-900 dark:text-brand-300"
        href={`/creditos-de-imagenes#${creditId}`}
      >
        crédito y licencia
      </Link>
      .
    </p>
  );
}
