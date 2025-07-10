"use client";

import { useEffect } from "react";
import useUtilization from "@/hooks/Dashboard/Utilization/useUtilization";
import UtilizationFilters from "./UtilizationFilters";
import UtilizationTable from "./UtilizationTable";
import Pagination from "@/components/UI/Pagination";
import CircleLoader from "@/components/UI/loaders/CircleLoader";
import ErrorComponent from "@/components/common/ErrorComponent";
import EmptyState from "@/components/common/EmptyState";

const ActiveFilters = ({ filters, onClear }) => {
  const pills = Object.entries(filters)
    .filter(([key, value]) => value && key !== "page" && key !== "pageSize")
    .map(([key, value]) => (
      <span
        key={key}
        className="bg-[#252837] text-gray-300 text-sm px-3 py-1 rounded-full flex items-center gap-2 border border-gray-600"
      >
        {key}: {value}
        <button
          onClick={() => onClear(key)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </span>
    ));

  return pills.length > 0 ? (
    <div className="mb-4">
      <div className="text-sm text-gray-400 mb-2">Active Filters:</div>
      <div className="flex flex-wrap gap-2">{pills}</div>
    </div>
  ) : null;
};

const UtilizationLayout = () => {
  const {
    data,
    isLoading,
    error,
    filters,
    filterOptions,
    handleFetchUtilizationData,
    handleClearError,
    handleSetFilters,
    handleFetchFilterOptions,
  } = useUtilization();

  const handleFilterChange = (newFilters) => {
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(
        ([key, value]) => value && value.trim() !== ""
      )
    );

    handleSetFilters(newFilters);
    handleFetchUtilizationData(cleanFilters);
  };

  useEffect(() => {
    handleFetchFilterOptions();
    handleFetchUtilizationData({ forceRefresh: true });
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Utilization Error:", error);
    }
  }, [error]);

  if (isLoading) return <CircleLoader />;

  if (error)
    return (
      <ErrorComponent
        message={error}
        onRetry={() => {
          handleClearError();
          handleFetchUtilizationData({ ...filters, forceRefresh: true });
        }}
      />
    );

  const rows = data?.data || [];
  const totalCount = data?.totalCount || 0;

  const filteredRows = rows.filter((row) => {
    if (
      filters.vendor &&
      filters.vendor !== "" &&
      row.vendor !== filters.vendor
    ) {
      return false;
    }

    if (
      filters.contract &&
      filters.contract !== "" &&
      row.contractTitle !== filters.contract
    ) {
      return false;
    }

    if (
      filters.status &&
      filters.status !== "" &&
      row.status !== filters.status
    ) {
      return false;
    }

    if (filters.search && filters.search !== "") {
      const searchLower = filters.search.toLowerCase();
      if (
        !row.employeeName.toLowerCase().includes(searchLower) &&
        !row.employeeEmail.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Utilization
        </h1>
      </div>

      <UtilizationFilters
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />
      <ActiveFilters
        filters={filters}
        onClear={(key) => handleSetFilters({ [key]: "", page: 1 })}
      />

      {filteredRows.length > 0 ? (
        <>
          <UtilizationTable data={filteredRows} />
          <Pagination
            currentPage={filters.page}
            totalPages={Math.ceil(filteredRows.length / filters.pageSize)}
            totalItems={filteredRows.length}
            itemsPerPage={filters.pageSize}
            onPageChange={(page) => handleSetFilters({ page })}
          />
        </>
      ) : (
        <EmptyState message="No utilization data found for the selected filters." />
      )}
    </div>
  );
};

export default UtilizationLayout;
