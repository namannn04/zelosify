import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/Axios/AxiosInstance";

/**
 * Async thunk to fetch header metrics data from the API
 * @returns {Promise} Promise that resolves to the metrics data
 */
export const fetchHeaderMetrics = createAsyncThunk(
  "headerMetrics/fetchHeaderMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboard/header-metrics");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching metrics"
      );
    }
  }
);

/**
 * HeaderMetrics slice for managing dashboard header metrics state
 */
const headerMetricsSlice = createSlice({
  name: "headerMetrics",
  initialState: {
    // Raw metrics data from API
    metricsData: null,
    // Loading state for async operations
    isLoading: false,
    // Error message if any operation fails
    error: null,
  },
  reducers: {
    /**
     * Clear any existing error state
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Reset the entire metrics state to initial values
     */
    resetMetrics: (state) => {
      state.metricsData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchHeaderMetrics pending state
      .addCase(fetchHeaderMetrics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle fetchHeaderMetrics fulfilled state
      .addCase(fetchHeaderMetrics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metricsData = action.payload;
        state.error = null;
      })
      // Handle fetchHeaderMetrics rejected state
      .addCase(fetchHeaderMetrics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearError, resetMetrics } = headerMetricsSlice.actions;

// Export reducer
export default headerMetricsSlice.reducer;
