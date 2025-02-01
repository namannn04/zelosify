import { useLocation, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import SettingsSidebar from "./SettingsSidebar";

export default function SettingsLayout() {
  const location = useLocation();
  const [activePath, setActivePath] = useState("/user/settings/profile");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top header with Settings > Current Page */}
      <header className="bg-white border-b border-dashed border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-900">Settings</span>
          <svg
            className="mx-2 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-sm text-gray-500">
            {activePath.includes("profile") || activePath === "/user/settings"
              ? "My Profile"
              : activePath.includes("general")
              ? "General"
              : activePath.includes("security")
              ? "Security"
              : activePath.includes("billing")
              ? "Billing"
              : "My Profile"}
          </span>
        </div>
      </header>

      {/* Main content area with sidebar and settings */}
      <div className="flex flex-1 overflow-hidden">
        {/* Settings Sidebar */}
        <SettingsSidebar activePath={activePath} />

        {/* Dynamic Settings Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
