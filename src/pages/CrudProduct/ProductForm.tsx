// // Compact + Modern ProductForm
// import { useEffect, useState } from "react";
// import axios from "axios";

// export type ProductPayload = {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category: string;
//   imageUrl?: string | null;
// };

// type Category = { _id: string; name: string };

// type Props = {
//   initial?: Partial<ProductPayload> & { imageUrl?: string | null };
//   onSubmit: (payload: FormData | ProductPayload) => Promise<void>;
//   submitLabel?: string;
//   loading?: boolean;
// };

// export default function ProductForm({
//   initial = {},
//   onSubmit,
//   submitLabel = "Save",
//   loading = false,
// }: Props) {
//   const [name, setName] = useState(initial.name ?? "");
//   const [description, setDescription] = useState(initial.description ?? "");
//   const [price, setPrice] = useState(String(initial.price ?? ""));
//   const [stock, setStock] = useState(String(initial.stock ?? ""));
//   const [category, setCategory] = useState(initial.category ?? "");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(
//     initial.imageUrl ?? null
//   );
//   const [categories, setCategories] = useState<Category[]>([]);
//   const API_URL = import.meta.env.VITE_API_URL ?? "";

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/categories`)
//       .then((res) => setCategories(res.data.categories ?? []))
//       .catch(() => {});
//   }, [API_URL]);

//   useEffect(() => {
//     if (!imageFile) return;
//     const url = URL.createObjectURL(imageFile);
//     setPreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [imageFile]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Convert number inputs
//     const priceNum = Number(price);
//     const stockNum = Number(stock);
//     if (Number.isNaN(priceNum) || Number.isNaN(stockNum)) return;

//     if (imageFile) {
//       const fd = new FormData();
//       fd.append("file", imageFile);
//       fd.append("name", name);
//       fd.append("description", description);
//       fd.append("price", price);
//       fd.append("stock", stock);
//       fd.append("category", category);
//       await onSubmit(fd);
//     } else {
//       await onSubmit({
//         name,
//         description,
//         price: priceNum,
//         stock: stockNum,
//         category,
//         imageUrl: initial.imageUrl ?? null,
//       });
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-5  mx-auto bg-white  shadow rounded-xl"
//     >
//       <h2 className="text-xl font-semibold">Product Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           className="border p-2 rounded w-full"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           className="border p-2 rounded w-full"
//           placeholder="Price (₹)"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <textarea
//           className="border p-2 rounded w-full md:col-span-2"
//           placeholder="Description"
//           rows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <select
//           className="border p-2 rounded w-full"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">Select category</option>
//           {categories.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <input
//           className="border p-2 rounded w-full"
//           placeholder="Stock"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//         />
//       </div>

//       {/* Image block */}
//       <div className="flex items-center gap-4">
//         <div className="w-28 h-28 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
//           {preview ? (
//             <img src={preview} className="w-full h-full object-cover" />
//           ) : (
//             <span className="text-xs text-gray-500">No Image</span>
//           )}
//         </div>

//         <div className="flex-1">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
//           />
//           <p className="text-xs text-gray-600 mt-1">
//             Upload image (recommended &lt;500KB)
//           </p>
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="px-4 py-2 bg-black text-white rounded w-full"
//       >
//         {loading ? "Saving..." : submitLabel}
//       </button>
//     </form>
//   );
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// update with more fileds
// src/components/ProductForm.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Upload, Plus, Trash2, X } from "lucide-react";

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  highlights?: string[];
  specifications?: Record<string, string>;
  images?: string[];
};

type Category = {
  _id: string;
  name: string;
};

type Props = {
  initial?: Partial<ProductFormData>;
  onSubmit: (data: FormData) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
};

export default function ProductForm({
  initial = {},
  onSubmit,
  submitLabel = "Save Product",
  loading = false,
}: Props) {
  const [name, setName] = useState(initial.name || "");
  const [description, setDescription] = useState(initial.description || "");
  const [price, setPrice] = useState(String(initial.price ?? ""));
  const [stock, setStock] = useState(String(initial.stock ?? ""));
  const [category, setCategory] = useState(initial.category || "");

  const [highlights, setHighlights] = useState<string[]>(
    initial.highlights?.length ? initial.highlights : [""]
  );
  const specsEntries = initial.specifications
    ? Object.entries(initial.specifications)
    : [];
  const [specifications, setSpecifications] = useState<
    { key: string; value: string }[]
  >(
    specsEntries.length > 0
      ? specsEntries.map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initial.images || []
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const API_URL = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch(() => {});
  }, [API_URL]);

  const addHighlight = () => setHighlights([...highlights, ""]);
  const removeHighlight = (i: number) =>
    setHighlights(highlights.filter((_, idx) => idx !== i));

  const addSpec = () =>
    setSpecifications([...specifications, { key: "", value: "" }]);
  const removeSpec = (i: number) =>
    setSpecifications(specifications.filter((_, idx) => idx !== i));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);

    formData.append("highlights", JSON.stringify(highlights.filter(Boolean)));

    const specsObj = specifications
      .filter((s) => s.key.trim() && s.value.trim())
      .reduce((acc, s) => {
        acc[s.key.trim()] = s.value.trim();
        return acc;
      }, {} as Record<string, string>);

    formData.append("specifications", JSON.stringify(specsObj));

    // THIS LINE IS CRITICAL
    imageFiles.forEach((file) => formData.append("images", file));

    if (imageFiles.length === 0 && imagePreviews.length === 0) {
      // Send a placeholder so backend doesn't break
      formData.append(
        "imageUrl",
        "https://via.placeholder.com/600x600.png?text=No+Image"
      );
    }

    await onSubmit(formData);
  };

  // return (
  //   <form onSubmit={handleSubmit} className="space-y-8">
  //     {/* Basic Info */}
  //     <section className="bg-white p-8 rounded-xl shadow-sm border">
  //       <h2 className="text-2xl font-bold mb-6 text-gray-900">
  //         Product Information
  //       </h2>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">
  //             Name *
  //           </label>
  //           <input
  //             required
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
  //             placeholder="iPhone 15 Pro"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">
  //             Category *
  //           </label>
  //           <select
  //             required
  //             value={category}
  //             onChange={(e) => setCategory(e.target.value)}
  //             className="w-full px-4 py-3 border rounded-lg"
  //           >
  //             <option value="">Select Category</option>
  //             {categories.map((c) => (
  //               <option key={c._id} value={c._id}>
  //                 {c.name}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">
  //             Price (₹) *
  //           </label>
  //           <input
  //             required
  //             type="number"
  //             min="0"
  //             step="0.01"
  //             value={price}
  //             onChange={(e) => setPrice(e.target.value)}
  //             className="w-full px-4 py-3 border rounded-lg"
  //             placeholder="29999"
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">
  //             Stock *
  //           </label>
  //           <input
  //             required
  //             type="number"
  //             min="0"
  //             value={stock}
  //             onChange={(e) => setStock(e.target.value)}
  //             className="w-full px-4 py-3 border rounded-lg"
  //             placeholder="100"
  //           />
  //         </div>
  //         <div className="md:col-span-2">
  //           <label className="block text-sm font-medium text-gray-700 mb-2">
  //             Description
  //           </label>
  //           <textarea
  //             rows={4}
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             className="w-full px-4 py-3 border rounded-lg"
  //             placeholder="Detailed description..."
  //           />
  //         </div>
  //       </div>
  //     </section>

  //     {/* Highlights & Specs */}
  //     <section className="bg-white p-8 rounded-xl shadow-sm border space-y-8">
  //       <div>
  //         <div className="flex justify-between mb-4">
  //           <h3 className="text-xl font-semibold">Highlights</h3>
  //           <button
  //             type="button"
  //             onClick={addHighlight}
  //             className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-lg"
  //           >
  //             <Plus className="w-4 h-4" /> Add
  //           </button>
  //         </div>
  //         {highlights.map((h, i) => (
  //           <div key={i} className="flex gap-3 mb-3">
  //             <input
  //               value={h}
  //               onChange={(e) =>
  //                 setHighlights(
  //                   highlights.map((v, idx) => (idx === i ? e.target.value : v))
  //                 )
  //               }
  //               placeholder="48MP Camera"
  //               className="flex-1 px-4 py-3 border rounded-lg"
  //             />
  //             {highlights.length > 1 && (
  //               <button
  //                 type="button"
  //                 onClick={() => removeHighlight(i)}
  //                 className="text-red-600"
  //               >
  //                 <Trash2 />
  //               </button>
  //             )}
  //           </div>
  //         ))}
  //       </div>

  //       <div>
  //         <div className="flex justify-between mb-4">
  //           <h3 className="text-xl font-semibold">Specifications</h3>
  //           <button
  //             type="button"
  //             onClick={addSpec}
  //             className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-lg"
  //           >
  //             <Plus className="w-4 h-4" /> Add
  //           </button>
  //         </div>
  //         {specifications.map((spec, i) => (
  //           <div key={i} className="grid grid-cols-2 gap-3 mb-3">
  //             <input
  //               value={spec.key}
  //               onChange={(e) =>
  //                 setSpecifications(
  //                   specifications.map((s, idx) =>
  //                     idx === i ? { ...s, key: e.target.value } : s
  //                   )
  //                 )
  //               }
  //               placeholder="RAM"
  //               className="px-4 py-3 border rounded-lg"
  //             />
  //             <div className="flex gap-2">
  //               <input
  //                 value={spec.value}
  //                 onChange={(e) =>
  //                   setSpecifications(
  //                     specifications.map((s, idx) =>
  //                       idx === i ? { ...s, value: e.target.value } : s
  //                     )
  //                   )
  //                 }
  //                 placeholder="8GB"
  //                 className="flex-1 px-4 py-3 border rounded-lg"
  //               />
  //               {specifications.length > 1 && (
  //                 <button
  //                   type="button"
  //                   onClick={() => removeSpec(i)}
  //                   className="text-red-600"
  //                 >
  //                   <X className="w-5 h-5" />
  //                 </button>
  //               )}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </section>

  //     {/* Images */}
  //     <section className="bg-white p-8 rounded-xl shadow-sm border">
  //       <h3 className="text-xl font-semibold mb-6">Product Images</h3>
  //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  //         {imagePreviews.map((src, i) => (
  //           <div key={i} className="relative group">
  //             <img
  //               src={src}
  //               alt=""
  //               className="w-full h-40 object-cover rounded-lg border"
  //             />
  //             <button
  //               type="button"
  //               onClick={() => removeImage(i)}
  //               className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
  //             >
  //               <X className="w-4 h-4" />
  //             </button>
  //           </div>
  //         ))}
  //         <label className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer hover:border-black transition">
  //           <Upload className="w-10 h-10 text-gray-400" />
  //           <input
  //             type="file"
  //             multiple
  //             accept="image/*"
  //             onChange={handleImageChange}
  //             className="hidden"
  //           />
  //         </label>
  //       </div>
  //     </section>

  //     <button
  //       type="submit"
  //       disabled={loading || !name || !price || !stock || !category}
  //       className="w-full py-5 bg-black text-white text-lg font-semibold rounded-xl hover:bg-gray-900 disabled:bg-gray-400 transition"
  //     >
  //       {loading ? "Saving..." : submitLabel}
  //     </button>
  //   </form>
  // );
  /////////////////////////////// update design
  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-10">
      {/* ===== Basic Info – Compact Grid ===== */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-sky-600 to-blue-700 text-white px-8 py-5">
          <h2 className="text-2xl font-bold">Product Information</h2>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Product Name *
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                placeholder="e.g. iPhone 15 Pro Max"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category *
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              >
                <option value="">Choose category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Price (₹) *
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition"
                placeholder="29,999"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Stock Quantity *
              </label>
              <input
                required
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition"
                placeholder="100"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition resize-none"
                placeholder="Write a compelling product description..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Highlights – Compact List ===== */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-emerald-600 to-teal-700 text-white px-8 py-5 flex justify-between items-center">
          <h3 className="text-xl font-bold">Key Highlights</h3>
          <button
            type="button"
            onClick={addHighlight}
            className="flex items-center gap-2 text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition backdrop-blur"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="p-6 space-y-3">
          {highlights.map((h, i) => (
            <div key={i} className="flex gap-3 items-center">
              <span className="text-2xl text-emerald-600">•</span>
              <input
                value={h}
                onChange={(e) =>
                  setHighlights(
                    highlights.map((v, idx) => (idx === i ? e.target.value : v))
                  )
                }
                placeholder="e.g. 48MP Main Camera"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
              {highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  className="text-red-600 hover:bg-red-50 p-2.5 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== Specifications – Two Column Compact ===== */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-blue-800 to-sky-700 text-white px-8 py-5 flex justify-between items-center">
          <h3 className="text-xl font-bold">Specifications</h3>
          <button
            type="button"
            onClick={addSpec}
            className="flex items-center gap-2 text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition backdrop-blur"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {specifications.map((spec, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  value={spec.key}
                  onChange={(e) =>
                    setSpecifications(
                      specifications.map((s, idx) =>
                        idx === i ? { ...s, key: e.target.value } : s
                      )
                    )
                  }
                  placeholder="Key (e.g. RAM)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
                <input
                  value={spec.value}
                  onChange={(e) =>
                    setSpecifications(
                      specifications.map((s, idx) =>
                        idx === i ? { ...s, value: e.target.value } : s
                      )
                    )
                  }
                  placeholder="Value (e.g. 16GB)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
                {specifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="text-red-600 hover:bg-red-50 p-2.5 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Images – Compact Grid ===== */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-rose-600 to-pink-700 text-white px-8 py-5">
          <h3 className="text-xl font-bold">Product Images (Up to 8)</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {imagePreviews.map((src, i) => (
              <div
                key={i}
                className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-8 h-8 text-white" />
                </button>
              </div>
            ))}
            {imagePreviews.length < 8 && (
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Add Image</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </section>

      {/* ===== Submit Button – Full Width, Prominent ===== */}
      <div className="sticky bottom-0 left-0 right-0 bg-linear-to-r from-black to-gray-900 p-6 -mx-6 md:-mx-8 rounded-b-2xl shadow-2xl">
        <button
          type="submit"
          disabled={loading || !name.trim() || !price || !stock || !category}
          className="w-full py-5 bg-white text-black text-lg font-bold rounded-xl hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-600 transition transform hover:scale-[1.01] active:scale-100 shadow-lg"
        >
          {loading ? "Saving Product..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
