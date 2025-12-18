import { formatINR } from "@/helpers/format";
import type { Product, StockStatus } from "@/types/analytics";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const status: StockStatus = product.stockStatus;

  const isDead = status === "dead";
  const isLow = status === "low";

  const totalTiedValue = (product.costPrice ?? product.price) * product.stock;

  // Color classes
  const stockColor = isDead
    ? "text-red-600"
    : isLow
    ? "text-orange-600"
    : "text-green-600";

  // Animation classes
  const pulseClass = isDead
    ? "animate-pulse-strong"
    : isLow
    ? "animate-pulse-soft"
    : "";

  return (
    <div
      className={`bg-white rounded-xl shadow border p-4 text-center hover:shadow-lg transition ${pulseClass}`}
    >
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-20 h-20 mx-auto rounded-lg object-cover border mb-3"
      />

      {/* Product Title */}
      <p className="font-medium text-sm line-clamp-2">{product.name}</p>

      {/* Stock Count */}
      <p className={`text-2xl font-bold mt-2 ${stockColor}`}>{product.stock}</p>

      {/* Status Label */}
      <p className="text-xs text-gray-600 capitalize">
        {status === "positive" ? "in stock" : `${status} stock`}
      </p>

      {/* Tied Value for Dead Stock */}
      {isDead && (
        <p className="text-xs text-gray-500 mt-1">
          {formatINR(totalTiedValue)} tied
        </p>
      )}
    </div>
  );
}
