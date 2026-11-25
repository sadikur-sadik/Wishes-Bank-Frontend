import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Register proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to reach banking backend service." },
      { status: 502 }
    );
  }
}
