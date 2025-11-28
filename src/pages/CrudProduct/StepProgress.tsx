// src/components/products/StepProgress.tsx
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = ["Basic", "Pricing", "Photos", "Features", "Finish"];

export default function StepProgress({
  currentStep,
  totalSteps = 5,
}: {
  currentStep: number;
  totalSteps?: number;
}) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center gap-4 flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-lg
              ${
                i <= currentStep
                  ? "bg-linear-to-br from-blue-600 to-sky-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < currentStep ? <Check className="w-6 h-6" /> : i + 1}
            </div>
            <span
              className={`hidden md:block font-medium text-lg ${
                i <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-blue-600 to-sky-600"
                  initial={{ width: 0 }}
                  animate={{ width: i < currentStep ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-linear-to-r from-blue-600 to-sky-600 rounded-full shadow-lg"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
