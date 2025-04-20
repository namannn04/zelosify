"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosInstance from "@/utils/axios/AxiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignoutConfirmation, setShowSignoutConfirmation] = useState(false);

  // Check if user is authenticated based on cookies
  const checkAuthStatus = useCallback(() => {
    try {
      setLoading(true);

      // Check if we have an access token in cookies - more thorough check
      const cookies = document.cookie.split(";");
      const hasAccessToken = cookies.some((item) =>
        item.trim().startsWith("access_token=")
      );
      const hasRefreshToken = cookies.some((item) =>
        item.trim().startsWith("refresh_token=")
      );

      // console.log("Auth check - Access token present:", hasAccessToken);
      // console.log("Auth check - Refresh token present:", hasRefreshToken);

      if (hasAccessToken || hasRefreshToken) {
        // We have at least one auth token, so user is authenticated
        console.log("User is authenticated");
        setUser({ isLoggedIn: true });
      } else {
        // console.log("User is not authenticated - no auth tokens found");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Show signout confirmation popup
  const handleSignoutClick = useCallback(() => {
    setShowSignoutConfirmation(true);
  }, []);

  // Hide signout confirmation popup
  const cancelSignout = useCallback(() => {
    setShowSignoutConfirmation(false);
  }, []);

  // Logout function - let the backend handle HTTP-only cookie removal
  const logout = useCallback(async () => {
    try {
      console.log("Logging out user...");
      await axiosInstance.post("/auth/logout");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Clear local user state
      localStorage.setItem("logout", Date.now().toString());
      setUser(null);
      setShowSignoutConfirmation(false);

      // Redirect to login page
      window.location.href = "/login";
    }
  }, []);

  // Check auth status on initial load and when cookies change
  useEffect(() => {
    checkAuthStatus();

    // Listen for storage events to handle logout across tabs
    const handleStorageChange = (e) => {
      if (e.key === "logout") {
        checkAuthStatus();
      }
    };

    // Check auth status when cookies change
    const handleCookieChange = () => {
      checkAuthStatus();
    };

    // Create an interval to periodically check auth status
    const interval = setInterval(checkAuthStatus, 10000);

    window.addEventListener("storage", handleStorageChange);

    // Use a MutationObserver to detect cookie changes
    const cookieObserver = new MutationObserver(handleCookieChange);
    cookieObserver.observe(document, { subtree: true, childList: true });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
      cookieObserver.disconnect();
    };
  }, [checkAuthStatus]);

  const contextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
    refreshUser: checkAuthStatus,
    showSignoutConfirmation,
    handleSignoutClick,
    cancelSignout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
