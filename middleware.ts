import { NextRequest, NextResponse } from "next/server";

// Middleware function that intercepts all incoming requests
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // Extract the requested URL path

  // Define which paths are considered public (no authentication required)
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyEmail";

  // Get the authentication token from cookies
  const token = request.cookies.get("token")?.value;

  // If user is authenticated and trying to access a public page, redirect to homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If user is not authenticated and trying to access a private page, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Specify which routes the middleware should apply to
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyEmail"], // Only these paths are matched by the middleware
};

// Gist:
// This middleware controls access based on authentication. It prevents logged-in users from visiting public pages like login/signup, and restricts unauthenticated users from accessing private routes like the home or profile page. It does this by checking for a token in the cookies and conditionally redirecting the user.
