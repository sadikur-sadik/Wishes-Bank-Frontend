import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface StaffStats {
  totalCustomers: number;
  totalAccounts: number;
  pendingTransactions: number;
  pendingLoans: number;
}

export interface StaffQueues {
  recentCustomers: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    accountStatus: string;
    createdAt: string;
  }[];
  recentAccounts: {
    id: string;
    accountNumber: string;
    accountType: string;
    availableBalance: number;
    accountStatus: string;
    createdAt: string;
  }[];
  pendingDeposits: {
    id: string;
    requestId: string;
    accountNumber: string;
    amount: number;
    description: string;
    requestDate: string;
  }[];
  pendingWithdrawals: {
    id: string;
    requestId: string;
    accountNumber: string;
    amount: number;
    description: string;
    requestDate: string;
  }[];
  pendingLoansList: {
    id: string;
    loanId: string;
    loanType: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
}

export interface StaffCustomer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  accountStatus: string;
  accountCount: number;
  createdAt: string;
}

export interface StaffAccountItem {
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

export interface StaffTransactionItem {
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

export interface InternalLoanNoteItem {
  id: string;
  content: string;
  staffName: string;
  staffEmail: string;
  createdAt: string;
}

export interface StaffLoanItem {
  id: string;
  loanId: string;
  customerName: string;
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
  internalNotes: InternalLoanNoteItem[];
  forwardedToAdmin: boolean;
  createdAt: string;
}

export interface StaffPendingRequest {
  id?: string;
  _id?: string;
  requestId: string;
  accountNumber: string;
  amount: number;
  description: string;
  requestDate?: string;
  createdAt?: string;
  paymentMethod?: string;
  withdrawalMethod?: string;
}

interface StaffState {
  stats: StaffStats | null;
  queues: StaffQueues | null;
  customers: StaffCustomer[];
  customersTotal: number;
  selectedCustomerDetails: StaffCustomer | null;
  accounts: StaffAccountItem[];
  accountsTotal: number;
  transactions: StaffTransactionItem[];
  transactionsTotal: number;
  pendingDeposits: StaffPendingRequest[];
  pendingWithdrawals: StaffPendingRequest[];
  loans: StaffLoanItem[];
  loansTotal: number;
  selectedLoanDetails: StaffLoanItem | null;
  isLoading: boolean;
  actionLoading: boolean;
  actionSuccessMessage: string | null;
  error: string | null;
}

const initialState: StaffState = {
  stats: null,
  queues: null,
  customers: [],
  customersTotal: 0,
  selectedCustomerDetails: null,
  accounts: [],
  accountsTotal: 0,
  transactions: [],
  transactionsTotal: 0,
  pendingDeposits: [],
  pendingWithdrawals: [],
  loans: [],
  loansTotal: 0,
  selectedLoanDetails: null,
  isLoading: false,
  actionLoading: false,
  actionSuccessMessage: null,
  error: null,
};

// Async Thunks
export const fetchStaffOverview = createAsyncThunk(
  "staff/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/staff/overview");
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load staff overview");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchStaffCustomers = createAsyncThunk(
  "staff/fetchCustomers",
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

