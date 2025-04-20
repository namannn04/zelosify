"use client";

import { createContext, useState, useEffect, useContext } from "react";

import axiosInstance from "@/utils/axios/AxiosInstance";
import { usePathname } from "next/navigation";

// Create the Tracking context
const TrackingContext = createContext({});

export const useTrackingContext = () => useContext(TrackingContext);

export const TrackingProvider = ({ children }) => {
  const path = usePathname();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    minAmount: null,
    maxAmount: null,
    ownedBy: null,
  });

  const fetchContracts = async (page = 1, limit = 10, filterParams = {}) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
        ...filterParams,
      };

      const response = await axiosInstance.get("/contracts", { params });

      setContracts(response.data.contracts);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total,
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching contracts:", err.message);
      setError(`Error fetching contracts: : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (path.includes("/user/tracking"))
      fetchContracts(pagination.page, pagination.limit, filters);
  }, [path, pagination.page, pagination.limit]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({
      ...prev,
      page: 1, // Reset to first page when filters change
    }));
    fetchContracts(1, pagination.limit, newFilters);
  };

  return (
    <TrackingContext.Provider
      value={{
        contracts,
        loading,
        error,
        pagination,
        fetchContracts,
        handlePageChange,
        handleFilterChange,
        filters,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export default TrackingContext;
