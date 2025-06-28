"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/Auth/useAuth";
import CircleLoader from "../UI/loaders/CircleLoader";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [checkedCookies, setCheckedCookies] = useState(false);

  // Handle initial mounting and force an auth check
  useEffect(() => {
    setMounted(true);
    // Force a refresh of the auth status
    refreshUser();
  }, [refreshUser]);

  // Manual cookie check as a fallback
  useEffect(() => {
    if (mounted && !checkedCookies) {
      const cookies = document.cookie.split(";");
      const hasAccessToken = cookies.some((item) =>
        item.trim().startsWith("access_token=")
      );
      const hasRefreshToken = cookies.some((item) =>
        item.trim().startsWith("refresh_token=")
      );

      console.log("ProtectedRoute - Direct cookie check:");
      console.log("- Access token present:", hasAccessToken);
      console.log("- Refresh token present:", hasRefreshToken);

      setCheckedCookies(true);

      // If we have auth cookies but isAuthenticated is false, refresh the auth state
      if ((hasAccessToken || hasRefreshToken) && !isAuthenticated && !loading) {
        console.log("Auth state mismatch - refreshing auth state");
        refreshUser();
      }
    }
  }, [mounted, isAuthenticated, loading, checkedCookies, refreshUser]);

  // Handle authentication checks
  useEffect(() => {
    if (mounted && !loading && !isAuthenticated && checkedCookies) {
      console.log(
        "ProtectedRoute: Unauthorized access attempt - redirecting to login"
      );
      router.push("/login");
    }
  }, [isAuthenticated, loading, router, mounted, checkedCookies]);

  // When loading or on server, show loading indicator
  if (loading || !mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircleLoader />
      </div>
    );
  }

  // When authenticated and loaded, show children
  return isAuthenticated ? children : null;
}
