import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth.config";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }

    const token = session.backendToken;
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Profile update proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user profile" },
      { status: 500 }
    );
  }
}

