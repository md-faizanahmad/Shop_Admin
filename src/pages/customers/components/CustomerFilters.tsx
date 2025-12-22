import { Search, Filter } from "lucide-react";

type RepeatFilter = "new" | "repeat" | undefined;
type PeriodFilter = "7d" | "30d" | "month" | undefined;

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  onApply: () => void;

  repeat: RepeatFilter;
  onRepeatChange: (v: RepeatFilter) => void;

  period: PeriodFilter;
  onPeriodChange: (v: PeriodFilter) => void;

  sortBy: string;
  order: "asc" | "desc";
  onSortChange: (field: string, order: "asc" | "desc") => void;

  count: number;
};

export default function CustomerFilters({
  search,
  onSearchChange,
  onApply,
  repeat,
  onRepeatChange,
  period,
  onPeriodChange,
  sortBy,
  order,
  onSortChange,
  count,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Search Bar - Full width on mobile */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onApply()}
              placeholder="Search name, email, phone..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-base"
            />
          </div>

          <button
            onClick={onApply}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filters:</span>
      </div>
      {/* Filters Row - Wrap nicely on mobile */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={repeat ?? "all"}
          onChange={(e) =>
            onRepeatChange(
              e.target.value === "all"
                ? undefined
                : (e.target.value as "new" | "repeat")
            )
          }
          className="px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="all">All customers</option>
          <option value="new">New customers</option>
          <option value="repeat">Repeat customers</option>
        </select>

        <select
          value={period ?? "all"}
          onChange={(e) =>
            onPeriodChange(
              e.target.value === "all"
                ? undefined
                : (e.target.value as "7d" | "30d" | "month")
            )
          }
          className="px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="all">All time</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="month">This month</option>
        </select>

        <select
          value={`${sortBy}:${order}`}
          onChange={(e) => {
            const [field, dir] = e.target.value.split(":");
            onSortChange(field, dir as "asc" | "desc");
          }}
          className="px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="createdAt:desc">Newest first</option>
          <option value="createdAt:asc">Oldest first</option>
          <option value="name:asc">Name A–Z</option>
          <option value="name:desc">Name Z–A</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm font-medium text-gray-600">
        Showing{" "}
        <span className="text-gray-900 font-bold">
          {count.toLocaleString()}
        </span>{" "}
        customer{count !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
