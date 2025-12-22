import { useEffect, useState } from "react";
import {
  listNotifications,
  markNotificationsRead,
  deleteNotifications,
} from "@/lib/api";
import type { Notification } from "@/types/notification.types.ts";
import NotificationCard from "./NotificationCard";
import NotificationToolbar from "./NotificationToolbar";

export default function NotificationHistory() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    const res = await listNotifications({ unreadOnly: false });

    setNotifications(res.notifications || []);
    setLoading(false);
  }

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "all") return true;
    return n.type === filter;
  });

  const selectedIds = Object.keys(selected).filter((id) => selected[id]);

  async function markRead(id: string) {
    await markNotificationsRead([id]);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  }

  async function deleteOne(id: string) {
    await deleteNotifications([id]);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  }

  async function deleteSelected() {
    await deleteNotifications(selectedIds);
    setNotifications((prev) =>
      prev.filter((n) => !selectedIds.includes(n._id))
    );
    setSelected({});
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notification History</h1>

      <NotificationToolbar
        total={filtered.length}
        selectedCount={selectedIds.length}
        allSelected={
          filtered.length > 0 && filtered.every((n) => selected[n._id])
        }
        onSelectAll={(checked) => {
          const map: Record<string, boolean> = {};
          filtered.forEach((n) => (map[n._id] = checked));
          setSelected(map);
        }}
        onDeleteSelected={deleteSelected}
        filter={filter}
        setFilter={setFilter}
      />

      {loading ? (
        <div className="mt-10 text-2xl text-center">Loading...</div>
      ) : filtered.length === 0 ? (
        <div>No notifications</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((n) => (
            <NotificationCard
              key={n._id}
              notification={n}
              selected={!!selected[n._id]}
              onSelect={(id, checked) =>
                setSelected((p) => ({ ...p, [id]: checked }))
              }
              onRead={markRead}
              onDelete={deleteOne}
            />
          ))}
        </div>
      )}
    </div>
  );
}
