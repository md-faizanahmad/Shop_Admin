//// responsive
import { useEffect, useState } from "react";
import axios from "axios";
import ProductBasicInfo from "./ProductBasicInfo";
import { Package } from "lucide-react";
import { useProductFormStore } from "@/store/useProductFormStore";
import StepWrapper from "@/shared/StepWrapper";
import NextButton from "@/shared/NextButton";
import type { Category } from "@/types/product";

export default function StepBasicInfo({ onNext }: { onNext: () => void }) {
  const { name, description, category, subcategory, setField } =
    useProductFormStore();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;

    axios
      .get(`${import.meta.env.VITE_API_URL}/v1/categories?admin=true`)
      .then((res) => {
        if (!mounted) return;
        setCategories(res.data.categories || []);
      })
      .catch(() => {
        // you can add a toast here if you want
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isValid = name.trim().length > 0 && !!category;

  return (
    <StepWrapper
      title="Start with the basics"
      icon={<Package className="w-7 h-7 sm:w-8 sm:h-8" />}
    >
      <div className="space-y-6">
        <ProductBasicInfo
          name={name}
          setName={(v) => setField("name", v)}
          description={description}
          setDescription={(v) => setField("description", v)}
          category={category}
          setCategory={(v) => setField("category", v)}
          subcategory={subcategory}
          setSubcategory={(v) => setField("subcategory", v)}
          categories={categories}
        />

        <div className="flex justify-end">
          <NextButton
            onClick={onNext}
            label="Next: Pricing & Stock"
            disabled={!isValid}
          />
        </div>
      </div>
    </StepWrapper>
  );
}
