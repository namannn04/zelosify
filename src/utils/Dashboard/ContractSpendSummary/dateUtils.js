/**
 * Date utility functions for Contract Spend Summary
 */

/**
 * Helper function to convert any date format to YYYY-MM
 * @param {string} dateString - Date string to format
 * @returns {string|null} Formatted date string or null if invalid
 */
export const formatDateToYYYYMM = (dateString) => {
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
};

/**
 * Format date as YYYY-MM-DD for API
 * @param {Date|string} date - Date to format
 * @returns {string|null} Formatted date string or null if invalid
 */
export const formatDateForApi = (date) => {
  if (!date) return null;

  const d = date instanceof Date ? date : new Date(date);

  // Use local date components to avoid timezone issues
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Generate all 12 months for the current year
 * @returns {string[]} Array of month strings in YYYY-MM format
 */
export const generateFullYearMonths = () => {
  const months = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  for (let month = 0; month < 12; month++) {
    const monthStr = String(month + 1).padStart(2, "0");
    months.push(`${currentYear}-${monthStr}`);
  }

  return months;
};

/**
 * Get the next month after a given month string
 * @param {string} monthStr - Month string in YYYY-MM format
 * @returns {string|null} Next month string or null if invalid
 */
export const getNextMonth = (monthStr) => {
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

/**
 * Generate months for a specific year
 * @param {number} year - Year to generate months for
 * @returns {string[]} Array of month strings in YYYY-MM format
 */
export const generateMonthsForYear = (year) => {
  const months = [];
  for (let month = 0; month < 12; month++) {
    const monthStr = String(month + 1).padStart(2, "0");
    months.push(`${year}-${monthStr}`);
  }
  return months;
};

/**
 * UNIFIED DATE RANGE CALCULATION
 *
 * This function ensures consistent date calculations across:
 * 1. API parameters (YYYY-MM-DD format)
 * 2. Frontend filtering (YYYY-MM format)
 *
 * Examples for July 14, 2025:
 * - thisMonth: 2025-07-01 to 2025-07-14
 * - last3Months: 2025-04-14 to 2025-07-14
 * - thisYear: 2025-01-01 to 2025-07-14
 * - last2Years: 2023-07-14 to 2025-07-14
 */

/**
 * Calculate unified date range for both API and frontend filtering
 * @param {string} selectedTimeRange - Time range selection
 * @param {Date} fromDate - Custom from date (for custom range)
 * @param {Date} toDate - Custom to date (for custom range)
 * @returns {object} Object with startDate, endDate, and startDateFormatted, endDateFormatted
 */
export const calculateUnifiedDateRange = (
  selectedTimeRange,
  fromDate = null,
  toDate = null
) => {
  const now = new Date();
  let startDate, endDate;

  if (selectedTimeRange === "custom" && fromDate && toDate) {
    startDate = new Date(fromDate);
    endDate = new Date(toDate);
  } else {
    endDate = new Date(now);

    switch (selectedTimeRange) {
      case "thisMonth":
        // Current month only - start from 1st of current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        // Reset time to start of day to avoid timezone issues
        startDate.setHours(0, 0, 0, 0);
        break;
      case "last3Months":
        // Last 3 months from current date (exact date 3 months ago)
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "thisYear":
        // Current year only - start from January 1st
        startDate = new Date(now.getFullYear(), 0, 1);
        // Reset time to start of day to avoid timezone issues
        startDate.setHours(0, 0, 0, 0);
        break;
      case "last2Years":
        // Last 2 years from current date (exact date 2 years ago)
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 2);
        break;
      default:
        // Default to last 3 months
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 3);
        break;
    }
  }

  return {
    startDate,
    endDate,
    startDateFormatted: formatDateForApi(startDate), // For API (YYYY-MM-DD)
    endDateFormatted: formatDateForApi(endDate), // For API (YYYY-MM-DD)
    startDateYYYYMM: formatDateToYYYYMM(startDate.toISOString()), // For frontend filtering (YYYY-MM)
    endDateYYYYMM: formatDateToYYYYMM(endDate.toISOString()), // For frontend filtering (YYYY-MM)
  };
};

/**
 * Calculate date range parameters based on selected time range
 * @param {string} selectedTimeRange - Time range selection ('thisMonth', 'last3Months', 'thisYear', 'last2Years', 'custom')
 * @param {Date} fromDate - Custom from date (for custom range)
 * @param {Date} toDate - Custom to date (for custom range)
 * @returns {object} Object with startDate and endDate
 */
export const calculateDateRangeParams = (
  selectedTimeRange,
  fromDate = null,
  toDate = null
) => {
  const dateRange = calculateUnifiedDateRange(
    selectedTimeRange,
    fromDate,
    toDate
  );

  return {
    startDate: dateRange.startDateFormatted,
    endDate: dateRange.endDateFormatted,
  };
};
