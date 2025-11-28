// HeroBadges.tsx
type Badge = { enabled: boolean; text: string };

type Props = {
  liveBadge: Badge;
  setLiveBadge: (v: Badge) => void;
  saleBadge: Badge;
  setSaleBadge: (v: Badge) => void;
};

export default function HeroBadges({
  liveBadge,
  setLiveBadge,
  saleBadge,
  setSaleBadge,
}: Props) {
  return (
    <section className="bg-white shadow-sm rounded-2xl border p-6 space-y-6">
      <h2 className="text-xl font-bold">Badges</h2>

      {/* Live Badge */}
      <div className="space-y-3">
        <label className="font-medium">Live Badge</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={liveBadge.enabled}
              onChange={(e) =>
                setLiveBadge({ ...liveBadge, enabled: e.target.checked })
              }
            />
            <span className="text-gray-700 text-sm">Enabled</span>
          </div>
          <input
            className="flex-1 px-4 py-3 border rounded-xl"
            value={liveBadge.text}
            onChange={(e) =>
              setLiveBadge({ ...liveBadge, text: e.target.value })
            }
            placeholder="Winter Sale Coming Soon!"
          />
        </div>
      </div>

      {/* Sale Badge */}
      <div className="space-y-3">
        <label className="font-medium">Sale Badge</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={saleBadge.enabled}
              onChange={(e) =>
                setSaleBadge({ ...saleBadge, enabled: e.target.checked })
              }
            />
            <span className="text-gray-700 text-sm">Enabled</span>
          </div>
          <input
            className="flex-1 px-4 py-3 border rounded-xl"
            value={saleBadge.text}
            onChange={(e) =>
              setSaleBadge({ ...saleBadge, text: e.target.value })
            }
            placeholder="Coming Soon"
          />
        </div>
      </div>
    </section>
  );
}
