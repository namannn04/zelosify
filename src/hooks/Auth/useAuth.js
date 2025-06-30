import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  checkAuthStatus,
  signOut,
  openSignoutConfirmation,
  closeSignoutConfirmation,
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

  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * Dispatches the checkAuthStatus action to verify user authentication status.
   */
  const handleCheckAuthStatus = () => {
    dispatch(checkAuthStatus());
  };

  /**
   * Dispatches the signOut action to log out the user.
   * Navigates to the user page upon successful logout.
   */
  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      dispatch(closeSignoutConfirmation());
      router.push("/user");
    } catch (error) {
      console.error("Logout error:", error);
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

  return {
    user,
    loading,
    error,
    showSignoutConfirmation,
    handleCheckAuthStatus,
    handleLogout,
    handleOpenSignoutConfirmation,
    handleCloseSignoutConfirmation,
  };
};

export default useAuth;
