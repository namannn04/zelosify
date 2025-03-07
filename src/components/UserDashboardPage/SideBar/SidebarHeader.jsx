import { X, Menu } from "lucide-react";
import { memo } from "react";
import Link from "next/link";

// eslint-disable-next-line react/display-name
const SidebarHeader = memo(({ isOpen, toggleSidebar }) => (
  <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex gap-7 items-center justify-between px-5">
    {isOpen && (
      <Link
        href={"/user"}
        className="text-lg font-bold text-gray-900 dark:text-gray-100 overflow-hidden whitespace-nowrap"
      >
        <img
          src={"/assets/logos/zelosify_Dark.png"}
          alt="Zelosify Light Logo"
          width={120}
          height={40}
          className="object-contain block dark:hidden"
        />
        <img
          src={"/assets/logos/main-logo.png"}
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
        <X className="h-7 w-7 p-1 text-gray-600 dark:text-gray-300" />
      ) : (
        <Menu className="h-7 w-7 p-1 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  </div>
));

export default SidebarHeader;
