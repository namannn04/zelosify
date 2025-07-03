import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/Axios/AxiosInstance";

/**
 * Async thunk to fetch vendor resource requests with pagination
 * @param {Object} params - Request parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @returns {Promise} API response with data and pagination
 */
export const fetchVendorRequests = createAsyncThunk(
  "vendorResource/fetchVendorRequests",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vendor/requests", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendor requests"
      );
    }
  }
);

/**
 * Async thunk to update vendor request "Pending With" and "Comments" fields
 * @param {Object} params - Update parameters
 * @param {string|number} params.id - Request ID
 * @param {string} params.pendingWith - Updated pending with value
 * @param {string} params.comments - Updated comments value
 * @returns {Promise} Updated request data
 */
export const updateVendorRequest = createAsyncThunk(
  "vendorResource/updateVendorRequest",
  async ({ id, pendingWith, comments }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/vendor/requests/${id}`, {
        pendingWith,
        comments,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update vendor request"
      );
    }
  }
);

/**
 * Async thunk to upload and manage attachments for vendor requests
 * @param {Object} params - Upload parameters
 * @param {string|number} params.id - Request ID
 * @param {FileList|File[]} params.files - Files to upload
 * @returns {Promise} Updated request data with new attachments
 */
export const uploadAttachments = createAsyncThunk(
  "vendorResource/uploadAttachments",
  async ({ id, files }, { rejectWithValue }) => {
    try {
      // Get presigned URLs for file upload
      const presignResponse = await axiosInstance.post(
        `/vendor/requests/${id}/attachments/presign`,
        { filenames: files.map((file) => file.name) }
      );

      // Upload files to presigned URLs
      const uploadPromises = presignResponse.data.map(({ url, key }, index) => {
        return axiosInstance
          .put(url, files[index], {
            headers: {
              "Content-Type": files[index].type,
            },
          })
          .then(() => key);
      });

      const uploadedKeys = await Promise.all(uploadPromises);

      // Update request with new attachment keys
      const updateResponse = await axiosInstance.patch(
        `/vendor/requests/${id}`,
        {
          attachments: uploadedKeys,
        }
      );

      return updateResponse.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload attachments"
      );
    }
  }
);

/**
 * Initial state for vendor resource management
 */
const initialState = {
  requests: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

/**
 * Vendor resource slice for managing vendor requests state
 */
const vendorResourceSlice = createSlice({
  name: "vendorResource",
  initialState,
  reducers: {
    /**
     * Clear error state
     * @param {Object} state - Current state
     */
    clearError(state) {
      state.error = null;
    },
    /**
     * Reset vendor resource state to initial values
     * @returns {Object} Initial state
     */
    resetVendorResource() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch vendor requests cases
      .addCase(fetchVendorRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVendorRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload.data || [];
        state.pagination = action.payload.pagination || {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10,
        };
      })
      .addCase(fetchVendorRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // Update vendor request cases
      .addCase(updateVendorRequest.pending, (state) => {
        state.error = null;
      })
      .addCase(updateVendorRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(updateVendorRequest.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Upload attachments cases
      .addCase(uploadAttachments.pending, (state) => {
        state.error = null;
      })
      .addCase(uploadAttachments.fulfilled, (state, action) => {
        const index = state.requests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(uploadAttachments.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

// Export actions
export const { clearError, resetVendorResource } = vendorResourceSlice.actions;

// Selectors
export const selectVendorRequests = (state) => state.vendorResource.requests;
export const selectVendorLoading = (state) => state.vendorResource.isLoading;
export const selectVendorError = (state) => state.vendorResource.error;
export const selectVendorPagination = (state) =>
  state.vendorResource.pagination;

// Export reducer
export default vendorResourceSlice.reducer;
