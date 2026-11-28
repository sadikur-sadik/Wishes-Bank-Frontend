import { NextRequest, NextResponse } from "next/server";
import { getStaffAuthToken } from "@/lib/auth/getStaffAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const authCheck = await getStaffAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const { type, id } = await params;
    const body = await req.json();
    const response = await fetch(
      `${BACKEND_URL}/staff/transactions/requests/${type}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCheck.token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("PATCH staff/transactions/requests proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}
