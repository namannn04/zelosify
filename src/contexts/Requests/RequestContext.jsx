"use client";

import { createContext, useState, useEffect, useContext } from "react";

import axiosInstance from "@/utils/axios/AxiosInstance";
import { usePathname } from "next/navigation";

// Create the Request context
const RequestContext = createContext({});

export const RequestProvider = ({ children }) => {
  const pathname = usePathname();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    status: "",
    department: "",
    startDate: "",
    endDate: "",
  });

  // Function to fetch all contract requests
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const { page, limit } = pagination;
      const { status, department, startDate, endDate } = filters;

      const queryParams = new URLSearchParams();
      queryParams.append("page", page);
      queryParams.append("limit", limit);

      if (status) queryParams.append("status", status);
      if (department) queryParams.append("department", department);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const response = await axiosInstance.get(
        `/contract-requests/list?${queryParams.toString()}`
      );

      if (response.data.success) {
        setRequests(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.data.message || "Failed to fetch contract requests");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching requests"
      );
      console.error("Error fetching contract requests:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle request approval
  const approveRequest = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/contract-requests/${id}`, {
        action: "approve",
      });

      await fetchRequests(); // Refresh the list after approval
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve request");
      console.error("Error approving request:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle request rejection
  const rejectRequest = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/contract-requests/${id}`, {
        action: "reject",
      });

      await fetchRequests(); // Refresh the list after rejection
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject request");
      console.error("Error rejecting request:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to get AI recommendation
  const getAIRecommendation = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/contract-requests/${id}`, {
        action: "askAI",
      });

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to get AI recommendation"
      );
      console.error("Error getting AI recommendation:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to change page
  const changePage = (page) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  // Function to change filters
  const changeFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPagination((prev) => ({
      ...prev,
      page: 1, // Reset to first page when filters change
    }));
  };

  // Fetch requests when pagination or filters change
  useEffect(() => {
    if (pathname === "/user/requests") {
      fetchRequests();
    }
  }, [pathname, pagination.page, pagination.limit, filters]);

  return (
    <RequestContext.Provider
      value={{
        requests,
        loading,
        error,
        pagination,
        filters,
        fetchRequests,
        approveRequest,
        rejectRequest,
        getAIRecommendation,
        changePage,
        changeFilters,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

// Custom hook to use the Request context
export const useRequests = () => useContext(RequestContext);

export default RequestContext;
