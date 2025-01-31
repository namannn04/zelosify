import { useEffect } from "react"
import { BarChart, FileText, LineChart, MessageSquare, Settings, Menu } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { BsLayoutTextSidebar, BsLayoutTextSidebarReverse } from "react-icons/bs"
import UserProfile from "./UserProfile"

const navigationItems = [
  { title: "Top Vendors Statistics", icon: BarChart, href: "/top-vendors" },
  { title: "Contract Details", icon: FileText, href: "/contracts" },
  { title: "Insights Report", icon: LineChart, href: "/insights" },
  { title: "Internal", icon: MessageSquare, href: "/internal" },
  { title: "Settings", icon: Settings, href: "/settings" },
]

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !isOpen) {
        toggleSidebar()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen, toggleSidebar])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden transition-opacity duration-300 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-md transition-all duration-300 ease-in-out transform 
        ${isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-0 lg:w-20"} h-screen flex flex-col justify-between`}
      >
        <div className="relative h-16 border-b border-gray-200">
          <div className={`absolute inset-0 flex items-center ${isOpen ? "justify-between px-4" : "justify-center"}`}>
            <h2
              className={`text-base font-medium bg-black text-white px-3 py-1 rounded-md transition-opacity duration-300 
              ${isOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"}`}
            >
              Dashboard
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center w-10 h-10"
            >
              {isOpen ? (
                <BsLayoutTextSidebarReverse size={24} className="text-gray-600 hover:text-black" />
              ) : (
                <BsLayoutTextSidebar size={24} className="text-gray-600 hover:text-black" />
              )}
            </button>
          </div>
          {!isOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute inset-0 w-full h-full cursor-pointer"
              aria-label="Toggle Sidebar"
            />
          )}
        </div>

        <nav className="flex-1 py-4 px-4 space-y-8">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ease-in-out text-sm 
                ${isActive ? "bg-gray-100 text-black font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-black"} 
                ${isOpen ? "opacity-100" : "justify-center"}`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "text-black" : "text-gray-500 group-hover:text-black"}`} />
                <span className={isOpen ? "block" : "hidden"}>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <UserProfile isCollapsed={!isOpen} />
        </div>
      </aside>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 lg:hidden z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-200"
        >
          <Menu size={24} className="text-gray-600 hover:text-black" />
        </button>
      )}
    </>
  )
}

export default Sidebar

