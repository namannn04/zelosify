"use client";

import { useState, useEffect } from "react";
import HomeLayout from "@/components/UserDashboardPage/Home/HomeLayout";

export default function UserDashboardHomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return <HomeLayout />;
}
