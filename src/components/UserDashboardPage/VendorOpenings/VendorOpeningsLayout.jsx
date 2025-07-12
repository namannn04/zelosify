"use client"
import OpeningsTable from "./OpeningsTable/OpeningsTable";
import useVendorOpenings from "@/hooks/Dashboard/Vendor/useVendorOpenings";
import { useRef, useEffect } from "react";

export default function VendorOpeningsLayout() {
  const {
    openings,
    loading,
    error,
    pagination,
    handleFetchOpenings,
    handleChangePage,
  } = useVendorOpenings();

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      handleFetchOpenings();
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen text-foreground bg-background">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Contract Openings</h1>

        {error && (!openings || !openings.length) ? (
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        ) : (
          <OpeningsTable
            openings={openings}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handleChangePage}
          />
        )}
      </div>
    </div>
  );
} 