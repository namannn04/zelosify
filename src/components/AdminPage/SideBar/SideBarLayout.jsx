import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"

function SideBarLayout({ toggleSidebar: parentToggle }) {
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
    if (parentToggle) {
      parentToggle()
    }
  }

  return <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
}

export default SideBarLayout

