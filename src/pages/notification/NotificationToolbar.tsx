type Props = {
  total: number;
  selectedCount: number;
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onDeleteSelected: () => void;
  filter: string;
  setFilter: (v: string) => void;
};

export default function NotificationToolbar({
  total,
  selectedCount,
  allSelected,
  onSelectAll,
  onDeleteSelected,
  filter,
  setFilter,
}: Props) {
  return (
    <div className="border-b border-gray-200 px-5 py-1">
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Selection controls */}
        <div className="flex flex-col mt-5 mb-5 gap-3 sm:flex-row sm:items-center sm:gap-4 order-2 sm:order-1">
          <div className="flex items-center  gap-2.5">
            <input
              id="select-all"
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="h-4 w-4  rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-white transition-all duration-200 hover:border-indigo-400"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium text-gray-700 leading-5"
            >
              {selectedCount > 0
                ? `${selectedCount}/${total} selected`
                : `All (${total})`}
            </label>
          </div>

          {selectedCount > 0 && (
            <button
              onClick={onDeleteSelected}
              className="text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-white transition-all duration-200 px-2 py-1 rounded-sm hover:bg-red-50"
            >
              Delete selected
            </button>
          )}
        </div>

        {/* Smooth Custom Filter Select */}
        <div className="order-1 sm:order-2">
          <label htmlFor="filter-select" className="sr-only">
            Filter notifications
          </label>
          <div className="relative">
            <select
              id="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-indigo-500 transition-all duration-300 ease-in-out hover:border-indigo-400 hover:shadow-md cursor-pointer pr-10 h-11"
            >
              <option
                value="all"
                className="text-gray-900 bg-white cursor-pointer"
              >
                All notifications
              </option>
              <option
                value="unread"
                className="text-blue-900 bg-blue-50/80 cursor-pointer"
              >
                Unread only • {total} total
              </option>
              <option
                value="new_order"
                className="text-emerald-900 bg-emerald-50/80"
              >
                Orders • New purchases
              </option>
              <option
                value="payment_success"
                className="text-purple-900 bg-purple-50/80"
              >
                Payments • Confirmed
              </option>
              <option
                value="low_stock"
                className="text-orange-900 bg-orange-50/80"
              >
                Stock alerts • Low inventory
              </option>
              <option
                value="user_signup"
                className="text-indigo-900 bg-indigo-50/80"
              >
                User signups • New customers
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg
                className="h-4 w-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
