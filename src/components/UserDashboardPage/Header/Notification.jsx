import { X } from "lucide-react";

export default function Notification({
  notificationRef,
  setShowNotifications,
}) {
  return (
    <div
      ref={notificationRef}
      className="absolute right-6 mt-80 w-80 bg-white dark:bg-gray-900 rounded-md shadow-lg dark:shadow-gray-900/20 border border-border"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-medium text-gray-900 dark:text-white">
          Notifications
        </h3>
        <button
          onClick={() => setShowNotifications(false)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  New message from the team
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  2 hours ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
