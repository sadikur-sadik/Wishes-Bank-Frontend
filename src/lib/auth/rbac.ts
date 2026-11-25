import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth.config";
import { UserRole, AccountStatus } from "@/types/user";

export interface AuthUserSession {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  phoneNumber?: string;
}

export async function getAuthSession(): Promise<AuthUserSession | null> {
  const session = await auth();
  if (!session?.user) return null;
  return session.user as AuthUserSession;
}

export async function requireAuth(): Promise<
  { user: AuthUserSession } | NextResponse
> {
  const user = await getAuthSession();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please sign in to continue." },
      { status: 401 }
    );
  }

  if (user.accountStatus === AccountStatus.BLOCKED) {
    return NextResponse.json(
      { success: false, message: "Access denied. Account is blocked." },
      { status: 403 }
    );
  }

  if (user.accountStatus === AccountStatus.PENDING) {
    return NextResponse.json(
      {
        success: false,
        message: "Access denied. Your staff account is awaiting administrative approval.",
      },
      { status: 403 }
    );
  }

  if (user.accountStatus === AccountStatus.INACTIVE) {
    return NextResponse.json(
      { success: false, message: "Access denied. Account is inactive." },
      { status: 403 }
    );
  }

  return { user };
}

export async function requireRole(allowedRoles: UserRole[]): Promise<
  { user: AuthUserSession } | NextResponse
> {
  const authResult = await requireAuth();

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  if (!allowedRoles.includes(authResult.user.role)) {
    return NextResponse.json(
      {
        success: false,
        message: "Forbidden. You do not have permission to perform this action.",
      },
      { status: 403 }
    );
  }

  return authResult;
}
