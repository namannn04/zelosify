import React, { useState, useRef, useEffect } from "react"
import { User, Bell, LogOut } from "lucide-react"

function UserProfile({ isCollapsed }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium mr-2">
          JD
        </div>
        {!isCollapsed && (
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900">John Doe</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        )}
      </button>
      {isDropdownOpen && !isCollapsed && (
        <div className="absolute bottom-full left-0 mb-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 text-sm text-gray-700">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@example.com</p>
            </div>
            <div className="border-t border-gray-100"></div>
            <button
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
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(UserProfile)

