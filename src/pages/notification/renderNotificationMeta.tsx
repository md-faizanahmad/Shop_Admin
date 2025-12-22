import type { Notification } from "@/types/notification.types";

export function renderNotificationMeta(n: Notification) {
  const meta = n.meta;
  if (!meta) return null;

  switch (n.type) {
    case "new_order":
    case "payment_success":
      return (
        <div className="text-xs text-gray-600 mt-1 space-y-0.5">
          {meta.orderNumber && (
            <div>
              Order: <span className="font-medium">#{meta.orderId}</span>
            </div>
          )}
          {meta.amount !== undefined && <div>Amount: ₹{meta.amount}</div>}
          {meta.userName && <div>User: {meta.userName}</div>}
        </div>
      );

    case "order_status":
      return (
        <div className="text-xs text-gray-600 mt-1">
          {meta.fromStatus && meta.toStatus && (
            <>
              Status:{" "}
              <span className="font-medium">
                {meta.fromStatus} → {meta.toStatus}
              </span>
            </>
          )}
        </div>
      );

    case "low_stock":
      return (
        <div className="text-xs text-red-600 mt-1">
          {meta.stock !== undefined && meta.threshold !== undefined && (
            <>
              Stock left: {meta.stock} (limit {meta.threshold})
            </>
          )}
        </div>
      );

    case "user_signup":
      return <div className="text-xs text-gray-600 mt-1">{meta.email}</div>;

    default:
      return null;
  }
}
