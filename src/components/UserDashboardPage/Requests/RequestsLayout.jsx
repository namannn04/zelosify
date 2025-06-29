import MetricCards from "./MetricCards/MetricCards";
import FilterNSearch from "./FilterNSearch/FilterNSearch";
import Table from "./Table/Table";
import useRequests from "@/hooks/Dashboard/Requests/useRequests";
import { useRef, useEffect } from "react";

export default function RequestsLayout() {
  const {
    requests,
    loading,
    error,
    pagination,
    handleFetchRequests,
    handleChangePage,
  } = useRequests();

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      handleFetchRequests();
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen text-foreground bg-background">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Requests</h1>

        {error && (!requests || !requests.length) ? (
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        ) : (
          <>
            {/* Metrics Cards */}
            <MetricCards />

            {/* Filter and Search */}
            <FilterNSearch />

            {/* Table */}
            <Table
              requests={requests}
              loading={loading}
              error={error}
              pagination={pagination}
              onPageChange={handleChangePage}
            />
          </>
        )}
      </div>
    </div>
  );
}
