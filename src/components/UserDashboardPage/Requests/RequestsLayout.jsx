import MetricCards from "./MetricCards/MetricCards";
import FilterNSearch from "./FilterNSearch/FilterNSearch";
import Table from "./Table/Table";
import { useRequests } from "@/contexts/Requests/RequestContext";

export default function RequestsLayout() {
  const { requests, error } = useRequests();
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
            <Table />
          </>
        )}
      </div>
    </div>
  );
}
