/**
 * Chart configuration utilities for Contract Spend Summary
 */

/**
 * Create chart config function for vendors
 * @param {string[]} vendors - Array of vendor names
 * @param {object} vendorColors - Object mapping vendor names to colors
 * @returns {object} Chart configuration object
 */
export const createChartConfig = (vendors, vendorColors) => {
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
};

/**
 * Generate vendor colors dynamically
 * @param {string[]} vendors - Array of vendor names
 * @returns {object} Object mapping vendor names to colors
 */
export const generateVendorColors = (vendors) => {
  const newVendorColors = {};

  vendors.forEach((vendor, index) => {
    // Use modulo to cycle through the 12 available chart colors
    const colorIndex = (index % 12) + 1;
    newVendorColors[vendor] = `hsl(var(--chart-${colorIndex}))`;
  });

  return newVendorColors;
};
