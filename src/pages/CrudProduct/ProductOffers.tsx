import { Plus, Trash2 } from "lucide-react";

type Props = {
  offers: string[];
  setOffers: (v: string[]) => void;
};

export default function ProductOffers({ offers, setOffers }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="bg-purple-700 text-white px-6 py-4 flex justify-between">
        <h3 className="text-xl font-bold">Offers</h3>
        <button
          type="button"
          onClick={() => setOffers([...offers, ""])}
          className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="p-6 space-y-3">
        {offers.map((offer, i) => (
          <div key={i} className="flex gap-3">
            <input
              className="flex-1 px-4 py-3 border rounded-xl"
              value={offer}
              onChange={(e) =>
                setOffers(
                  offers.map((o, idx) => (idx === i ? e.target.value : o))
                )
              }
              placeholder="Free Delivery / COD / EMI"
            />

            {offers.length > 1 && (
              <button
                type="button"
                onClick={() => setOffers(offers.filter((_, idx) => idx !== i))}
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
