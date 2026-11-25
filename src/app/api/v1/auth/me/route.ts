import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth.config";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }

    const token = session.backendToken;

    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({
      success: true,
      user: session.user,
    });
  } catch (error) {
    console.error("Me proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve user data" },
      { status: 500 }
    );
  }
}
