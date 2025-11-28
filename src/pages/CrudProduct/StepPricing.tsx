// src/components/products/StepPricing.tsx
import { useProductFormStore } from "@/store/useProductFormStore";
import ProductPricing from "./ProductPricing";
import { DollarSign } from "lucide-react";
import StepWrapper from "@/shared/StepWrapper";
import BackButton from "@/shared/BackButton";
import NextButton from "@/shared/NextButton";

export default function StepPricing({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { price, costPrice, discountPrice, stock, setField } =
    useProductFormStore();

  const priceNum = Number(price) || 0;
  const costNum = Number(costPrice) || 0;
  const discountNum = Number(discountPrice) || 0;

  const isValid = priceNum > 0 && Number(stock) >= 0 && discountNum < priceNum;

  return (
    <StepWrapper
      title="Set your price & profit"
      icon={<DollarSign className="w-8 h-8 text-green-500" />}
    >
      <ProductPricing
        price={price}
        setPrice={(v) => setField("price", v)}
        costPrice={costPrice}
        setCostPrice={(v) => setField("costPrice", v)}
        discountPrice={discountPrice}
        setDiscountPrice={(v) => setField("discountPrice", v)}
        stock={stock}
        setStock={(v) => setField("stock", v)}
        isDiscountInvalid={discountNum >= priceNum && discountNum > 0}
        savingsAmount={priceNum - discountNum}
        savingsPercent={
          priceNum > 0
            ? Math.round(((priceNum - discountNum) / priceNum) * 100)
            : 0
        }
        unitProfit={priceNum - costNum}
        margin={
          costNum > 0 ? Math.round(((priceNum - costNum) / costNum) * 100) : 0
        }
      />
      <div className="flex gap-4 mt-8">
        <BackButton onClick={onBack} />
        <NextButton onClick={onNext} label="Next: Photos" disabled={!isValid} />
      </div>
    </StepWrapper>
  );
}
