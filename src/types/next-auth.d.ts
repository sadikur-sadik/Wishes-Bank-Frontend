import "next-auth";
import { UserRole, AccountStatus } from "@/types/user";

declare module "next-auth" {
  interface User {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    accountStatus: AccountStatus;
    phoneNumber?: string;
    profilePicture?: string;
    profileImage?: string;
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: UserRole;
      accountStatus: AccountStatus;
      phoneNumber?: string;
      profilePicture?: string;
      profileImage?: string;
    };
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    accountStatus: AccountStatus;
    phoneNumber?: string;
    profilePicture?: string;
    profileImage?: string;
    backendToken?: string;
  }
}
