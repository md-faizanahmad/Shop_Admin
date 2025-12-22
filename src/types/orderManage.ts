export interface UserInOrder {
  _id: string;
  name: string;
  email: string;
}

export interface ProductInOrder {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  thumbnail?: string;
  isOutOfStock?: boolean;
  stockStatus?: string;
}

export interface OrderItem {
  product: ProductInOrder;
  qty: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface PaymentInfo {
  orderId: string;
  paymentId: string;
  signature?: string;
}

export type OrderStatus =
  | "placed"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface Order {
  _id: string;

  user: UserInOrder;

  items: OrderItem[];
  totalAmount: number;

  status: OrderStatus;
  paymentStatus: "Paid" | "Unpaid";

  paymentInfo: PaymentInfo;
  shippingAddress: ShippingAddress;

  stockAdjusted: boolean;

  createdAt: string;
  updatedAt: string;
}
