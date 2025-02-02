import React, { useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  FileText,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import NavigationItem from "./NavigationItem";
import SidebarHeader from "./SidebarHeader";
import ChatHistory from "./ChatHistory";

const navigationItems = [
  { title: "Dashboard", href: "/user", icon: BarChart },
  { title: "Messages", href: "/user/messages", icon: MessageSquare },
  { title: "Contracts", href: "/user/contracts", icon: FileText },
];

// Separate Settings & Sign Out as standalone items
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

  // Memoized navigation items (Main Sidebar Items)
  const memoizedNavigationItems = useMemo(
    () =>
      navigationItems.map((item) => (
        <NavigationItem
          key={item.title}
          item={item}
          isActive={location.pathname === item.href}
          isOpen={isOpen}
        />
      )),
    [location.pathname, isOpen]
  );

  // Memoized footer items (Settings & Sign Out)
  const memoizedFooterItems = useMemo(
    () => (
      <div className="px-3 py-4 border-t border-dashed border-gray-200">
        {/* Settings - Prevent sidebar opening on click */}
        <button
          onClick={() => navigate(settingsItem.href)}
          className={`flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 transition ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <settingsItem.icon className="h-5 w-5" />
          {isOpen && <span className="ml-3">{settingsItem.title}</span>}
        </button>

        {/* Sign Out - Prevent sidebar opening on click */}
        <button
          onClick={() => setSignOutPopUp((prev) => !prev)}
          className={`flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <signOutItem.icon className="h-5 w-5" />
          {isOpen && <span className="ml-3">{signOutItem.title}</span>}
        </button>
      </div>
    ),
    [isOpen, navigate]
  );

  return (
    <>
      {/* <AnimatePresence> */}
      {isOpen && window.innerWidth < 1024 && (
        <div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          // transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={toggleSidebar}
        />
      )}
      {/* </AnimatePresence> */}

      <aside
        ref={sidebarRef}
        // initial={isOpen ? "open" : "closed"}
        // animate={isOpen ? "open" : "closed"}
        // variants={sidebarVariants}
        // transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${
          isOpen ? "w-[16rem]" : "w-[5rem]"
        } fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 shadow-lg flex flex-col h-screen`}
      >
        <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Chat history */}
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
            <div className="px-3 py-4 space-y-1">{memoizedNavigationItems}</div>

            {isOpen && (
              <div className="px-3 py-4 border-t border-dashed border-gray-200">
                <ChatHistory isOpen={isOpen} />
              </div>
            )}
          </div>
        </div>

        {/* Footer Section: Settings & Sign Out */}
        {memoizedFooterItems}
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
