// src/components/products/SmartProductForm.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "./StepProgress";
import StepBasicInfo from "./StepBasicInfo";
import StepPricing from "./StepPricing";
import StepImages from "./StepImages";
import StepAdvancedFeatures from "./StepAdvancedFeatures";
import StepFinish from "./StepFinish";
import { useProductFormStore } from "@/store/useProductFormStore";

type Props = {
  onSubmit: (data: FormData) => Promise<void>;
  loading?: boolean;
};

export default function SmartProductForm({ onSubmit, loading = false }: Props) {
  const [step, setStep] = useState(0);
  const store = useProductFormStore();
  const { reset } = store;

  const buildFormData = (): FormData => {
    const fd = new FormData();
    fd.append("name", store.name);
    fd.append("description", store.description || "");
    fd.append("category", store.category);
    fd.append("price", store.price);
    fd.append("costPrice", store.costPrice || "");
    fd.append("discountPrice", store.discountPrice || "0");
    fd.append("stock", store.stock);
    fd.append("highlights", JSON.stringify(store.highlights.filter(Boolean)));
    fd.append("offers", JSON.stringify(store.offers.filter(Boolean)));

    const specs = store.specifications
      .filter((s) => s.key.trim() && s.value.trim())
      .reduce((acc, s) => ({ ...acc, [s.key.trim()]: s.value.trim() }), {});
    fd.append("specifications", JSON.stringify(specs));

    store.imageFiles.forEach((f) => fd.append("images", f));
    if (store.imageFiles.length === 0 && store.imagePreviews.length === 0) {
      fd.append(
        "imageUrl",
        "https://via.placeholder.com/600x600.png?text=No+Image"
      );
    }

    return fd;
  };

  const handleSubmit = async () => {
    await onSubmit(buildFormData());
    reset(); // Clear all fields after success
    setStep(0); // Optional: go back to start
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <StepProgress currentStep={step} totalSteps={5} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {step === 0 && <StepBasicInfo onNext={() => setStep(1)} />}
          {step === 1 && (
            <StepPricing onNext={() => setStep(2)} onBack={() => setStep(0)} />
          )}
          {step === 2 && (
            <StepImages onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <StepAdvancedFeatures
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <StepFinish
              onSubmit={handleSubmit}
              loading={loading}
              onBack={() => setStep(3)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
