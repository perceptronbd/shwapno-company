// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { ROUTES, PUBLIC_ROUTES } from "./utils/routes";
import { COMPANY } from "./utils/constant";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");
  const { pathname } = request.nextUrl;


  // Handle root path
  if (pathname === ROUTES.ROOT) {
    if (refreshToken) {
      return NextResponse.redirect(new URL(ROUTES.ORDERS, request.nextUrl));
    }
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.nextUrl));
  }

  // Check if current route is public (including company prefix)
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname.startsWith(route) || pathname.startsWith(`${COMPANY}${route}`),
  );

  // Redirect authenticated users away from public routes
  if (refreshToken && isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.ORDERS, request.nextUrl));
  }

  // Protect private routes
  if (!refreshToken && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
