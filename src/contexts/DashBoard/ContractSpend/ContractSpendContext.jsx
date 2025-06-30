"use client";

import axiosInstance from "@/utils/Axios/AxiosInstance";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState, useCallback } from "react";
import {
  calculateDateRangeParams,
  createChartConfig,
  generateVendorColors,
  processVendorIndustries,
  transformApiDataToChartData,
  getFilteredData,
  getVendorsToShow,
} from "@/utils/Dashboard/ContractSpendSummary";

// Create the context with default values for functions to avoid "not a function" errors
const ContractSpendContext = createContext({
  chartData: [],
  allVendors: [],
  vendorIndustries: {},
  industries: [],
  isLoading: true,
  error: null,
  getFilteredData: () => [],
  getVendorsToShow: () => [],
  createChartConfig: () => ({}),
  vendorColors: {},
  setTopVendors: () => {},
  setCustomDateRange: () => {},
});

export const ContractSpendProvider = ({ children }) => {
  const [chartData, setChartData] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [vendorIndustries, setVendorIndustries] = useState({});
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendorColors, setVendorColors] = useState({});
  const [topVendors, setTopVendors] = useState("5");
  const [customDateRange, setCustomDateRangeState] = useState({
    fromDate: null,
    toDate: null,
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState("90d");

  const pathname = usePathname();

  // Function to update custom date range and time range setting
  const setCustomDateRange = useCallback(({ fromDate, toDate }) => {
    setCustomDateRangeState({ fromDate, toDate });
    if (fromDate && toDate) {
      setSelectedTimeRange("custom");
    }
  }, []);

  // Create chart config function - using utility
  const createChartConfigMemo = useCallback(
    (vendors) => {
      return createChartConfig(vendors, vendorColors);
    },
    [vendorColors]
  );

  // Fetch data from backend
  useEffect(() => {
    const fetchContractSpendData = async () => {
      try {
        setIsLoading(true);

        // Default to 90 days if no specific range is set
        const defaultParams = {
          topVendors: topVendors,
        };

        // Create params based on selected time range
        let params = { ...defaultParams };

        const dateRangeParams = calculateDateRangeParams(
          selectedTimeRange,
          customDateRange.fromDate,
          customDateRange.toDate
        );

        params = { ...params, ...dateRangeParams };

        const response = await axiosInstance.get("/dashboard/contract-spend", {
          params: params,
        });

        const responseData = response.data.data;

        if (!responseData) {
          throw new Error("No data received from the API");
        }

        // Extract all vendors from vendorTotals
        const vendors = responseData.vendorTotals.map((item) => item.name);
        setAllVendors(vendors);

        // Generate vendor colors using utility
        const newVendorColors = generateVendorColors(vendors);
        setVendorColors(newVendorColors);

        // Process vendor industries using utility
        const { industryGroups, industries } = processVendorIndustries(vendors);
        setVendorIndustries(industryGroups);
        setIndustries(industries);

        // Transform API data to chart data using utility
        const transformedData = transformApiDataToChartData(
          responseData,
          vendors
        );
        setChartData(transformedData);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching contract data"
        );
        console.error("Error fetching contract spend data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (pathname === "/user") fetchContractSpendData();
  }, [pathname, topVendors, selectedTimeRange, customDateRange]);

  // Filter data based on filters (will be used by components) - using utility
  const getFilteredDataMemo = useCallback(
    (selectedVendor, selectedTimeRange, selectedIndustry, fromDate, toDate) => {
      return getFilteredData(
        chartData,
        allVendors,
        vendorIndustries,
        selectedVendor,
        selectedTimeRange,
        selectedIndustry,
        fromDate,
        toDate,
        isLoading
      );
    },
    [chartData, allVendors, vendorIndustries, isLoading]
  );

  // Get list of vendors to show based on filters - using utility
  const getVendorsToShowMemo = useCallback(
    (selectedVendor, selectedIndustry) => {
      return getVendorsToShow(
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

  return (
    <ContractSpendContext.Provider
      value={{
        allVendors,
        industries,
        isLoading,
        error,
        getFilteredData: getFilteredDataMemo,
        getVendorsToShow: getVendorsToShowMemo,
        createChartConfig: createChartConfigMemo,
        vendorColors,
        setTopVendors,
        setCustomDateRange,
      }}
    >
      {children}
    </ContractSpendContext.Provider>
  );
};

export default ContractSpendContext;
