import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

async function hasValidSession(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/webhooks/") ||
    pathname === "/api/trade-prompts/execute" ||
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (pathname === "/login") {
    if (await hasValidSession(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!(await hasValidSession(request))) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
