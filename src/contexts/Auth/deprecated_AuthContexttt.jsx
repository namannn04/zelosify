"use client";

import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus, logout } from "@/store/authSlice";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Check auth status on initial load and when cookies change
  useEffect(() => {
    dispatch(checkAuthStatus());

    // Listen for storage events to handle logout across tabs
    const handleStorageChange = (e) => {
      if (e.key === "logout") {
        dispatch(checkAuthStatus());
      }
    };

    // Check auth status when cookies change
    const handleCookieChange = () => {
      dispatch(checkAuthStatus());
    };

    // Create an interval to periodically check auth status
    const interval = setInterval(() => dispatch(checkAuthStatus()), 10000);

    window.addEventListener("storage", handleStorageChange);

    // Use a MutationObserver to detect cookie changes
    const cookieObserver = new MutationObserver(handleCookieChange);
    cookieObserver.observe(document, { subtree: true, childList: true });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
      cookieObserver.disconnect();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export const useAuth = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCheckAuthStatus = () => {
    dispatch(checkAuthStatus());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    loading,
    error,
    handleCheckAuthStatus,
    handleLogout,
  };
};

export default AuthProvider;
