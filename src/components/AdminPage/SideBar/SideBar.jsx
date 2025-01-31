import React, { useEffect, useCallback } from "react"
import { Link, useLocation } from "react-router-dom"
import { BarChart, FileText, LineChart, MessageSquare, Settings, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import UserProfile from "./UserProfile"

const navigationItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: BarChart },
  { title: "Pages", href: "/admin/pages", icon: FileText },
  { title: "Analytics", href: "/admin/analytics", icon: LineChart },
  { title: "Messages", href: "/admin/messages", icon: MessageSquare },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

const NavigationItem = React.memo(({ item, isActive, isOpen }) => {
  const Icon = item.icon
  return (
    <Link
      to={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out text-sm 
      ${isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"} 
      ${isOpen ? "justify-start" : "justify-center"}`}
    >
      <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            {item.title}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
})

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
          Dashboard
        </motion.h2>
      )}
    </AnimatePresence>
    <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
      <Menu className="h-5 w-5 text-gray-600" />
    </button>
  </div>
))

const Sidebar = React.memo(({ isOpen, toggleSidebar }) => {
  const location = useLocation()

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024 && !isOpen) {
      toggleSidebar()
    }
  }, [isOpen, toggleSidebar])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "5rem" },
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-20 lg:hidden z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-50 bg-white border-r shadow-lg flex flex-col h-screen"
      >
        <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-y-auto py-4 px-2">
          <nav className="space-y-8">
            {navigationItems.map((item) => (
              <NavigationItem key={item.title} item={item} isActive={location.pathname === item.href} isOpen={isOpen} />
            ))}
          </nav>
        </div>

        <div className="border-t p-4">
          <UserProfile isCollapsed={!isOpen} />
        </div>
      </motion.aside>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 lg:hidden z-50 p-2 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </>
  )
})

export default Sidebar

