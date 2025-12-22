export type NotificationMeta = {
  email: string;
  // order-related
  orderId?: string;
  orderNumber?: string;
  amount?: number;
  paymentMethod?: string;
  paymentGateway?: string;
  paymentId?: string;
  fromStatus?: string;
  toStatus?: string;

  // user-related
  userId?: string;
  userName?: string;
  userEmail?: string;
  provider?: string;

  // product-related
  productId?: string;
  productName?: string;
  stock?: number;
  threshold?: number;
};

export type Notification = {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  meta?: NotificationMeta; // ✅ ADD THIS
};
