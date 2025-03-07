import { ChevronDown } from "lucide-react";

export default function General() {
  return (
    <div className="px-3 py-4 max-w-3xl">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-foreground mb-8">
          My Notifications
        </h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border dark:after:border-gray-700 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-gray-500"></div>
        </label>
      </div>

      <div className="space-y-8">
        {/* Notification Checkboxes */}
        <div className="space-y-4">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Notify me when...
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600"
                defaultChecked
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Daily productivity update
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600"
                defaultChecked
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                New event created
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600"
                defaultChecked
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                When added on new team
              </span>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-6">
          {/* Desktop Notification */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Desktop Notification
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive desktop notification whenever your organisation requires
                your attentions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border dark:after:border-gray-700 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-gray-500"></div>
            </label>
          </div>

          {/* Email Notification */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Email Notification
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive email whenever your organisation requires your
                attentions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border dark:after:border-gray-700 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-gray-500"></div>
            </label>
          </div>
        </div>

        {/* My Settings Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            My Settings
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Appearance
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize how you theams looks on your device.
              </p>
            </div>
            <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Light
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Language
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize how you theams looks on your device.
              </p>
            </div>
            <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              English
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
