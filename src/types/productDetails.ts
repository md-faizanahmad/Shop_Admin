interface Rating {
  average: number;
  count: number;
}

interface ImageObj {
  url: string;
  publicId: string;
}

interface CategoryRef {
  _id: string;
  name: string;
  slug: string;
}

interface SubcategoryRef {
  _id: string;
  name: string;
  slug: string;
}

export interface AdminProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  discountPrice: number;
  stock: number;
  category: CategoryRef;
  // backend might send populated object or just ID string
  subcategory?: SubcategoryRef | string | null;
  imageUrl: string;
  images: ImageObj[];
  highlights: string[];
  offers: string[];
  specifications: Record<string, string>;
  rating: Rating;
  slug: string;
  reviews: unknown[];
  createdAt: string;
  updatedAt: string;
}
