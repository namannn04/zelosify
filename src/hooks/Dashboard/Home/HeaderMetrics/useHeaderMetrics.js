import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchHeaderMetrics,
  clearError,
  resetMetrics,
} from "@/redux/features/Dashboard/Home/headerMetricsSlice";

/**
 * Custom hook for managing header metrics state and actions
 * Provides access to header metrics data and dispatch functions
 */
const useHeaderMetrics = () => {
  const dispatch = useDispatch();

  // Select header metrics state from Redux store
  const { metricsData, isLoading, error } = useSelector(
    (state) => state.headerMetrics
  );

  /**
   * Fetch header metrics data from the API
   * Dispatches the fetchHeaderMetrics async thunk
   */
  const handleFetchHeaderMetrics = useCallback(() => {
    dispatch(fetchHeaderMetrics());
  }, [dispatch]);

  /**
   * Clear any existing error state
   * Useful for dismissing error messages in the UI
   */
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Reset the entire metrics state to initial values
   * Useful for cleanup when navigating away from dashboard
   */
  const handleResetMetrics = useCallback(() => {
    dispatch(resetMetrics());
  }, [dispatch]);

  /**
   * Convert the raw metrics data to the format expected by the UI components
   * This maintains the same interface as the previous Context API implementation
   * @returns {Array} Array of formatted metric objects for UI rendering
   */
  const getFormattedMetrics = useCallback(() => {
    if (!metricsData) return [];

    return [
      {
        icon: "user",
        value: metricsData.totalActiveContracts.toString(),
        label: "Total Contracts",
        change: { type: "increase", value: "Compared to last quarter" },
      },
      {
        icon: "download",
        value: metricsData.contractsInProgress.toString(),
        label: "Contracts in Progress",
        change: { type: "increase", value: "Compared to last quarter" },
      },
      {
        icon: "stack",
        value: `$${parseInt(
          metricsData.totalContractAmountSpent
        ).toLocaleString()}`,
        label: "Total Contract Amount Spent",
        change: { type: "increase", value: "Compared to last quarter" },
      },
      {
        icon: "book",
        value: metricsData.totalVendorCount.toString(),
        label: "Total Vendor Count",
        change: { type: "increase", value: "Compared to last quarter" },
      },
    ];
  }, [metricsData]);

  return {
    // State values
    metricsData,
    isLoading,
    error,
    // Action dispatchers
    handleFetchHeaderMetrics,
    handleClearError,
    handleResetMetrics,
    // Utility functions
    getFormattedMetrics,
  };
};

export default useHeaderMetrics;
