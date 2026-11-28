import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationItem {
  id: string;
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  relatedTransactionId?: string;
  relatedLoanId?: string;
  relatedAccountId?: string;
  createdAt: string;
  updatedAt?: string;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1,
  isLoading: false,
  isUpdating: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (
    params: { page?: number; limit?: number; filter?: "ALL" | "UNREAD" | "READ" } = {},
    { rejectWithValue }
  ) => {
    try {
      const page = params.page || 1;
      const limit = params.limit || 20;
      const filter = params.filter || "ALL";

      const res = await fetch(
        `/api/v1/notifications?page=${page}&limit=${limit}&filter=${filter}`
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to fetch notifications");
      }
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Network error"
      );
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/notifications/unread-count");
      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to fetch unread count");
      }
      return data.data.unreadCount as number;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Network error"
      );
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/notifications/${id}/read`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to mark as read");
      }
      return { id };
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Network error"
      );
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllNotificationsAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/notifications/read-all", {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to mark all as read");
      }
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Network error"
      );
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/notifications/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to delete notification");
      }
      return { id };
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Network error"
      );
    }
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchNotifications
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to fetch notifications";
      });

    // fetchUnreadCount
    builder
      .addCase(fetchUnreadCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.unreadCount = action.payload;
      });

    // markNotificationAsRead
    builder
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const item = state.notifications.find(
          (n) => n.id === action.payload.id || n.notificationId === action.payload.id
        );
        if (item && !item.isRead) {
          item.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      });

    // markAllNotificationsAsRead
    builder
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => {
          n.isRead = true;
        });
        state.unreadCount = 0;
      });

    // deleteNotification
    builder
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n.id === action.payload.id || n.notificationId === action.payload.id
        );
        if (index !== -1) {
          if (!state.notifications[index].isRead) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          state.notifications.splice(index, 1);
          state.total = Math.max(0, state.total - 1);
        }
      });
  },
});

export const { clearNotificationError } = notificationSlice.actions;
export default notificationSlice.reducer;
