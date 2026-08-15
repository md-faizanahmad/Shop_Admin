import type { HeroData } from "@/types/heroformdata";
import HeroBannerCard from "./HeroBannerCard";

type Props = {
  heroes: HeroData[];
  onEdit: (hero: HeroData) => void;
  onDelete: (hero: HeroData) => void;
};

export default function HeroBannerList({ heroes, onEdit, onDelete }: Props) {
  if (heroes.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <h3 className="text-sm font-semibold text-slate-800">
          No hero banners yet
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Create your first homepage hero banner to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {heroes.map((hero) => (
        <HeroBannerCard
          key={hero._id}
          hero={hero}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
