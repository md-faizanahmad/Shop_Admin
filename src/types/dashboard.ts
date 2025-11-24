// src/types/dashboard.ts

export interface SummaryState {
  products: number;
  categories: number;
  orders: number;
  earnings: number;
}

export interface SimpleOrder {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: "pending" | "shipping" | "delivered" | "cancelled";
  createdAt: string;
}
