import { useState, useEffect, useCallback } from "react";
import SideBarLayout from "../../components/AdminPage/SideBar/SideBarLayout";
import ChatLayout from "../../components/AdminPage/Chat/ChatLayout";
import Header from "../../components/AdminPage/header/Header";

export default function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <SideBarLayout
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main
          className={`flex-1 p-5 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}
          `}
        >
          <ChatLayout />
        </main>
      </div>
    </div>
  );
}
