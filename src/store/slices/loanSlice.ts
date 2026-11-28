import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface LoanScheduleItem {
  installmentNumber: number;
  dueDate: string;
  amount: number;
  status: "PAID" | "PENDING";
}

export interface LoanItem {
  id: string;
  loanId: string;
  loanType: string;
  amount: number;
  durationMonths: number;
  monthlyIncome: number;
  employmentStatus: string;
  description: string;
  status: string;
  interestRate: number;
  remainingBalance: number;
  monthlyInstallment: number;
  repaymentSchedule: LoanScheduleItem[];
  createdAt: string;
}

interface LoanState {
  loans: LoanItem[];
  isLoading: boolean;
  isSubmitting: boolean;
  isRepaying: boolean;
  submitSuccess: string | null;
  repaySuccess: string | null;
  error: string | null;
}

const initialState: LoanState = {
  loans: [],
  isLoading: false,
  isSubmitting: false,
  isRepaying: false,
  submitSuccess: null,
  repaySuccess: null,
  error: null,
};

export const fetchLoans = createAsyncThunk(
  "loan/fetchLoans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/customer/loans");
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch loan portfolio");
      }
      return data.data as LoanItem[];
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const applyLoanThunk = createAsyncThunk(
  "loan/applyLoan",
  async (
    payload: {
      loanType: string;
      amount: number;
      durationMonths: number;
      monthlyIncome: number;
      employmentStatus: string;
      description?: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch("/api/v1/customer/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to submit loan application");
      }
      dispatch(fetchLoans());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const repayLoanThunk = createAsyncThunk(
  "loan/repayLoan",
  async (
    payload: { loanId: string; accountId?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await fetch(`/api/v1/customer/loans/${payload.loanId}/repay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: payload.accountId }),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to process repayment");
      }
      dispatch(fetchLoans());
      return data.message as string;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    clearLoanStatus: (state) => {
      state.submitSuccess = null;
      state.repaySuccess = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoans.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loans = action.payload;
    });
    builder.addCase(fetchLoans.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(applyLoanThunk.pending, (state) => {
      state.isSubmitting = true;
      state.submitSuccess = null;
      state.error = null;
    });
    builder.addCase(applyLoanThunk.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.submitSuccess = action.payload;
    });
    builder.addCase(applyLoanThunk.rejected, (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload as string;
    });

    builder.addCase(repayLoanThunk.pending, (state) => {
      state.isRepaying = true;
      state.repaySuccess = null;
      state.error = null;
    });
    builder.addCase(repayLoanThunk.fulfilled, (state, action) => {
      state.isRepaying = false;
      state.repaySuccess = action.payload;
    });
    builder.addCase(repayLoanThunk.rejected, (state, action) => {
      state.isRepaying = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearLoanStatus } = loanSlice.actions;
export default loanSlice.reducer;
