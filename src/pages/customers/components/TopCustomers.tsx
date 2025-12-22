// src/admin/customers/components/TopCustomers.tsx
import { Award, Calendar, ShoppingBag } from "lucide-react";
import { format } from "date-fns";

type TopCustomer = {
  _id: string;
  name: string;
  orders: number;
  spent: number;
  lastOrder: string;
};

export default function TopCustomers({
  customers,
}: {
  customers: TopCustomer[];
}) {
  if (!customers.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No customer data available</p>
      </div>
    );
  }

  const topTen = customers.slice(0, 10);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Top Customers</h2>
            <p className="text-sm text-gray-500 mt-1">
              Ranked by total spending and order frequency
            </p>
          </div>
        </div>
      </div>

      {/* List - Responsive */}
      <div className="divide-y divide-gray-200">
        {topTen.map((c, index) => (
          <div key={c._id} className="p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between gap-4">
              {/* Rank + Name + Last Order */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    index === 0
                      ? "bg-yellow-500 text-white"
                      : index === 1
                      ? "bg-gray-400 text-white"
                      : index === 2
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {c.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(c.lastOrder), "dd MMM yyyy")}
                  </div>
                </div>
              </div>

              {/* Spent + Orders */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-lg text-gray-900">
                  ₹{c.spent.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center justify-end gap-1.5 mt-1 text-xs text-gray-500">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {c.orders} order{c.orders !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
