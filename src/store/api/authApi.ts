import { baseApi } from "./baseApi";
import { SafeUser } from "@/types/user";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: "CUSTOMER" | "STAFF";
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  isPendingApproval?: boolean;
  user: SafeUser;
}

export interface StaffApprovalRequest {
  userId: string;
  action: "APPROVE" | "REJECT";
}

export interface UpdateProfileRequest {
  profilePicture?: string;
  fullName?: string;
  phoneNumber?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<{ success: boolean; user: SafeUser }, void>({
      query: () => "/v1/auth/me",
      providesTags: ["User"],
    }),
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/v1/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation<
      { success: boolean; message: string; user: SafeUser },
      UpdateProfileRequest
    >({
      query: (body) => ({
        url: "/v1/auth/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getPendingStaff: builder.query<
      { success: boolean; staff: (SafeUser & { createdAt?: string })[] },
      void
    >({
      query: () => "/v1/admin/staff-approvals",
      providesTags: ["User"],
    }),
    updateStaffApproval: builder.mutation<
      { success: boolean; message: string; user: SafeUser },
      StaffApprovalRequest
    >({
      query: (body) => ({
        url: "/v1/admin/staff-approvals",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useRegisterUserMutation,
  useUpdateProfileMutation,
  useGetPendingStaffQuery,
  useUpdateStaffApprovalMutation,
} = authApi;
