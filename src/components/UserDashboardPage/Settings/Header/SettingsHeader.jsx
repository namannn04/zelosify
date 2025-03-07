import Link from "next/link";

export default function SettingsHeader({ activePath }) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-dashed border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center">
        <Link
          href="/user/settings"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Settings
        </Link>
        <svg
          className="mx-2 h-4 w-4 text-gray-400 dark:text-gray-500"
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
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activePath?.includes("profile") ||
          (activePath && activePath === "/user/settings")
            ? "Profile"
            : activePath?.includes("general")
            ? "General"
            : activePath?.includes("security")
            ? "Security"
            : activePath?.includes("billing")
            ? "Billing"
            : activePath?.includes("people")
            ? "People"
            : "Profile"}
        </span>
      </div>
    </header>
  );
}
