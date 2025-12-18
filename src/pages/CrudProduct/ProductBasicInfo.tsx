// type Props = {
//   name: string;
//   setName: (v: string) => void;
//   category: string;
//   setCategory: (v: string) => void;
//   description: string;
//   setDescription: (v: string) => void;
//   categories: { _id: string; name: string }[];
// };

// export default function ProductBasicInfo({
//   name,
//   setName,
//   category,
//   setCategory,
//   description,
//   setDescription,
//   categories,
// }: Props) {
//   return (
//     <section className="bg-white rounded-2xl shadow border overflow-hidden">
//       <div className="bg-blue-700 text-white px-6 py-4 text-xl font-bold">
//         Product Information
//       </div>

//       <div className="p-6 space-y-5">
//         {/* Name + Category */}
//         <div className="grid sm:grid-cols-2 gap-5">
//           <div>
//             <label className="block mb-1 font-semibold">Product Name *</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-3 border rounded-xl"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Category *</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               className="w-full px-4 py-3 border rounded-xl"
//             >
//               <option value="">Choose Category</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-semibold">Description</label>
//           <textarea
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-3 border rounded-xl resize-none"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

//// updated with sub-c
// import type { Category } from "@/types/product";

// type Props = {
//   name: string;
//   setName: (v: string) => void;

//   category: string;
//   setCategory: (v: string) => void;

//   subcategory: string;
//   setSubcategory: (v: string) => void;

//   description: string;
//   setDescription: (v: string) => void;

//   categories: Category[];
// };

// export default function ProductBasicInfo({
//   name,
//   setName,
//   category,
//   setCategory,
//   subcategory,
//   setSubcategory,
//   description,
//   setDescription,
//   categories,
// }: Props) {
//   const selectedCategory = categories.find((c) => c._id === category) || null;

//   // --- CASE 1: API sends nested subcategories: selectedCategory.subcategories[] ---
//   const nestedSubcats =
//     (selectedCategory as any)?.subcategories &&
//     Array.isArray((selectedCategory as any).subcategories)
//       ? (selectedCategory as any).subcategories
//       : [];

//   // --- CASE 2: API sends flat list: categories with isSub + parent ---
//   const flatSubcats =
//     selectedCategory && nestedSubcats.length === 0
//       ? categories.filter(
//           (c: any) =>
//             c.isSub === true &&
//             c.parent &&
//             String(c.parent) === String(selectedCategory._id)
//         )
//       : [];

//   // Final list we actually render
//   const subcategoriesToShow = nestedSubcats.length
//     ? nestedSubcats
//     : flatSubcats;

//   return (
//     <section className="bg-white rounded-2xl shadow border overflow-hidden">
//       <div className="bg-blue-700 text-white px-6 py-4 text-xl font-bold">
//         Product Information
//       </div>

//       <div className="p-6 space-y-5 mb-2">
//         {/* Name + Category */}
//         <div className="grid sm:grid-cols-2 gap-5">
//           {/* Product name */}
//           <div>
//             <label className="block mb-1 font-semibold">Product Name *</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-3 border rounded-xl"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block mb-1 font-semibold">Category *</label>
//             <select
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 setSubcategory(""); // reset subcategory when category changes
//               }}
//               required
//               className="w-full px-4 py-3 border rounded-xl"
//             >
//               <option value="">Choose Category</option>
//               {categories
//                 // if your API already filters to parent-only, you can remove this filter
//                 .filter((c: any) => c.isSub === false || c.isSub === undefined)
//                 .map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>

//         {/* Subcategory dropdown */}
//         {selectedCategory && subcategoriesToShow.length > 0 && (
//           <div>
//             <label className="block mb-1 font-semibold">Subcategory</label>
//             <select
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               className="w-full px-4 py-3 border rounded-xl"
//             >
//               <option value="">Choose Subcategory</option>
//               {subcategoriesToShow.map((s: any) => (
//                 <option key={s._id} value={s._id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-semibold">Description</label>
//           <textarea
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-3 border rounded-xl resize-none"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
// import type { Category } from "@/types/product";

// type Props = {
//   name: string;
//   setName: (v: string) => void;

//   category: string;
//   setCategory: (v: string) => void;

//   subcategory: string;
//   setSubcategory: (v: string) => void;

//   description: string;
//   setDescription: (v: string) => void;

//   categories: Category[];
// };

// type CategoryWithMeta = Category & {
//   subcategories?: Category[];
//   isSub?: boolean;
//   parent?: string | { _id: string } | null;
// };

// export default function ProductBasicInfo({
//   name,
//   setName,
//   category,
//   setCategory,
//   subcategory,
//   setSubcategory,
//   description,
//   setDescription,
//   categories,
// }: Props) {
//   const selectedCategory =
//     (categories as CategoryWithMeta[]).find((c) => c._id === category) || null;

