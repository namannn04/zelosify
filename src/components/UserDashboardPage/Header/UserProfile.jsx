import React, { useState, useRef, useEffect } from "react";
import { User, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";

const UserProfile = React.memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <ProfileImage className={"w-8 h-8 "} />
        <span className="font-medium text-sm text-gray-700 hidden sm:inline">
          John Doe
        </span>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <div className="px-4 py-2 text-sm text-gray-700">
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-500">@johndoe123</p>
          </div>
          <div className="border-t border-gray-100"></div>
          <button
            onClick={() => {
              navigate("/user/settings/profile");
              setIsDropdownOpen(false);
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </button>
          <button
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </button>
          <div className="border-t border-gray-100"></div>
          <button
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            role="menuitem"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
});

UserProfile.displayName = "UserProfile";
export default UserProfile;
