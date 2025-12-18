import { X } from "lucide-react";

export default function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-neutral-900 p-6 rounded-xl space-y-4 shadow-2xl border border-neutral-700 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <X className="text-neutral-400 cursor-pointer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}
