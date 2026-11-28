export enum UserRole {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
  phoneNumber?: string;
  profilePicture?: string;
  profileImage?: string;
  accountStatus: AccountStatus;
  emailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SafeUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  profilePicture?: string;
  profileImage?: string;
  accountStatus: AccountStatus;
  emailVerified: boolean;
}
