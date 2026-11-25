import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserRole, AccountStatus } from "@/types/user";

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
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUserState | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
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
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setAuthUser,
  updateUserProfilePicture,
  clearAuthUser,
  setAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;
