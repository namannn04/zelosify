"use client";

import dynamic from "next/dynamic";
import CircleLoader from "@/components/UI/loaders/CircleLoader";
// Use dynamic import to avoid server component issues
const HomePage = dynamic(
  () => import("@/pages/UserDashboardPage/Home/HomePage"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <CircleLoader />
      </div>
    ),
  }
);

// Dashboard Page for default route "/user"
export default function UserDashboardHomePage() {
  return <HomePage />;
}
