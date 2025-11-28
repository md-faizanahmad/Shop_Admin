// src/stores/useProductFormStore.ts
import { create } from "zustand";

export type ProductFormState = {
  name: string;
  description: string;
  category: string;
  price: string;
  costPrice: string;
  discountPrice: string;
  stock: string;
  highlights: string[];
  offers: string[];
  specifications: { key: string; value: string }[];
  imageFiles: File[];
  imagePreviews: string[];
};

type Actions = {
  setField: <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) => void;
  reset: () => void;
};

const initialState: ProductFormState = {
  name: "",
  description: "",
  category: "",
  price: "",
  costPrice: "",
  discountPrice: "",
  stock: "",
  highlights: [""],
  offers: [""],
  specifications: [{ key: "", value: "" }],
  imageFiles: [],
  imagePreviews: [],
};

export const useProductFormStore = create<ProductFormState & Actions>(
  (set) => ({
    ...initialState,
    setField: (field, value) => set({ [field]: value }),
    reset: () => set(initialState),
  })
);
