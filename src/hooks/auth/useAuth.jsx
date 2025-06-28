import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  checkAuthStatus,
  signOut,
  openSignoutConfirmation,
  closeSignoutConfirmation,
} from "@/redux/features/authSlice";

const useAuth = () => {
  const { user, loading, error, showSignoutConfirmation } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckAuthStatus = () => {
    dispatch(checkAuthStatus());
  };

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      dispatch(closeSignoutConfirmation());
      router.push("/user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleOpenSignoutConfirmation = () => {
    dispatch(openSignoutConfirmation());
  };

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
