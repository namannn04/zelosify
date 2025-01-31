import { memo } from "react"
import { Bell, Search } from "lucide-react"
import { motion } from "framer-motion"
import UserProfile from "./UserProfile"

const Header = memo(({ toggleSidebar, isSidebarOpen }) => {
  return (
    <motion.header
      className="sticky top-0 z-50 bg-white border-b"
      initial={false}
      animate={{
        paddingLeft: isSidebarOpen ? "16rem" : "5rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="hidden md:flex items-center max-w-md flex-1">
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 w-full bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <UserProfile />
        </div>
      </div>
    </motion.header>
  )
})

Header.displayName = "Header"
export default Header

