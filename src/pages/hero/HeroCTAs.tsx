// HeroCTAs.tsx
type CTA = { text: string; link: string };

type Props = {
  primaryCTA: CTA;
  setPrimaryCTA: (v: CTA) => void;
  secondaryCTA: CTA;
  setSecondaryCTA: (v: CTA) => void;
};

export default function HeroCTAs({
  primaryCTA,
  setPrimaryCTA,
  secondaryCTA,
  setSecondaryCTA,
}: Props) {
  return (
    <section className="bg-white shadow-sm rounded-2xl border p-6 space-y-6">
      <h2 className="text-xl font-bold">CTA Buttons</h2>

      {/* GRID FOR CTA INPUTS */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="font-medium">Primary CTA Text</label>
          <input
            value={primaryCTA.text}
            onChange={(e) =>
              setPrimaryCTA({ ...primaryCTA, text: e.target.value })
            }
            placeholder="Shop Now"
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Primary CTA Link</label>
          <input
            value={primaryCTA.link}
            onChange={(e) =>
              setPrimaryCTA({ ...primaryCTA, link: e.target.value })
            }
            placeholder="/"
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Secondary CTA Text</label>
          <input
            value={secondaryCTA.text}
            onChange={(e) =>
              setSecondaryCTA({ ...secondaryCTA, text: e.target.value })
            }
            placeholder="View Offers"
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Secondary CTA Link</label>
          <input
            value={secondaryCTA.link}
            onChange={(e) =>
              setSecondaryCTA({ ...secondaryCTA, link: e.target.value })
            }
            placeholder="/offers"
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
