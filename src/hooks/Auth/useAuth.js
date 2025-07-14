import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  checkAuthStatus,
  signOut,
  openSignoutConfirmation,
  closeSignoutConfirmation,
  loginWithCredentials,
  verifyTOTP,
  setUser,
} from "@/redux/features/Auth/authSlice";

/**
 * Custom hook for managing authentication state and actions.
 * Provides access to authentication state and dispatch functions.
 */
const useAuth = () => {
  // Extract authentication state from Redux store
  const { user, loading, error, showSignoutConfirmation } = useSelector(
    (state) => state.auth
  );

  // Local state for tracking specific loading states
  const [localState, setLocalState] = useState({
    isSigningOut: false,
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // Helper function to check if current path is an auth page
  const isAuthPage = () => {
    if (!pathname) return false;
    return !pathname.includes("/user");
  };

  // Check if we need to load user data from localStorage on initial mount
  useEffect(() => {
    // Skip auth check completely on auth pages
    if (!user && !isAuthPage()) {
      handleCheckAuthStatus();
    }
  }, [pathname]);

  /**
   * Dispatches the checkAuthStatus action to verify user authentication status.
   * @param {Object} options - Options for checking auth status
   * @param {boolean} options.suppressErrors - Whether to suppress common errors like "No authentication tokens found"
   * @param {boolean} options.forceCheck - Force check even on auth pages
   */
  const handleCheckAuthStatus = (options = {}) => {
    const { suppressErrors = false, forceCheck = false } = options;

    // Always pass the current path and auth page status
    const authOptions = {
      isAuthPage: isAuthPage() && !forceCheck,
      pathname,
    };

    // We'll use the unwrap() pattern to handle the errors manually if we want to suppress them
    if (suppressErrors) {
      dispatch(checkAuthStatus(authOptions))
        .unwrap()
        .catch((error) => {
          // Silently handle expected errors
          if (
            error &&
            typeof error === "string" &&
            error.includes("No authentication tokens found")
          ) {
            if (process.env.NODE_ENV === "development") {
              console.log(
                "User not authenticated yet - expected on login page"
              );
            }
          } else {
            // For unexpected errors, we still want to see them
            console.error("Auth check error:", error);
          }
        });
    } else {
      // Normal behavior - let Redux handle the error state
      dispatch(checkAuthStatus(authOptions));
    }
  };

  /**
   * Dispatches the loginWithCredentials action to verify login credentials.
   * @param {Object} credentials - Object containing usernameOrEmail and password
   * @returns {Promise} Promise that resolves with the action result
   */
  const handleLogin = async (credentials) => {
    try {
      return await dispatch(loginWithCredentials(credentials)).unwrap();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  /**
   * Dispatches the verifyTOTP action to verify the TOTP code.
   * @param {Object} data - Object containing the TOTP code
   * @returns {Promise} Promise that resolves with the action result
   */
  const handleVerifyTOTP = async (data) => {
    try {
      return await dispatch(verifyTOTP(data)).unwrap();
    } catch (error) {
      console.error("TOTP verification error:", error);
      throw error;
    }
  };

  /**
   * Dispatches the signOut action to log out the user.
   * Navigates to the user page upon successful logout.
   * @param {Object} options - Options for the logout process
   * @param {boolean} options.skipConfirmationClose - Whether to skip closing the confirmation dialog
   */
  const handleLogout = async (options = {}) => {
    const { skipConfirmationClose = false } = options;

    // Set local signing out state to true
    setLocalState((prevState) => ({ ...prevState, isSigningOut: true }));

    try {
      // Dispatch signOut and wait for it to complete
      const result = await dispatch(signOut()).unwrap();

      // Only close the confirmation dialog if not explicitly skipped
      if (!skipConfirmationClose) {
        dispatch(closeSignoutConfirmation());
      }

      // Navigate to login page
      router.push("/user");
      return result;
    } catch (error) {
      console.error("Logout error:", error);

      // Even if there's an error, close the dialog to avoid keeping it open
      if (!skipConfirmationClose) {
        dispatch(closeSignoutConfirmation());
      }

      throw error;
    } finally {
      // Reset local signing out state
      setLocalState((prevState) => ({ ...prevState, isSigningOut: false }));
    }
  };

  /**
   * Dispatches the openSignoutConfirmation action to show the signout confirmation dialog.
   */
  const handleOpenSignoutConfirmation = () => {
    dispatch(openSignoutConfirmation());
  };

  /**
   * Dispatches the closeSignoutConfirmation action to hide the signout confirmation dialog.
   */
  const handleCloseSignoutConfirmation = () => {
    dispatch(closeSignoutConfirmation());
  };

  /**
   * Get a formatted display name for the current user
   * @returns {string} Formatted display name (FirstName LastName or username)
   */
  const getDisplayName = () => {
    if (!user) return "";
    return user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username || "User";
  };

  /**
   * Get a formatted username/handle for the current user
   * @returns {string} Formatted username with @ prefix
   */
  const getUserHandle = () => {
    if (!user) return "";
    return `@${user.username}`;
  };

  /**
   * Get tenantId for the current user
   * @returns {string} Tenant ID or empty string
   */
  const getTenantId = () => {
    if (!user) return "";
    return user.tenant.tenantId;
  };

  /**
   * Manually update user data in Redux and localStorage
   * @param {Object} userData - User data to set
   */
  const updateUserData = (userData) => {
    dispatch(setUser(userData));
  };

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    loading,
    error,
    showSignoutConfirmation,
    isSigningOut: localState.isSigningOut, // Expose local signing out state
    handleCheckAuthStatus,
    handleLogin,
    handleVerifyTOTP,
    handleLogout,
    handleOpenSignoutConfirmation,
    handleCloseSignoutConfirmation,
    getDisplayName,
    getUserHandle,
    getTenantId,
    updateUserData,
    isAuthenticated,
  };
};

export default useAuth;
