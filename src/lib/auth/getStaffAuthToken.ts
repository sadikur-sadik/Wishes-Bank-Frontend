import { auth } from "@/lib/auth/auth.config";
import { UserRole } from "@/types/user";

export async function getStaffAuthToken(): Promise<{
  token: string | null;
  errorStatus?: number;
  errorMessage?: string;
}> {
  try {
    const session = await auth();

    // Enforce real authenticated staff session with valid backend JWT
    if (session?.user && session.user.role === UserRole.STAFF && session.backendToken) {
      return { token: session.backendToken };
    }

    if (session?.user && session.user.role !== UserRole.STAFF) {
      return {
        token: null,
        errorStatus: 403,
        errorMessage: "Forbidden: Bank Officer / Staff role required.",
      };
    }

    return {
      token: null,
      errorStatus: 401,
      errorMessage: "Unauthenticated: Please log in as a staff officer.",
    };
  } catch (err) {
    console.error("getStaffAuthToken error:", err);
    return {
      token: null,
      errorStatus: 502,
      errorMessage: "Failed to verify staff operational session.",
    };
  }
}
