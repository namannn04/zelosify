"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";
import SocialButton from "@/components/UI/SocialButton";
import Link from "next/link";
import axiosInstance from "@/utils/Axios/AxiosInstance";
import useAuth from "@/hooks/Auth/useAuth";
import BoxHeader from "./BoxHeader";
import LoginForm from "./LoginForm";

export default function LoginLayout() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    totp: "",
  });
  const [error, setError] = useState({});
  const [loginStage, setLoginStage] = useState("credentials"); // 'credentials' or 'totp'

  // Use our custom auth hook instead of direct Redux access
  const {
    user,
    loading: isLoading,
    error: authError,
    handleLogin,
    handleVerifyTOTP,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

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
      <BoxHeader />

      {error.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm"
        >
          {error.general}
        </motion.div>
      )}

      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loginStage={loginStage}
        isLoading={isLoading}
        error={error}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        setLoginStage={setLoginStage}
      />

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
