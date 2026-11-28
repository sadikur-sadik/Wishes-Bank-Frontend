import { auth } from "@/lib/auth/auth.config";
import { UserRole } from "@/types/user";

export async function getCustomerAuthToken(): Promise<{
  token: string | null;
  errorStatus?: number;
  errorMessage?: string;
}> {
  try {
    const session = await auth();

    // Enforce real authenticated customer session with valid backend JWT
    if (session?.user && session.user.role === UserRole.CUSTOMER && session.backendToken) {
      return { token: session.backendToken };
    }

    if (session?.user && session.user.role !== UserRole.CUSTOMER) {
      return {
        token: null,
        errorStatus: 403,
        errorMessage: "Forbidden: Customer role only",
      };
    }

    return {
      token: null,
      errorStatus: 401,
      errorMessage: "Unauthenticated: Please log in as a customer",
    };
  } catch (err) {
    console.error("getCustomerAuthToken error:", err);
    return {
      token: null,
      errorStatus: 502,
      errorMessage: "Failed to verify banking session token",
    };
  }
}
