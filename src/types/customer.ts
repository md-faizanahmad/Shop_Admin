// types/customer.ts
export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
  _id: string;
}

export interface CartItem {
  product: string;
  qty: number;
  _id: string;
}

export interface WishlistItem {
  _id: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
