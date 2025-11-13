// types/order.ts (create this file and import where needed)
export type OrderItem = {
  productId: string; // store the product id
  productName?: string; // optional denormalized name (if you store it)
  quantity: number;
  price: number; // price at order time
};

export type Order = {
  _id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "shipping" | "delivered" | "cancelled";
  createdAt: string; // ISO date string
};
