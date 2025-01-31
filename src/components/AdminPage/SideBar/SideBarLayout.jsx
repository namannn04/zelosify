import { useState } from "react"
import Sidebar from "./SideBar"

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out p-4 lg:p-8">{children}</main>
    </div>
  )
}

export default Layout

