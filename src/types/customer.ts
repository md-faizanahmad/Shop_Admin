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
  ordersCount: number;
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
// src/admin/customers/types/customerStats.ts
export interface CustomerStats {
  totalCustomers: number;
  newThisMonth: number;
  returning: number;
  repeatRate: number;
  aov: number;
  clv: number;
  topCustomers: {
    _id: string;
    name: string;
    orders: number;
    spent: number;
    lastOrder: string;
  }[];
  cityData: {
    city: string;
    customers: number;
  }[];
}
export type PeriodFilter = "7d" | "30d" | "month" | undefined;
export type RepeatFilter = "new" | "repeat" | undefined;
