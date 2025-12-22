// src/admin/customers/components/CustomerTable.tsx
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Link } from "react-router-dom";
import type { Customer } from "@/types/customer";

type Pagination = {
  page: number;
  totalPages: number;
};

type Props = {
  data: Customer[];
  page: number;
  pagination: Pagination | null;
  onPageChange: (page: number) => void;

  sortBy: string;
  order: "asc" | "desc";
  onSort: (field: string) => void;
};

export default function CustomerTable({
  data,
  page,
  pagination,
  onPageChange,
  sortBy,
  order,
  onSort,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 6,
  });

  return (
    <div className="space-y-4">
      {/* TABLE HEADER */}
      <div className="grid grid-cols-4 gap-4 px-4 py-2 text-sm font-semibold text-gray-600 ">
        <button onClick={() => onSort("name")} className="text-left">
          Name {sortBy === "name" && (order === "asc" ? "↑" : "↓")}
        </button>

        <button onClick={() => onSort("email")} className="text-left">
          Email
        </button>

        <button onClick={() => onSort("createdAt")} className="text-left">
          Joined {sortBy === "createdAt" && (order === "asc" ? "↑" : "↓")}
        </button>

        <div className="text-right">Orders</div>
      </div>

      {/* VIRTUALIZED BODY */}
      <div
        ref={parentRef}
        className="relative h-[520px] overflow-auto  rounded-lg"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const customer = data[virtualRow.index];
            if (!customer) return null;

            return (
              <div
                key={customer._id}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                className="absolute left-0 right-0 grid grid-cols-4 gap-4 px-4 py-3 border-b bg-white hover:bg-gray-50"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {/* NAME */}
                <div className="font-medium text-blue-600 truncate">
                  <Link
                    to={`/dashboard/customers/${customer._id}`}
                    className="hover:underline"
                  >
                    {customer.name}
                  </Link>
                </div>

                {/* EMAIL */}
                <div className="truncate text-gray-700">{customer.email}</div>

                {/* CREATED */}
                <div className="text-gray-500 text-sm">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </div>

                {/* ORDERS */}
                <div className="text-right font-medium">
                  {customer.ordersCount ?? 0}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAGINATION */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-between items-center text-sm">
          <span>
            Page {page} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
