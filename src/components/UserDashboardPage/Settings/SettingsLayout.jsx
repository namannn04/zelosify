"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SettingsHeader from "./Header/SettingsHeader";
import SettingsSidebar from "./SideBar/SettingsSidebar";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("/user/settings");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Top header with Settings > Current Page */}
      <SettingsHeader activePath={activePath} />

      {/* Main content area with sidebar and settings */}
      <div className="flex flex-1 overflow-hidden">
        {/* Settings Sidebar */}
        <SettingsSidebar activePath={activePath} />

        {/* Dynamic Settings Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
