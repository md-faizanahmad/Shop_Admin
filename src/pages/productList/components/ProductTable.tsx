// src/pages/products/components/ProductTable.tsx
import { useState } from "react";
import type { ProductBrief } from "@/types/product";
import ProductRow from "./ProductRowDesktop";
import ProductCard from "./ProductCardMobile";
import ConfirmDialog from "@/ui/ConfirmDialog";

type Action = "archive" | "restore" | "permanentDelete" | "toggleStock";

interface Props {
  products: ProductBrief[];
  onEdit: (id: string) => void;
  onToggleStock: (p: ProductBrief) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onToggleStock,
  onArchive,
  onRestore,
  onPermanentDelete,
}: Props) {
  const [dialog, setDialog] = useState<{
    open: boolean;
    type: Action;
    product?: ProductBrief;
  }>({ open: false, type: "archive" });

  const openDialog = (type: Action, product?: ProductBrief) =>
    setDialog({ open: true, type, product });

  const closeDialog = () =>
    setDialog((prev) => ({ ...prev, open: false, product: undefined }));

  const handleConfirm = () => {
    if (!dialog.product) return;

    switch (dialog.type) {
      case "archive":
        onArchive(dialog.product._id);
        break;
      case "restore":
        onRestore(dialog.product._id);
        break;
      case "permanentDelete":
        onPermanentDelete(dialog.product._id);
        break;
      case "toggleStock":
        onToggleStock(dialog.product);
        break;
    }

    closeDialog();
  };

  const currentProductName = dialog.product?.name ?? "this product";
  const isOutOfStock = dialog.product ? dialog.product.stock <= 0 : false;

  const title =
    dialog.type === "permanentDelete"
      ? "Delete product forever?"
      : dialog.type === "archive"
      ? "Archive product?"
      : dialog.type === "restore"
      ? "Restore product?"
      : "Change stock status?";

  const description =
    dialog.type === "permanentDelete"
      ? `This action is IRREVERSIBLE. "${currentProductName}" will be permanently deleted and cannot be recovered.`
      : dialog.type === "archive"
      ? `Are you sure you want to move "${currentProductName}" to archive? It will no longer appear in the main store but can be restored later.`
      : dialog.type === "restore"
      ? `Restore "${currentProductName}" so it appears again in the live store?`
      : `Set "${currentProductName}" as ${
          isOutOfStock ? "in stock" : "out of stock"
        }? You can change this again later.`;

  const confirmText =
    dialog.type === "permanentDelete"
      ? "Yes, delete forever"
      : dialog.type === "archive"
      ? "Yes, archive"
      : dialog.type === "restore"
      ? "Yes, restore"
      : isOutOfStock
      ? "Mark as in stock"
      : "Mark as out of stock";

  const variant =
    dialog.type === "permanentDelete"
      ? "danger"
      : dialog.type === "archive"
      ? "warning"
      : dialog.type === "restore"
      ? "success"
      : "warning";

  const autoCloseSeconds = dialog.type === "permanentDelete" ? undefined : 15;

  return (
    <>
      {/* Desktop table */}
      <div className="hidden lg:block w-full bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-linear-to-r from-blue-50 to-sky-50 text-left text-sm font-bold uppercase text-blue-800">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category / Subcategory</th>

              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-center">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <ProductRow
                key={p._id}
                product={p}
                onEdit={onEdit}
                onToggleStock={() => openDialog("toggleStock", p)}
                onArchive={() => openDialog("archive", p)}
                onRestore={() => openDialog("restore", p)}
                onPermanentDelete={() => openDialog("permanentDelete", p)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-4">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onEdit={onEdit}
            onToggleStock={() => openDialog("toggleStock", p)}
            onArchive={() => openDialog("archive", p)}
            onRestore={() => openDialog("restore", p)}
            onPermanentDelete={() => openDialog("permanentDelete", p)}
          />
        ))}
      </div>

      {/* Shared confirm dialog for all actions */}
      <ConfirmDialog
        open={dialog.open}
        title={title}
        description={description}
        confirmText={confirmText}
        variant={variant}
        autoCloseSeconds={autoCloseSeconds}
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />
    </>
  );
}
