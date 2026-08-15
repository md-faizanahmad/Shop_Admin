import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import type { HeroData } from "@/types/heroformdata";

type Props = {
  hero: HeroData;
  onEdit: (hero: HeroData) => void;
  onDelete: (hero: HeroData) => void;
};

export default function HeroBannerCard({ hero, onEdit, onDelete }: Props) {
  const isScheduled = Boolean(hero.startAt || hero.endAt);

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Banner image */}
      <div className="relative aspect-16/6 w-full overflow-hidden bg-slate-100">
        {hero.backgroundImage ? (
          <img
            src={hero.backgroundImage}
            alt={hero.headline || "Hero banner"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No banner image
          </div>
        )}

        {/* Order */}
        <div className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          #{hero.sortOrder}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Info */}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
              {hero.headline || "Untitled Hero"}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {/* Status */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  hero.isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    hero.isActive ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
                {hero.isActive ? "Active" : "Inactive"}
              </span>

              {/* Schedule */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                <CalendarDays className="h-3 w-3" />

                {isScheduled
                  ? `${formatDate(hero.startAt)}${
                      hero.endAt ? ` → ${formatDate(hero.endAt)}` : ""
                    }`
                  : "Always Active"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => onEdit(hero)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(hero)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 sm:flex-none"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
