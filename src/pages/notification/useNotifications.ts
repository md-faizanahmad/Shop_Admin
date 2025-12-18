// ALL logic (fetch, poll, mark read)
import { useEffect, useState, useCallback } from "react";
import { listNotifications, markNotificationsRead } from "@/lib/api";

export type Notification = {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
};

export function useNotifications(poll = true) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listNotifications(false);
      setNotifications(res.notifications || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const markRead = async (ids: string[]) => {
    if (!ids.length) return;
    await markNotificationsRead(ids);
    setNotifications((prev) =>
      prev.map((n) => (ids.includes(n._id) ? { ...n, read: true } : n))
    );
  };

  const unread = notifications.filter((n) => !n.read);

  useEffect(() => {
    fetchAll();
    if (!poll) return;

    const id = setInterval(fetchAll, 30000);
    return () => clearInterval(id);
  }, [fetchAll, poll]);

  return {
    notifications,
    unread,
    unreadCount: unread.length,
    loading,
    fetchAll,
    markRead,
  };
}
