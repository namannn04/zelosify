"use client";

import { useCallback, useState } from "react";
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
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError({});
      setIsLoading(true);

      try {
        const res = await axiosInstance.post("/auth/login", formData);

        if (res.data.message === "Login successful") {
          router.push("/totp");
        }
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;

          if (status === 401) {
            setError({ password: "Invalid password" });
          } else {
            setError({ general: data?.message || "Login failed" });
          }
        } else {
          setError({ general: "Network error. Please try again." });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router]
  );

  const handleGoogleLogin = useCallback(async () => {
    try {
      const resp = await axiosInstance.get("/auth/google/login");
      window.location.href = resp.data.authUrl;
    } catch (err) {
      setError("Failed to initiate Google login");
    }
  }, []);

  const handleMicrosoftLogin = useCallback(async () => {
    try {
      const resp = await axiosInstance.get("/auth/microsoft/login");
      window.location.href = resp.data.authUrl;
    } catch (err) {
      setError("Failed to initiate Microsoft login");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 border border-border p-8 rounded-xl shadow-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div>
          <img
            src={"/assets/logos/zelosify_Dark.png"}
            alt="Zelosify Light Logo"
            width={120}
            height={40}
            className="object-contain block dark:hidden"
          />
          <img
            src={"/assets/logos/main-logo.png"}
            alt="Zelosify Dark Logo"
            width={120}
            height={40}
            className="object-contain hidden dark:block"
          />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
          Welcome Back
        </h1>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Username or Email
          </label>
          <input
            name="usernameOrEmail"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6" />
              ) : (
                <Eye className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-foreground text-background py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </motion.button>
      </form>

      <div className="mt-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-primary">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <SocialButton
            icon={FcGoogle}
            onClick={handleGoogleLogin}
            label="Google"
          />
          <SocialButton
            icon={BsMicrosoft}
            onClick={handleMicrosoftLogin}
            label="Microsoft"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-primary">
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
