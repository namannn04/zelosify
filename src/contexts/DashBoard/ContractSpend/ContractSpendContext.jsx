"use client";

import axiosInstance from "@/utils/axios/AxiosInstance";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState, useCallback } from "react";

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

  // Helper function to convert any date format to YYYY-MM
  const formatDateToYYYYMM = useCallback((dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    } catch (err) {
      console.error("Error formatting date:", dateString, err);
      // Return original string if it's already in YYYY-MM format
      if (dateString && dateString.match(/^\d{4}-\d{2}$/)) {
        return dateString;
      }
      return null;
    }
  }, []);

  // Format date as YYYY-MM-DD for API
  const formatDateForApi = useCallback((date) => {
    if (!date) return null;
    return date instanceof Date
      ? date.toISOString().split("T")[0]
      : new Date(date).toISOString().split("T")[0];
  }, []);

  // Function to update custom date range and time range setting
  const setCustomDateRange = useCallback(({ fromDate, toDate }) => {
    setCustomDateRangeState({ fromDate, toDate });
    if (fromDate && toDate) {
      setSelectedTimeRange("custom");
    }
  }, []);

  // Generate all 12 months for the current year
  const generateFullYearMonths = useCallback(() => {
    const months = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let month = 0; month < 12; month++) {
      const monthStr = String(month + 1).padStart(2, "0");
      months.push(`${currentYear}-${monthStr}`);
    }

    return months;
  }, []);

  // Create chart config function
  const createChartConfig = useCallback(
    (vendors) => {
      const config = {
        spend: {
          label: "Contract Spend",
        },
      };

      vendors.forEach((vendor) => {
        config[vendor] = {
          label: vendor,
          color: vendorColors[vendor] || "hsl(var(--chart-1))",
        };
      });

      return config;
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

        if (
          selectedTimeRange === "custom" &&
          customDateRange.fromDate &&
          customDateRange.toDate
        ) {
          // If custom date range is selected, use those dates
          params.startDate = formatDateForApi(customDateRange.fromDate);
          params.endDate = formatDateForApi(customDateRange.toDate);
        } else {
          // Otherwise use predefined ranges
          const now = new Date();
          let startDate;

          switch (selectedTimeRange) {
            case "30d":
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 30);
              break;
            case "60d":
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 60);
              break;
            case "90d":
            default:
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 90);
              break;
          }

          params.startDate = formatDateForApi(startDate);
          params.endDate = formatDateForApi(now);
        }

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

        // Create new colors object
        const newVendorColors = {};

        // Assign colors dynamically to vendors
        vendors.forEach((vendor, index) => {
          // Use modulo to cycle through the 12 available chart colors
          const colorIndex = (index % 12) + 1;
          newVendorColors[vendor] = `hsl(var(--chart-${colorIndex}))`;
        });

        // Update the vendorColors state
        setVendorColors(newVendorColors);

        // For demo purposes, we'll simulate industry grouping based on vendor names
        // In a real app, this would come from your API or another source
        const industryGroups = {};

        // Group vendors into mock industries based on their names
        // This is just an example - in a real app you'd get this from your API
        vendors.forEach((vendor) => {
          if (vendor.includes("Tech")) {
            industryGroups["IT Services"] = industryGroups["IT Services"] || [];
            industryGroups["IT Services"].push(vendor);
          } else if (
            vendor.includes("Data") ||
            vendor.includes("Analytics") ||
            vendor.includes("Neural")
          ) {
            industryGroups["Data & Analytics"] =
              industryGroups["Data & Analytics"] || [];
            industryGroups["Data & Analytics"].push(vendor);
          } else if (vendor.includes("Secure") || vendor.includes("Sys")) {
            industryGroups["Security & Infrastructure"] =
              industryGroups["Security & Infrastructure"] || [];
            industryGroups["Security & Infrastructure"].push(vendor);
          } else if (
            vendor.includes("Consult") ||
            vendor.includes("Solution")
          ) {
            industryGroups["Consulting Services"] =
              industryGroups["Consulting Services"] || [];
            industryGroups["Consulting Services"].push(vendor);
          } else {
            industryGroups["Emerging Technologies"] =
              industryGroups["Emerging Technologies"] || [];
            industryGroups["Emerging Technologies"].push(vendor);
          }
        });

        setVendorIndustries(industryGroups);
        setIndustries(Object.keys(industryGroups));

        // Create a map of all months in the data for better lookups
        const monthsMap = {};

        // First populate from API data
        responseData.spendByMonth.forEach((monthData) => {
          monthsMap[monthData.month] = monthData.amount;
        });

        // Find the latest month in the API data to determine "current month"
        let latestMonthFromAPI = "";
        if (responseData.spendByMonth.length > 0) {
          const sortedMonths = [...responseData.spendByMonth]
            .map((item) => item.month)
            .sort((a, b) => b.localeCompare(a)); // Sort in descending order
          latestMonthFromAPI = sortedMonths[0];
        }

        // Determine the next month after the latest month
        const getNextMonth = (monthStr) => {
          if (!monthStr || monthStr.length < 7) return null;

          try {
            const [year, monthPart] = monthStr.split("-");
            const month = parseInt(monthPart);

            if (isNaN(month) || month < 1 || month > 12) return null;

            const nextMonth = month === 12 ? 1 : month + 1;
            const nextYear = month === 12 ? parseInt(year) + 1 : parseInt(year);
            return `${nextYear}-${String(nextMonth).padStart(2, "0")}`;
          } catch (error) {
            console.error("Error calculating next month:", error);
            return null;
          }
        };

        // Get the next month after the latest API month
        const nextMonthAfterLatest = getNextMonth(latestMonthFromAPI);

        // Then ensure relevant months are included
        let dataYear = new Date().getFullYear();

        // Try to determine the year from the data if available
        if (responseData.spendByMonth.length > 0) {
          const sampleMonth = responseData.spendByMonth[0].month;
          if (sampleMonth && sampleMonth.length >= 4) {
            dataYear = parseInt(sampleMonth.substring(0, 4));
          }
        }

        // Create months for the entire data year
        const generateMonthsForYear = (year) => {
          const months = [];
          for (let month = 0; month < 12; month++) {
            const monthStr = String(month + 1).padStart(2, "0");
            months.push(`${year}-${monthStr}`);
          }
          return months;
        };

        const allMonths = generateMonthsForYear(dataYear);

        // Only include months up to the next month after latest
        const filteredMonths = allMonths.filter((month) => {
          // If no API data or invalid next month, use a safer default (show only up to current month)
          if (!latestMonthFromAPI || !nextMonthAfterLatest) {
            const now = new Date();
            const currentMonthStr = `${now.getFullYear()}-${String(
              now.getMonth() + 1
            ).padStart(2, "0")}`;
            return month <= currentMonthStr;
          }

          // Keep all months up to and including the next month after latest
          return month <= nextMonthAfterLatest;
        });

        // Fill in missing months with zero values, but only for the filtered months
        filteredMonths.forEach((month) => {
          if (!monthsMap[month]) {
            monthsMap[month] = 0;
          }
        });

        // Process all spend summaries
        const processedSummaries = responseData.spendSummaries
          .map((summary) => {
            return {
              ...summary,
              formattedMonth: formatDateToYYYYMM(summary.spendMonth),
            };
          })
          .filter((summary) => summary.formattedMonth !== null);

        // Pre-create a vendor spending map for each month and vendor
        const vendorSpendingByMonth = {};

        // Initialize all months with all vendors set to 0
        Object.keys(monthsMap).forEach((month) => {
          // Only include months that are in our filtered list
          if (!filteredMonths.includes(month)) return;

          vendorSpendingByMonth[month] = {};
          vendors.forEach((vendor) => {
            vendorSpendingByMonth[month][vendor] = 0;
          });
        });

        // Fill in the actual spending data from summaries
        processedSummaries.forEach((summary) => {
          const month = summary.formattedMonth;
          const vendorName = summary.vendor.name;
          const spend = parseInt(summary.totalSpend);

          // Only include months that are in our filtered list
          if (
            month &&
            filteredMonths.includes(month) &&
            vendorSpendingByMonth[month] &&
            !isNaN(spend)
          ) {
            vendorSpendingByMonth[month][vendorName] = spend;
          }
        });

        // Transform into the final chart data format - only using the filtered months
        const transformedData = Object.keys(monthsMap)
          .filter((month) => filteredMonths.includes(month))
          .map((month) => {
            const dataPoint = {
              date: month,
              total: monthsMap[month],
            };

            // Add vendor-specific spending
            vendors.forEach((vendor) => {
              dataPoint[vendor] = vendorSpendingByMonth[month]?.[vendor] || 0;
            });

            return dataPoint;
          });

        // Sort by date
        transformedData.sort((a, b) => a.date.localeCompare(b.date));

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
  }, [
    pathname,
    formatDateToYYYYMM,
    generateFullYearMonths,
    topVendors,
    selectedTimeRange,
    customDateRange,
    formatDateForApi,
  ]);

  // Filter data based on filters (will be used by components)
  const getFilteredData = useCallback(
    (selectedVendor, selectedTimeRange, selectedIndustry, fromDate, toDate) => {
      if (isLoading || !chartData.length) return [];

      let data = [...chartData]; // Copy original data

      // Chart data is already filtered to only include months up to next month after latest
      // Now apply additional time range filtering based on user selection
      if (selectedTimeRange && selectedTimeRange !== "all") {
        const now = new Date();
        let cutoffDate;

        if (selectedTimeRange === "custom" && fromDate && toDate) {
          // Use custom date range if provided
          try {
            const fromDateStr = fromDate.toISOString().substring(0, 7); // YYYY-MM
            const toDateStr = toDate.toISOString().substring(0, 7); // YYYY-MM

            // Filter the data based on date range
            data = data.filter((item) => {
              return item.date >= fromDateStr && item.date <= toDateStr;
            });
          } catch (error) {
            console.error("Error filtering by custom date range:", error);
          }
        } else {
          // Use predefined time ranges
          try {
            switch (selectedTimeRange) {
              case "30d":
                cutoffDate = new Date(now.setDate(now.getDate() - 30));
                break;
              case "60d":
                cutoffDate = new Date(now.setDate(now.getDate() - 60));
                break;
              case "90d":
                cutoffDate = new Date(now.setDate(now.getDate() - 90));
                break;
              default:
                cutoffDate = new Date(now.setDate(now.getDate() - 90));
                break;
            }

            // Convert cutoff date to string format for comparison (YYYY-MM)
            const cutoffDateStr = cutoffDate.toISOString().substring(0, 7);

            // Filter the data based on the date
            data = data.filter((item) => item.date >= cutoffDateStr);
          } catch (error) {
            console.error("Error filtering by predefined date range:", error);
          }
        }
      }

      // Get vendors to display based on selected industry
      let relevantVendors = [];

      if (selectedIndustry !== "All Industries") {
        // Get vendors in the selected industry
        relevantVendors = vendorIndustries[selectedIndustry] || [];
      } else {
        relevantVendors = allVendors;
      }

      // Filter by vendor if not "All Vendors"
      if (selectedVendor !== "All Vendors") {
        // Just keep the selected vendor and total
        data = data.map((item) => ({
          date: item.date,
          [selectedVendor]: item[selectedVendor] || 0,
        }));
      } else if (relevantVendors.length > 0) {
        // Keep only the relevant vendors based on industry filter
        data = data.map((item) => {
          const filteredItem = { date: item.date };
          relevantVendors.forEach((vendor) => {
            filteredItem[vendor] = item[vendor] || 0;
          });
          return filteredItem;
        });
      }

      return data;
    },
    [chartData, allVendors, vendorIndustries, isLoading]
  );

  // Get list of vendors to show based on filters
  const getVendorsToShow = useCallback(
    (selectedVendor, selectedIndustry) => {
      if (isLoading || !chartData.length) return [];

      if (selectedVendor !== "All Vendors") {
        return [selectedVendor];
      }

      if (selectedIndustry !== "All Industries") {
        return vendorIndustries[selectedIndustry] || [];
      }

      return allVendors;
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
        getFilteredData,
        getVendorsToShow,
        createChartConfig,
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
