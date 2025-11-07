import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import ProductTable from "./ProductTable";

interface Category {
  _id: string;
  name: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageFile: File | null;
}

export default function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URLL = "https://my-store-backend-gamma.vercel.app/";
  const API_URL = import.meta.env.VITE_API_URL || API_URLL;
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/mystoreapi/categories`, {
          withCredentials: true,
        });
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchCategories();
  }, [API_URL]);

  // Handle text inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // Handle image input
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, imageFile: file || null }));
  };

  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.stock ||
      !form.imageFile
    ) {
      setMessage("Please fill all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Uploading image...");

      // Upload to Cloudinary
      const data = new FormData();
      data.append("file", form.imageFile);
      data.append("upload_preset", UPLOAD_PRESET);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        data
      );

      const imageUrl: string = uploadRes.data.secure_url;

      // Send product to backend
      const res = await axios.post(
        `${API_URL}/mystoreapi/products`,
        {
          name: form.name,
          description: form.description,
          price: form.price,
          stock: form.stock,
          category: form.category,
          imageUrl, // ✅ correct key
        },
        { withCredentials: true }
      );

      setMessage(res.data.message || "✅ Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        imageFile: null,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error saving product:", err.response?.data);
        setMessage(err.response?.data?.message || "Error adding product");
      } else {
        console.error("Unexpected error:", err);
        setMessage("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto mt-8 p-6 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
      <ProductTable />

      <form onSubmit={handleSubmit} className="flex max-w-2x flex-col gap-4">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price || ""}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock || ""}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
}
