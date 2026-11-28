import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AdminStats {
  totalCustomers: number;
  totalAccounts: number;
  totalBankBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalTransactions: number;
  pendingLoans: number;
  pendingStaff: number;
  flaggedTransactionsCount: number;
}

export interface AdminRecentActivityItem {
  recentTransactions: {
    id: string;
    transactionId: string;
    accountNumber: string;
    type: string;
    amount: number;
    status: string;
    date: string;
  }[];
  recentCustomers: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    accountStatus: string;
    createdAt: string;
  }[];
  pendingStaff: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    accountStatus: string;
    createdAt: string;
  }[];
  pendingLoans: {
    id: string;
    loanId: string;
    customerName: string;
    loanType: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
}

export interface AdminCustomerItem {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  accountStatus: string;
  accountCount: number;
  totalBalance: number;
  createdAt: string;
}

export interface AdminAccountItem {
  id: string;
  accountNumber: string;
  customerName: string;
  userId: string;
  accountType: string;
  availableBalance: number;
  accountStatus: string;
  dailyTransferLimit: number;
  openedAt: string;
}

export interface AdminStaffItem {
  id: string;
  fullName: string;
  email: string;
  role: string;
  accountStatus: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface AdminTransactionItem {
  id: string;
  transactionId: string;
  userId: string;
  accountNumber: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  description: string;
  reference?: string;
  isFlagged?: boolean;
  flagReason?: string;
  flaggedAt?: string;
  date: string;
}

export interface AdminFlaggedItem {
  id: string;
  transactionId: string;
  staffEmail: string;
  reason: string;
  status: string;
  flaggedAt: string;
  adminNotes?: string;
  resolvedAt?: string;
}

export interface AdminLoanSchedule {
  installmentNumber: number;
  dueDate: string;
  amount: number;
  status: string;
}

export interface AdminInternalNote {
  id: string;
  content: string;
  staffName: string;
  staffEmail: string;
  createdAt: string;
}

export interface AdminLoanItem {
  id: string;
  loanId: string;
  customerName: string;
  userId: string;
  loanType: string;
  amount: number;
  durationMonths: number;
  monthlyIncome: number;
  employmentStatus: string;
  description: string;
  status: string;
  interestRate: number;
  remainingBalance?: number;
  monthlyInstallment?: number;
  repaymentSchedule: AdminLoanSchedule[];
  internalNotes: AdminInternalNote[];
  forwardedToAdmin: boolean;
  adminDecisionNote?: string;
  disbursedAt?: string;
  createdAt: string;
}

export interface AdminAnalyticsData {
  monthlyTransactionVolume: {
    month: string;
    depositAmount: number;
    withdrawalAmount: number;
    transferAmount: number;
    totalVolume: number;
  }[];
  depositVsWithdrawal: {
    totalDeposited: number;
    totalWithdrawn: number;
    netCashflow: number;
  };
  accountDistribution: {
    type: string;
    count: number;
    totalBalance: number;
  }[];
  loanApprovalStats: {
    status: string;
    count: number;
    totalAmount: number;
  }[];
  monthlyBankingActivity: {
    month: string;
    newCustomers: number;
    transactionsCount: number;
    loansRequested: number;
  }[];
}

interface AdminState {
  stats: AdminStats | null;
  recentActivity: AdminRecentActivityItem | null;
  customers: AdminCustomerItem[];
  customersTotal: number;
  accounts: AdminAccountItem[];
  accountsTotal: number;
  staff: AdminStaffItem[];
  transactions: AdminTransactionItem[];
  transactionsTotal: number;
  flaggedTransactions: AdminFlaggedItem[];
  loans: AdminLoanItem[];
  loansTotal: number;
  analytics: AdminAnalyticsData | null;
  isLoading: boolean;
  actionLoading: boolean;
  actionSuccessMessage: string | null;
  error: string | null;
}

const initialState: AdminState = {
  stats: null,
  recentActivity: null,
  customers: [],
  customersTotal: 0,
  accounts: [],
  accountsTotal: 0,
  staff: [],
  transactions: [],
  transactionsTotal: 0,
  flaggedTransactions: [],
  loans: [],
  loansTotal: 0,
  analytics: null,
  isLoading: false,
  actionLoading: false,
  actionSuccessMessage: null,
  error: null,
};

// =================== ASYNC THUNKS ===================

export const fetchAdminOverview = createAsyncThunk(
  "admin/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/admin/overview");
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load overview");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchAdminCustomers = createAsyncThunk(
  "admin/fetchCustomers",
  async (
    filters: { search?: string; status?: string; page?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const p = new URLSearchParams();
      if (filters?.search) p.append("search", filters.search);
      if (filters?.status && filters.status !== "ALL") p.append("status", filters.status);
      if (filters?.page) p.append("page", filters.page.toString());
      p.append("limit", "10");

      const res = await fetch(`/api/v1/admin/customers?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load customers");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const updateCustomerStatusThunk = createAsyncThunk(
  "admin/updateCustomerStatus",
  async (
    payload: { id: string; status: string; reason?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/admin/customers/${payload.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: payload.status, reason: payload.reason }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update status");
      dispatch(fetchAdminCustomers());
      dispatch(fetchAdminOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchAdminAccounts = createAsyncThunk(
  "admin/fetchAccounts",
  async (
    filters: { search?: string; type?: string; status?: string; page?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const p = new URLSearchParams();
      if (filters?.search) p.append("search", filters.search);
      if (filters?.type && filters.type !== "ALL") p.append("type", filters.type);
      if (filters?.status && filters.status !== "ALL") p.append("status", filters.status);
      if (filters?.page) p.append("page", filters.page.toString());
      p.append("limit", "10");

      const res = await fetch(`/api/v1/admin/accounts?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load accounts");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const createAdminAccountThunk = createAsyncThunk(
  "admin/createAccount",
  async (
    payload: { userId: string; accountType: string; initialDeposit?: number; dailyTransferLimit?: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch("/api/v1/admin/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to create account");
      dispatch(fetchAdminAccounts());
      dispatch(fetchAdminOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const updateAccountStatusThunk = createAsyncThunk(
  "admin/updateAccountStatus",
  async (
    payload: { id: string; status: string; reason?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/admin/accounts/${payload.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: payload.status, reason: payload.reason }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update account status");
      dispatch(fetchAdminAccounts());
      dispatch(fetchAdminOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const updateAccountLimitThunk = createAsyncThunk(
  "admin/updateAccountLimit",
  async (
    payload: { id: string; dailyTransferLimit: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/admin/accounts/${payload.id}/limit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyTransferLimit: payload.dailyTransferLimit }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update limit");
      dispatch(fetchAdminAccounts());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchAdminStaff = createAsyncThunk(
  "admin/fetchStaff",
  async (filters: { status?: string; search?: string } | undefined, { rejectWithValue }) => {
    try {
      const p = new URLSearchParams();
      if (filters?.status && filters.status !== "ALL") p.append("status", filters.status);
      if (filters?.search) p.append("search", filters.search);

      const res = await fetch(`/api/v1/admin/staff?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load staff list");
      return data.staff;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const updateStaffStatusThunk = createAsyncThunk(
  "admin/updateStaffStatus",
  async (
    payload: { id: string; status: string; reason?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/admin/staff/${payload.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: payload.status, reason: payload.reason }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update staff status");
      dispatch(fetchAdminStaff());
      dispatch(fetchAdminOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchAdminTransactions = createAsyncThunk(
  "admin/fetchTransactions",
  async (
    filters: { search?: string; accountNumber?: string; type?: string; status?: string; startDate?: string; endDate?: string; page?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const p = new URLSearchParams();
      if (filters?.search) p.append("search", filters.search);
      if (filters?.accountNumber) p.append("accountNumber", filters.accountNumber);
      if (filters?.type && filters.type !== "ALL") p.append("type", filters.type);
      if (filters?.status && filters.status !== "ALL") p.append("status", filters.status);
      if (filters?.startDate) p.append("startDate", filters.startDate);
      if (filters?.endDate) p.append("endDate", filters.endDate);
      if (filters?.page) p.append("page", filters.page.toString());
      p.append("limit", "10");

      const res = await fetch(`/api/v1/admin/transactions?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load transactions");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchFlaggedTransactions = createAsyncThunk(
  "admin/fetchFlaggedTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/admin/transactions/flagged");
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load flagged transactions");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const resolveFlaggedTransactionThunk = createAsyncThunk(
  "admin/resolveFlaggedTransaction",
  async (
    payload: { id: string; outcome: string; adminNotes?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/admin/transactions/flagged/${payload.id}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outcome: payload.outcome, adminNotes: payload.adminNotes }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to resolve flagged record");
      dispatch(fetchFlaggedTransactions());
      dispatch(fetchAdminTransactions());
      dispatch(fetchAdminOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchAdminLoans = createAsyncThunk(
  "admin/fetchLoans",
  async (
    filters: { search?: string; status?: string; type?: string; page?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const p = new URLSearchParams();
      if (filters?.search) p.append("search", filters.search);
      if (filters?.status && filters.status !== "ALL") p.append("status", filters.status);
      if (filters?.type && filters.type !== "ALL") p.append("type", filters.type);
      if (filters?.page) p.append("page", filters.page.toString());
      p.append("limit", "10");

      const res = await fetch(`/api/v1/admin/loans?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load loans");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const reviewLoanDecisionThunk = createAsyncThunk(
  "admin/reviewLoanDecision",
  async (
    payload: { id: string; action: "APPROVE" | "REJECT"; decisionNote?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/admin/loans/${payload.id}/decision`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: payload.action, decisionNote: payload.decisionNote }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Decision submission failed");
      dispatch(fetchAdminLoans());
      dispatch(fetchAdminOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const disburseLoanThunk = createAsyncThunk(
  "admin/disburseLoan",
  async (
    payload: { id: string; targetAccountNumber?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/admin/loans/${payload.id}/disburse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetAccountNumber: payload.targetAccountNumber }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Disbursement failed");
      dispatch(fetchAdminLoans());
      dispatch(fetchAdminAccounts());
      dispatch(fetchAdminOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchAdminAnalytics = createAsyncThunk(
  "admin/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/admin/analytics");
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load analytics");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

// =================== SLICE ===================

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminMessages: (state) => {
      state.actionSuccessMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Overview
    builder
      .addCase(fetchAdminOverview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
        state.recentActivity = action.payload.recentActivity;
      })
      .addCase(fetchAdminOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Customers
    builder
      .addCase(fetchAdminCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload.customers;
        state.customersTotal = action.payload.total;
      })
      .addCase(fetchAdminCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Accounts
    builder
      .addCase(fetchAdminAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload.accounts;
        state.accountsTotal = action.payload.total;
      })
      .addCase(fetchAdminAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Staff
    builder
      .addCase(fetchAdminStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.staff = action.payload;
      })
      .addCase(fetchAdminStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Transactions
    builder
      .addCase(fetchAdminTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.transactions;
        state.transactionsTotal = action.payload.total;
      })
      .addCase(fetchAdminTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Flagged Transactions
    builder
      .addCase(fetchFlaggedTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFlaggedTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flaggedTransactions = action.payload;
      })
      .addCase(fetchFlaggedTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Loans
    builder
      .addCase(fetchAdminLoans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loans = action.payload.loans;
        state.loansTotal = action.payload.total;
      })
      .addCase(fetchAdminLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Analytics
    builder
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Action Thunks (status updates, decisions, disbursements)
    const actionThunks = [
      updateCustomerStatusThunk,
      createAdminAccountThunk,
      updateAccountStatusThunk,
      updateAccountLimitThunk,
      updateStaffStatusThunk,
      resolveFlaggedTransactionThunk,
      reviewLoanDecisionThunk,
      disburseLoanThunk,
    ];

    actionThunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.actionLoading = true;
          state.actionSuccessMessage = null;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.actionLoading = false;
          state.actionSuccessMessage = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.actionLoading = false;
          state.error = action.payload as string;
        });
    });
  },
});

export const { clearAdminMessages } = adminSlice.actions;
export default adminSlice.reducer;
