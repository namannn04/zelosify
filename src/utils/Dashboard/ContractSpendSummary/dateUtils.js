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
  return date instanceof Date
    ? date.toISOString().split("T")[0]
    : new Date(date).toISOString().split("T")[0];
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
 * Calculate date range parameters based on selected time range
 * @param {string} selectedTimeRange - Time range selection ('30d', '60d', '90d', 'custom')
 * @param {Date} fromDate - Custom from date (for custom range)
 * @param {Date} toDate - Custom to date (for custom range)
 * @returns {object} Object with startDate and endDate
 */
export const calculateDateRangeParams = (selectedTimeRange, fromDate = null, toDate = null) => {
  if (selectedTimeRange === "custom" && fromDate && toDate) {
    return {
      startDate: formatDateForApi(fromDate),
      endDate: formatDateForApi(toDate),
    };
  }

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

  return {
    startDate: formatDateForApi(startDate),
    endDate: formatDateForApi(now),
  };
};
