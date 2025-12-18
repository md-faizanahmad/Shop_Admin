// // src/types/product.ts
// export interface Subcategory {
//   _id: string;
//   name: string;
//   slug: string;
//   isDeleted: boolean;
// }

// export interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   image: string | null;
//   isSub: boolean;
//   parent: string | null;
//   isDeleted: boolean;
//   deletedAt: string | null;
//   createdAt: string;
//   updatedAt: string;
//   subcategories?: Subcategory[];
// }

// export interface ProductBrief {
//   _id: string;
//   name: string;
//   description?: string;
//   price: number;
//   stock: number;
//   imageUrl: string;
//   images: { url: string; publicId: string }[];
//   slug: string;
//   isArchived?: boolean;
//   archivedAt?: string | null;
//   isDeleted: boolean;
//   deletedAt: string | null;
//   category: {
//     _id: string;
//     name: string;
//     slug: string;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

/// update with sub-c
// src/types/product.ts

// Used inside category tree / getCategories
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  isDeleted: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
  isSub: boolean;
  parent: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  subcategories?: Subcategory[];
}

// Small ref used on Product docs: category + subcategory
export interface CategoryRef {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductBrief {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl: string;
  images: { url: string; publicId: string }[];
  slug: string;

  isArchived?: boolean;
  archivedAt?: string | null;
  isDeleted: boolean;
  deletedAt: string | null;

  category: CategoryRef; // ✅ main category
  subcategory?: CategoryRef; // ✅ add this

  createdAt: string;
  updatedAt: string;
}
