// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// /* ---------------------------------------------
//    Strong Product Type (matches your backend)
// ---------------------------------------------- */
// type AdminProduct = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   discountPrice: number;
//   stock: number;
//   category: { _id: string; name: string; slug?: string };
//   imageUrl: string;
//   images: string[];
//   highlights: string[];
//   offers: string[];
//   specifications: Record<string, string>;
//   createdAt: string;
//   updatedAt: string;
//   slug: string;
// };

// export default function AdminProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [product, setProduct] = useState<AdminProduct | null>(null);
//   const [loading, setLoading] = useState(true);

//   /* ---------------------------------------------
//      Fetch Product
//   ---------------------------------------------- */
//   useEffect(() => {
//     if (!id) return;

//     axios
//       .get(`${API_URL}/api/products/${id}`)
//       .then((res) => {
//         setProduct(res.data.product);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Failed to load product");
//         setLoading(false);
//       });
//   }, [id]);

//   /* ---------------------------------------------
//      Loading / Not Found States
//   ---------------------------------------------- */
//   if (loading)
//     return (
//       <div className="p-6 text-center text-gray-500">Loading product…</div>
//     );

//   if (!product)
//     return (
//       <div className="p-6 text-center text-red-500">
//         Product not found or deleted.
//       </div>
//     );

//   const savings =
//     product.discountPrice < product.price
//       ? product.price - product.discountPrice
//       : 0;

//   /* ---------------------------------------------
//      UI Rendering
//   ---------------------------------------------- */
//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-8">
//       {/* Back */}
//       <button
//         onClick={() => navigate(-1)}
//         className="text-gray-600 hover:text-black mb-4"
//       >
//         ← Back
//       </button>

//       {/* Header + Edit */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">{product.name}</h1>

//         <button
//           onClick={() => navigate(`/dashboard/products/edit/${product._id}`)}
//           className="bg-black text-white px-6 py-3 rounded-lg text-sm"
//         >
//           Edit Product
//         </button>
//       </div>

//       {/* Images */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Main image */}
//         <div className="border rounded-xl p-4 bg-white shadow-sm">
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="w-full rounded-lg max-h-[420px] object-contain"
//           />
//         </div>

//         {/* Gallery */}
//         <div className="grid grid-cols-3 gap-3">
//           {product.images?.map((img: string, i: number) => (
//             <img
//               key={i}
//               src={img}
//               alt="preview"
//               className="rounded-lg border object-cover h-32 w-full"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
//         <h2 className="text-xl font-bold mb-3">Product Info</h2>

//         <p>
//           <span className="font-semibold">Category:</span>{" "}
//           {product.category?.name}
//         </p>

//         <p>
//           <span className="font-semibold">Description:</span>{" "}
//           {product.description || "No description"}
//         </p>

//         <p>
//           <span className="font-semibold">Slug:</span> {product.slug}
//         </p>

//         <p>
//           <span className="font-semibold">Stock:</span>{" "}
//           {product.stock > 0 ? (
//             <span className="text-green-600">{product.stock} in stock</span>
//           ) : (
//             <span className="text-red-600">Out of stock</span>
//           )}
//         </p>

//         <p>
//           <span className="font-semibold">Created:</span>{" "}
//           {new Date(product.createdAt).toLocaleString()}
//         </p>

//         <p>
//           <span className="font-semibold">Updated:</span>{" "}
//           {new Date(product.updatedAt).toLocaleString()}
//         </p>
//       </div>

//       {/* Pricing */}
//       <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
//         <h2 className="text-xl font-bold mb-3">Pricing</h2>

//         <p>
//           <span className="font-semibold">Price:</span> ₹
//           {product.price.toLocaleString()}
//         </p>

//         {product.discountPrice > 0 && (
//           <>
//             <p>
//               <span className="font-semibold">Discount Price:</span> ₹
//               {product.discountPrice.toLocaleString()}
//             </p>
//             <p className="text-green-600 font-semibold">
//               Savings: ₹{savings.toLocaleString()}
//             </p>
//           </>
//         )}
//       </div>

//       {/* Highlights */}
//       {product.highlights?.length > 0 && (
//         <div className="bg-white rounded-xl p-6 shadow-sm border">
//           <h2 className="text-xl font-bold mb-3">Highlights</h2>
//           <ul className="list-disc ml-6 space-y-1">
//             {product.highlights.map((h: string, i: number) => (
//               <li key={i}>{h}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Offers */}
//       {product.offers?.length > 0 && (
//         <div className="bg-white rounded-xl p-6 shadow-sm border">
//           <h2 className="text-xl font-bold mb-3">Offers</h2>
//           <ul className="list-disc ml-6 space-y-1">
//             {product.offers.map((o: string, i: number) => (
//               <li key={i}>{o}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Specifications */}
//       {Object.keys(product.specifications || {}).length > 0 && (
//         <div className="bg-white rounded-xl p-6 shadow-sm border">
//           <h2 className="text-xl font-bold mb-3">Specifications</h2>

