import { ChevronDown } from "lucide-react";

export default function General() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">
          My Notifications
        </h2>

        <div className="space-y-8">
          {/* Notification Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-500">Notify me when...</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">
                  Daily productivity update
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">New event created</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">
                  When added on new team
                </span>
              </label>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Mobile push notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Receive push notification whenever your organisation requires
                  your attentions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Desktop Notification
                </h3>
                <p className="text-sm text-gray-500">
                  Receive desktop notification whenever your organisation
                  requires your attentions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Email Notification
                </h3>
                <p className="text-sm text-gray-500">
                  Receive email whenever your organisation requires your
                  attentions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>

          {/* My Settings Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">My Settings</h2>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Appearance
                </h3>
                <p className="text-sm text-gray-500">
                  Customize how you theams looks on your device.
                </p>
              </div>
              <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                Light
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Two-factor authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Keep your account secure by enabling 2FA via SMS or using a
                  temporary one-time passcode (TOTP).
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Language</h3>
                <p className="text-sm text-gray-500">
                  Customize how you theams looks on your device.
                </p>
              </div>
              <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                English
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
