import React from "react";
import { Link } from "react-router-dom";

const NavigationItem = React.memo(({ item, isActive, isOpen }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm
      ${
        isActive
          ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      } 
      ${isOpen ? "justify-start" : "justify-center"}`}
    >
      <Icon
        className={`h-5 w-5 ${
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      />
      {isOpen && <span className="whitespace-nowrap">{item.title}</span>}
    </Link>
  );
});

NavigationItem.displayName = "NavigationItem";
export default NavigationItem;
