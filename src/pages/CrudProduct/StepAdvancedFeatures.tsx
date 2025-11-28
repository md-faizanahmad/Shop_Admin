// src/components/products/StepAdvancedFeatures.tsx
import { useProductFormStore } from "@/store/useProductFormStore";
import ProductHighlights from "./ProductHighlights";
import ProductOffers from "./ProductOffers";
import ProductSpecifications from "./ProductSpecifications";
import { Sparkles } from "lucide-react";
import StepWrapper from "@/shared/StepWrapper";
import BackButton from "@/shared/BackButton";
import NextButton from "@/shared/NextButton";

export default function StepAdvancedFeatures({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { highlights, offers, specifications, setField } =
    useProductFormStore();

  return (
    <StepWrapper
      title="Make it irresistible"
      icon={<Sparkles className="w-8 h-8 text-yellow-500" />}
    >
      <div className="space-y-8">
        <ProductHighlights
          highlights={highlights}
          setHighlights={(v) => setField("highlights", v)}
        />
        <ProductOffers
          offers={offers}
          setOffers={(v) => setField("offers", v)}
        />
        <ProductSpecifications
          specifications={specifications}
          setSpecifications={(v) => setField("specifications", v)}
        />
      </div>

      <div className="flex gap-4 mt-10">
        <BackButton onClick={onBack} />
        <NextButton onClick={onNext} label="Review & Publish" />
      </div>
    </StepWrapper>
  );
}
