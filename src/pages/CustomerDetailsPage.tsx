// // src/pages/dashboard/CustomerDetailsPage.tsx
// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ArrowLeft, Package, Heart, Home, Phone, Mail } from "lucide-react";
// import axios from "axios";
// import type { Customer } from "@/types/customer";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function CustomerDetailsPage() {
//   const { id } = useParams<{ id: string }>();
//   const [customer, setCustomer] = useState<Customer | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/admin/customers/${id}`, {
//           withCredentials: true, // Critical!
//         });
//         setCustomer(res.data.user);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };
//     fetchCustomer();
//   }, [id]);
//   if (loading)
//     return (
//       <div className="flex justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent"></div>
//       </div>
//     );
//   if (!customer) return <div>Customer not found</div>;

//   const defaultAddress = customer.addresses.find((a) => a.isDefault);

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <Link
//         to="/dashboard/customers"
//         className="inline-flex items-center gap-2 text-sky-600 hover:underline mb-6"
//       >
//         <ArrowLeft className="w-5 h-5" /> Back to Customers
//       </Link>

//       <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
//         {/* Header */}
//         <div className="bg-linear-to-r from-sky-600 to-blue-900 text-white p-8">
//           <div className="flex items-center gap-6">
//             <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-4xl font-bold">
//               {customer.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")}
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold">{customer.name}</h1>
//               <div className="flex gap-6 mt-3 text-sm opacity-90">
//                 <span className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" /> {customer.email}
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <Phone className="w-4 h-4" /> {customer.phone}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-8 grid md:grid-cols-3 gap-8">
//           {/* Default Address */}
//           <div className="md:col-span-2">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Home className="w-6 h-6 text-sky-600" /> Default Address
//             </h2>
//             {defaultAddress ? (
//               <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                 <p className="font-semibold">{defaultAddress.fullName}</p>
//                 <p className="text-gray-700 mt-2">{defaultAddress.street}</p>
//                 <p className="text-gray-600">
//                   {defaultAddress.city}, {defaultAddress.state} -{" "}
//                   {defaultAddress.pincode}
//                 </p>
//                 <p className="text-gray-600">Phone: {defaultAddress.phone}</p>
//                 {defaultAddress.landmark && (
//                   <p className="text-sm text-gray-500 mt-2">
//                     Landmark: {defaultAddress.landmark}
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <p className="text-gray-500 italic">No default address set</p>
//             )}
//           </div>

//           {/* Stats */}
//           <div className="space-y-6">
//             <div className="bg-linear-to-br from-blue-500 to-sky-600 text-white p-6 rounded-xl">
//               <Package className="w-8 h-8 mb-2" />
//               <p className="text-sm opacity-90">Items in Cart</p>
//               <p className="text-3xl font-bold">{customer.cart.length}</p>
//             </div>
//             <div className="bg-linear-to-br from-pink-500 to-rose-600 text-white p-6 rounded-xl">
//               <Heart className="w-8 h-8 mb-2" />
//               <p className="text-sm opacity-90">Wishlist</p>
//               <p className="text-3xl font-bold">{customer.wishlist.length}</p>
//             </div>
//           </div>
//         </div>

//         {/* All Addresses */}
//         {customer.addresses.length > 1 && (
//           <div className="px-8 pb-8">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">
//               Other Addresses
//             </h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               {customer.addresses
//                 .filter((a) => !a.isDefault)
//                 .map((addr) => (
//                   <div
//                     key={addr._id}
//                     className="bg-gray-50 rounded-xl p-5 border"
//                   >
//                     <p className="font-semibold">{addr.fullName}</p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {addr.street}, {addr.city}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {addr.state} - {addr.pincode}
//                     </p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////// Update
// src/pages/dashboard/CustomerDetailsPage.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Heart,
  Home,
  Phone,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import axios from "axios";
import type { Customer } from "@/types/customer";

