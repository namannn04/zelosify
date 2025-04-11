"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";
import SocialButton from "@/components/UI/SocialButton";
import Link from "next/link";
import axiosInstance from "@/utils/axios/AxiosInstance";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    totp: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginStage, setLoginStage] = useState("credentials"); // 'credentials' or 'totp'
  const router = useRouter();

  // Check if user already has auth tokens and redirect if needed
  useEffect(() => {
    // Check cookies directly
    const cookies = document.cookie.split(";");
    const hasAccessToken = cookies.some((item) =>
      item.trim().startsWith("access_token=")
    );
    const hasRefreshToken = cookies.some((item) =>
      item.trim().startsWith("refresh_token=")
    );

    console.log("Login page - Auth token check:");
    console.log("- Access token:", hasAccessToken);
    console.log("- Refresh token:", hasRefreshToken);

    // If already authenticated, redirect to user dashboard
    if (hasAccessToken || hasRefreshToken) {
      console.log("Already authenticated! Redirecting to dashboard...");
      window.location.href = "/user";
    }
  }, []);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError({});
      setIsLoading(true);

      if (loginStage === "credentials") {
        // Step 1: Verify username/email and password
        try {
          console.log("Verifying credentials for:", formData.usernameOrEmail);
          const res = await axiosInstance.post("/auth/verify-login", {
            usernameOrEmail: formData.usernameOrEmail,
            password: formData.password,
          });

          console.log("Verify login response:", res.data);
          if (
            res.data.message === "Login verified. Please enter your TOTP code."
          ) {
            // Move to TOTP verification stage
            setLoginStage("totp");
          } else if (res.data.message === "Authentication successful") {
            window.location.replace("/user");
          }
        } catch (err) {
          console.error("Login verification error:", err);

          if (err.response) {
            const { status, data } = err.response;
            console.error(`Login verify status: ${status}, message:`, data);

            if (status === 401) {
              setError({ password: "Invalid credentials" });
            } else {
              setError({
                general: data?.message || "Login verification failed",
              });
            }
          } else {
            setError({ general: "Network error. Please try again." });
          }
        } finally {
          setIsLoading(false);
        }
      } else if (loginStage === "totp") {
        // Step 2: Verify TOTP code
        try {
          console.log("Submitting TOTP code:", formData.totp);
          const res = await axiosInstance.post("/auth/verify-totp", {
            totp: formData.totp,
          });

          console.log("TOTP verification successful:", res.data);

          // Ensure we redirect properly regardless of the exact message
          if (res.status === 200) {
            console.log(
              "Authentication successful, redirecting to dashboard..."
            );

            // Force a small delay to ensure cookies are set
            setTimeout(() => {
              // Try multiple approaches to ensure redirection works
              try {
                window.location.replace("/user");
              } catch (e) {
                console.error("Redirect failed with replace, trying href:", e);
                window.location.href = "/user";
              }
            }, 500);
          }
        } catch (err) {
          console.error("TOTP verification error:", err);

          if (err.response) {
            const { status, data } = err.response;
            console.error(`TOTP verify status: ${status}, message:`, data);

            if (status === 401 && data?.message === "Invalid TOTP code") {
              setError({ totp: "Invalid 2FA code. Please try again." });
            } else if (
              status === 400 &&
              data?.message === "Temp token and TOTP are required"
            ) {
              setError({ general: "Session expired. Please login again." });
              setLoginStage("credentials");
            } else {
              setError({
                general:
                  data?.message ||
                  "TOTP verification failed. Please try logging in again.",
              });
              // If we get here, there might be an issue with the session/cookies
              setTimeout(() => {
                setLoginStage("credentials");
              }, 3000);
            }
          } else {
            setError({
              general:
                "Network error. Please check your connection and try again.",
            });
          }
        } finally {
          setIsLoading(false);
        }
      }
    },
    [formData, loginStage, router]
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
            src={"/assets/logos/zelosify_Dark.png"}
            alt="Zelosify Dark Logo"
            width={120}
            height={40}
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Welcome Back
        </h1>
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
