/**
 * Filtering utilities for Contract Spend Summary
 */

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
