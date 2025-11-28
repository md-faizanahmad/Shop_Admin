import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
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

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetch() {
    try {
      const data = await listNotifications(true); // unread only for badge
      setNotifications(data.notifications || []);
    } catch (err) {
      console.log(err);
      /* ignore */
    }
  }

  async function markAllRead() {
    try {
      const ids = notifications.map((n) => n._id);
      await markNotificationsRead(ids);
      setNotifications([]);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((s) => !s)} className="relative p-2">
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 p-3">
          <div className="flex justify-between items-center mb-2">
            <strong>Notifications</strong>
            <button className="text-sm text-blue-600" onClick={markAllRead}>
              Mark all read
            </button>
          </div>

          <div className="max-h-80 overflow-auto">
            {notifications.length === 0 ? (
              <div className="text-sm text-gray-500">No new notifications</div>
            ) : (
              notifications.map((n) => (
                <a
                  key={n._id}
                  href={n.link || "#"}
                  className="block p-2 border-b hover:bg-gray-50"
                >
                  <div className="text-sm font-semibold">{n.title}</div>
                  <div className="text-xs text-gray-600">{n.message}</div>
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
