import { NextRequest, NextResponse } from "next/server";
import { getAnyAuthToken } from "@/lib/auth/getAnyAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET(req: NextRequest) {
  const authCheck = await getAnyAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage || "Unauthorized" },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();
    const endpoint = `${BACKEND_URL}/notifications${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${authCheck.token}` },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    console.error("GET /notifications proxy error:", err);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}
