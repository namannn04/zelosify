import { useEffect } from "react";
import Sidebar from "./SideBar";

function SideBarLayout({ setSignOutPopUp, isSidebarOpen, toggleSidebar }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !isSidebarOpen) {
        toggleSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <Sidebar
      setSignOutPopUp={setSignOutPopUp}
      isOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
    />
  );
}

export default SideBarLayout;
