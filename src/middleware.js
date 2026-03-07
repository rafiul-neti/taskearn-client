import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Middleware for route protection and role-based access control
 * Runs on every request to protected routes
 */

// Define protected routes and their required roles
const protectedRoutes = {
  // Buyer-only routes
  "/dashboard/buyer": ["BUYER"],
  "/tasks/post": ["BUYER"],
  "/tasks/manage": ["BUYER"],
  
  // Worker-only routes
  "/dashboard/worker": ["WORKER"],
  "/tasks/browse": ["WORKER"],
  "/tasks/my-tasks": ["WORKER"],
  
  // Admin-only routes
  "/dashboard/admin": ["ADMIN"],
  "/admin": ["ADMIN"],
  
  // Routes accessible by multiple roles
  "/dashboard": ["BUYER", "WORKER", "ADMIN"],
  "/profile": ["BUYER", "WORKER", "ADMIN"],
  "/settings": ["BUYER", "WORKER", "ADMIN"]
};

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/about",
  "/contact",
  "/workers",
  "/tasks"
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!session?.user) {
    // Redirect to login with callback URL
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access for protected routes
  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      const userRole = session.user.role;
      
      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard if user doesn't have access
        const dashboardRoutes = {
          BUYER: "/dashboard/buyer",
          WORKER: "/dashboard/worker",
          ADMIN: "/dashboard/admin"
        };
        
        const redirectUrl = dashboardRoutes[userRole] || "/";
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }
    }
  }

  // Allow access if all checks pass
  return NextResponse.next();
});

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
