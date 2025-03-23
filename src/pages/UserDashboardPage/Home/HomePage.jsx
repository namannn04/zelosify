"use client";

import { useState, useEffect } from "react";
import HomeLayout from "@/components/UserDashboardPage/Home/HomeLayout";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

export default function UserDashboardHomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircleLoader />
      </div>
    );
  }

  return <HomeLayout />;
}
