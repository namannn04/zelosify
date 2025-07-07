"use client";
import UtilizationLayout from "@/components/UserDashboardPage/Utilization/UtilizationLayout";

export default function UtilizationPage() {
  return (
    <div className="w-full">
      <UtilizationLayout />
    </div>
  );
}

// Force server-side rendering to prevent static generation issues with Redux
export async function getServerSideProps() {
  return {
    props: {},
  };
}
