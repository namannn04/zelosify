import Link from "next/link";

export default function SettingsSidebar({ activePath }) {
  return (
    <div className="w-64 border-r border-dashed border-gray-200 dark:border-gray-700 h-screen overflow-hidden">
      <nav className="flex flex-col pl-6 py-4 pr-4 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            ACCOUNT
          </h3>
          <div className="space-y-1">
            <Link
              href="/user/settings"
              className={`flex items-center text-sm ${
                activePath === "/user/settings" ||
                activePath?.includes("profile")
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              } px-3 py-2 rounded-md`}
            >
              My Profile
            </Link>
            <Link
              href="/user/settings/general"
              className={`flex items-center text-sm ${
                activePath?.includes("general")
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              } px-3 py-2 rounded-md`}
            >
              General
            </Link>
          </div>
        </div>

        {/* Workspace Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            WORKSPACE
          </h3>
          <div className="space-y-1">
            <Link
              href="/user/settings/security"
              className={`flex items-center text-sm ${
                activePath?.includes("security")
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              } px-3 py-2 rounded-md`}
            >
              Security
            </Link>
            <Link
              href="/user/settings/billing"
              className={`flex items-center text-sm ${
                activePath?.includes("billing")
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
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
