import { NextRequest, NextResponse } from "next/server";
import { getStaffAuthToken } from "@/lib/auth/getStaffAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET(req: NextRequest) {
  const authCheck = await getStaffAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const response = await fetch(
      `${BACKEND_URL}/staff/customers?${searchParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${authCheck.token}` },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET staff/customers proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authCheck = await getStaffAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const body = await req.json();
    const response = await fetch(`${BACKEND_URL}/staff/customers`, {
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
    console.error("POST staff/customers proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}
