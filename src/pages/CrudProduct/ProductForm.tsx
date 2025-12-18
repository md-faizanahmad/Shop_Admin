// src/components/products/ProductForm.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "./StepProgress";
import StepBasicInfo from "./StepBasicInfo";
import StepPricing from "./StepPricing";
import StepImages from "./StepImages";
import StepAdvancedFeatures from "./StepAdvancedFeatures";
import StepFinish from "./StepFinish";

import { useProductFormStore } from "@/store/useProductFormStore";
import type {
  ProductFormState,
  APIProduct,
  SpecificationItem,
} from "@/store/useProductFormStore";

export type ProductFormData = ProductFormState;

type Props = {
  onSubmit: (data: FormData) => Promise<void>;
  loading?: boolean;
  initial?: Partial<ProductFormState> | APIProduct;
};

/**
 * ProductForm
 * - Initializes the product form store when `initial` prop arrives (edit mode).
 * - Builds FormData from the store and calls onSubmit.
 * - Strict TypeScript; uses canonical field names "images" & "existingImages".
 */
export default function ProductForm({
  onSubmit,
  loading = false,
  initial,
}: Props) {
  const [step, setStep] = useState<number>(0);
  const store = useProductFormStore();
  const { reset, init } = store;

  useEffect(() => {
    if (initial) init(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  // Files: canonical name "images"
  // Replace the existing buildFormData() with this exact function
  const buildFormData = (): FormData => {
    const fd = new FormData();

    // Basic fields (strings)
    fd.append("name", store.name ?? "");
    fd.append("description", store.description ?? "");
    fd.append("category", store.category ?? "");
    fd.append("subcategory", store.subcategory ?? "");
    fd.append("price", store.price ?? "");
    fd.append("costPrice", store.costPrice ?? "");
    fd.append("discountPrice", store.discountPrice ?? "");
    fd.append("stock", store.stock ?? "");

    // Arrays as JSON strings
    fd.append("highlights", JSON.stringify(store.highlights.filter(Boolean)));
    fd.append("offers", JSON.stringify(store.offers.filter(Boolean)));

    const specsObject: Record<string, string> = store.specifications
      .filter((s: SpecificationItem) => s.key.trim() && s.value.trim())
      .reduce((acc: Record<string, string>, s: SpecificationItem) => {
        acc[s.key.trim()] = s.value.trim();
        return acc;
      }, {});
    fd.append("specifications", JSON.stringify(specsObject));

    // === IMPORTANT PART ===
    // imagePreviews contains:
    // - existing images as real URLs (https://...)
    // - new uploaded images as base64 data URLs (data:image/...)
    const existingImageUrls = store.imagePreviews.filter((src) =>
      /^https?:\/\//.test(src)
    );

    // Tell backend which existing URLs to KEEP
    existingImageUrls.forEach((url) => {
      fd.append("existingImages", url);
    });

    // New files to upload
    store.imageFiles.forEach((file) => {
      fd.append("images", file, file.name);
    });

    // If absolutely nothing, send placeholder
    if (existingImageUrls.length === 0 && store.imageFiles.length === 0) {
      fd.append(
        "imageUrl",
        "https://via.placeholder.com/600x600.png?text=No+Image"
      );
    }

    return fd;
  };

  const handleSubmit = async (): Promise<void> => {
    const fd = buildFormData();
    try {
      await onSubmit(fd);
      reset();
      setStep(0);
    } catch (err) {
      // parent handles toast/errors
      console.error(err);
      return;
    }
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
            <StepAdvancedFeatures
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepImages onNext={() => setStep(4)} onBack={() => setStep(2)} />
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
