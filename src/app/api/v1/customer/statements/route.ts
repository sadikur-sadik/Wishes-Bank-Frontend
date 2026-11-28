import { NextRequest, NextResponse } from "next/server";
import { getCustomerAuthToken } from "@/lib/auth/getAuthToken";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function GET(req: NextRequest) {
  const authCheck = await getCustomerAuthToken();
  if (!authCheck.token) {
    return NextResponse.json(
      { success: false, message: authCheck.errorMessage },
      { status: authCheck.errorStatus || 401 }
    );
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const response = await fetch(
      `${BACKEND_URL}/customer/statements?${searchParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${authCheck.token}` },
      }
    );

    if (searchParams.get("format") === "csv") {
      const csvText = await response.text();
      return new NextResponse(csvText, {
        status: response.status,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": response.headers.get("Content-Disposition") || 'attachment; filename="statement.csv"',
        },
      });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET customer/statements proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Backend connection error" },
      { status: 502 }
    );
  }
}
