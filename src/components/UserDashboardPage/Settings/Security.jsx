import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Security() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Security</h2>

      {/* Password Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-1">Password</h3>
          <p className="text-sm text-gray-500">
            Please enter your current password to change your password
          </p>
        </div>

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button className="px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-800">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-12">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-1">
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-gray-500">
            Add an extra layer of security to your account
          </p>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Two-Factor Authentication
            </p>
            <p className="text-sm text-gray-500">
              {twoFactorEnabled
                ? "Two-factor authentication is enabled"
                : "Protect your account with 2FA"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>

      {/* Login History */}
      <div className="mb-12">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-1">
            Login History
          </h3>
          <p className="text-sm text-gray-500">
            Recent login activity on your account
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Today, 2:15 PM
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Chrome on Windows
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    San Francisco, US
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    192.168.1.1
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Yesterday, 4:30 PM
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Safari on macOS
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    New York, US
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    192.168.1.2
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Connected Devices */}
      <div>
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-1">
            Connected Devices
          </h3>
          <p className="text-sm text-gray-500">
            Devices that are currently logged into your account
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                💻
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  MacBook Pro - Chrome
                </p>
                <p className="text-sm text-gray-500">
                  Active now - San Francisco
                </p>
              </div>
            </div>
            <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700">
              Revoke
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                📱
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  iPhone 12 - Safari
                </p>
                <p className="text-sm text-gray-500">3 hours ago - New York</p>
              </div>
            </div>
            <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
