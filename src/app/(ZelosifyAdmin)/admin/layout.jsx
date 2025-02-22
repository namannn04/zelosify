"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/ZelosifyAdminPage/SideBar/AdminSidebar";
import AdminHeader from "@/components/ZelosifyAdminPage/Header/AdminHeader";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();

  // Dynamically map route paths to page titles
  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/transactions": "Transactions",
    "/admin/messages": "Messages",
    "/admin/invoices": "Invoices",
    "/admin/sales-tracking": "Sales Tracking",
    "/admin/settings": "Settings",
  };

  const pageTitle = pageTitles[pathname] || "Admin";

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <div className="flex bg-background">
        {/* Sidebar */}
        <AdminSidebar currentPath={pathname} />

        {/* Main Content */}
        <main className="ml-64 flex-1 py-3 px-4 bg-background">
          {/* Header */}
          <AdminHeader pageTitle={pageTitle} />
          {children}
        </main>
      </div>
    </div>
  );
}
