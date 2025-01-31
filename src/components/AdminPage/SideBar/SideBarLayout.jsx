import { useEffect } from "react";
import Sidebar from "./SideBar";

function SideBarLayout({ isSidebarOpen, toggleSidebar }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !isSidebarOpen) {
        toggleSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen, toggleSidebar]);

  return <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
}

export default SideBarLayout;
