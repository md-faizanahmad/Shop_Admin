// // CategoryForm.tsx
// import type { FormEvent } from "react";
// import { Plus, X, Save, Edit2, Loader2 } from "lucide-react";

// interface CategoryFormProps {
//   mainName: string;
//   subcategories: string[];
//   editingMainId: string | null;
//   saving: boolean;
//   isPending: boolean;
//   onMainNameChange: (value: string) => void;
//   onAddSubcategory: () => void;
//   onRemoveSubcategory: (index: number) => void;
//   onUpdateSubcategory: (index: number, value: string) => void;
//   onSubmit: (e: FormEvent) => void;
//   onCancelEdit: () => void;
// }

// export default function CategoryForm({
//   mainName,
//   subcategories,
//   editingMainId,
//   saving,
//   isPending,
//   onMainNameChange,
//   onAddSubcategory,
//   onRemoveSubcategory,
//   onUpdateSubcategory,
//   onSubmit,
//   onCancelEdit,
// }: CategoryFormProps) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 h-fit">
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
//         {editingMainId ? (
//           <Edit2 className="w-6 h-6 text-indigo-600" />
//         ) : (
//           <Plus className="w-6 h-6 text-green-600" />
//         )}
//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//           {editingMainId ? "Edit Category Group" : "Create Category Group"}
//         </h2>
//       </div>

//       <form onSubmit={onSubmit} className="space-y-6">
//         {/* Main category */}
//         <div>
//           <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
//             Main Category <span className="text-red-500">*</span>
//             <span className="text-[11px] sm:text-xs text-gray-500 ml-2">
//               (letters only)
//             </span>
//           </label>
//           <input
//             type="text"
//             value={mainName}
//             onChange={(e) => onMainNameChange(e.target.value)}
//             placeholder="e.g., Electronics"
//             className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
//             disabled={saving}
//           />
//         </div>

//         {/* Subcategories */}
//         <div>
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
//             <label className="text-xs sm:text-sm font-semibold text-gray-700">
//               Subcategories{" "}
//               <span className="text-gray-500 font-normal">
//                 (optional, letters only)
//               </span>
//             </label>
//             <button
//               type="button"
//               onClick={onAddSubcategory}
//               className="self-start sm:self-auto inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm font-medium"
//             >
//               <Plus size={16} /> Add subcategory
//             </button>
//           </div>

//           <div className="space-y-2.5">
//             {subcategories.map((sub, i) => (
//               <div key={i} className="flex gap-2">
//                 <input
//                   type="text"
//                   value={sub}
//                   onChange={(e) => onUpdateSubcategory(i, e.target.value)}
//                   placeholder="e.g., Smartphones"
//                   className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
//                   disabled={saving}
//                 />
//                 {subcategories.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => onRemoveSubcategory(i)}
//                     className="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-xl"
//                     aria-label="Remove subcategory"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
//           <button
//             type="submit"
//             disabled={saving || isPending}
//             className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl text-sm sm:text-base transition"
//           >
//             {saving ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               <Save size={18} />
//             )}
//             {saving ? "Saving..." : editingMainId ? "Update" : "Create"}
//           </button>

//           {editingMainId && (
//             <button
//               type="button"
//               onClick={onCancelEdit}
//               className="inline-flex items-center justify-center px-5 py-2.5 sm:px-7 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

//// update with image
// CategoryForm.tsx
import type { FormEvent } from "react";
import { Plus, X, Save, Edit2, Loader2, Trash2 } from "lucide-react";

interface SubField {
  name: string;
  file?: File | null;
  preview?: string | null;
  existingImage?: string | null;
  _id?: string | null;
}

interface CategoryFormProps {
  mainName: string;
  mainImagePreview: string | null;
  mainExistingImage?: string | null;
  editingMainId: string | null;
  subcategories: SubField[];
  saving: boolean;
  isPending: boolean;
  onMainNameChange: (value: string) => void;
  onMainImageChange: (file?: File | null) => void;
  onRemoveMainImage: () => void;
  onAddSubcategory: () => void;
  onRemoveSubcategory: (index: number) => void;
  onUpdateSubcategory: (index: number, value: string) => void;
  onUpdateSubcategoryFile: (index: number, file?: File | null) => void;
  onRemoveSubcategoryImage?: (index: number) => void;
  onSubmit: (e: FormEvent) => void;
  onCancelEdit: () => void;
}

