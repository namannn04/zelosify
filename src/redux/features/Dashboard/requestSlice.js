import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/Axios/AxiosInstance";

const initialState = {
  requests: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  },
  filters: {
    status: "",
    department: "",
    startDate: "",
    endDate: "",
  },
};

/**
 * Async thunk for fetching contract requests.
 * Retrieves contract requests based on pagination and filters.
 */
export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (_, { getState, rejectWithValue }) => {
    const { pagination, filters } = getState().requests;
    try {
      const { page, limit } = pagination;
      const { status, department, startDate, endDate } = filters;

      const queryParams = new URLSearchParams();
      queryParams.append("page", page);
      queryParams.append("limit", limit);

      if (status) queryParams.append("status", status);
      if (department) queryParams.append("department", department);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const response = await axios.get(
        `/contract-requests/list?${queryParams.toString()}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching contract requests"
      );
    }
  }
);

/**
 * Async thunk for approving a contract request.
 * @param {number} id - The ID of the contract request to approve.
 */
export const approveRequest = createAsyncThunk(
  "requests/approveRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contract-requests/${id}`, {
        action: "approve",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to approve request"
      );
    }
  }
);

/**
 * Async thunk for rejecting a contract request.
 * @param {number} id - The ID of the contract request to reject.
 */
export const rejectRequest = createAsyncThunk(
  "requests/rejectRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contract-requests/${id}`, {
        action: "reject",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to reject request"
      );
    }
  }
);

/**
 * Async thunk for getting AI recommendations for a contract request.
 * @param {number} id - The ID of the contract request to get AI recommendation for.
 */
export const getAIRecommendation = createAsyncThunk(
  "requests/getAIRecommendation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contract-requests/${id}`, {
        action: "askAI",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get AI recommendation"
      );
    }
  }
);

/**
 * Slice for managing contract requests state.
 * Includes reducers and extra reducers for handling async actions.
 */
const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    /**
     * Updates the current page in pagination.
     * @param {number} page - The new page number.
     */
    changePage(state, action) {
      state.pagination.page = action.payload;
    },

    /**
     * Updates filters and resets pagination to the first page.
     * @param {object} filters - The new filters to apply.
     */
    changeFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.data; // Correctly map the data property
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.requests = state.requests.map((request) =>
          request.id === action.payload.id
            ? { ...request, status: "approved" }
            : request
        );
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.requests = state.requests.map((request) =>
          request.id === action.payload.id
            ? { ...request, status: "rejected" }
            : request
        );
      })
      .addCase(getAIRecommendation.fulfilled, (state, action) => {
        state.requests = state.requests.map((request) =>
          request.id === action.payload.id
            ? {
                ...request,
                recommendation: action.payload.recommendation ?? null,
              }
            : request
        );
      });
  },
});

export const { changePage, changeFilters } = requestSlice.actions;
export default requestSlice.reducer;
