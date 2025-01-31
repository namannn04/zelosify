import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Logo from "../../../assets/logos/zelosify_Dark.png";

// eslint-disable-next-line react/display-name
const SidebarHeader = React.memo(({ isOpen, toggleSidebar }) => (
  <div className="h-16 border-b flex items-center justify-between px-4">
    <AnimatePresence>
      {isOpen && (
        <motion.h2
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className="text-lg font-semibold text-gray-900 overflow-hidden whitespace-nowrap"
        >
          <img
            src={Logo}
            alt="Zelosify Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </motion.h2>
      )}
    </AnimatePresence>
    <button
      onClick={toggleSidebar}
      className={`p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center ${
        isOpen ? "" : "w-full"
      }`}
    >
      {isOpen ? (
        <X className="h-5 w-5 text-gray-600" />
      ) : (
        <Menu className="h-5 w-5 text-gray-600" />
      )}
    </button>
  </div>
));

export default SidebarHeader;
