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
    <>
      {/* Overlay blurred warning */}
      <div className="fixed h-screen w-full inset-0 lg:hidden flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
        <div className="text-center text-white">
          <h2 className="text-2xl font-semibold">Site Under Development</h2>
          <p className="mt-2 text-lg opacity-80">
            Our site is currently optimized for larger screens.
          </p>
          <p className="text-lg opacity-80">
            Please visit on a desktop for the best experience.
          </p>
        </div>
      </div>

      {/* main content */}
      <div className="hidden lg:flex flex-col min-h-screen bg-gray-50">
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
    </>
  );
}
