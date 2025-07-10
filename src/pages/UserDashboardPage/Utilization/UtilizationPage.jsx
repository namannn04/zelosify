"use client";

import dynamic from 'next/dynamic';

const UtilizationLayout = dynamic(
  () => import("@/components/UserDashboardPage/Utilization/UtilizationLayout"),
  { ssr: false }
);

export default function UtilizationPage() {
  return (
    <div className="w-full">
      <UtilizationLayout />
    </div>
  );
}