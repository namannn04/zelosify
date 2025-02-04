import React from "react";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import LightLogo from "../../../assets/logos/zelosify_Dark.png";
import DarkLogo from "../../../assets/logos/main-logo.png";

// eslint-disable-next-line react/display-name
const SidebarHeader = React.memo(({ isOpen, toggleSidebar }) => (
  <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
    {isOpen && (
      <Link
        to={"/user"}
        className="text-lg font-bold text-gray-900 dark:text-gray-100 overflow-hidden whitespace-nowrap"
      >
        <img
          src={LightLogo}
          alt="Zelosify Light Logo"
          width={120}
          height={40}
          className="object-contain block dark:hidden"
        />
        <img
          src={DarkLogo}
          alt="Zelosify Dark Logo"
          width={120}
          height={40}
          className="object-contain hidden dark:block"
        />
      </Link>
    )}
    <button
      onClick={toggleSidebar}
      className={`rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center ${
        isOpen ? "" : "w-full"
      }`}
    >
      {isOpen ? (
        <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  </div>
));

export default SidebarHeader;
