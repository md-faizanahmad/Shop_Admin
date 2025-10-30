import React from "react";

interface Category {
  _id: string;
  name: string;
}

interface ProductFormProps {
  name: string;
  description: string;
  price: string;
  category: string;
  imageFile: File | null;
  categories: Category[];
  loading: boolean;
  message: string;
  onChange: (field: string, value: string | File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  name,
  description,
  price,
  category,
  imageFile,
  categories,
  loading,
  message,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => onChange("price", e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => onChange("category", e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              onChange(
                "imageFile",
                e.target.files && e.target.files.length > 0
                  ? e.target.files[0]
                  : null
              )
            }
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          {imageFile && (
            <p className="text-xs text-gray-500 mt-1">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
          {message && <p className="text-sm text-gray-700">{message}</p>}
        </div>
      </form>
    </div>
  );
};
export default ProductForm;