export default function CategoryForm({
  mainName,
  mainImagePreview,
  mainExistingImage = null,
  editingMainId,
  subcategories,
  saving,
  isPending,
  onMainNameChange,
  onMainImageChange,
  onRemoveMainImage,
  onAddSubcategory,
  onRemoveSubcategory,
  onUpdateSubcategory,
  onUpdateSubcategoryFile,
  onRemoveSubcategoryImage,
  onSubmit,
  onCancelEdit,
}: CategoryFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 h-fit">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        {editingMainId ? (
          <Edit2 className="w-6 h-6 text-indigo-600" />
        ) : (
          <Plus className="w-6 h-6 text-green-600" />
        )}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {editingMainId ? "Edit Category Group" : "Create Category Group"}
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Main category */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            Main Category <span className="text-red-500">*</span>
            <span className="text-[11px] sm:text-xs text-gray-500 ml-2">
              (letters only)
            </span>
          </label>
          <input
            type="text"
            value={mainName}
            onChange={(e) => onMainNameChange(e.target.value)}
            placeholder="e.g., Electronics"
            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            disabled={saving}
          />
        </div>

        {/* Main image */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            Category Image{" "}
            <span className="text-[11px] sm:text-xs text-gray-500 ml-2">
              (optional)
            </span>
          </label>

          <div className="flex items-center gap-3">
            <label
              className="inline-flex items-center gap-2 px-3 py-2 border rounded-xl text-sm cursor-pointer hover:bg-gray-50"
              aria-hidden
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  onMainImageChange(f ?? null);
                }}
                className="hidden"
                disabled={saving}
              />
              Upload image
            </label>

            {(mainImagePreview || mainExistingImage) && (
              <div className="flex items-center gap-2">
                <img
                  src={mainImagePreview ?? mainExistingImage ?? undefined}
                  alt="main preview"
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={onRemoveMainImage}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Subcategories */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <label className="text-xs sm:text-sm font-semibold text-gray-700">
              Subcategories{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <button
              type="button"
              onClick={onAddSubcategory}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm font-medium"
            >
              <Plus size={16} /> Add subcategory
            </button>
          </div>

          <div className="space-y-2.5">
            {subcategories.map((sub, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={sub.name}
                  onChange={(e) => onUpdateSubcategory(i, e.target.value)}
                  placeholder="e.g., Smartphones"
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  disabled={saving}
                />

                {/* Sub image upload */}
                <label
                  className="inline-flex items-center gap-2 px-2 py-2 border rounded-xl text-sm cursor-pointer hover:bg-gray-50"
                  aria-hidden
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      onUpdateSubcategoryFile(i, f ?? null);
                    }}
                    className="hidden"
                    disabled={saving}
                  />
                  Upload
                </label>

                {/* preview: new file or existing image */}
                {sub.preview || sub.existingImage ? (
                  <div className="flex items-center gap-1">
                    <img
                      src={sub.preview ?? sub.existingImage ?? undefined}
                      alt="sub-preview"
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    {/* remove existing image control */}
                    {sub.existingImage && onRemoveSubcategoryImage ? (
                      <button
                        type="button"
                        onClick={() => onRemoveSubcategoryImage(i)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        title="Remove image"
                      >
                        <Trash2 size={14} />
                      </button>
                    ) : null}
                    {/* if preview exists (new file), user can also remove by clicking upload -> choose none or we can provide remove */}
                    {sub.preview && !sub.existingImage ? (
                      <button
                        type="button"
                        onClick={() => onUpdateSubcategoryFile(i, null)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        title="Remove selected file"
                      >
                        <X size={14} />
                      </button>
                    ) : null}
                  </div>
                ) : null}

                {subcategories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveSubcategory(i)}
                    className="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-xl"
                    aria-label="Remove subcategory"
                    disabled={saving}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving || isPending}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl text-sm sm:text-base transition"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? "Saving..." : editingMainId ? "Update" : "Create"}
          </button>

          {editingMainId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex items-center justify-center px-5 py-2.5 sm:px-7 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
