"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/Axios/AxiosInstance";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

export default function SetupTOTP() {
  const [qrCode, setQrCode] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedTOTP = localStorage.getItem("totpSetup");
    if (storedTOTP) {
      try {
        const parsedTOTP = JSON.parse(storedTOTP);
        if (parsedTOTP.qrCode) {
          setQrCode(parsedTOTP.qrCode);
        } else {
          setError("Invalid TOTP setup data. Missing QR code.");
        }
      } catch (err) {
        setError("Failed to parse TOTP setup data.");
        console.error("TOTP parse error:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("TOTP setup data not found. Please register again.");
      setIsLoading(false);
    }
  }, []);

  const handleVerifyTOTP = async (e) => {
    e.preventDefault();

    if (!totpCode.trim()) {
      setError("Please enter the 6-digit code from your authenticator app");
      return;
    }

    if (totpCode.trim().length !== 6 || !/^\d+$/.test(totpCode.trim())) {
      setError("TOTP code must be 6 digits");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // The backend will use the registration_token cookie to identify the user
      console.log("Sending TOTP verification with code:", totpCode.trim());

      const response = await axiosInstance.post("/auth/verify-initial-totp", {
        totp: totpCode.trim(),
      });

      console.log("TOTP verification successful:", response.data);

      // Clear TOTP data from localStorage
      localStorage.removeItem("totpSetup");

      // Redirect to user dashboard
      router.push("/user");
    } catch (err) {
      console.error("TOTP verification error:", err);
      console.error("Error details:", err.response?.data);

      if (err.response?.status === 401) {
        setError("Invalid verification code. Please try again.");
      } else if (err.response?.status === 400) {
        setError("Registration session expired. Please register again.");
        setTimeout(() => router.push("/register"), 3000);
      } else if (err.response?.status === 500) {
        setError(
          "Backend server error. This is likely due to a configuration issue in the verifyInitialTOTP function. Please contact the administrator with this error message."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Verification failed. Please try again."
        );
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Setup Two-Factor Authentication
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <CircleLoader />
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm"
        >
          <p>{error}</p>
          <button
            onClick={() => router.push("/register")}
            className="mt-3 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            Back to Registration
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {qrCode && (
            <div className="flex justify-center">
              <img
                src={qrCode}
                alt="TOTP QR Code"
                className="border-4 border-white dark:border-gray-700 rounded-lg"
              />
            </div>
          )}

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div className="text-sm">
              <p>
                1. Scan this QR code using your preferred authenticator app:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>Google Authenticator</li>
                <li>Authy</li>
                <li>Microsoft Authenticator</li>
              </ul>
            </div>
            <p className="text-sm">
              2. Once scanned, you'll see a 6-digit code that changes every 30
              seconds.
            </p>
            <p className="text-sm">
              3. You'll need this code every time you sign in.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                Important: Keep your authenticator app safe. If you lose access,
                you may not be able to log in.
              </p>
            </div>
          </div>

          <form onSubmit={handleVerifyTOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isVerifying}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify & Complete Setup"}
            </motion.button>
          </form>
        </div>
      )}
    </motion.div>
  );
}
