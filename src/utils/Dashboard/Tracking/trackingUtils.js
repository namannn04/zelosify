// Utility functions for tracking

/**
 * Calculates the number of days between two dates.
 * @param {string|Date} startDate - The start date.
 * @param {string|Date} endDate - The end date.
 * @returns {string} Number of days as a string, or "N/A" if invalid input.
 */
export const calculateDaysDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "N/A";
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays.toString();
};

/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} [currency="USD"] - The currency code.
 * @returns {string} Formatted currency string, or "Not available" if invalid input.
 */
export const formatCurrency = (amount, currency = "USD") => {
  if (!amount) return "Not available";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