      const res = await fetch(`/api/v1/staff/customers?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load customers");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const createStaffCustomerThunk = createAsyncThunk(
  "staff/createCustomer",
  async (
    payload: { fullName: string; email: string; password: string; phoneNumber?: string; address?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch("/api/v1/staff/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Customer registration failed");
      dispatch(fetchStaffCustomers());
      dispatch(fetchStaffOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchStaffAccounts = createAsyncThunk(
  "staff/fetchAccounts",
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

      const res = await fetch(`/api/v1/staff/accounts?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load accounts");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const createStaffAccountThunk = createAsyncThunk(
  "staff/createAccount",
  async (
    payload: { userId: string; accountType: string; initialDeposit?: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch("/api/v1/staff/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Account creation failed");
      dispatch(fetchStaffAccounts());
      dispatch(fetchStaffOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchStaffTransactions = createAsyncThunk(
  "staff/fetchTransactions",
  async (
    filters: { search?: string; type?: string; status?: string; startDate?: string; endDate?: string; page?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const p = new URLSearchParams();
      if (filters?.search) p.append("search", filters.search);
      if (filters?.type && filters.type !== "ALL") p.append("type", filters.type);
      if (filters?.status && filters.status !== "ALL") p.append("status", filters.status);
      if (filters?.startDate) p.append("startDate", filters.startDate);
      if (filters?.endDate) p.append("endDate", filters.endDate);
      if (filters?.page) p.append("page", filters.page.toString());
      p.append("limit", "10");

      const res = await fetch(`/api/v1/staff/transactions?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load transactions");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchStaffPendingRequests = createAsyncThunk(
  "staff/fetchPendingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/staff/transactions/pending");
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load pending requests");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const reviewStaffRequestThunk = createAsyncThunk(
  "staff/reviewRequest",
  async (
    payload: { type: "deposit" | "withdrawal"; id: string; action: "APPROVE" | "REJECT"; decisionNote?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/staff/transactions/requests/${payload.type}/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: payload.action, decisionNote: payload.decisionNote }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Decision review failed");
      dispatch(fetchStaffPendingRequests());
      dispatch(fetchStaffTransactions());
      dispatch(fetchStaffOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const flagSuspiciousTransactionThunk = createAsyncThunk(
  "staff/flagTransaction",
  async (
    payload: { id: string; reason: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/staff/transactions/${payload.id}/flag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: payload.reason }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Flagging failed");
      dispatch(fetchStaffTransactions());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchStaffLoans = createAsyncThunk(
  "staff/fetchLoans",
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

      const res = await fetch(`/api/v1/staff/loans?${p.toString()}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to load loan applications");
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const addStaffLoanNoteThunk = createAsyncThunk(
  "staff/addLoanNote",
  async (
    payload: { loanId: string; content: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/staff/loans/${payload.loanId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: payload.content }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to record note");
      dispatch(fetchStaffLoans());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const forwardStaffLoanThunk = createAsyncThunk(
  "staff/forwardLoan",
  async (loanId: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`/api/v1/staff/loans/${loanId}/forward`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to forward application");
      dispatch(fetchStaffLoans());
      dispatch(fetchStaffOverview());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaffMessages: (state) => {
      state.actionSuccessMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Overview
    builder.addCase(fetchStaffOverview.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchStaffOverview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stats = action.payload.stats;
      state.queues = action.payload.queues;
    });
    builder.addCase(fetchStaffOverview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Customers
    builder.addCase(fetchStaffCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.customers;
      state.customersTotal = action.payload.pagination.total;
    });

    // Accounts
    builder.addCase(fetchStaffAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload.accounts;
      state.accountsTotal = action.payload.pagination.total;
    });

    // Transactions
    builder.addCase(fetchStaffTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.transactionsTotal = action.payload.pagination.total;
    });

    builder.addCase(fetchStaffPendingRequests.fulfilled, (state, action) => {
      state.pendingDeposits = action.payload.deposits;
      state.pendingWithdrawals = action.payload.withdrawals;
    });

    // Loans
    builder.addCase(fetchStaffLoans.fulfilled, (state, action) => {
      state.loans = action.payload.loans;
      state.loansTotal = action.payload.pagination.total;
    });

    // Actions
    builder.addCase(createStaffCustomerThunk.pending, (state) => {
      state.actionLoading = true;
      state.actionSuccessMessage = null;
      state.error = null;
    });
    builder.addCase(createStaffCustomerThunk.fulfilled, (state, action) => {
      state.actionLoading = false;
      state.actionSuccessMessage = action.payload;
    });
    builder.addCase(createStaffCustomerThunk.rejected, (state, action) => {
      state.actionLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createStaffAccountThunk.pending, (state) => {
      state.actionLoading = true;
      state.actionSuccessMessage = null;
      state.error = null;
    });
    builder.addCase(createStaffAccountThunk.fulfilled, (state, action) => {
      state.actionLoading = false;
      state.actionSuccessMessage = action.payload;
    });
    builder.addCase(createStaffAccountThunk.rejected, (state, action) => {
      state.actionLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(reviewStaffRequestThunk.fulfilled, (state, action) => {
      state.actionSuccessMessage = action.payload;
    });
    builder.addCase(flagSuspiciousTransactionThunk.fulfilled, (state, action) => {
      state.actionSuccessMessage = action.payload;
    });
    builder.addCase(addStaffLoanNoteThunk.fulfilled, (state, action) => {
      state.actionSuccessMessage = action.payload;
    });
    builder.addCase(forwardStaffLoanThunk.fulfilled, (state, action) => {
      state.actionSuccessMessage = action.payload;
    });
  },
});

export const { clearStaffMessages } = staffSlice.actions;
export default staffSlice.reducer;
