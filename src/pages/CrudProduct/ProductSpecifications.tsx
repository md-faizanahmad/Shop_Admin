import { Plus, X } from "lucide-react";

type SpecRow = { key: string; value: string };

type Props = {
  specifications: SpecRow[];
  setSpecifications: (v: SpecRow[]) => void;
};

export default function ProductSpecifications({
  specifications,
  setSpecifications,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="bg-blue-800 text-white px-6 py-4 flex justify-between">
        <h3 className="text-xl font-bold">Specifications</h3>

        <button
          type="button"
          onClick={() =>
            setSpecifications([...specifications, { key: "", value: "" }])
          }
          className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="p-6 grid sm:grid-cols-2 gap-4">
        {specifications.map((spec, i) => (
          <div key={i} className="flex gap-3">
            <input
              className="w-full px-4 py-3 border rounded-xl"
              value={spec.key}
              onChange={(e) =>
                setSpecifications(
                  specifications.map((s, idx) =>
                    idx === i ? { ...s, key: e.target.value } : s
                  )
                )
              }
              placeholder="Key (e.g. RAM)"
            />

            <input
              className="w-full px-4 py-3 border rounded-xl"
              value={spec.value}
              onChange={(e) =>
                setSpecifications(
                  specifications.map((s, idx) =>
                    idx === i ? { ...s, value: e.target.value } : s
                  )
                )
              }
              placeholder="Value (e.g. 16GB)"
            />

            {specifications.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setSpecifications(
                    specifications.filter((_, idx) => idx !== i)
                  )
                }
                className="text-red-600 p-2"
              >
                <X />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
