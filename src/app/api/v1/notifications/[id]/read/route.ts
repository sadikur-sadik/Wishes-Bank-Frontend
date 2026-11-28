import { NextRequest, NextResponse } from "next/server";
import { getAnyAuthToken } from "@/lib/auth/getAnyAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authCheck = await getAnyAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage || "Unauthorized" },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const res = await fetch(`${BACKEND_URL}/notifications/${id}/read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authCheck.token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    console.error(`PATCH /notifications/${id}/read proxy error:`, err);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}
