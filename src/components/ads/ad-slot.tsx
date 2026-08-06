import { adsConfig } from "@/config/ads";

type AdSlotProps = {
  placement: "home" | "article" | "category" | "tool" | "error";
};

export function AdSlot({ placement }: AdSlotProps) {
  if (!adsConfig.enabled) {
    return null;
  }

  return (
    <aside
      aria-label="Espacio publicitario"
      className="my-8 min-h-24 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      data-ad-placement={placement}
    >
      Publicidad
    </aside>
  );
}
