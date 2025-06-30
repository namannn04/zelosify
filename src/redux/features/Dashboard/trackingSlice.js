import axiosInstance from "@/utils/Axios/AxiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching tracking data
export const fetchTrackingData = createAsyncThunk(
  "tracking/fetchTrackingData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contracts");
      return response.data;
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      return rejectWithValue(
        error.response?.data ||
          "An error occurred while fetching tracking data."
      );
    }
  }
);

// Async thunk for handling pagination
export const handlePageChange = createAsyncThunk(
  "tracking/handlePageChange",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/contracts?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Error handling page change:", error);
      return rejectWithValue(
        error.response?.data || "An error occurred while changing pages."
      );
    }
  }
);

// Async thunk for handling filter changes
export const handleFilterChange = createAsyncThunk(
  "tracking/handleFilterChange",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/contracts/filters`, filters);
      return response.data;
    } catch (error) {
      console.error("Error handling filter change:", error);
      return rejectWithValue(
        error.response?.data || "An error occurred while applying filters."
      );
    }
  }
);

const trackingSlice = createSlice({
  name: "tracking",
  initialState: {
    contracts: [],
    loading: false, // Default loading state
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
    filters: {
      startDate: null,
      endDate: null,
      minAmount: null,
      maxAmount: null,
      ownedBy: null,
    },
  },
  reducers: {
    setContracts(state, action) {
      state.contracts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrackingData.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload.contracts;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
        };
      })
      .addCase(fetchTrackingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handlePageChange.fulfilled, (state, action) => {
        state.pagination.page = action.payload.page;
        state.contracts = action.payload.contracts;
      })
      .addCase(handleFilterChange.fulfilled, (state, action) => {
        state.filters = action.payload.filters;
        state.pagination.page = 1; // Reset to first page
        state.contracts = action.payload.contracts;
      });
  },
});

export const { setContracts, setLoading, setError, setPagination, setFilters } =
  trackingSlice.actions;

export default trackingSlice.reducer;