//   // --- CASE 1: API sends nested subcategories: selectedCategory.subcategories[] ---
//   const nestedSubcats =
//     (selectedCategory as CategoryWithMeta | null)?.subcategories &&
//     Array.isArray((selectedCategory as CategoryWithMeta).subcategories)
//       ? (selectedCategory as CategoryWithMeta).subcategories!
//       : [];

//   // --- CASE 2: API sends flat list: categories with isSub + parent ---
//   const flatSubcats =
//     selectedCategory && nestedSubcats.length === 0
//       ? (categories as CategoryWithMeta[]).filter((c) => {
//           return (
//             c.isSub === true &&
//             c.parent &&
//             String(c.parent) === String(selectedCategory._id)
//           );
//         })
//       : [];

//   // Final list we actually render
//   const subcategoriesToShow = nestedSubcats.length
//     ? nestedSubcats
//     : flatSubcats;

//   return (
//     <section className="bg-white rounded-2xl shadow border overflow-hidden">
//       <div className="bg-blue-700   text-white px-6 py-4 text-xl font-bold">
//         Product Information
//       </div>

//       <div className="p-6 space-y-5 mb-2">
//         {/* Name + Category */}
//         <div className="grid sm:grid-cols-2 gap-5">
//           {/* Product name */}
//           <div>
//             <label className="block mb-1 font-semibold">Product Name *</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-3 border rounded-xl"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block mb-1 font-semibold">Category *</label>
//             <select
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 setSubcategory(""); // reset subcategory when category changes
//               }}
//               required
//               className="w-full px-4 py-3 border rounded-xl"
//             >
//               <option value="">Choose Category</option>
//               {(categories as CategoryWithMeta[])
//                 // if your API already filters to parent-only, you can remove this filter
//                 .filter((c) => c.isSub === false || c.isSub === undefined)
//                 .map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>

//         {/* Subcategory dropdown */}
//         {selectedCategory && subcategoriesToShow.length > 0 && (
//           <div>
//             <label className="block mb-1 font-semibold">Subcategory</label>
//             <select
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               className="w-full px-4 py-3 border rounded-xl"
//             >
//               <option value="">Choose Subcategory</option>
//               {subcategoriesToShow.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-semibold">Description</label>
//           <textarea
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-3 border rounded-xl resize-none"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

//////// responsive
import type { Category } from "@/types/product";

type Props = {
  name: string;
  setName: (v: string) => void;

  category: string;
  setCategory: (v: string) => void;

  subcategory: string;
  setSubcategory: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  categories: Category[];
};

type CategoryWithMeta = Category & {
  subcategories?: Category[];
  isSub?: boolean;
  parent?: string | { _id: string } | null;
};

export default function ProductBasicInfo({
  name,
  setName,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  description,
  setDescription,
  categories,
}: Props) {
  const selectedCategory =
    (categories as CategoryWithMeta[]).find((c) => c._id === category) || null;

  // CASE 1: nested subcategories on category
  const nestedSubcats =
    (selectedCategory as CategoryWithMeta | null)?.subcategories &&
    Array.isArray((selectedCategory as CategoryWithMeta).subcategories)
      ? (selectedCategory as CategoryWithMeta).subcategories!
      : [];

  // CASE 2: flat list with isSub + parent
  const flatSubcats =
    selectedCategory && nestedSubcats.length === 0
      ? (categories as CategoryWithMeta[]).filter((c) => {
          return (
            c.isSub === true &&
            c.parent &&
            String(c.parent) === String(selectedCategory._id)
          );
        })
      : [];

  const subcategoriesToShow = nestedSubcats.length
    ? nestedSubcats
    : flatSubcats;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-sky-500 text-white px-4 py-3 sm:px-6 sm:py-4">
        <h3 className="text-base sm:text-lg font-semibold">
          Product Information
        </h3>
        <p className="text-xs sm:text-[13px] text-blue-100 mt-0.5">
          Start with the basics. You can refine details later.
        </p>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-6 sm:py-6 space-y-5 mb-2">
        {/* Name + Category */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {/* Product name */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-800">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Wireless Bluetooth Headphones"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-800">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(""); // reset subcategory when category changes
              }}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose Category</option>
              {(categories as CategoryWithMeta[])
                .filter((c) => c.isSub === false || c.isSub === undefined)
                .map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Subcategory dropdown */}
        {selectedCategory && subcategoriesToShow.length > 0 && (
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-800">
              Subcategory
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose Subcategory</option>
              {subcategoriesToShow.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-800">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Short description about the product, key features, material, use cases…"
          />
        </div>
      </div>
    </section>
  );
}
