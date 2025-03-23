import { NextResponse } from "next/server";

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

  console.log(
    `Middleware: Path=${path}, Public=${isPublicPath}, Auth=${isAuthenticated}, Registering=${isRegistering}`
  );

  // Special case: Registration flow
  if (isRegistering) {
    // If user has registration token, they must complete TOTP setup
    if (path !== "/setup-totp") {
      return NextResponse.redirect(new URL("/setup-totp", request.url));
    }
    return NextResponse.next();
  }

  // Redirect logged in users away from public pages except during registration
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // Redirect unauthenticated users to login page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
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
