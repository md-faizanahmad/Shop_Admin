// src/components/ui/ConfirmDialog.tsx
import { X } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import React from "react";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "success";
  autoCloseSeconds?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  autoCloseSeconds,
  onConfirm,
  onCancel,
}: Props) {
  const seconds = useCountdown(open ? autoCloseSeconds : undefined);

  React.useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && open && onCancel();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onCancel]);

  if (!open) return null;

  const colors = {
    danger: "bg-red-600 hover:bg-red-700 ring-red-500",
    warning: "bg-yellow-600 hover:bg-yellow-700 ring-yellow-500",
    success: "bg-emerald-600 hover:bg-emerald-700 ring-emerald-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{description}</p>
          {autoCloseSeconds && seconds > 0 && (
            <p className="mt-4 text-sm text-gray-500">
              Auto-closing in {seconds}s...
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3 p-6 bg-gray-50">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 rounded-xl font-medium text-white ${colors[variant]} transition hover:scale-105 active:scale-95`}
          >
            {confirmText} {autoCloseSeconds && seconds > 0 && `(${seconds}s)`}
          </button>
        </div>
      </div>
    </div>
  );
}
