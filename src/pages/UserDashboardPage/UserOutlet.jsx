import { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/UserDashboardPage/Header/Header";
import SideBarLayout from "../../components/UserDashboardPage/SideBar/SideBarLayout";

export default function UserOutlet() {
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
          className={`flex-1 flex-center w-full px-2 ${
            isSidebarOpen ? "ml-64 lg:ml-64" : "ml-20 lg:ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
