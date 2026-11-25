import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole, AccountStatus, IUser } from "@/types/user";

export interface IUserDocument extends Omit<IUser, "_id">, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Prevents returning password by default in queries
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
      index: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
      index: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model compilation in Next.js hot reload
export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
