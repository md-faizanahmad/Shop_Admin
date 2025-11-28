export type NotificationType =
  | "new_order"
  | "status_update"
  | "low_stock"
  | "user_signup"
  | "payment_failed";

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  link?: string;
  read: boolean;
}
