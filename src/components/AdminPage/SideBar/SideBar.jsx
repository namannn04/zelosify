import React, { useEffect, useRef, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Plus, BarChart, FileText, LineChart, MessageSquare, Settings } from "lucide-react"
import NavigationItem from "./NavigationItem"
import SidebarHeader from "./SidebarHeader"
import ChatHistory from "./ChatHistory"

const navigationItems = [
  { title: "Home", href: "/admin/home", icon: Home },
  { title: "New Chat", href: "/admin/chat/new", icon: Plus },
  { title: "Dashboard", href: "/admin/dashboard", icon: BarChart },
  { title: "Pages", href: "/admin/pages", icon: FileText },
  { title: "Analytics", href: "/admin/analytics", icon: LineChart },
  { title: "Messages", href: "/admin/messages", icon: MessageSquare },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

const Sidebar = React.memo(({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  const sidebarRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen && window.innerWidth < 1024) {
        toggleSidebar()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, toggleSidebar])

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "5rem" },
  }

  const memoizedNavigationItems = useMemo(
    () =>
      navigationItems.map((item) => (
        <NavigationItem key={item.title} item={item} isActive={location.pathname === item.href} isOpen={isOpen} />
      )),
    [location.pathname, isOpen],
  )

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
        className="fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-lg flex flex-col h-screen"
      >
        <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className={`flex-1 overflow-hidden ${isOpen ? "custom-scrollbar" : ""}`}>
          <div className={`h-full ${isOpen ? "overflow-y-auto" : "overflow-y-hidden"}`}>
            <div className="px-3 py-4 space-y-1">{memoizedNavigationItems}</div>

            {isOpen && (
              <div className="px-3 py-4 border-t border-gray-200">
                <ChatHistory isOpen={isOpen} />
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
})

Sidebar.displayName = "Sidebar"
export default Sidebar

