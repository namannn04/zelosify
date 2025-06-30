import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import {
  // Async thunks
  fetchContractSpendData,

  // Actions
  clearError,
  resetContractSpend,
  setTopVendors,
  setCustomDateRange,
  setSelectedTimeRange,

  // Selectors
  selectContractSpendData,
  selectAllVendors,
  selectVendorIndustries,
  selectIndustries,
  selectVendorColors,
  selectIsLoading,
  selectError,
  selectTopVendors,
  selectCustomDateRange,
  selectSelectedTimeRange,
} from "@/redux/features/Dashboard/Home/contractSpendSlice";

/**
 * Custom hook for managing contract spend state and operations
 * This hook provides access to contract spend data, loading states, and dispatch functions
 *
 * @returns {Object} Contract spend state and handler functions
 */
const useContractSpend = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const hasFetchedRef = useRef(false);

  // Select state from Redux store
  const chartData = useSelector(selectContractSpendData);
  const allVendors = useSelector(selectAllVendors);
  const vendorIndustries = useSelector(selectVendorIndustries);
  const industries = useSelector(selectIndustries);
  const vendorColors = useSelector(selectVendorColors);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const topVendors = useSelector(selectTopVendors);
  const customDateRange = useSelector(selectCustomDateRange);
  const selectedTimeRange = useSelector(selectSelectedTimeRange);

  /**
   * Handler for fetching contract spend data
   * Fetches data only when on the correct route and prevents duplicate requests
   */
  const handleFetchContractSpendData = useCallback(() => {
    if (pathname === "/user" && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      dispatch(
        fetchContractSpendData({
          topVendors,
          selectedTimeRange,
          customDateRange,
        })
      );
    }
  }, [dispatch, pathname, topVendors, selectedTimeRange, customDateRange]);

  /**
   * Handler for clearing error state
   * Clears any existing error messages
   */
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Handler for resetting contract spend data
   * Resets all contract spend state to initial values
   */
  const handleResetContractSpend = useCallback(() => {
    dispatch(resetContractSpend());
    hasFetchedRef.current = false;
  }, [dispatch]);

  /**
   * Handler for updating the number of top vendors
   * @param {string} count - Number of top vendors to display
   */
  const handleSetTopVendors = useCallback(
    (count) => {
      dispatch(setTopVendors(count));
    },
    [dispatch]
  );

  /**
   * Handler for updating custom date range
   * Sets custom date range and automatically switches to custom time range if dates are provided
   * @param {Object} dateRange - Object containing fromDate and toDate
   * @param {Date|null} dateRange.fromDate - Start date for custom range
   * @param {Date|null} dateRange.toDate - End date for custom range
   */
  const handleSetCustomDateRange = useCallback(
    (dateRange) => {
      dispatch(setCustomDateRange(dateRange));
    },
    [dispatch]
  );

  /**
   * Handler for updating selected time range
   * @param {string} timeRange - Time range string (e.g., "90d", "custom")
   */
  const handleSetSelectedTimeRange = useCallback(
    (timeRange) => {
      dispatch(setSelectedTimeRange(timeRange));
    },
    [dispatch]
  );

  /**
   * Get filtered data based on provided filters
   * Uses utility function directly with current state data
   * @param {string} selectedVendor - Selected vendor filter
   * @param {string} selectedTimeRange - Selected time range filter
   * @param {string} selectedIndustry - Selected industry filter
   * @param {Date|null} fromDate - Start date for filtering
   * @param {Date|null} toDate - End date for filtering
   * @returns {Array} Filtered chart data
   */
  const getFilteredData = useCallback(
    (
      selectedVendor,
      selectedTimeRangeParam,
      selectedIndustry,
      fromDate,
      toDate
    ) => {
      const {
        getFilteredData: getFilteredDataUtil,
      } = require("@/utils/Dashboard/ContractSpendSummary");
      return getFilteredDataUtil(
        chartData,
        allVendors,
        vendorIndustries,
        selectedVendor,
        selectedTimeRangeParam,
        selectedIndustry,
        fromDate,
        toDate,
        isLoading
      );
    },
    [chartData, allVendors, vendorIndustries, isLoading]
  );

  /**
   * Get vendors to show based on provided filters
   * Uses utility function directly with current state data
   * @param {string} selectedVendor - Selected vendor filter
   * @param {string} selectedIndustry - Selected industry filter
   * @returns {Array} List of vendors to display
   */
  const getVendorsToShow = useCallback(
    (selectedVendor, selectedIndustry) => {
      const {
        getVendorsToShow: getVendorsToShowUtil,
      } = require("@/utils/Dashboard/ContractSpendSummary");
      return getVendorsToShowUtil(
        allVendors,
        vendorIndustries,
        chartData,
        selectedVendor,
        selectedIndustry,
        isLoading
      );
    },
    [allVendors, vendorIndustries, chartData, isLoading]
  );

  /**
   * Create chart configuration based on vendors
   * Uses utility function directly with current state data
   * @param {Array} vendors - List of vendors for chart configuration
   * @returns {Object} Chart configuration object
   */
  const createChartConfig = useCallback(
    (vendors) => {
      const {
        createChartConfig: createChartConfigUtil,
      } = require("@/utils/Dashboard/ContractSpendSummary");
      return createChartConfigUtil(vendors, vendorColors);
    },
    [vendorColors]
  );

  // Effect to fetch data when dependencies change
  useEffect(() => {
    if (pathname === "/user") {
      hasFetchedRef.current = false; // Reset flag when dependencies change
      handleFetchContractSpendData();
    }
  }, [
    handleFetchContractSpendData,
    topVendors,
    selectedTimeRange,
    customDateRange,
  ]);

  // Effect to reset fetch flag when leaving the page
  useEffect(() => {
    if (pathname !== "/user") {
      hasFetchedRef.current = false;
    }
  }, [pathname]);

  return {
    // State data
    chartData,
    allVendors,
    vendorIndustries,
    industries,
    vendorColors,
    isLoading,
    error,
    topVendors,
    customDateRange,
    selectedTimeRange,

    // Action handlers
    handleFetchContractSpendData,
    handleClearError,
    handleResetContractSpend,
    setTopVendors: handleSetTopVendors,
    setCustomDateRange: handleSetCustomDateRange,
    setSelectedTimeRange: handleSetSelectedTimeRange,

    // Utility functions (for backward compatibility with existing components)
    getFilteredData,
    getVendorsToShow,
    createChartConfig,
  };
};

export default useContractSpend;
