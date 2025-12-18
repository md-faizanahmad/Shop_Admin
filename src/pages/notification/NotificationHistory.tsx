import { useEffect, useState } from "react";
import { listNotifications, markNotificationsRead } from "@/lib/api";

type Notification = {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationHistory() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const res = await listNotifications(false);
      const sorted = (res.notifications || []).sort(
        (a: Notification, b: Notification) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotifications(sorted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function markAllRead() {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n._id);

    if (!unreadIds.length) return;

    await markNotificationsRead(unreadIds);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Notification History</h1>

        <button
          onClick={markAllRead}
          className="text-sm text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-gray-500">Loading notifications…</div>
      ) : notifications.length === 0 ? (
        <div className="text-gray-500">No notifications found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.map((n) => (
            <a
              key={n._id}
              href={n.link || "#"}
              className={`rounded-lg border p-4 transition hover:shadow-md ${
                n.read ? "bg-white" : "bg-blue-50 border-blue-200"
              }`}
            >
              {/* Title */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-sm sm:text-base">
                  {n.title}
                </h2>

                {!n.read && (
                  <span className="text-xs text-blue-600 font-medium">New</span>
                )}
              </div>

              {/* Message */}
              <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                {n.message}
              </p>

              {/* Footer */}
              <div className="mt-3 text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
