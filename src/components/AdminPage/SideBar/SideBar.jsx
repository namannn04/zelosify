import { useState, useEffect } from "react";
import { BarChart, FileText, LineChart, MessageSquare, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";

const navigationItems = [
  { title: "Top Vendors Statistics", icon: BarChart, href: "/top-vendors" },
  { title: "Contract Details", icon: FileText, href: "/contracts" },
  { title: "Insights Report", icon: LineChart, href: "/insights" },
  { title: "Internal", icon: MessageSquare, href: "/internal" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

function Sidebar({ isOpen, toggleSidebar }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 lg:hidden transition-opacity duration-300 ease-in-out z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform bg-white text-gray-900 border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-20" : "w-64"}
        lg:translate-x-0 lg:static lg:z-auto h-screen flex flex-col justify-between`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <h2 className={`text-base font-medium transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}>
            Dashboard
          </h2>
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center w-8 h-8"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-4 space-y-10">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ease-in-out text-sm
                ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"}`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                <span className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 p-4">
          <UserProfile isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 lg:hidden z-50 p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
      >
        ☰
      </button>
    </>
  );
}

export default Sidebar;
