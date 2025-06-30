/**
 * Data processing utilities for Contract Spend Summary
 */

import { formatDateToYYYYMM, generateMonthsForYear, getNextMonth } from './dateUtils';

/**
 * Process vendor industry groupings
 * @param {string[]} vendors - Array of vendor names
 * @returns {object} Object with industryGroups and industries array
 */
export const processVendorIndustries = (vendors) => {
  const industryGroups = {};

  // Group vendors into mock industries based on their names
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

  return {
    industryGroups,
    industries: Object.keys(industryGroups),
  };
};

/**
 * Transform API response data into chart data format
 * @param {object} responseData - API response data
 * @param {string[]} vendors - Array of vendor names
 * @returns {object[]} Transformed chart data
 */
export const transformApiDataToChartData = (responseData, vendors) => {
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

  return transformedData;
};
