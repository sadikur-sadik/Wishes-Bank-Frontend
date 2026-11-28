import { auth } from "@/lib/auth/auth.config";
import { UserRole } from "@/types/user";

export async function getAdminAuthToken(): Promise<{
  token: string | null;
  errorStatus?: number;
  errorMessage?: string;
}> {
  try {
    const session = await auth();

    // Enforce real authenticated admin session with valid backend JWT
    if (session?.user && session.user.role === UserRole.ADMIN && session.backendToken) {
      return { token: session.backendToken };
    }

    if (session?.user && session.user.role !== UserRole.ADMIN) {
      return {
        token: null,
        errorStatus: 403,
        errorMessage: "Forbidden: Executive Administrator role required.",
      };
    }

    return {
      token: null,
      errorStatus: 401,
      errorMessage: "Unauthorized: Please log in with Administrator credentials.",
    };
  } catch (err: unknown) {
    return {
      token: null,
      errorStatus: 500,
      errorMessage: err instanceof Error ? err.message : "Authentication resolution error",
    };
  }
}
