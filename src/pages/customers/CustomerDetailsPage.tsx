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

export default function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      try {
        const response = await axios.get<{ user: Customer }>(
          `${API_URL}/v1/admin/customers/${id}`,
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg text-gray-600">Customer not found</p>
          <Link
            to="/dashboard/customers-insight"
            className="mt-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const defaultAddress = customer.addresses.find((a) => a.isDefault);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto  px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/dashboard/customers-insight"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </Link>

        {/* Main Card - Clean & Sleek */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200">
          {/* Compact Header */}
          <div className="border-b border-gray-200 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
                {customer.name
                  .split(" ")
                  .map((n) => n[0]?.toUpperCase())
                  .join("")
                  .slice(0, 2) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="truncate text-xl font-semibold text-gray-900">
                  {customer.name}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {customer.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{customer.email}</span>
                    </span>
                  )}
                  {customer.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4" />
                      {customer.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body - Responsive Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Address Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-2.5">
                  <Home className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Default Address
                  </h2>
                </div>

                {defaultAddress ? (
                  <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 text-indigo-600 mt-0.5 shrink-0" />
                      <div className="space-y-1.5 text-sm">
                        <p className="font-medium text-gray-900">
                          {defaultAddress.fullName}
                        </p>
                        <p className="text-gray-700">{defaultAddress.street}</p>
                        {defaultAddress.landmark && (
                          <p className="text-gray-600">
                            Landmark: {defaultAddress.landmark}
                          </p>
                        )}
                        <p className="text-gray-700">
                          {defaultAddress.city}, {defaultAddress.state} —{" "}
                          {defaultAddress.pincode}
                        </p>
                        <p className="flex items-center gap-1.5 text-gray-600">
                          <Phone className="h-4 w-4" />
                          {defaultAddress.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm italic text-gray-500">
                    No default address set
                  </p>
                )}
              </div>

              {/* Stats - Compact Cards */}
              <div className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-linear-to-br from-indigo-500 to-indigo-600 p-5 text-white">
                  <Package className="h-8 w-8 opacity-90 mb-2" />
                  <p className="text-sm font-medium">Items in Cart</p>
                  <p className="mt-2 text-3xl font-bold">
                    {customer.cart.length}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-linear-to-br from-pink-500 to-rose-600 p-5 text-white">
                  <Heart className="h-8 w-8 opacity-90 mb-2" />
                  <p className="text-sm font-medium">Wishlist Items</p>
                  <p className="mt-2 text-3xl font-bold">
                    {customer.wishlist.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Other Addresses */}
            {customer.addresses.length > 1 && (
              <div className="mt-10 border-t border-gray-200 pt-8">
                <h2 className="mb-5 text-lg font-semibold text-gray-900">
                  Other Addresses ({customer.addresses.length - 1})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {customer.addresses
                    .filter((a) => !a.isDefault)
                    .map((addr) => (
                      <div
                        key={addr._id}
                        className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 hover:border-indigo-300 transition-colors"
                      >
                        <p className="font-medium text-gray-900">
                          {addr.fullName}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {addr.street}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
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
    </div>
  );
}
