"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SetupTOTP() {
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTOTP = localStorage.getItem("totpSetup");
    if (storedTOTP) {
      const parsedTOTP = JSON.parse(storedTOTP);
      setQrCode(parsedTOTP.qrCode || "");
    } else {
      setError("TOTP setup data not found. Please register again.");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Setup Two-Factor Authentication
      </h1>

      {error ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm"
        >
          {error}
        </motion.div>
      ) : (
        <div className="space-y-6">
          {qrCode && (
            <div className="flex justify-center">
              <img
                src={qrCode || "/placeholder.svg"}
                alt="TOTP QR Code"
                className="border-4 border-white dark:border-gray-700 rounded-lg"
              />
            </div>
          )}

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p className="text-sm">
              1. Scan this QR code using your preferred authenticator app:
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>Google Authenticator</li>
                <li>Authy</li>
                <li>Microsoft Authenticator</li>
              </ul>
            </p>
            <p className="text-sm">
              2. Once scanned, you'll see a 6-digit code that changes every 30
              seconds.
            </p>
            <p className="text-sm">
              3. You'll need this code every time you sign in.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            Proceed to Login
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
