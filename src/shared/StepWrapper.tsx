// src/components/products/StepWrapper.tsx
import { motion } from "framer-motion";

export default function StepWrapper({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-10"
    >
      <div className="flex items-center gap-5 mb-10">
        <div className="p-4 bg-linear-to-br from-blue-500 to-sky-600 rounded-2xl shadow-xl text-white">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
