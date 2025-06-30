import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ContractSpendContext from "@/contexts/DashBoard/ContractSpend/ContractSpendContext";

const useLineChartLogic = () => {
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  const [selectedTimeRange, setSelectedTimeRange] = useState("90d");
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
  } = useContext(ContractSpendContext);

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
      setSelectedTimeRange(value);
      if (value !== "custom") {
        setFromDate(null);
        setToDate(null);
        setTempFromDate(null);
        setTempToDate(null);
        if (typeof setCustomDateRange === "function") {
          setCustomDateRange({ fromDate: null, toDate: null });
        }
      } else {
        setTempFromDate(fromDate);
        setTempToDate(toDate);
        setCalendarOpen(true);
      }
    },
    [setCustomDateRange, fromDate, toDate]
  );

  // Handle apply date range
  const handleApplyDateRange = useCallback(() => {
    setFromDate(tempFromDate);
    setToDate(tempToDate);
    setCalendarOpen(false);
    setSelectedTimeRange("custom");
    if (typeof setCustomDateRange === "function") {
      setCustomDateRange({
        fromDate: tempFromDate,
        toDate: tempToDate,
      });
    }
  }, [tempFromDate, tempToDate, setCustomDateRange]);

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
    selectedTimeRange,
    setSelectedTimeRange,
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
    handleTimeRangeChange,
    handleApplyDateRange,
  };
};

export default useLineChartLogic;
