import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { UserRole, AccountStatus, SafeUser } from "@/types/user";

export interface AuthUserState {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  phoneNumber?: string;
  profilePicture?: string;
  profileImage?: string;
}

interface AuthState {
  user: AuthUserState | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

/**
 * Async Thunk to fetch current authenticated user profile using native fetch
 */
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/auth/me");
      if (!res.ok) {
        return rejectWithValue("Failed to fetch user session");
      }
      const data = await res.json();
      return data.user as SafeUser;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

/**
 * Async Thunk to register a new user using native fetch
 */
export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (
    formData: {
      fullName: string;
      email: string;
      password: string;
      role: UserRole.CUSTOMER | UserRole.STAFF;
      phoneNumber?: string;
      profilePicture?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Registration failed");
      }

      return data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Network error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUserState | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateUserProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profilePicture = action.payload;
        state.user.profileImage = action.payload;
      }
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = {
            id: action.payload.id,
            fullName: action.payload.fullName,
            email: action.payload.email,
            role: action.payload.role,
            accountStatus: action.payload.accountStatus,
            phoneNumber: action.payload.phoneNumber,
            profilePicture: action.payload.profilePicture,
            profileImage: action.payload.profilePicture,
          };
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // registerUserThunk
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAuthUser, clearAuthUser, updateUserProfilePicture, setAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
