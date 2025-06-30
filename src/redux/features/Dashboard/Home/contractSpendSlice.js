import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/Axios/AxiosInstance";
import {
  calculateDateRangeParams,
  createChartConfig,
  generateVendorColors,
  processVendorIndustries,
  transformApiDataToChartData,
  getFilteredData,
  getVendorsToShow,
} from "@/utils/Dashboard/ContractSpendSummary";

/**
 * Async thunk for fetching contract spend data from the API
 * @param {Object} params - The parameters for the API request
 * @param {string} params.topVendors - Number of top vendors to fetch
 * @param {string} params.selectedTimeRange - Time range for data filtering
 * @param {Object} params.customDateRange - Custom date range object
 * @param {Date|null} params.customDateRange.fromDate - Start date for custom range
 * @param {Date|null} params.customDateRange.toDate - End date for custom range
 */
export const fetchContractSpendData = createAsyncThunk(
  "contractSpend/fetchContractSpendData",
  async (params, { rejectWithValue }) => {
    try {
      // Default to 90 days if no specific range is set
      const defaultParams = {
        topVendors: params.topVendors,
      };

      // Create params based on selected time range
      let requestParams = { ...defaultParams };

      const dateRangeParams = calculateDateRangeParams(
        params.selectedTimeRange,
        params.customDateRange.fromDate,
        params.customDateRange.toDate
      );

      requestParams = { ...requestParams, ...dateRangeParams };

      const response = await axiosInstance.get("/dashboard/contract-spend", {
        params: requestParams,
      });

      const responseData = response.data.data;

      if (!responseData) {
        throw new Error("No data received from the API");
      }

      // Extract all vendors from vendorTotals
      const vendors = responseData.vendorTotals.map((item) => item.name);

      // Generate vendor colors using utility
      const vendorColors = generateVendorColors(vendors);

      // Process vendor industries using utility
      const { industryGroups, industries } = processVendorIndustries(vendors);

      // Transform API data to chart data using utility
      const chartData = transformApiDataToChartData(responseData, vendors);

      return {
        chartData,
        allVendors: vendors,
        vendorIndustries: industryGroups,
        industries,
        vendorColors,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while fetching contract data"
      );
    }
  }
);

/**
 * Initial state for the contract spend slice
 */
const initialState = {
  // Data from API
  chartData: [],
  allVendors: [],
  vendorIndustries: {},
  industries: [],
  vendorColors: {},

  // UI state
  isLoading: true,
  error: null,

  // Filter settings
  topVendors: "5",
  customDateRange: {
    fromDate: null,
    toDate: null,
  },
  selectedTimeRange: "90d",
};

/**
 * Contract Spend slice for managing contract spending data and state
 */
const contractSpendSlice = createSlice({
  name: "contractSpend",
  initialState,
  reducers: {
    /**
     * Clear any existing error state
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Reset all contract spend data to initial state
     */
    resetContractSpend: (state) => {
      return { ...initialState };
    },

    /**
     * Update the number of top vendors to display
     * @param {Object} state - Current state
     * @param {Object} action - Action with topVendors payload
     */
    setTopVendors: (state, action) => {
      state.topVendors = action.payload;
    },

    /**
     * Update the custom date range and set time range to custom if dates are provided
     * @param {Object} state - Current state
     * @param {Object} action - Action with fromDate and toDate payload
     */
    setCustomDateRange: (state, action) => {
      const { fromDate, toDate } = action.payload;
      state.customDateRange = { fromDate, toDate };
      if (fromDate && toDate) {
        state.selectedTimeRange = "custom";
      }
    },

    /**
     * Update the selected time range
     * @param {Object} state - Current state
     * @param {Object} action - Action with time range payload
     */
    setSelectedTimeRange: (state, action) => {
      state.selectedTimeRange = action.payload;
      // Clear custom date range if not custom time range
      if (action.payload !== "custom") {
        state.customDateRange = { fromDate: null, toDate: null };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contract spend data - pending
      .addCase(fetchContractSpendData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fetch contract spend data - fulfilled
      .addCase(fetchContractSpendData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.chartData = action.payload.chartData;
        state.allVendors = action.payload.allVendors;
        state.vendorIndustries = action.payload.vendorIndustries;
        state.industries = action.payload.industries;
        state.vendorColors = action.payload.vendorColors;
      })
      // Fetch contract spend data - rejected
      .addCase(fetchContractSpendData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("Error fetching contract spend data:", action.payload);
      });
  },
});

// Export actions
export const {
  clearError,
  resetContractSpend,
  setTopVendors,
  setCustomDateRange,
  setSelectedTimeRange,
} = contractSpendSlice.actions;

// Export selectors
export const selectContractSpendData = (state) => state.contractSpend.chartData;
export const selectAllVendors = (state) => state.contractSpend.allVendors;
export const selectVendorIndustries = (state) =>
  state.contractSpend.vendorIndustries;
export const selectIndustries = (state) => state.contractSpend.industries;
export const selectVendorColors = (state) => state.contractSpend.vendorColors;
export const selectIsLoading = (state) => state.contractSpend.isLoading;
export const selectError = (state) => state.contractSpend.error;
export const selectTopVendors = (state) => state.contractSpend.topVendors;
export const selectCustomDateRange = (state) =>
  state.contractSpend.customDateRange;
export const selectSelectedTimeRange = (state) =>
  state.contractSpend.selectedTimeRange;

/**
 * Selector for getting filtered data based on current state and filters
 * @param {Object} state - Redux state
 * @param {string} selectedVendor - Selected vendor filter
 * @param {string} selectedTimeRange - Selected time range filter
 * @param {string} selectedIndustry - Selected industry filter
 * @param {Date|null} fromDate - Start date for filtering
 * @param {Date|null} toDate - End date for filtering
 * @returns {Array} Filtered chart data
 */
export const selectFilteredData = (
  state,
  selectedVendor,
  selectedTimeRange,
  selectedIndustry,
  fromDate,
  toDate
) => {
  return getFilteredData(
    state.contractSpend.chartData,
    state.contractSpend.allVendors,
    state.contractSpend.vendorIndustries,
    selectedVendor,
    selectedTimeRange,
    selectedIndustry,
    fromDate,
    toDate,
    state.contractSpend.isLoading
  );
};

/**
 * Selector for getting vendors to show based on current state and filters
 * @param {Object} state - Redux state
 * @param {string} selectedVendor - Selected vendor filter
 * @param {string} selectedIndustry - Selected industry filter
 * @returns {Array} List of vendors to display
 */
export const selectVendorsToShow = (
  state,
  selectedVendor,
  selectedIndustry
) => {
  return getVendorsToShow(
    state.contractSpend.allVendors,
    state.contractSpend.vendorIndustries,
    state.contractSpend.chartData,
    selectedVendor,
    selectedIndustry,
    state.contractSpend.isLoading
  );
};

/**
 * Selector for creating chart configuration based on vendors
 * @param {Object} state - Redux state
 * @param {Array} vendors - List of vendors for chart config
 * @returns {Object} Chart configuration object
 */
export const selectChartConfig = (state, vendors) => {
  return createChartConfig(vendors, state.contractSpend.vendorColors);
};

// Export reducer
export default contractSpendSlice.reducer;
