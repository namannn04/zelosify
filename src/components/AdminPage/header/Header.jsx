import { Menu } from "lucide-react"

export const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600">Welcome, Admin</span>
        </div>
      </div>
    </header>
  )
}

