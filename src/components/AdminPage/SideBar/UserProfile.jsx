import { useState, useRef, useEffect } from "react"
import { Settings, User, Bell, LogOut } from "lucide-react"

function UserProfile({ isCollapsed }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center gap-3 w-full rounded-md p-2 hover:bg-gray-100 transition-all duration-200
        ${isCollapsed ? "justify-center" : "justify-start"}`}
      >
        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-medium">
          JD
        </div>
        {!isCollapsed && (
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && !isCollapsed && (
        <div className="absolute bottom-full left-0 w-64 mb-2 bg-white rounded-md shadow-lg border border-gray-200 py-2 transition-all duration-200 ease-in-out transform origin-bottom-left">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <User className="mr-3 h-4 w-4" />
            Your Profile
          </button>
          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <Bell className="mr-3 h-4 w-4" />
            Notifications
          </button>
          
          <div className="border-t border-gray-200 mt-2 pt-2">
            <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile

