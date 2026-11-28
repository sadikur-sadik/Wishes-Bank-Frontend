"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  CheckCheck,
  ArrowLeftRight,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  ShieldAlert,
  UserPlus,
  Info,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  NotificationItem,
} from "@/store/slices/notificationSlice";
import { showSuccess } from "@/lib/toast";

interface NotificationBellProps {
  role?: string;
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export function getNotificationIcon(type: string) {
  switch (type) {
    case "TRANSFER":
      return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
    case "DEPOSIT":
      return <ArrowDownLeft className="h-4 w-4 text-emerald-500" />;
    case "WITHDRAWAL":
      return <ArrowUpRight className="h-4 w-4 text-amber-500" />;
    case "LOAN":
      return <Landmark className="h-4 w-4 text-purple-500" />;
    case "ACCOUNT":
    case "SECURITY":
      return <ShieldAlert className="h-4 w-4 text-rose-500" />;
    case "STAFF_ONBOARDING":
      return <UserPlus className="h-4 w-4 text-cyan-500" />;
    default:
      return <Info className="h-4 w-4 text-primary" />;
  }
}

export function NotificationBell({ role = "CUSTOMER" }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { notifications, unreadCount, isLoading } = useAppSelector(
    (state) => state.notifications
  );

  const notificationsUrl = `/dashboard/${role.toLowerCase()}/notifications`;

  // Initial fetch and 30s polling
  useEffect(() => {
    dispatch(fetchUnreadCount());
    const interval = setInterval(() => {
      dispatch(fetchUnreadCount());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // When opening dropdown, fetch recent notifications
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications({ page: 1, limit: 6, filter: "ALL" }));
    }
  }, [isOpen, dispatch]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAsRead = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(markNotificationAsRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsAsRead()).then(() => {
      showSuccess("All notifications marked as read.");
    });
  };

  const handleItemClick = (item: NotificationItem) => {
    if (!item.isRead) {
      dispatch(markNotificationAsRead(item.id || item.notificationId));
    }
    setIsOpen(false);
    if (item.link) {
      router.push(item.link);
    } else {
      router.push(notificationsUrl);
    }
  };

  const recentNotifications = notifications.slice(0, 6);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Open Notifications"
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-xs animate-in zoom-in-50">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-card border border-border shadow-xl z-50 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {unreadCount} unread
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Body List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-border/50">
            {isLoading && recentNotifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Loading notifications...
              </div>
            ) : recentNotifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Bell className="h-5 w-5 text-muted-foreground/60" />
                </div>
                <p className="text-xs font-semibold text-foreground">No notifications yet</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  You are all caught up with your banking activities!
                </p>
              </div>
            ) : (
              recentNotifications.map((item) => (
                <div
                  key={item.id || item.notificationId}
                  onClick={() => handleItemClick(item)}
                  className={`group relative flex items-start gap-3 p-3.5 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !item.isRead ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  {/* Type Icon */}
                  <div className="mt-0.5 shrink-0 rounded-lg p-2 bg-muted/70 group-hover:bg-muted transition-colors">
                    {getNotificationIcon(item.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4
                        className={`text-xs truncate ${
                          !item.isRead
                            ? "font-bold text-foreground"
                            : "font-medium text-foreground/90"
                        }`}
                      >
                        {item.title}
                      </h4>
                      {!item.isRead && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground/80">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{formatTimeAgo(item.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions: Mark read indicator */}
                  {!item.isRead && (
                    <button
                      type="button"
                      onClick={(e) =>
                        handleMarkAsRead(e, item.id || item.notificationId)
                      }
                      title="Mark as read"
                      className="absolute right-3 top-3.5 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-muted opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-border bg-muted/30 text-center">
            <Link
              href={notificationsUrl}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              View all notifications
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default NotificationBell;