//           <table className="w-full text-left border">
//             <tbody>
//               {Object.entries(product.specifications).map(
//                 ([key, value]: [string, string], i: number) => (
//                   <tr key={i} className="border-b">
//                     <td className="p-3 font-semibold w-40 capitalize">{key}</td>
//                     <td className="p-3">{value}</td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
////////////////////// ReDesign-
// src/pages/AdminProductDetails.tsx
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

type AdminProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  category: { _id: string; name: string };
  imageUrl: string;
  images: string[];
  highlights: string[];
  offers: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  slug: string;
};

export default function AdminProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load product");
        setLoading(false);
      });
  }, [id]);

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
  const savingsPercent = Math.round((savings / product.price) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Premium Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100">
        <div className="px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Back Button - Matches Sidebar */}
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all duration-300"
            >
              <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-sky-100 group-hover:text-sky-600 transition-all">
                <ArrowLeft className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-700">
                Back to Products
              </span>
            </button>

            {/* Title + Edit */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">ID: {product._id}</p>
              </div>

              <button
                onClick={() =>
                  navigate(`/dashboard/products/edit/${product._id}`)
                }
                className="flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-600/40 transform hover:-translate-y-1 transition-all duration-300"
              >
                <Edit3 className="w-5 h-5" />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Images Section */}
          <Card title="Images" icon={<Package className="w-7 h-7" />}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3 row-span-2">
                <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-96 object-contain rounded-2xl"
                  />
                </div>
              </div>

              {product.images.slice(0, 6).map((img, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
                >
                  <img src={img} alt="" className="w-full h-32 object-cover" />
                </div>
              ))}
            </div>
          </Card>

          {/* Pricing Card */}
          <Card
            title="Pricing & Stock"
            icon={<IndianRupee className="w-7 h-7" />}
            gradient="from-emerald-500 to-teal-600"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-500 text-sm">Original Price</p>
                  <p className="text-4xl font-bold">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
                {product.discountPrice > 0 && (
                  <div className="text-right">
                    <p className="text-5xl font-black text-green-600">
                      ₹{product.discountPrice.toLocaleString()}
                    </p>
                    <p className="text-green-600 font-bold text-lg">
                      -{savingsPercent}% off
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200">
                <p className="text-emerald-800 font-bold text-lg">
                  You Save: ₹{savings.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-600">Stock:</span>
                <span
                  className={`text-2xl font-bold ${
                    product.stock > 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} units`
                    : "Out of Stock"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Info Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <InfoCard
          title="Category"
          value={product.category.name}
          icon={<Tag className="w-6 h-6" />}
        />
        <InfoCard
          title="Slug"
          value={product.slug}
          icon={<FileText className="w-6 h-6" />}
        />
        <InfoCard
          title="Created"
          value={new Date(product.createdAt).toLocaleDateString()}
          icon={<Calendar className="w-6 h-6" />}
        />
      </div>

      {/* Description */}
      {product.description && (
        <div className="max-w-7xl mx-auto mt-12">
          <Card title="Description" icon={<FileText className="w-7 h-7" />}>
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          </Card>
        </div>
      )}

      {/* Highlights */}
      {product.highlights.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12">
          <Card
            title="Highlights"
            icon={<Zap className="w-7 h-7 text-yellow-500" />}
            gradient="from-yellow-400 to-orange-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-yellow-50 px-5 py-4 rounded-xl border border-yellow-200"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="font-medium text-gray-800">{h}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Offers */}
      {product.offers.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12">
          <Card
            title="Active Offers"
            icon={<Tag className="w-7 h-7 text-purple-600" />}
            gradient="from-purple-500 to-pink-600"
          >
            <div className="space-y-3">
              {product.offers.map((offer, i) => (
                <div
                  key={i}
                  className="bg-purple-50 px-6 py-4 rounded-xl border border-purple-200 flex items-center gap-4"
                >
                  <div className="p-2 bg-purple-600 text-white rounded-lg">
                    <Tag className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{offer}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Specifications Table */}
      {Object.keys(product.specifications).length > 0 && (
        <div className="max-w-7xl mx-auto mt-12">
          <Card
            title="Specifications"
            icon={<FileText className="w-7 h-7" />}
            gradient="from-blue-500 to-indigo-600"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <tr key={key} className="hover:bg-gray-50 transition">
                        <td className="py-5 px-6 font-semibold text-gray-700 capitalize">
                          {key}
                        </td>
                        <td className="py-5 px-6 text-gray-900 font-medium">
                          {value}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* Reusable Premium Card Component */
function Card({
  title,
  icon,
  children,
  gradient = "from-blue-600 to-sky-600",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div
        className={`bg-linear-to-r ${gradient} text-white px-8 py-6 flex items-center gap-4`}
      >
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}

function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-linear-to-br from-blue-500 to-sky-500 rounded-2xl text-white shadow-lg">
          {icon}
        </div>
        <span className="text-gray-600 font-medium">{title}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
