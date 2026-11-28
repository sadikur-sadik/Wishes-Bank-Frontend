"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  ShieldCheck,
  AlertCircle,
  Inbox,
  Sparkles,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  NotificationItem,
} from "@/store/slices/notificationSlice";
import { getNotificationIcon, formatTimeAgo } from "./NotificationBell";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/lib/toast";

interface NotificationsViewProps {
  roleTitle?: string;
}

export function NotificationsView({
  roleTitle = "Banking Notifications",
}: NotificationsViewProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    notifications,
    unreadCount,
    total,
    page,
    limit,
    totalPages,
    isLoading,
    error,
  } = useAppSelector((state) => state.notifications);

  const [activeTab, setActiveTab] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  useEffect(() => {
    dispatch(
      fetchNotifications({
        page: currentPage,
        limit: 15,
        filter: activeTab,
      })
    );
  }, [dispatch, currentPage, activeTab]);

  const handleTabChange = (tab: "ALL" | "UNREAD" | "READ") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleMarkOne = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(markNotificationAsRead(id)).then(() => {
      showSuccess("Notification marked as read.");
    });
  };

  const handleDeleteOne = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Delete this notification?")) {
      dispatch(deleteNotification(id)).then(() => {
        showSuccess("Notification removed.");
      });
    }
  };

  const handleItemClick = (item: NotificationItem) => {
    if (!item.isRead) {
      dispatch(markNotificationAsRead(item.id || item.notificationId));
    }
    if (item.link) {
      router.push(item.link);
    }
  };

  const filteredList =
    typeFilter === "ALL"
      ? notifications
      : notifications.filter((n) => n.type === typeFilter);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Activity & Alert Center</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {roleTitle}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Stay informed with real-time audit logs, transaction confirmations, and account notices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                dispatch(markAllNotificationsAsRead()).then(() => {
                  showSuccess("All notifications marked as read.");
                });
              }}
              className="text-xs font-medium border-border hover:bg-muted"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1 text-primary" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card border border-border p-3 rounded-xl shadow-xs">
        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-lg">
          <button
            type="button"
            onClick={() => handleTabChange("ALL")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === "ALL"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("UNREAD")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === "UNREAD"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/15 text-emerald-600 font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("READ")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === "READ"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Read
          </button>
        </div>

        {/* Type Selector */}
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs rounded-lg border border-border bg-card px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ALL">All Categories</option>
            <option value="TRANSFER">Transfers</option>
            <option value="DEPOSIT">Deposits</option>
            <option value="WITHDRAWAL">Withdrawals</option>
            <option value="LOAN">Loans</option>
            <option value="ACCOUNT">Account Changes</option>
            <option value="SECURITY">Security & Compliance</option>
            <option value="STAFF_ONBOARDING">Staff Operations</option>
          </select>
        </div>
      </div>

      {/* Notification List Container */}
      <div className="bg-card border border-border rounded-2xl shadow-xs overflow-hidden">
        {isLoading && filteredList.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm font-medium text-muted-foreground">
              Retrieving banking notifications...
            </p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
              <Inbox className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No notifications found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              {activeTab === "UNREAD"
                ? "You do not have any pending unread alerts right now."
                : "There are no notifications matching your current filter criteria."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredList.map((item) => (
              <div
                key={item.id || item.notificationId}
                onClick={() => handleItemClick(item)}
                className={`p-4 sm:p-5 flex items-start gap-4 hover:bg-muted/40 cursor-pointer transition-colors ${
                  !item.isRead ? "bg-primary/[0.02]" : ""
                }`}
              >
                {/* Category Icon */}
                <div className="p-2.5 rounded-xl bg-muted shrink-0 mt-0.5 border border-border/50">
                  {getNotificationIcon(item.type)}
                </div>

                {/* Main Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted text-foreground border border-border">
                      {item.type.replace("_", " ")}
                    </span>
                    <h3
                      className={`text-sm tracking-tight ${
                        !item.isRead
                          ? "font-bold text-foreground"
                          : "font-medium text-foreground/85"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {!item.isRead && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="h-3 w-3" />
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {item.relatedTransactionId && (
                      <span className="text-[11px] font-mono text-primary/80">
                        TX: {item.relatedTransactionId}
                      </span>
                    )}

                    {item.relatedLoanId && (
                      <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400">
                        Loan: {item.relatedLoanId}
                      </span>
                    )}

                    {item.relatedAccountId && (
                      <span className="text-[11px] font-mono text-muted-foreground">
                        Account: {item.relatedAccountId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-1 shrink-0 self-center">
                  {!item.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) =>
                        handleMarkOne(e, item.id || item.notificationId)
                      }
                      title="Mark as read"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-muted"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) =>
                      handleDeleteOne(e, item.id || item.notificationId)
                    }
                    title="Delete notification"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  {item.link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Navigate to destination"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
            <span className="text-xs text-muted-foreground">
              Showing page {page} of {totalPages} ({total} total notifications)
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-8 text-xs gap-1 border-border"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-8 text-xs gap-1 border-border"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default NotificationsView;
