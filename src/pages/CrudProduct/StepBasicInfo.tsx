// src/components/products/StepBasicInfo.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductBasicInfo from "./ProductBasicInfo";
import { Package } from "lucide-react";
import { useProductFormStore } from "@/store/useProductFormStore";
import StepWrapper from "@/shared/StepWrapper";
import NextButton from "@/shared/NextButton";

type Category = { _id: string; name: string };

export default function StepBasicInfo({ onNext }: { onNext: () => void }) {
  const { name, description, category, setField } = useProductFormStore();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => {});
  }, []);

  const isValid = name.trim() && category;

  return (
    <StepWrapper
      title="Start with the basics"
      icon={<Package className="w-8 h-8" />}
    >
      <ProductBasicInfo
        name={name}
        setName={(v) => setField("name", v)}
        description={description}
        setDescription={(v) => setField("description", v)}
        category={category}
        setCategory={(v) => setField("category", v)}
        categories={categories}
      />
      <NextButton
        onClick={onNext}
        label="Next: Pricing & Stock"
        disabled={!isValid}
      />
    </StepWrapper>
  );
}
