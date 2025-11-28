// src/components/products/StepImages.tsx
import { useProductFormStore } from "@/store/useProductFormStore";
import ProductImages from "./ProductImages";
import { Image as ImageIcon, Wand2 } from "lucide-react";
import StepWrapper from "@/shared/StepWrapper";
import BackButton from "@/shared/BackButton";
import NextButton from "@/shared/NextButton";

export default function StepImages({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { imageFiles, imagePreviews, setField } = useProductFormStore();

  // These match EXACTLY what ProductImages expects
  const setImageFiles = (updater: React.SetStateAction<File[]>) => {
    if (typeof updater === "function") {
      setField("imageFiles", updater(imageFiles));
    } else {
      setField("imageFiles", updater);
    }
  };

  const setImagePreviews = (updater: React.SetStateAction<string[]>) => {
    if (typeof updater === "function") {
      setField("imagePreviews", updater(imagePreviews));
    } else {
      setField("imagePreviews", updater);
    }
  };

  return (
    <StepWrapper
      title="Make it look stunning"
      icon={<ImageIcon className="w-8 h-8 text-purple-500" />}
    >
      <ProductImages
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        imagePreviews={imagePreviews}
        setImagePreviews={setImagePreviews}
      />

      {/* Lazy AI Upsell */}
      <div className="mt-10 p-8 bg-linear-to-r from-purple-50 to-pink-50 rounded-3xl border-2 border-dashed border-purple-300 text-center">
        <Wand2 className="w-16 h-16 mx-auto text-purple-600 mb-4" />
        <h3 className="text-2xl font-bold mb-3">Too lazy to take photos?</h3>
        <p className="text-gray-600 mb-6">
          Generate 8 professional images using AI — just from product name!
        </p>
        <button className="px-10 py-5 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-purple-600/40 transform hover:scale-105 transition">
          Generate with AI — Only ₹79
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <BackButton onClick={onBack} />
        <NextButton onClick={onNext} label="Review & Publish" />
      </div>
    </StepWrapper>
  );
}
