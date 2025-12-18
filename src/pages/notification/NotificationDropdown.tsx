// unread preview only
import type { Notification } from "./useNotifications";

type Props = {
  unread: Notification[];
  onMarkAllRead: () => void;
  onClose: () => void;
};

export default function NotificationDropdown({
  unread,
  onMarkAllRead,
  onClose,
}: Props) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 p-3">
      <div className="flex justify-between items-center mb-2">
        <strong>Notifications</strong>
        {unread.length > 0 && (
          <button className="text-sm text-blue-600" onClick={onMarkAllRead}>
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-auto">
        {unread.length === 0 ? (
          <div className="text-sm text-gray-500">No new notifications</div>
        ) : (
          unread.map((n) => (
            <a
              key={n._id}
              href={n.link}
              onClick={onClose}
              className="block p-2 border-b hover:bg-gray-50"
            >
              <div className="text-sm font-semibold">{n.title}</div>
              <div className="text-xs text-gray-600">{n.message}</div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
