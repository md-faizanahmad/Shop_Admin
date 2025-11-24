// // src/pages/dashboard/CustomersPage.tsx
// import { useState, useEffect } from "react";
// import { Search, Phone, Mail, Users } from "lucide-react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import type { Customer } from "@/types/customer";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function CustomersPage() {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         // NO TOKEN NEEDED — it's in cookie!
//         const res = await axios.get(`${API_URL}/api/admin/customers`, {
//           withCredentials: true, // This is the key!
//         });
//         setCustomers(res.data.users || []);
//         setLoading(false);
//       } catch {
//         // console.error("Failed to fetch customers:", err.response?.data || err);
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, []);
//   const filtered = customers.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.phone.includes(searchTerm)
//   );

//   if (loading)
//     return (
//       <div className="flex justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent"></div>
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//           <Users className="w-9 h-9 text-sky-600" />
//           All Customers
//         </h1>
//         <p className="text-gray-600 mt-1">
//           Click on any customer to view full details
//         </p>
//       </div>

//       <div className="mb-6">
//         <div className="relative max-w-md">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by name, email or phone..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
//           />
//         </div>
//       </div>

//       <div className="grid gap-4">
//         {filtered.map((customer) => (
//           <Link
//             key={customer._id}
//             to={`/dashboard/customers/${customer._id}`}
//             className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-sky-300 transition-all"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-5">
//                 <div className="w-14 h-14 bg-linear-to-br from-sky-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
//                   {customer.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                     .slice(0, 2)}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-gray-900">
//                     {customer.name}
//                   </h3>
//                   <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
//                     <span className="flex items-center gap-1">
//                       <Mail className="w-4 h-4" /> {customer.email || "—"}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       {/* <Phone className="w-4 h-4" /> {customer.phone} */}
//                       <Phone className="w-4 h-4" /> {customer.phone || "—"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-gray-500">Total Items in Cart</p>
//                 <p className="text-2xl font-bold text-sky-600">
//                   {customer.cart.length}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {filtered.length === 0 && (
//         <div className="text-center py-20 text-gray-500">
//           <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
//           <p>No customers found</p>
//         </div>
//       )}
//     </div>
//   );
// }
/////////////////////////// Update
// src/pages/dashboard/CustomersPage.tsx
import { useState, useEffect } from "react";
import { Search, Phone, Mail, Users, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Customer } from "@/types/customer";

// Define the Customer type directly (or import if you have it in types/customer.ts)
// interface Customer {
//   _id: string;
//   name: string;
//   email?: string;
//   phone?: string;
//   cart: any[]; // You can make this more specific if you know cart item shape
// }

const API_URL = import.meta.env.VITE_API_URL;

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get<{ users: Customer[] }>(
          `${API_URL}/api/admin/customers`,
          { withCredentials: true }
        );
        setCustomers(response.data.users ?? []);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filtered = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      (customer.email?.toLowerCase().includes(term) ?? false) ||
      (customer.phone?.includes(term) ?? false)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-sky-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
            All Customers
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage and view customer details • {customers.length} total
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 text-base bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {searchTerm ? "No customers found" : "No customers yet"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm
                ? `No results for "${searchTerm}". Try different keywords.`
                : "When customers sign up, they will appear here."}
            </p>
          </div>
        ) : (
          /* Customers Grid - Fully Responsive */
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((customer) => (
              <Link
                key={customer._id}
                to={`/dashboard/customers/${customer._id}`}
                className="group block transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-sky-200 rounded-2xl"
              >
                <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-sky-300 transition-all overflow-hidden h-full flex flex-col">
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Avatar + Cart Count */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-sky-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0]?.toUpperCase() ?? "")
                          .join("")
                          .slice(0, 2) || <User className="w-8 h-8" />}
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">
                          Cart Items
                        </span>
                        <span className="text-2xl font-bold text-sky-600">
                          {customer.cart.length}
                        </span>
                      </div>
                    </div>

                    {/* Name & Contact Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-sky-700 transition-colors line-clamp-1">
                        {customer.name}
                      </h3>

                      <div className="mt-3 space-y-2 text-sm text-gray-600">
                        {customer.email ? (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400 flex shrink-0" />
                            <span className="truncate">{customer.email}</span>
                          </div>
                        ) : (
                          <div className="text-gray-400 italic">No email</div>
                        )}

                        {customer.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400 flex shrink-0" />
                            <span>{customer.phone}</span>
                          </div>
                        ) : (
                          <div className="text-gray-400 italic">No phone</div>
                        )}
                      </div>
                    </div>

                    {/* Hover CTA */}
                    <div className="mt-5 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium text-sky-600 flex items-center gap-1">
                        View Details
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
