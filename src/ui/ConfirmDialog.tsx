import { X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onCancel}
      />
      {/* dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold">{title}</h3>
            <button
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onCancel}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {description && (
            <p className="px-4 pt-4 text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
          <div className="px-4 py-3 flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