const API_URL = import.meta.env.VITE_API_URL;

// Define full Customer type (since you're not using @/types/customer or it's incomplete)
// interface Address {
//   _id: string;
//   fullName: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   phone: string;
//   landmark?: string;
//   isDefault: boolean;
// }

// interface Customer {
//   _id: string;
//   name: string;
//   email?: string;
//   phone?: string;
//   addresses: Address[];
//   cart: unknown[]; // Can be typed better if you know cart item structure
//   wishlist: unknown[];
// }

export default function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      try {
        const response = await axios.get<{ user: Customer }>(
          `${API_URL}/api/admin/customers/${id}`,
          { withCredentials: true }
        );
        setCustomer(response.data.user);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-sky-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">Customer not found</p>
          <Link
            to="/dashboard/customers-insight"
            className="mt-4 inline-flex items-center gap-2 text-sky-600 hover:underline"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const defaultAddress = customer.addresses.find((a) => a.isDefault);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/dashboard/customers"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Customers
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Hero Header */}
          <div className="bg-linear-to-r from-sky-600 to-blue-900 text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-xl border-4 border-white/30">
                {customer.name
                  .split(" ")
                  .map((n) => n[0]?.toUpperCase() ?? "")
                  .join("")
                  .slice(0, 2) || "?"}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {customer.name}
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm opacity-90">
                  {customer.email && (
                    <span className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="w-4 h-4" />
                      {customer.email}
                    </span>
                  )}
                  {customer.phone && (
                    <span className="flex items-center justify-center sm:justify-start gap-2">
                      <Phone className="w-4 h-4" />
                      {customer.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-6 sm:p-8 grid gap-8 lg:grid-cols-3">
            {/* Default Address */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                <Home className="w-6 h-6 text-sky-600" />
                Default Address
              </h2>

              {defaultAddress ? (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sky-600 mt-1 flex shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-lg">
                        {defaultAddress.fullName}
                      </p>
                      <p className="text-gray-700 mt-1">
                        {defaultAddress.street}
                      </p>
                      {defaultAddress.landmark && (
                        <p className="text-sm text-gray-600">
                          Landmark: {defaultAddress.landmark}
                        </p>
                      )}
                      <p className="text-gray-600 mt-2">
                        {defaultAddress.city}, {defaultAddress.state} -{" "}
                        {defaultAddress.pincode}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2 mt-2">
                        <Phone className="w-4 h-4" />
                        {defaultAddress.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic bg-gray-50 rounded-xl p-6 text-center">
                  No default address set
                </p>
              )}
            </div>

            {/* Stats Cards */}
            <div className="space-y-5">
              <div className="bg-linear-to-br from-blue-500 to-sky-600 text-white p-6 rounded-xl shadow-lg">
                <Package className="w-10 h-10 mb-3 opacity-90" />
                <p className="text-sm opacity-90">Items in Cart</p>
                <p className="text-4xl font-bold mt-1">
                  {customer.cart.length}
                </p>
              </div>

              <div className="bg-linear-to-br from-pink-500 to-rose-600 text-white p-6 rounded-xl shadow-lg">
                <Heart className="w-10 h-10 mb-3 opacity-90" />
                <p className="text-sm opacity-90">Wishlist Items</p>
                <p className="text-4xl font-bold mt-1">
                  {customer.wishlist.length}
                </p>
              </div>
            </div>
          </div>

          {/* Other Addresses */}
          {customer.addresses.length > 1 && (
            <div className="border-t border-gray-200 px-6 sm:px-8 pb-8 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Other Saved Addresses ({customer.addresses.length - 1})
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {customer.addresses
                  .filter((a) => !a.isDefault)
                  .map((addr) => (
                    <div
                      key={addr._id}
                      className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-sky-300 transition-colors"
                    >
                      <p className="font-semibold">{addr.fullName}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {addr.street}, {addr.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {addr.phone}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
