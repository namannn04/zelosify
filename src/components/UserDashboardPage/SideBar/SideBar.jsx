import React, { useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  LogOut,
  MessageSquare,
  Settings,
  CreditCard,
  Truck,
  FileSignature,
  Headset,
} from "lucide-react";
import NavigationItem from "./NavigationItem";
import SidebarHeader from "./SidebarHeader";
import ChatHistory from "./ChatHistory";

const overviewItems = [
  { title: "Dashboard", href: "/user", icon: BarChart },
  { title: "Messages", href: "/user/messages", icon: MessageSquare },
];

const contractItems = [
  { title: "Payments", href: "/user/payments", icon: CreditCard },
  { title: "Tracking", href: "/user/tracking", icon: Truck },
  { title: "Requests", href: "/user/requests", icon: FileSignature },
];

const supportItem = {
  title: "Support",
  href: "/user/support",
  icon: Headset,
};

const settingsItem = {
  title: "Settings",
  href: "/user/settings",
  icon: Settings,
};
const signOutItem = { title: "Sign Out", href: "#", icon: LogOut };

const Sidebar = React.memo(({ setSignOutPopUp, isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpen &&
        window.innerWidth < 1024
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  const renderNavigationItems = (items) => {
    return items.map((item) => (
      <NavigationItem
        key={item.title}
        item={item}
        isActive={location.pathname === item.href}
        isOpen={isOpen}
      />
    ));
  };

  const memoizedOverviewItems = useMemo(
    () => renderNavigationItems(overviewItems),
    [location.pathname, isOpen, overviewItems] // Added overviewItems to dependencies
  );

  const memoizedContractItems = useMemo(
    () => renderNavigationItems(contractItems),
    [location.pathname, isOpen, contractItems] // Added contractItems to dependencies
  );

  return (
    <>
      {isOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`${
          isOpen ? "w-[16rem]" : "w-[5rem]"
        } fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col h-screen`}
      >
        <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`flex-1 overflow-hidden ${
            isOpen ? "custom-scrollbar" : ""
          }`}
        >
          <div
            className={`h-full ${
              isOpen ? "overflow-y-auto" : "overflow-y-hidden"
            }`}
          >
            <div className="px-3 py-4 space-y-4">
              {isOpen && (
                <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 px-4">
                  OVERVIEW
                </h2>
              )}
              <div className="space-y-1">{memoizedOverviewItems}</div>

              {isOpen && (
                <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 border-t border-dashed dark:border-gray-700 px-4 pt-6">
                  CONTRACTS
                </h2>
              )}
              <div className="space-y-1">{memoizedContractItems}</div>
            </div>

            {/* Chat history */}
            {isOpen && location.pathname === "/user/messages" && (
              <div className="px-3 py-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                <ChatHistory isOpen={isOpen} />
              </div>
            )}
          </div>
        </div>

        {/* Footer Section: Settings & Sign Out */}
        <div className="px-3 py-4 border-t border-dashed border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigate(supportItem.href)}
            className={`flex gap-2 items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <supportItem.icon className="h-5 w-5" />
            {isOpen && <span>{supportItem.title}</span>}
          </button>
          <button
            onClick={() => navigate(settingsItem.href)}
            className={`flex gap-2 items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <settingsItem.icon className="h-5 w-5" />
            {isOpen && <span>{settingsItem.title}</span>}
          </button>
          <button
            onClick={() => setSignOutPopUp((prev) => !prev)}
            className={`flex gap-2 items-center w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <signOutItem.icon className="h-5 w-5" />
            {isOpen && <span>{signOutItem.title}</span>}
          </button>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
