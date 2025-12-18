// Mobile
import type { ProductBrief } from "@/types/product";
import ActionButtons from "./ActionButtons";

interface Props {
  product: ProductBrief;
  onEdit: (id: string) => void;
  onToggleStock: () => void;
  onArchive: () => void;
  onRestore: () => void;
  onPermanentDelete: () => void;
}

export default function ProductCard({ product, ...actions }: Props) {
  return (
    <div className="mt-2">
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
        <div className="p-5">
          <div className="flex gap-4">
            <img
              src={product.imageUrl}
              alt=""
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-xl">{product.name}</h3>
              {/* <p className="text-sm text-gray-600">{product.category?.name}</p> */}
              <div className="mt-1 flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-900">
                  {product.category?.name}
                </span>

                <span className="inline-block max-w-max text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {product.subcategory?.name}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-end">
                <span className="text-2xl font-bold text-blue-700">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-r from-blue-50 to-sky-50 p-5 border-t">
          <ActionButtons product={product} {...actions} />
        </div>
      </div>
    </div>
  );
}
