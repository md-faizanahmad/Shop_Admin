// export interface ProductInOrder {
//   _id: string;
//   name: string;
//   imageUrl: string;
// }

// export interface OrderItem {
//   product: ProductInOrder;
//   qty: number;
//   price: number;
// }

// export interface PaymentInfo {
//   orderId: string;
//   paymentId: string;
// }

// export type OrderStatus =
//   | "placed"
//   | "processing"
//   | "shipping"
//   | "delivered"
//   | "cancelled";

// export interface Order {
//   _id: string;
//   user: string; // userId
//   userName: string; // populated for admin UI
//   userEmail?: string; // optional
//   items: OrderItem[];
//   totalAmount: number;
//   status: OrderStatus;
//   paymentStatus: "Paid" | "Unpaid";
//   paymentInfo: PaymentInfo;
//   createdAt: string;
//   updatedAt: string;
// }
// src/types/order.ts

export interface ProductInOrder {
  _id: string;
  name: string;
  imageUrl: string;
}

export interface OrderItem {
  product: ProductInOrder;
  qty: number;
  price: number;
}

export interface PaymentInfo {
  orderId: string;
  paymentId: string;
}

export type OrderStatus =
  | "placed"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface Order {
  _id: string;
  user: string;
  userName: string;
  userEmail?: string;

  items: OrderItem[];
  totalAmount: number;

  status: OrderStatus;
  paymentStatus: "Paid" | "Unpaid";

  paymentInfo: PaymentInfo;

  createdAt: string;
  updatedAt: string;
}
