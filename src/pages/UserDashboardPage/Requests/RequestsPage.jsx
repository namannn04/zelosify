"use client";
import RequestsLayout from "@/components/UserDashboardPage/Requests/RequestsLayout";

export default function RequestPage() {
  return (
    <div className="w-full">
      <RequestsLayout />
    </div>
  );
}

// Force server-side rendering to prevent static generation issues with Redux
export async function getServerSideProps() {
  return {
    props: {},
  };
}
