// src/components/products/NextButton.tsx
import { ArrowRight } from "lucide-react";

type Props = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

export default function NextButton({
  onClick,
  label,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-linear-to-r from-blue-600 to-sky-600 text-white shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1"
        }`}
    >
      {label}
      {!disabled && <ArrowRight className="w-6 h-6" />}
    </button>
  );
}
