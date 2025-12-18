// src/components/products/StepImages.tsx
import { useProductFormStore } from "@/store/useProductFormStore";
import ProductImages from "./ProductImages";
import { Image as ImageIcon } from "lucide-react";
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
    useProductFormStore.setState((state) => ({
      imageFiles:
        typeof updater === "function" ? updater(state.imageFiles) : updater,
    }));
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

      <div className="flex gap-4 mt-8">
        <BackButton onClick={onBack} />
        <NextButton onClick={onNext} label="Review & Publish" />
      </div>
    </StepWrapper>
  );
}
