import { useCallback, useEffect, useMemo, useState } from "react";
import useContractSpend from "@/hooks/Dashboard/Home/ContractSpend/useContractSpend";

const useLineChartLogic = () => {
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [topVendorsCount, setTopVendorsCount] = useState("5");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [tempFromDate, setTempFromDate] = useState(null);
  const [tempToDate, setTempToDate] = useState(null);

  const {
    allVendors,
    industries,
    isLoading,
    error,
    getFilteredData,
    getVendorsToShow,
    createChartConfig,
    vendorColors,
    setTopVendors,
    setCustomDateRange,
    setSelectedTimeRange: setReduxSelectedTimeRange,
    selectedTimeRange, // Get from Redux instead of local state
  } = useContractSpend();

  // Update localStorage when selectedVendor changes
  useEffect(() => {
    localStorage.setItem("selectedVendor", selectedVendor);
  }, [selectedVendor]);

  // Update topVendors in context when topVendorsCount changes
  useEffect(() => {
    if (typeof setTopVendors === "function") {
      setTopVendors(topVendorsCount);
    }
  }, [topVendorsCount, setTopVendors]);

  // Handle date selection for temp states
  const handleTempDateSelect = useCallback((date, type) => {
    if (type === "from") {
      setTempFromDate(date);
    } else {
      setTempToDate(date);
    }
  }, []);

  // Reset temp date picker when opening
  const handleCalendarOpen = useCallback(() => {
    setTempFromDate(fromDate);
    setTempToDate(toDate);
    setCalendarOpen(true);
  }, [fromDate, toDate]);

  // Handle time range change
  const handleTimeRangeChange = useCallback(
    (value) => {
      if (value !== "custom") {
        // For non-custom ranges, immediately update Redux and trigger API call
        setReduxSelectedTimeRange(value);
        setFromDate(null);
        setToDate(null);
        setTempFromDate(null);
        setTempToDate(null);
        if (typeof setCustomDateRange === "function") {
          setCustomDateRange({ fromDate: null, toDate: null });
        }
      } else {
        // For custom range, update Redux to show calendar but don't trigger API call yet
        setReduxSelectedTimeRange(value);
        setTempFromDate(fromDate);
        setTempToDate(toDate);
        // Use a small delay to ensure the select dropdown closes before opening calendar
        setTimeout(() => {
          setCalendarOpen(true);
        }, 100);
        // Don't update custom date range yet - wait for Apply button
      }
    },
    [setCustomDateRange, fromDate, toDate, setReduxSelectedTimeRange]
  );

  // Handle apply date range
  const handleApplyDateRange = useCallback(() => {
    if (tempFromDate && tempToDate) {
      setFromDate(tempFromDate);
      setToDate(tempToDate);
      setCalendarOpen(false);

      // Now set custom date range to trigger API call
      if (typeof setCustomDateRange === "function") {
        setCustomDateRange({
          fromDate: tempFromDate,
          toDate: tempToDate,
        });
      }
      // selectedTimeRange is already "custom" from when the dropdown was selected
    }
  }, [tempFromDate, tempToDate, setCustomDateRange]);

  // Handle calendar close without applying (cancel)
  const handleCalendarClose = useCallback(() => {
    setCalendarOpen(false);
    setTempFromDate(fromDate);
    setTempToDate(toDate);
    // Reset to previous time range if custom was selected but not applied
    if (selectedTimeRange === "custom" && (!fromDate || !toDate)) {
      // If custom was selected but no dates were applied, reset to default
      setReduxSelectedTimeRange("thisMonth");
    }
  }, [fromDate, toDate, selectedTimeRange, setReduxSelectedTimeRange]);

  // Handle cancel button click (only close calendar, keep custom selected)
  const handleCalendarCancel = useCallback(() => {
    setCalendarOpen(false);
    setTempFromDate(fromDate);
    setTempToDate(toDate);
    // Don't reset the time range - keep "custom" selected
  }, [fromDate, toDate]);

  // Update the context whenever the time range changes
  useEffect(() => {
    if (selectedTimeRange === "custom") {
      if (fromDate && toDate && typeof setCustomDateRange === "function") {
        setCustomDateRange({ fromDate, toDate });
      }
    }
  }, [selectedTimeRange, fromDate, toDate, setCustomDateRange]);

  // Get filtered data based on selected filters
  const filteredData = useMemo(() => {
    if (typeof getFilteredData !== "function") {
      console.error("getFilteredData is not a function:", getFilteredData);
      return [];
    }
    return getFilteredData(
      selectedVendor,
      selectedTimeRange,
      selectedIndustry,
      fromDate,
      toDate
    );
  }, [
    selectedVendor,
    selectedTimeRange,
    selectedIndustry,
    getFilteredData,
    fromDate,
    toDate,
  ]);

  // Get list of vendors to show based on filters
  const vendorsToShow = useMemo(() => {
    if (typeof getVendorsToShow !== "function") {
      console.error("getVendorsToShow is not a function:", getVendorsToShow);
      return [];
    }
    return getVendorsToShow(selectedVendor, selectedIndustry);
  }, [selectedVendor, selectedIndustry, getVendorsToShow]);

  // Create chart config based on vendors to show
  const chartConfig = useMemo(() => {
    if (typeof createChartConfig !== "function") {
      console.error("createChartConfig is not a function:", createChartConfig);
      return {};
    }
    return createChartConfig(vendorsToShow);
  }, [vendorsToShow, createChartConfig]);

  return {
    // State
    selectedVendor,
    setSelectedVendor,
    selectedTimeRange, // From Redux
    setSelectedTimeRange: setReduxSelectedTimeRange, // Redux setter
    selectedIndustry,
    setSelectedIndustry,
    topVendorsCount,
    setTopVendorsCount,
    fromDate,
    toDate,
    calendarOpen,
    setCalendarOpen,
    tempFromDate,
    tempToDate,

    // Context data
    allVendors,
    industries,
    isLoading,
    error,
    vendorColors,

    // Computed values
    filteredData,
    vendorsToShow,
    chartConfig,

    // Event handlers
    handleTempDateSelect,
    handleCalendarOpen,
    handleCalendarClose,
    handleCalendarCancel,
    handleTimeRangeChange,
    handleApplyDateRange,
  };
};

export default useLineChartLogic;
