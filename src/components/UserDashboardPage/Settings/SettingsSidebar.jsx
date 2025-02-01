import React from "react";
import { Link } from "react-router-dom";

export default function SettingsSidebar({ activePath }) {
  return (
    <div className="w-64 border-r border-dashed border-gray-200 h-screen overflow-hidden">
      <nav className="flex flex-col pl-6 py-4 pr-4 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-2">ACCOUNT</h3>
          <div className="space-y-1">
            <Link
              to="/user/settings/profile"
              className={`flex items-center text-sm ${
                activePath === "/user/settings" ||
                activePath.includes("profile")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              } px-3 py-2 rounded-md`}
            >
              My Profile
            </Link>
            <Link
              to="/user/settings/general"
              className={`flex items-center text-sm ${
                activePath.includes("general")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              } px-3 py-2 rounded-md`}
            >
              General
            </Link>
          </div>
        </div>

        {/* Workspace Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-2">WORKSPACE</h3>
          <div className="space-y-1">
            <Link
              to="/user/settings/security"
              className={`flex items-center text-sm ${
                activePath.includes("security")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              } px-3 py-2 rounded-md`}
            >
              Security
            </Link>
            <Link
              to="/user/settings/billing"
              className={`flex items-center text-sm ${
                activePath.includes("billing")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              } px-3 py-2 rounded-md`}
            >
              Billing
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
