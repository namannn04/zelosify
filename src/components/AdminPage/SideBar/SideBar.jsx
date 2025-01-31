import React, { useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  FileText,
  LineChart,
  MessageSquare,
  Settings,
} from "lucide-react";
import NavigationItem from "./NavigationItem";
import SidebarHeader from "./SidebarHeader";
import UserProfile from "./UserProfile";

const navigationItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: BarChart },
  { title: "Pages", href: "/admin/pages", icon: FileText },
  { title: "Analytics", href: "/admin/analytics", icon: LineChart },
  { title: "Messages", href: "/admin/messages", icon: MessageSquare },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

const Sidebar = React.memo(({ isOpen, toggleSidebar }) => {
  const location = useLocation();
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

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "5rem" },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.aside
        ref={sidebarRef}
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-50 bg-white border-r shadow-lg flex flex-col h-screen"
      >
        <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="space-y-8">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.title}
                item={item}
                isActive={location.pathname === item.href}
                isOpen={isOpen}
              />
            ))}
          </nav>
        </div>

        <div className="border-t p-4">
          <UserProfile isCollapsed={!isOpen} />
        </div>
      </motion.aside>
    </>
  );
});

export default Sidebar;
