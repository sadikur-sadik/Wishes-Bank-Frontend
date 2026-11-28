import { auth } from "@/lib/auth/auth.config";

export async function getAnyAuthToken(): Promise<{
  token: string | null;
  role?: string;
  userId?: string;
  errorStatus?: number;
  errorMessage?: string;
}> {
  try {
    const session = await auth();

    // Enforce real authenticated session of ANY role with valid backend JWT
    if (session?.user && session.backendToken) {
      return {
        token: session.backendToken,
        role: session.user.role,
        userId: session.user.id,
      };
    }

    return {
      token: null,
      errorStatus: 401,
      errorMessage: "Unauthenticated: Please log in",
    };
  } catch (err) {
    console.error("getAnyAuthToken error:", err);
    return {
      token: null,
      errorStatus: 502,
      errorMessage: "Failed to verify session token",
    };
  }
}
