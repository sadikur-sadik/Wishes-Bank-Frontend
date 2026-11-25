import { z } from "zod";
import { UserRole } from "@/types/user";

export const RegisterRoleSchema = z.enum(
  [UserRole.CUSTOMER, UserRole.STAFF],
  { message: "Role must be either CUSTOMER or STAFF" }
);

export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name cannot exceed 100 characters")
      .trim(),
    email: z
      .string()
      .email("Please provide a valid email address")
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z.string(),
    phoneNumber: z.string().optional(),
    role: RegisterRoleSchema.default(UserRole.CUSTOMER),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const StaffApprovalSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  action: z.enum(["APPROVE", "REJECT"], {
    message: "Action must be APPROVE or REJECT",
  }),
});

export type StaffApprovalInput = z.infer<typeof StaffApprovalSchema>;
