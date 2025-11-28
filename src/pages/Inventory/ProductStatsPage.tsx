// src/pages/CrudProduct/ProductDetailsPage.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Edit,
  Package,
  Tag,
  IndianRupee,
  AlertTriangle,
  Star,
  Image as ImageIcon,
} from "lucide-react";

interface ProductDetails {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  discountPrice: number;
  category: { _id: string; name: string };
  images: string[];
  highlights: string[];
  specifications: Record<string, string>;
  reviews: {
    user: string;
    name: string;
    comment: string;
    rating: number;
  }[];
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const API_URL = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [API_URL, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Product Not Found
          </h2>
          <p className="text-gray-600 mt-2">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/dashboard/products"
            className="mt-6 inline-block text-indigo-600 font-medium hover:underline"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isLowStock = product.stock <= 10;
  const isCritical = product.stock <= 3;
  const savings =
    product.discountPrice > 0 ? product.price - product.discountPrice : 0;
  const discountPercent =
    savings > 0 ? Math.round((savings / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Package className="w-10 h-10 text-indigo-600" />
                {product.name}
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {product.category?.name || "Uncategorized"}
              </p>
            </div>

            <Link
              to={`/dashboard/products/edit/${product._id}`}
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Edit size={20} />
              Edit Product
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images + Pricing */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-indigo-600" />
                  Product Images
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                {product.images.length > 0 ? (
                  product.images.map((img, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
                    >
                      <img
                        src={img}
                        alt={`${product.name} - ${i + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-medium">Image {i + 1}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-gray-500">
                    <ImageIcon className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                    <p>No images uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-bold text-xl text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description || "No description provided."}
              </p>
            </div>

            {/* Highlights */}
            {product.highlights.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-bold text-xl text-gray-900 mb-4">
                  Key Highlights
                </h2>
                <ul className="space-y-3">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex shrink-0"></div>
                      <span className="text-gray-700">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-green-600" />
                Pricing & Stock
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Regular Price</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>

                {product.discountPrice > 0 && (
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-green-700 font-medium">
                      Discounted Price
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      ₹{product.discountPrice.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      You save ₹{savings.toLocaleString()} ({discountPercent}%
                      off)
                    </p>
                  </div>
                )}

                <div
                  className={`p-4 rounded-xl border-2 ${
                    isCritical
                      ? "border-red-500 bg-red-50"
                      : isLowStock
                      ? "border-orange-400 bg-orange-50"
                      : "border-green-500 bg-green-50"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-700">
                    Current Stock
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      isCritical
                        ? "text-red-600"
                        : isLowStock
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.stock}
                  </p>
                  {isCritical && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <AlertTriangle size={16} /> Critical - Restock urgently!
                    </p>
                  )}
                  {isLowStock && !isCritical && (
                    <p className="text-orange-600 text-sm mt-2">
                      Low stock warning
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Specifications
                </h3>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <dt className="font-medium text-gray-700">{key}</dt>
                        <dd className="text-gray-900">{value}</dd>
                      </div>
                    )
                  )}
                </dl>
              </div>
            )}

            {/* Reviews */}
            {product.reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Customer Reviews ({product.reviews.length})
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {product.reviews.map((r) => (
                    <div
                      key={r.user}
                      className="pb-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">{r.name}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < r.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
