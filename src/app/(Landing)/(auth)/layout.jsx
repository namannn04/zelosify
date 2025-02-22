"use client";
import { motion } from "framer-motion";
import { memo } from "react";

const AuthLayout = memo(({ children }) => (
  <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {children}
      </motion.div>
    </div>
  </div>
));

export default AuthLayout;
