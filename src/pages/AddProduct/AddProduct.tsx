import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import axios from "axios";

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
  image: File | null;
}

export default function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // 🟢 Fetch categories on load
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

  // 🟢 Handle text/number inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // 🟢 Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, image: file }));
  };

  // 🟢 Handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.stock ||
      !form.category ||
      !form.image
    ) {
      alert("Please fill all fields before submitting");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", form.image);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl: string = cloudinaryRes.data.secure_url;

      // 2️⃣ Send product data to backend
      await axios.post(
        `${API_URL}/mystoreapi/products`,
        {
          name: form.name,
          description: form.description,
          price: form.price,
          stock: form.stock,
          category: form.category,
          imageUrl,
        },
        { withCredentials: true }
      );

      alert("✅ Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: null,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("❌ Error saving product:", err.response?.data);
        alert(err.response?.data?.message || "Failed to add product");
      } else {
        console.error("❌ Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-lg rounded-2xl p-4 sm:p-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price || ""}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock || ""}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded-lg p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
