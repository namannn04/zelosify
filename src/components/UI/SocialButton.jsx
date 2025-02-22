import React from "react"
import { motion } from "framer-motion"

const SocialButton = React.memo(({ icon: Icon, onClick, label }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.button>
))

SocialButton.displayName = "SocialButton"
export default SocialButton

