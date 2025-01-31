import { useState } from "react"
import { Header } from "../../components/AdminPage/header/header"
import SideBarLayout from "../../components/AdminPage/SideBar/SideBarLayout"
import { Chat } from "../../components/AdminPage/Chat/chat"


export default function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <SideBarLayout toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 p-4 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}
        >
          <Chat />
        </main>
      </div>
    </div>
  )
}

