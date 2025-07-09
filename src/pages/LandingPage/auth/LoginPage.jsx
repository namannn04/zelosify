"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";
import SocialButton from "@/components/UI/SocialButton";
import Link from "next/link";
import axiosInstance from "@/utils/Axios/AxiosInstance";
import useAuth from "@/hooks/Auth/useAuth";
import {
  getUserRole,
  handleRoleBasedRedirect,
  hasAuthTokens,
} from "@/utils/Auth/authUtils";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    totp: "",
  });
  const [error, setError] = useState({});
  const [loginStage, setLoginStage] = useState("credentials"); // 'credentials' or 'totp'
  const router = useRouter();

  // Use our custom auth hook instead of direct Redux access
  const {
    user,
    loading: isLoading,
    error: authError,
    handleLogin,
    handleVerifyTOTP,
    handleCheckAuthStatus,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  // Check if user already has auth tokens and redirect if needed
  useEffect(() => {
    // Check for authentication tokens
    const isAuthenticated = hasAuthTokens();
    const userRole = getUserRole();

    // Only log in development environment
    if (process.env.NODE_ENV === "development") {
      console.log("Login page - Auth token check:");
      console.log("- Is authenticated:", isAuthenticated);
      console.log("- User role:", userRole);
    }

    // If already authenticated, redirect based on role
    if (isAuthenticated) {
      if (process.env.NODE_ENV === "development") {
        console.log("Already authenticated! Redirecting based on role...");
      }

      // Use the hook method to check auth status
      // Pass suppressErrors=true since we're on the login page
      handleCheckAuthStatus({ suppressErrors: true });

      // Handle role-based redirection
      handleRoleBasedRedirect(userRole);
    }
  }, [handleCheckAuthStatus]);

  // Set error from Redux state - but filter out expected "no tokens" errors on login page
  useEffect(() => {
    if (authError && !authError.includes("No authentication tokens found")) {
      if (loginStage === "credentials") {
        setError({ general: authError });
      } else if (loginStage === "totp") {
        setError({ totp: "Invalid 2FA code. Please try again." });
      }
    }
  }, [authError, loginStage]);

  // Redirect if user is set after TOTP verification
  useEffect(() => {
    if (user && loginStage === "totp") {
      // Store role in cookie for middleware
      if (user.role) {
        document.cookie = `role=${user.role}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`; // 7 days
      }

      // Let middleware handle the role-based redirect
      console.log("User authenticated, redirecting...");
      window.location.replace("/login"); // This will trigger middleware redirect
    }
  }, [user, loginStage]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError({});

      if (loginStage === "credentials") {
        // Step 1: Verify username/email and password
        try {
          console.log("Verifying credentials for:", formData.usernameOrEmail);
          const resultAction = await handleLogin({
            usernameOrEmail: formData.usernameOrEmail,
            password: formData.password,
          });

          console.log("Verify login response:", resultAction);
          if (
            resultAction.message ===
            "Login verified. Please enter your TOTP code."
          ) {
            // Move to TOTP verification stage
            setLoginStage("totp");
          } else if (resultAction.message === "Authentication successful") {
            // Let middleware handle the role-based redirect
            window.location.replace("/login"); // This will trigger middleware redirect
          }
        } catch (err) {
          console.error("Login verification error:", err);

          // Error handling is now done through the useEffect watching authError
        }
      } else if (loginStage === "totp") {
        // Step 2: Verify TOTP code
        try {
          console.log("Submitting TOTP code:", formData.totp);
          const resultAction = await handleVerifyTOTP({
            totp: formData.totp,
          });

          console.log("TOTP verification successful:", resultAction);

          // Ensure we redirect properly regardless of the exact message
          if (resultAction.user) {
            console.log(
              "Authentication successful, letting middleware handle redirect..."
            );

            // Force a small delay to ensure cookies are set
            setTimeout(() => {
              // Let middleware handle the role-based redirect
              try {
                window.location.replace("/login"); // This will trigger middleware redirect
              } catch (e) {
                console.error("Redirect failed with replace, trying href:", e);
                window.location.href = "/login"; // This will trigger middleware redirect
              }
            }, 500);
          }
        } catch (err) {
          console.error("TOTP verification error:", err);

          // Specific TOTP error handling
          if (err === "Temp token and TOTP are required") {
            setError({ general: "Session expired. Please login again." });
            setLoginStage("credentials");
          } else if (err === "Invalid TOTP code") {
            setError({ totp: "Invalid 2FA code. Please try again." });
          } else {
            setError({
              general:
                err || "TOTP verification failed. Please try logging in again.",
            });
            // If we get here, there might be an issue with the session/cookies
            setTimeout(() => {
              setLoginStage("credentials");
            }, 3000);
          }
        }
      }
    },
    [formData, loginStage, handleLogin, handleVerifyTOTP]
  );

  const handleGoogleLogin = useCallback(async () => {
    try {
      console.log("Google login");

      const resp = await axiosInstance.get("/auth/google/login");

      window.location.href = resp.data.authUrl;
    } catch (err) {
      console.error(err.message);

      setError({ general: "Failed to initiate Google login" });
    }
  }, []);

  const handleMicrosoftLogin = useCallback(async () => {
    try {
      const resp = await axiosInstance.get("/auth/microsoft/login");

      window.location.href = resp.data.authUrl;
    } catch (err) {
      console.error(err.message);

      setError({ general: "Failed to initiate Microsoft login" });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div>
          <img
            src={"/assets/logos/main-logo.png"}
            alt="Zelosify Dark Logo"
            className="dark:block hidden"
            width={120}
            height={40}
          />
          <img
            src={"/assets/logos/zelosify_Dark.png"}
            alt="Zelosify Dark Logo"
            className="dark:hidden block"
            width={120}
            height={40}
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 text-center">
          Sign in to continue to your dashboard
        </p>
      </div>

      {error.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm"
        >
          {error.general}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {loginStage === "credentials" ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Username or Email
              </label>
              <input
                name="usernameOrEmail"
                onChange={handleChange}
                required
                placeholder="Enter your username or email"
                aria-label="Username or Email"
                aria-invalid={error.usernameOrEmail ? "true" : "false"}
                className={`w-full px-3 py-2 border ${
                  error.usernameOrEmail
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200`}
              />
              {error.usernameOrEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {error.usernameOrEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  aria-label="Password"
                  aria-invalid={error.password ? "true" : "false"}
                  className={`w-full px-3 py-2 border ${
                    error.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex="0"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Eye className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
              </div>
              {error.password && (
                <p className="mt-1 text-sm text-red-600">{error.password}</p>
              )}
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              2FA Code
            </label>
            <input
              name="totp"
              onChange={handleChange}
              required
              placeholder="Enter your 6-digit code"
              aria-label="2FA Code"
              aria-invalid={error.totp ? "true" : "false"}
              className={`w-full px-3 py-2 border ${
                error.totp
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200`}
            />
            {error.totp && (
              <p className="mt-1 text-sm text-red-600">{error.totp}</p>
            )}
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          aria-label={
            isLoading
              ? "Loading"
              : loginStage === "credentials"
              ? "Continue to 2FA"
              : "Complete sign in"
          }
          className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading
            ? "Loading..."
            : loginStage === "credentials"
            ? "Continue"
            : "Sign In"}
        </motion.button>

        {loginStage === "totp" && (
          <button
            type="button"
            onClick={() => setLoginStage("credentials")}
            className="w-full mt-2 text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            aria-label="Back to login form"
            tabIndex="0"
          >
            Back to Login
          </button>
        )}
      </form>

      <div className="mt-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <SocialButton
            icon={FcGoogle}
            onClick={handleGoogleLogin}
            label="Sign in with Google"
          />
          <SocialButton
            icon={BsMicrosoft}
            onClick={handleMicrosoftLogin}
            label="Sign in with Microsoft"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
