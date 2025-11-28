type Props = {
  name: string;
  setName: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  categories: { _id: string; name: string }[];
};

export default function ProductBasicInfo({
  name,
  setName,
  category,
  setCategory,
  description,
  setDescription,
  categories,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="bg-blue-700 text-white px-6 py-4 text-xl font-bold">
        Product Information
      </div>

      <div className="p-6 space-y-5">
        {/* Name + Category */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-semibold">Product Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl"
            >
              <option value="">Choose Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl resize-none"
          />
        </div>
      </div>
    </section>
  );
}
