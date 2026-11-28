import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: string;
  availableBalance: number;
  currency: string;
  accountStatus: string;
  openedAt: string;
  dailyTransferLimit: number;
}

export interface CustomerSummary {
  totalBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  activeLoans: number;
  totalActiveLoanBalance: number;
}

export interface ChartDataPoint {
  month: string;
  amount: number;
}

export interface DistributionPoint {
  category: string;
  count: number;
  volume: number;
}

export interface CustomerCharts {
  monthlySpending: ChartDataPoint[];
  monthlyDeposits: ChartDataPoint[];
  distribution: DistributionPoint[];
}

export interface TransferResult {
  transactionId: string;
  reference: string;
  amount: number;
  senderAccountNumber: string;
  recipientAccountNumber: string;
  newBalance: number;
  timestamp: string;
}

export interface RecentTxnItem {
  id: string;
  transactionId: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  date: string;
}

interface AccountState {
  accounts: BankAccount[];
  selectedAccount: BankAccount | null;
  summary: CustomerSummary | null;
  charts: CustomerCharts | null;
  recentTransactions: RecentTxnItem[];
  isLoading: boolean;
  isTransferring: boolean;
  transferResult: TransferResult | null;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  summary: null,
  charts: null,
  recentTransactions: [],
  isLoading: false,
  isTransferring: false,
  transferResult: null,
  error: null,
};

export const fetchCustomerOverview = createAsyncThunk(
  "account/fetchCustomerOverview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/customer/overview");
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch customer financial overview");
      }
      return data.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/customer/accounts");
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch accounts");
      }
      return data.accounts as BankAccount[];
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const transferFundsThunk = createAsyncThunk(
  "account/transferFunds",
  async (
    payload: {
      senderAccountNumber: string;
      recipientAccountNumber: string;
      amount: number;
      description?: string;
      transactionPin: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch("/api/v1/customer/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Transfer execution failed");
      }
      // Refresh accounts and overview data after successful transfer
      dispatch(fetchCustomerOverview());
      dispatch(fetchAccounts());
      return data.data as TransferResult;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    selectAccount: (state, action: PayloadAction<string>) => {
      const found = state.accounts.find((a) => a.id === action.payload || a.accountNumber === action.payload);
      if (found) {
        state.selectedAccount = found;
      }
    },
    clearTransferResult: (state) => {
      state.transferResult = null;
      state.error = null;
    },
    clearAccountError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchCustomerOverview
    builder.addCase(fetchCustomerOverview.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCustomerOverview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.summary = action.payload.summary;
      state.accounts = action.payload.accounts;
      state.charts = action.payload.charts;
      state.recentTransactions = action.payload.recentTransactions || [];
      if (!state.selectedAccount && action.payload.accounts?.length > 0) {
        state.selectedAccount = action.payload.accounts[0];
      }
    });
    builder.addCase(fetchCustomerOverview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // fetchAccounts
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
      if (!state.selectedAccount && action.payload.length > 0) {
        state.selectedAccount = action.payload[0];
      }
    });

    // transferFundsThunk
    builder.addCase(transferFundsThunk.pending, (state) => {
      state.isTransferring = true;
      state.transferResult = null;
      state.error = null;
    });
    builder.addCase(transferFundsThunk.fulfilled, (state, action) => {
      state.isTransferring = false;
      state.transferResult = action.payload;
      state.error = null;
    });
    builder.addCase(transferFundsThunk.rejected, (state, action) => {
      state.isTransferring = false;
      state.error = action.payload as string;
    });
  },
});

export const { selectAccount, clearTransferResult, clearAccountError } = accountSlice.actions;
export default accountSlice.reducer;
