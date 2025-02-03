import { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/UserDashboardPage/Header/Header";
import SideBarLayout from "../../components/UserDashboardPage/SideBar/SideBarLayout";
import SignOutConfirmation from "../../components/UI/SignOutConfirmation";

export default function UserOutlet() {
  const [signOutPopUp, setSignOutPopUp] = useState(false);
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
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md relative overflow-hidden mx-4">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-90" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Optimized for Larger Screens
            </h2>
            <p className="text-base text-gray-600">
              This site is designed for laptops and desktops to ensure the best
              experience. Please visit on a larger screen for full
              functionality.
            </p>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <SignOutConfirmation
          setSignOutPopUp={setSignOutPopUp}
          isOpen={signOutPopUp}
        />
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-1 overflow-hidden">
          <SideBarLayout
            setSignOutPopUp={setSignOutPopUp}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <main
            className={`relative flex-1 justify-between items-center w-full ${
              isSidebarOpen ? "ml-64 lg:ml-64" : "ml-20"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
