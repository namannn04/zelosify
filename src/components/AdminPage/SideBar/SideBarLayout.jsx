import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out p-4 lg:p-8 ${
          isSidebarOpen ? "lg:ml-64" : "ml-20 lg:ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout

