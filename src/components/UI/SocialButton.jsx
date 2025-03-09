"use client";
import { motion } from "framer-motion";
import { memo } from "react";

const SocialButton = memo(({ icon: Icon, onClick, label }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-tableHeader"
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.button>
));

SocialButton.displayName = "SocialButton";
export default SocialButton;
