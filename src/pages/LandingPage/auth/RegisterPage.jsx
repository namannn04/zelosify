"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SocialButton from "@/components/UI/SocialButton";
import axiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyName: "",
    department: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const validateForm = useCallback(() => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!validateForm()) return;

      setIsLoading(true);
      try {
        console.log("Submitting registration for:", formData.username);
        const requestData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          companyName: formData.companyName,
          department: formData.department,
          role: formData.role,
        };

        const res = await axiosInstance.post("/auth/register", requestData);
        console.log("Registration response:", res.data);

        localStorage.setItem(
          "totpSetup",
          JSON.stringify({
            qrCode: res.data.qrCode,
          })
        );

        window.location.href = "/setup-totp";
      } catch (err) {
        console.error("Registration error:", err);

        if (err.response) {
          const { status, data } = err.response;
          console.error(`Registration error status: ${status}, message:`, data);

          if (status === 400 && data.message === "User already exists.") {
            setError(
              "Username or email already in use. Please choose another."
            );
          } else {
            setError(data?.message || "Registration failed. Please try again.");
          }
        } else {
          setError(
            "Network error. Please check your connection and try again."
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm]
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
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <img
          src={"/assets/logos/zelosify_Dark.png"}
          alt="Zelosify Dark Logo"
          width={120}
          height={40}
        />

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Create Account
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Username
            </label>
            <input
              name="username"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <AiOutlineEye className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <AiOutlineEye className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Company Name
          </label>
          <input
            name="companyName"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Department
          </label>
          <input
            name="department"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Role
          </label>
          <select
            name="role"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="USER">User</option>
            <option value="MANAGER">Manager</option>
            <option value="SENIOR_MANAGER">Senior Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Create Account"}
        </motion.button>
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
            label="Sign up with Google"
          />
          <SocialButton
            icon={BsMicrosoft}
            onClick={handleMicrosoftLogin}
            label="Sign up with Microsoft"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
