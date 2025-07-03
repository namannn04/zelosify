"use client";
import VendorResourceLayout from "@/components/UserDashboardPage/Vendor/VendorResourceLayout";

export default function VendorResourcePage() {
  return (
    <div className="w-full">
      <VendorResourceLayout />
    </div>
  );
}

// Force server-side rendering to prevent static generation issues with Redux
export async function getServerSideProps() {
  return {
    props: {},
  };
}
