import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth.config";
import { UserRole } from "@/types/user";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const token = session.backendToken;
    const response = await fetch(`${BACKEND_URL}/admin/staff-approvals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET staff-approvals proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to reach banking backend service." },
      { status: 502 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const token = session.backendToken;

    const response = await fetch(`${BACKEND_URL}/admin/staff-approvals`, {
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
    console.error("PATCH staff-approvals proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to reach banking backend service." },
      { status: 502 }
    );
  }
}
