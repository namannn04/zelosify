import ProfileImage from "@/components/UI/ProfileImage";
import { User, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useAuth } from "@/store/authSlice";

const UserProfile = memo(
  ({ toggleNotifications, isProfileOpen, toggleProfile, profileRef }) => {
    const router = useRouter();
    const { handleOpenSignoutConfirmation } = useAuth();

    return (
      <div className="relative" ref={profileRef}>
        {/* Profile Button */}
        <button
          onClick={toggleProfile}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="relative">
            <ProfileImage className="w-8 h-8" />
            {/* Blue Notification Dot on Top-Right of Profile Image */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
          </div>

          <span className="font-medium text-sm text-gray-700 dark:text-gray-200 hidden sm:inline">
            Abdulla
          </span>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg dark:shadow-gray-900/20 py-1 border border-border">
            {/* Profile Info */}
            <div className="px-4 py-2 text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Abdulla
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                @abdulla123
              </p>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800"></div>

            {/* Profile Settings */}
            <button
              onClick={() => {
                router.push("/user/settings");
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </button>

            {/* Notifications */}

            <button
              onClick={toggleNotifications}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            >
              <div className="relative">
                <Bell className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-300" />

                <span className="absolute -top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
              <span>Notifications</span>
            </button>

            <div className="border-t border-gray-100 dark:border-gray-800"></div>

            {/* Logout */}
            <button
              onClick={handleOpenSignoutConfirmation}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              role="menuitem"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    );
  }
);

UserProfile.displayName = "UserProfile";
export default UserProfile;
