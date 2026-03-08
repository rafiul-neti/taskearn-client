import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Enhanced Route Proxy (Middleware)
 * Handles Role-Based Access Control (RBAC) and Auth protection.
 */

const protectedRoutes = {
  "/dashboard/admin-home": ["ADMIN"],
  "/dashboard/buyer-home": ["BUYER"],
  "/dashboard/worker-home": ["WORKER"],
  "/dashboard": ["BUYER", "WORKER", "ADMIN"],
  "/profile": ["BUYER", "WORKER", "ADMIN"],
  "/settings": ["BUYER", "WORKER", "ADMIN"]
};

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/about",
  "/contact",
  "/workers",
  "/tasks",
  "/api/auth", // CRITICAL: Allows NextAuth internal APIs to function
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // 1. Allow internal Next.js assets and API routes automatically
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api/auth") ||
    pathname.includes(".") // matches files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  // 2. Check if route is explicitly public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicRoute) {
    // If user is already logged in and tries to access /login, send them to dashboard
    if (session && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 3. Authentication Check
  if (!session?.user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Role-Based Access Control (RBAC)
  // We sort keys by length descending to match "/dashboard/buyer" before "/dashboard"
  const sortedPaths = Object.keys(protectedRoutes).sort((a, b) => b.length - a.length);

  for (const route of sortedPaths) {
    if (pathname.startsWith(route)) {
      const allowedRoles = protectedRoutes[route];
      const userRole = session.user.role;

      if (!allowedRoles.includes(userRole)) {
        // Redirect logic based on their actual role
        const roleDashboards = {
          BUYER: "/dashboard/buyer-home",
          WORKER: "/dashboard/worker-home",
          ADMIN: "/dashboard/admin-home"
        };
        const fallback = roleDashboards[userRole] || "/";
        return NextResponse.redirect(new URL(fallback, req.url));
      }
      break; // Match found and authorized, exit loop
    }
  }

  return NextResponse.next();
});

export const config = {
  /*
   * Matcher excludes static files and internal Next.js paths.
   * This is the first line of defense against loops.
   */
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};