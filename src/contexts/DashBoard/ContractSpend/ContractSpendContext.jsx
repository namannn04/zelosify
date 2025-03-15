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
});

export const ContractSpendProvider = ({ children }) => {
  const [chartData, setChartData] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [vendorIndustries, setVendorIndustries] = useState({});
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendorColors, setVendorColors] = useState({});

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
        const response = await axiosInstance.get("/dashboard/contract-spend");
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

        // Then ensure all 12 months are included - either current year or from data
        const allMonths = generateFullYearMonths();
        let dataYear = new Date().getFullYear();

        // Try to determine the year from the data if available
        if (responseData.spendByMonth.length > 0) {
          const sampleMonth = responseData.spendByMonth[0].month;
          if (sampleMonth && sampleMonth.length >= 4) {
            dataYear = parseInt(sampleMonth.substring(0, 4));
          }
        }

        // Fill in missing months with zero values
        allMonths.forEach((month) => {
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

          if (month && vendorSpendingByMonth[month] && !isNaN(spend)) {
            vendorSpendingByMonth[month][vendorName] = spend;
          }
        });

        // Transform into the final chart data format
        const transformedData = Object.keys(monthsMap).map((month) => {
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
  }, [pathname, formatDateToYYYYMM, generateFullYearMonths]);

  // Filter data based on filters (will be used by components)
  const getFilteredData = useCallback(
    (selectedVendor, selectedTimeRange, selectedIndustry) => {
      if (isLoading || !chartData.length) return [];

      let data = [...chartData]; // Copy original data

      // Filter by time range
      if (selectedTimeRange && selectedTimeRange !== "all") {
        const now = new Date();
        let cutoffDate;

        switch (selectedTimeRange) {
          case "30d":
            cutoffDate = new Date(now.setDate(now.getDate() - 30));
            break;
          case "70d":
            cutoffDate = new Date(now.setDate(now.getDate() - 70));
            break;
          case "90d":
            cutoffDate = new Date(now.setDate(now.getDate() - 90));
            break;
          case "180d":
            cutoffDate = new Date(now.setDate(now.getDate() - 180));
            break;
          case "365d":
            cutoffDate = new Date(now.setDate(now.getDate() - 365));
            break;
          default:
            cutoffDate = new Date(now.setDate(now.getDate() - 365));
            break;
        }

        // Convert cutoff date to string format for comparison (YYYY-MM)
        const cutoffDateStr = cutoffDate.toISOString().substring(0, 7);

        // Filter the data based on the date
        data = data.filter((item) => item.date >= cutoffDateStr);
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
      }}
    >
      {children}
    </ContractSpendContext.Provider>
  );
};

export default ContractSpendContext;
