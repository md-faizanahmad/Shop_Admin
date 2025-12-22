import React, { useState } from "react";
import { Trash2, ChevronRight, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { renderNotificationMeta } from "./renderNotificationMeta";
import type { Notification } from "@/types/notification.types";

type Props = {
  notification: Notification;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function NotificationCard({
  notification,
  selected,
  onSelect,
  onRead,
  onDelete,
}: Props) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleCardClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent navigation when interacting with checkbox or buttons
    const target = e.target as HTMLElement;
    if (target.closest('input[type="checkbox"], button')) return;

    // Mark as read (optimistic)
    onRead(notification._id);

    // Navigate if link exists
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleCardClick(e);
      }}
      className={`group relative rounded-2xl border transition-all md:mt-5 mt-10 duration-300 cursor-pointer
        ${
          selected
            ? "ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50/60 border-indigo-300 shadow-md"
            : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
        }
        ${
          notification.read
            ? "bg-white"
            : "bg-linear-to-br from-blue-50/80 to-indigo-50/40 border-blue-200"
        }
      `}
    >
      {/* Selection overlay */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 pointer-events-none" />
      )}

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => {
                e.stopPropagation();
                onSelect(notification._id, e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
              className="h-5 w-5 rounded-lg border-2 border-gray-300 text-indigo-600
                         focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2
                         cursor-pointer transition-all"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Title + Unread */}
                <div className="flex items-center gap-2.5">
                  {!notification.read && (
                    <Circle className="h-2.5 w-2.5 fill-blue-600 text-blue-600 shrink-0" />
                  )}
                  <h2 className="font-semibold truncate text-base text-gray-900">
                    {notification.title}
                  </h2>
                  {!notification.read && (
                    <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                      NEW
                    </span>
                  )}
                </div>

                {/* Message */}
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    notification.read
                      ? "text-gray-600"
                      : "text-gray-800 font-medium"
                  }`}
                >
                  {notification.message}
                </p>

                {/* Meta */}
                <div className="mt-4">
                  {renderNotificationMeta(notification)}
                </div>

                {/* Timestamp */}
                <div className="mt-3 text-xs text-gray-500 font-medium">
                  {new Date(notification.createdAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Chevron */}
              <ChevronRight className="h-5 w-5 text-gray-400 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Delete */}
          <button
            onClick={async (e) => {
              e.stopPropagation();
              if (deleting) return;

              setDeleting(true);
              await onDelete(notification._id);
            }}
            disabled={deleting}
            className={`absolute top-4 right-4 px-3 py-2 rounded-xl text-sm font-medium
    transition-all duration-200
    ${
      deleting
        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
        : "text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100"
    }
  `}
            aria-label="Delete notification"
          >
            {deleting ? "Deleting…" : <Trash2 className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
