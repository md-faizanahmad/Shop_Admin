import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Package,
  Tag,
  Zap,
  FileText,
  Edit3,
  Calendar,
  IndianRupee,
} from "lucide-react";
import type { AdminProduct } from "@/types/productDetails";

export default function AdminProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    axios
      .get(`${API_URL}/v1/products/${id}`, {
        params: { admin: true },
      })
      .then((res) => {
        const p = res.data.product as AdminProduct;
        setProduct(p);

        // If gallery images exist, use first one as default preview; else fallback to main image
        if (p.images && p.images.length > 0) {
          setActiveImage(p.images[0].url);
        } else {
          setActiveImage(null);
        }

        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load product");
        setLoading(false);
      });
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-light text-gray-500">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-light text-red-500">
          Product not found
        </div>
      </div>
    );
  }

  const savings = product.price - product.discountPrice;
  const savingsPercent =
    product.discountPrice > 0 ? Math.round((savings / product.price) * 100) : 0;

  const subcategoryName =
    typeof product.subcategory === "string"
      ? product.subcategory
      : product.subcategory?.name ?? "";

  const mainImageSrc = activeImage ?? product.imageUrl;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-sky-600"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 group-hover:border-sky-300">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Product Details
              </div>
              <div className="text-sm text-gray-700 truncate max-w-xs">
                {product.name}
              </div>
              <div className="text-xs text-gray-400">ID: {product._id}</div>
            </div>

            <button
              onClick={() =>
                navigate(`/dashboard/products/edit/${product._id}`)
              }
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Top section: image + pricing/info */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          {/* Images */}
          <div className="space-y-4">
            {/* Main preview with simple hover zoom */}
            <div className="aspect-4/3 rounded-3xl bg-white shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden group cursor-zoom-in">
              <img
                src={mainImageSrc}
                alt={product.name}
                className="max-h-full w-auto object-contain transition-transform duration-200 group-hover:scale-110"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.slice(0, 6).map((imgObj) => {
                  const isActive =
                    (activeImage ?? product.imageUrl) === imgObj.url;

                  return (
                    <button
                      key={imgObj.publicId}
                      type="button"
                      onClick={() => setActiveImage(imgObj.url)}
                      className={`shrink-0 w-20 h-20 rounded-2xl bg-white border overflow-hidden focus:outline-none ${
                        isActive
                          ? "border-sky-500 ring-2 ring-sky-200"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={imgObj.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200">
                <Package className="w-3 h-3" />
                <span>{product.category.name}</span>
              </span>

              {subcategoryName && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200">
                  <Tag className="w-3 h-3" />
                  <span>{subcategoryName}</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200">
                <Calendar className="w-3 h-3" />
                <span>
                  Created{" "}
                  {new Date(product.createdAt).toLocaleDateString("en-IN")}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200">
                <Tag className="w-3 h-3" />
                <span>{product.slug}</span>
              </span>
            </div>
          </div>

          {/* Pricing + meta */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-gray-400 break-all">#{product._id}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-3 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-500">MRP</span>
                  <span className="text-2xl font-semibold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>

                {product.discountPrice > 0 && (
                  <>
                    <span className="h-4 w-px bg-gray-200" />
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-gray-500">
                        Selling
                      </span>
                      <span className="text-2xl font-semibold text-emerald-600">
                        ₹{product.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        -{savingsPercent}%
                      </span>
                    </div>
                  </>
                )}
              </div>

              {product.discountPrice > 0 && (
                <div className="text-sm text-emerald-700">
                  You save{" "}
                  <span className="font-semibold">
                    ₹{savings.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Stock</span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                  product.stock > 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Category
                </div>
                <div className="font-medium">{product.category.name}</div>
              </div>

              {subcategoryName && (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Subcategory
                  </div>
                  <div className="font-medium">{subcategoryName}</div>
                </div>
              )}

              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Slug
                </div>
                <div className="font-mono text-xs break-all">
                  {product.slug}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Created
                </div>
                <div>
                  {new Date(product.createdAt).toLocaleDateString("en-IN")}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Last updated
                </div>
                <div>
                  {new Date(product.updatedAt).toLocaleDateString("en-IN")}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Description */}
        {product.description && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-wide uppercase">
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </div>
            <p className="text-gray-800 leading-relaxed text-sm sm:text-base max-w-4xl">
              {product.description}
            </p>
          </section>
        )}

        {/* Highlights & Offers */}
        {(product.highlights.length > 0 || product.offers.length > 0) && (
          <section className="grid gap-8 md:grid-cols-2">
            {product.highlights.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-wide uppercase">
                  <Zap className="w-4 h-4" />
                  <span>Highlights</span>
                </div>
                <ul className="space-y-2">
                  {product.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-gray-800"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sky-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.offers.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-wide uppercase">
                  <Tag className="w-4 h-4" />
                  <span>Active Offers</span>
                </div>
                <ul className="space-y-2">
                  {product.offers.map((offer) => (
                    <li
                      key={offer}
                      className="flex items-start gap-2 text-sm text-gray-800"
                    >
                      <span className="mt-0.5 inline-flex items-center justify-center rounded-full border border-purple-200 px-2 py-0.5 text-[11px] font-medium text-purple-700 bg-purple-50">
                        Offer
                      </span>
                      <span>{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Specifications */}
        {Object.keys(product.specifications).length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-wide uppercase">
              <IndianRupee className="w-4 h-4" />
              <span>Specifications</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="min-w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/80"}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-3.5 w-1/3 text-gray-500 font-medium capitalize align-top">
                          {key}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-900">
                          {value}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
