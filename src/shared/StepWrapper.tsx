// src/components/products/StepWrapper.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StepWrapperProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function StepWrapper({
  title,
  icon,
  children,
}: StepWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10"
    >
      <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div className="p-3 sm:p-4 bg-linear-to-br from-blue-500 to-sky-600 rounded-2xl shadow-xl text-white flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}
