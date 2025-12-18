// // src/stores/useProductFormStore.ts
// import { create } from "zustand";

// export type ProductFormState = {
//   name: string;
//   description: string;
//   category: string;
//   subcategory: string;
//   price: string;
//   costPrice: string;
//   discountPrice: string;
//   stock: string;
//   highlights: string[];
//   offers: string[];
//   specifications: { key: string; value: string }[];
//   imageFiles: File[];
//   imagePreviews: string[];
// };

// type Actions = {
//   setField: <K extends keyof ProductFormState>(
//     field: K,
//     value: ProductFormState[K]
//   ) => void;
//   reset: () => void;
// };

// const initialState: ProductFormState = {
//   name: "",
//   description: "",
//   category: "",
//   subcategory: "",
//   price: "",
//   costPrice: "",
//   discountPrice: "",
//   stock: "",
//   highlights: [""],
//   offers: [""],
//   specifications: [{ key: "", value: "" }],
//   imageFiles: [],
//   imagePreviews: [],
// };

// export const useProductFormStore = create<ProductFormState & Actions>(
//   (set) => ({
//     ...initialState,
//     setField: (field, value) => set({ [field]: value }),
//     reset: () => set(initialState),
//   })
// );

import { create } from "zustand";

export type SpecificationItem = { key: string; value: string };

export type ProductFormState = {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: string;
  costPrice: string;
  discountPrice: string;
  stock: string;
  highlights: string[];
  offers: string[];
  specifications: SpecificationItem[];
  imageFiles: File[];
  imagePreviews: string[]; // existing image URLs or previews
};

/** API shape for a product returned by server */
export interface APIProduct {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  costPrice?: number;
  discountPrice?: number;
  stock?: number;
  category?: { _id: string; name?: string } | string;
  subcategory?: { _id: string; name?: string } | string;
  highlights?: string[];
  offers?: string[];
  // server may return specifications as object map or as array
  specifications?:
    | Record<string, string>
    | Array<{ key: string; value: string }>;
  images?: Array<string | { url: string; publicId?: string }>;

  imageUrl?: string;
  imagePreviews?: string[]; // unlikely from server, but support it
}

type Actions = {
  setField: <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) => void;
  init: (initial: Partial<ProductFormState> | APIProduct) => void;
  reset: () => void;
};

const initialState: ProductFormState = {
  name: "",
  description: "",
  category: "",
  subcategory: "",
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

    setField: (field, value) =>
      set(() => ({ [field]: value } as unknown as ProductFormState)),

    init: (initial) =>
      set(() => {
        // If initial looks like APIProduct (has numeric price or _id), convert from API shape
        const isAPIProduct =
          typeof (initial as APIProduct)._id === "string" ||
          typeof (initial as APIProduct).price === "number";

        if (isAPIProduct) {
          const p = initial as APIProduct;

          // Normalize specifications to SpecificationItem[]
          let specs: SpecificationItem[] = [{ key: "", value: "" }];
          if (Array.isArray(p.specifications)) {
            specs =
              p.specifications.length > 0
                ? (
                    p.specifications as Array<{ key: string; value: string }>
                  ).map((s) => ({
                    key: String(s.key ?? ""),
                    value: String(s.value ?? ""),
                  }))
                : [{ key: "", value: "" }];
          } else if (p.specifications && typeof p.specifications === "object") {
            specs = Object.entries(p.specifications).map(([k, v]) => ({
              key: String(k),
              value: String(v ?? ""),
            }));
            if (specs.length === 0) specs = [{ key: "", value: "" }];
          }

          // Normalize highlights and offers
          const highlights = Array.isArray(p.highlights)
            ? (p.highlights as string[])
            : p.highlights
            ? [String(p.highlights)]
            : [""];
          const offers = Array.isArray(p.offers)
            ? (p.offers as string[])
            : p.offers
            ? [String(p.offers)]
            : [""];

          // Normalize images -> imagePreviews
          let imagePreviews: string[] = [];
          if (Array.isArray(p.images) && p.images.length > 0) {
            imagePreviews = p.images.map((i) => String(i));
          } else if (p.imagePreviews && Array.isArray(p.imagePreviews)) {
            imagePreviews = p.imagePreviews.map((i) => String(i));
          } else if (p.imageUrl) {
            imagePreviews = [String(p.imageUrl)];
          } else {
            imagePreviews = [];
          }

          // Convert category/subcategory to id string if object
          const category =
            typeof p.category === "object"
              ? (p.category as { _id?: string })._id ?? ""
              : (p.category as string) ?? "";
          const subcategory =
            typeof p.subcategory === "object"
              ? (p.subcategory as { _id?: string })._id ?? ""
              : (p.subcategory as string) ?? "";

          return {
            name: p.name ?? "",
            description: p.description ?? "",
            category,
            subcategory,
            price:
              p.price !== undefined && p.price !== null ? String(p.price) : "",
            costPrice:
              p.costPrice !== undefined && p.costPrice !== null
                ? String(p.costPrice)
                : "",
            discountPrice:
              p.discountPrice !== undefined && p.discountPrice !== null
                ? String(p.discountPrice)
                : "",
            stock:
              p.stock !== undefined && p.stock !== null ? String(p.stock) : "",
            highlights,
            offers,
            specifications: specs,
            imageFiles: [],
            imagePreviews,
          } as ProductFormState;
        }

        // Otherwise assume initial is Partial<ProductFormState>
        const s = initial as Partial<ProductFormState>;
        return {
          name: s.name ?? "",
          description: s.description ?? "",
          category: s.category ?? "",
          subcategory: s.subcategory ?? "",
          price: s.price ?? "",
          costPrice: s.costPrice ?? "",
          discountPrice: s.discountPrice ?? "",
          stock: s.stock ?? "",
          highlights: s.highlights ?? [""],
          offers: s.offers ?? [""],
          specifications: s.specifications ?? [{ key: "", value: "" }],
          imageFiles: s.imageFiles ?? [],
          imagePreviews: s.imagePreviews ?? [],
        } as ProductFormState;
      }),

    reset: () => set(() => ({ ...initialState })),
  })
);
