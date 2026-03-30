import { NextRequest, NextResponse } from "next/server";

export function checkAuth(req: NextRequest): NextResponse | null {
  const password = process.env.ANALYTICS_PASSWORD;
  if (!password) return NextResponse.json({ error: "Not configured" }, { status: 500 });

  // Check Authorization header
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${password}`) return null;

  // Check cookie (for dashboard UI)
  const cookie = req.cookies.get("analytics_auth")?.value;
  if (cookie === password) return null;

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
