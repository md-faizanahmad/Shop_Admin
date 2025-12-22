// src/admin/customers/components/CityDistribution.tsx
import { MapPin } from "lucide-react";

type CityData = {
  city: string;
  customers: number;
};

export default function CityDistribution({ data = [] }: { data?: CityData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No city data available</p>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.customers - a.customers);
  const topCities = sortedData.slice(0, 10);
  const max = topCities.length > 0 ? topCities[0].customers : 1; // prevent divide by zero

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-100 text-red-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Top Cities</h2>
            <p className="text-sm text-gray-500 mt-1">
              Customer distribution by city
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-200">
        {topCities.map((city, index) => {
          const percent =
            max > 0 ? Math.round((city.customers / max) * 100) : 0;

          return (
            <div
              key={city.city}
              className="p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 text-sm font-bold text-gray-600 shrink-0">
                  {index + 1}
                </div>

                {/* City Name */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {city.city}
                  </p>
                </div>

                {/* Bar */}
                <div className="flex-1 max-w-xs">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0
                          ? "bg-linear-to-r from-red-500 to-pink-600"
                          : index === 1
                          ? "bg-linear-to-r from-orange-500 to-red-500"
                          : index === 2
                          ? "bg-linear-to-r from-amber-500 to-orange-500"
                          : "bg-linear-to-r from-sky-500 to-blue-600"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Count - safe formatting */}
                <div className="w-16 text-right">
                  <p className="font-semibold text-gray-900">
                    {city.customers?.toLocaleString("en-IN") ?? "0"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
