import { NextResponse } from "next/server";
import {
  createSessionToken,
  getDashboardPassword,
  sessionCookieOptions,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const expected = getDashboardPassword();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "DASHBOARD_PASSWORD is not configured" },
      { status: 500 },
    );
  }

  let password = "";
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } else {
    const form = await request.formData();
    password = String(form.get("password") ?? "");
  }

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: "invalid password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  const cookie = sessionCookieOptions(token);
  response.cookies.set(cookie.name, cookie.value, cookie);
  return response;
}
