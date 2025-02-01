import React from "react";
import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

const NavigationItem = React.memo(({ item, isActive, isOpen }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ease-in-out text-sm
      ${
        isActive
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      } 
      ${isOpen ? "justify-start" : "justify-center"}`}
    >
      <Icon
        className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-500"}`}
      />
      {/* <AnimatePresence> */}
      {isOpen && (
        <span
          // initial={{ opacity: 0, width: 0 }}
          // animate={{ opacity: 1, width: "auto" }}
          // exit={{ opacity: 0, width: 0 }}
          // transition={{ duration: 0.2 }}
          className="whitespace-nowrap"
        >
          {item.title}
        </span>
      )}
      {/* </AnimatePresence> */}
    </Link>
  );
});

NavigationItem.displayName = "NavigationItem";
export default NavigationItem;
