import { NextRequest, NextResponse } from "next/server";
import { getCustomerAuthToken } from "@/lib/auth/getAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await getCustomerAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/customer/transactions/${id}`, {
      headers: { Authorization: `Bearer ${authCheck.token}` },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET customer/transactions/:id proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}
