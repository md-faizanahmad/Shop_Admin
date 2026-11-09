// A single subcategory item, as returned in `subcategories` array
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  isDeleted: boolean;
  createdAt?: string;
  image: string | null;
  updatedAt?: string;
}

// Generic category from /v1/categories?admin=true
// Works for both main and sub categories.
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
  isSub: boolean;
  parent: string | null; // null for main, main _id for sub
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

  // Present for main categories when API returns grouped/expanded structure
  subcategories?: Subcategory[];
}

// Stricter type for places where you *know* it's a main category
// (used by ProductListPage filters, etc.)
export interface MainCategory extends Category {
  isSub: false;
  parent: null;
  subcategories: Subcategory[]; // required in grouped responses
}
