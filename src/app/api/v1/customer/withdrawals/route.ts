import { NextRequest, NextResponse } from "next/server";
import { getCustomerAuthToken } from "@/lib/auth/getAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET() {
  const authCheck = await getCustomerAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const response = await fetch(`${BACKEND_URL}/customer/withdrawals`, {
      headers: { Authorization: `Bearer ${authCheck.token}` },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET customer/withdrawals proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authCheck = await getCustomerAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const body = await req.json();
    const response = await fetch(`${BACKEND_URL}/customer/withdrawals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCheck.token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("POST customer/withdrawals proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}
