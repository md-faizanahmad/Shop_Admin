// src/components/ui/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  loading,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || loading}
        className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" /> Previous
      </button>

      <span className="px-8 py-3 bg-linear-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold shadow-lg">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || loading}
        className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium shadow-sm"
      >
        Next <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
