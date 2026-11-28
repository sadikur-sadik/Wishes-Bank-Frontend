import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface TransactionItem {
  id: string;
  transactionId: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  description: string;
  reference?: string;
  accountNumber?: string;
  senderAccount?: { accountNumber: string };
  receiverAccount?: { accountNumber: string };
  date: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TransactionFilterState {
  search: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
}

interface TransactionState {
  transactions: TransactionItem[];
  selectedTransaction: TransactionItem | null;
  pagination: PaginationMeta;
  filters: TransactionFilterState;
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  selectedTransaction: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  filters: {
    search: "",
    type: "ALL",
    status: "ALL",
    startDate: "",
    endDate: "",
    page: 1,
  },
  isLoading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (
    filters: Partial<TransactionFilterState> | undefined,
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.type && filters.type !== "ALL") params.append("type", filters.type);
      if (filters?.status && filters.status !== "ALL") params.append("status", filters.status);
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);
      if (filters?.page) params.append("page", filters.page.toString());
      params.append("limit", "10");

      const res = await fetch(`/api/v1/customer/transactions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch transactions");
      }
      return data.data as { transactions: TransactionItem[]; pagination: PaginationMeta };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  "transaction/fetchTransactionById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/customer/transactions/${id}`);
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to load transaction details");
      }
      return data.data as TransactionItem;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TransactionFilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
  },
  extraReducers: (builder) => {
    // fetchTransactions
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload.transactions;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // fetchTransactionById
    builder.addCase(fetchTransactionById.fulfilled, (state, action) => {
      state.selectedTransaction = action.payload;
    });
  },
});

export const { setFilters, resetFilters, clearSelectedTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
