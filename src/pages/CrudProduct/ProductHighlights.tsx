import { Plus, Trash2 } from "lucide-react";

type Props = {
  highlights: string[];
  setHighlights: (v: string[]) => void;
};

export default function ProductHighlights({
  highlights,
  setHighlights,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="bg-emerald-700 text-white px-6 py-4 flex justify-between">
        <h3 className="text-xl font-bold">Highlights</h3>
        <button
          type="button"
          onClick={() => setHighlights([...highlights, ""])}
          className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="p-6 space-y-3">
        {highlights.map((h, i) => (
          <div key={i} className="flex gap-3">
            <input
              className="flex-1 px-4 py-3 border rounded-xl"
              value={h}
              onChange={(e) =>
                setHighlights(
                  highlights.map((v, idx) => (idx === i ? e.target.value : v))
                )
              }
              placeholder="e.g. 48MP Camera"
            />

            {highlights.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setHighlights(highlights.filter((_, idx) => idx !== i))
                }
                className="text-red-600 p-2"
              >
                <Trash2 />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
