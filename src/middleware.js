import { NextResponse } from "next/server";
import { extractRoleFromToken } from "@/utils/Auth/middlewareUtils";

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" ||
    path === "/register" ||
    path === "/setup-totp" ||
    path.startsWith("/api/");

  // Check if we have auth cookies
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const registrationToken = request.cookies.get("registration_token")?.value;

  // A user is considered authenticated if they have BOTH tokens
  const isAuthenticated = !!accessToken && !!refreshToken;
  // A user is in registration process if they have the special token
  const isRegistering = !!registrationToken;

  // Extract role from access token and set it in a readable cookie
  const response = NextResponse.next();
  let userRole = null;

  if (isAuthenticated && accessToken) {
    userRole = extractRoleFromToken(accessToken);

    if (userRole) {
      // Set role cookie that JavaScript can read (non-HTTP-only)
      response.cookies.set("role", userRole, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    } else {
      // Clear role cookie if no valid role found
      response.cookies.delete("role");
    }
  } else if (!isAuthenticated) {
    // Clear role cookie when not authenticated
    response.cookies.delete("role");
  }

  // Special case: Registration flow
  if (isRegistering) {
    // If user has registration token, they must complete TOTP setup
    if (path !== "/setup-totp") {
      return NextResponse.redirect(new URL("/setup-totp", request.url));
    }
    return response;
  }

  // Redirect logged in users away from public pages except during registration
  if (isPublicPath && isAuthenticated) {
    // Role-based redirection
    if (userRole === "VENDOR_MANAGER") {
      console.log(`Redirecting VENDOR_MANAGER to /user`);
      return NextResponse.redirect(new URL("/user", request.url));
    } else if (userRole === "BUSINESS_STAKEHOLDER") {
      console.log(
        `Redirecting BUSINESS_STAKEHOLDER to /user/digital-initiative`
      );
      return NextResponse.redirect(
        new URL("/user/digital-initiative", request.url)
      );
    } else {
      // Fallback for unknown roles or missing role - redirect to base user page
      console.log(`Unknown role (${userRole}) - redirecting to /`);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect unauthenticated users to login page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Protect dashboard routes
    "/user/:path*",
    // Include public paths for redirect logic
    "/login",
    "/register",
    "/setup-totp",
  ],
};
