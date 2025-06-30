"use client";
import TrackingLayout from "@/components/UserDashboardPage/Tracking/TrackingLayout";

export default function TrackingPage() {
  return (
    <div className="w-full">
      <TrackingLayout />
    </div>
  );
}

// Force server-side rendering to prevent static generation issues with Redux
export async function getServerSideProps() {
  return {
    props: {},
  };
}
