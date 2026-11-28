import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface DepositRequestItem {
  id: string;
  requestId: string;
  accountNumber: string;
  amount: number;
  description: string;
  status: string;
  requestDate: string;
  processedAt?: string;
  adminNote?: string;
}

export interface WithdrawalRequestItem {
  id: string;
  requestId: string;
  accountNumber: string;
  amount: number;
  description: string;
  status: string;
  requestDate: string;
  processedAt?: string;
  adminNote?: string;
}

interface RequestState {
  deposits: DepositRequestItem[];
  withdrawals: WithdrawalRequestItem[];
  isLoading: boolean;
  isSubmitting: boolean;
  submitSuccess: string | null;
  error: string | null;
}

const initialState: RequestState = {
  deposits: [],
  withdrawals: [],
  isLoading: false,
  isSubmitting: false,
  submitSuccess: null,
  error: null,
};

export const fetchDepositRequests = createAsyncThunk(
  "request/fetchDepositRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/customer/deposits");
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch deposit requests");
      }
      return data.data as DepositRequestItem[];
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const createDepositThunk = createAsyncThunk(
  "request/createDeposit",
  async (
    payload: { accountNumber: string; amount: number; description?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch("/api/v1/customer/deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to submit deposit request");
      }
      dispatch(fetchDepositRequests());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const fetchWithdrawalRequests = createAsyncThunk(
  "request/fetchWithdrawalRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/customer/withdrawals");
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch withdrawal requests");
      }
      return data.data as WithdrawalRequestItem[];
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const createWithdrawalThunk = createAsyncThunk(
  "request/createWithdrawal",
  async (
    payload: { accountNumber: string; amount: number; description?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch("/api/v1/customer/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to submit withdrawal request");
      }
      dispatch(fetchWithdrawalRequests());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    clearRequestStatus: (state) => {
      state.submitSuccess = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Deposits
    builder.addCase(fetchDepositRequests.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDepositRequests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deposits = action.payload;
    });
    builder.addCase(fetchDepositRequests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createDepositThunk.pending, (state) => {
      state.isSubmitting = true;
      state.submitSuccess = null;
      state.error = null;
    });
    builder.addCase(createDepositThunk.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.submitSuccess = action.payload;
    });
    builder.addCase(createDepositThunk.rejected, (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload as string;
    });

    // Withdrawals
    builder.addCase(fetchWithdrawalRequests.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchWithdrawalRequests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.withdrawals = action.payload;
    });
    builder.addCase(fetchWithdrawalRequests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createWithdrawalThunk.pending, (state) => {
      state.isSubmitting = true;
      state.submitSuccess = null;
      state.error = null;
    });
    builder.addCase(createWithdrawalThunk.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.submitSuccess = action.payload;
    });
    builder.addCase(createWithdrawalThunk.rejected, (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearRequestStatus } = requestSlice.actions;
export default requestSlice.reducer;
