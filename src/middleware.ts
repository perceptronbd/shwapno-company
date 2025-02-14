import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle root path redirect
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/auth/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all URLs EXCEPT:
  // URLs starting with /api/
  // URLs starting with /_next/
  // URLs starting with /static/
  // URLs for files with extensions (like images, fonts, etc.)
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
