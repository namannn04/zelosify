import {
  LayoutDashboard,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function AdminSidebar({ currentPath }) {
  const navItems = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Transactions", href: "/admin/transactions", icon: CreditCard },
    { title: "Messages", href: "/admin/messages", icon: MessageCircle },
    { title: "Invoices", href: "/admin/invoices", icon: FileText },
    { title: "Sales Tracking", href: "/admin/sales-tracking", icon: BarChart3 },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen bg-background text-foreground p-4 fixed border-r border-dashed border-border">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Zelosify Admin</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ title, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              currentPath === href
                ? "bg-emerald-500 text-foreground font-semibold"
                : "text-secondary hover:bg-white/10"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center 
                ${currentPath === href ? "bg-emerald-400" : "bg-white/10"}`}
            >
              <Icon className="w-4 h-4" />
            </div>
            {title}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-8 left-4">
        <button className="flex items-center gap-3 text-secondary p-3 rounded-lg hover:bg-white/10">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
