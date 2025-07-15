/**
 * Filtering utilities for Contract Spend Summary
 */

import { calculateUnifiedDateRange } from "./dateUtils";

/**
 * Filter chart data based on various criteria
 * @param {object[]} chartData - Original chart data
 * @param {string[]} allVendors - All available vendors
 * @param {object} vendorIndustries - Vendor to industry mapping
 * @param {string} selectedVendor - Selected vendor filter
 * @param {string} selectedTimeRange - Selected time range
 * @param {string} selectedIndustry - Selected industry filter
 * @param {Date} fromDate - Custom from date
 * @param {Date} toDate - Custom to date
 * @param {boolean} isLoading - Loading state
 * @returns {object[]} Filtered data
 */
export const getFilteredData = (
  chartData,
  allVendors,
  vendorIndustries,
  selectedVendor,
  selectedTimeRange,
  selectedIndustry,
  fromDate,
  toDate,
  isLoading
) => {
  if (isLoading || !chartData.length) return [];

  let data = [...chartData]; // Copy original data

  // Apply time range filtering using unified date calculation
  if (selectedTimeRange && selectedTimeRange !== "all") {
    try {
      const dateRange = calculateUnifiedDateRange(
        selectedTimeRange,
        fromDate,
        toDate
      );
      const startDateYYYYMM = dateRange.startDateYYYYMM;
      const endDateYYYYMM = dateRange.endDateYYYYMM;

      // Filter the data based on date range
      data = data.filter((item) => {
        return item.date >= startDateYYYYMM && item.date <= endDateYYYYMM;
      });
    } catch (error) {
      console.error("Error filtering by date range:", error);
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
};

/**
 * Get list of vendors to show based on filters
 * @param {string[]} allVendors - All available vendors
 * @param {object} vendorIndustries - Vendor to industry mapping
 * @param {object[]} chartData - Chart data
 * @param {string} selectedVendor - Selected vendor filter
 * @param {string} selectedIndustry - Selected industry filter
 * @param {boolean} isLoading - Loading state
 * @returns {string[]} Array of vendors to show
 */
export const getVendorsToShow = (
  allVendors,
  vendorIndustries,
  chartData,
  selectedVendor,
  selectedIndustry,
  isLoading
) => {
  if (isLoading || !chartData.length) return [];

  if (selectedVendor !== "All Vendors") {
    return [selectedVendor];
  }

  if (selectedIndustry !== "All Industries") {
    return vendorIndustries[selectedIndustry] || [];
  }

  return allVendors;
};
