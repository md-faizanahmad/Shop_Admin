// src/components/ui/TableSkeleton.tsx
export default function TableSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse"
        >
          <div className="flex items-center gap-6">
            <div className="bg-gray-200 rounded-xl w-20 h-20" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-64" />
              <div className="h-4 bg-gray-200 rounded w-40" />
            </div>
            <div className="w-32 h-8 bg-gray-200 rounded-full" />
            <div className="w-24 h-8 bg-gray-200 rounded-full" />
            <div className="w-16 h-8 bg-gray-200 rounded-full" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-10 h-10 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
