import { NextResponse } from "next/server";
import { getAdminAuthToken } from "@/lib/auth/getAdminAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET() {
  try {
    const { token, errorStatus, errorMessage } = await getAdminAuthToken();
    if (!token) {
      return NextResponse.json({ success: false, message: errorMessage }, { status: errorStatus || 401 });
    }

    const res = await fetch(`${BACKEND_URL}/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Proxy error" },
      { status: 500 }
    );
  }
}
