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
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/vendor/requests/${id}`,
        payload
      );
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
  async ({ id, files }, { dispatch, rejectWithValue }) => {
    try {
      // Get presigned URLs for file upload
      const presignResponse = await axiosInstance.post(
        `/vendor/requests/${id}/attachments/presign`,
        { filenames: files.map((file) => file.name) }
      );

      // Upload files using backend endpoints with tokens
      const uploadPromises = presignResponse.data.data.uploads.map(
        async ({ uploadToken, uploadEndpoint, filename }, index) => {
          const formData = new FormData();
          formData.append("file", files[index]);
          formData.append("uploadToken", uploadToken);

          const response = await axiosInstance.post(uploadEndpoint, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // Extract attachment details from response
          const {
            key,
            filename: uploadedFilename,
            uploadedAt,
          } = response.data.data.attachment;
          const totalAttachments = response.data.data.totalAttachments;

          // Dispatch action to update Redux state
          dispatch(
            vendorResourceSlice.actions.updateAttachments({
              id,
              attachment: { key, filename: uploadedFilename, uploadedAt },
              totalAttachments,
            })
          );

          return key;
        }
      );

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error(error);
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
  isUpdating: false,
  isUploading: false,
  error: null,
  updateSuccess: false,
  uploadSuccess: false,
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
     * Clear update success state
     * @param {Object} state - Current state
     */
    clearUpdateSuccess(state) {
      state.updateSuccess = false;
    },
    /**
     * Clear upload success state
     * @param {Object} state - Current state
     */
    clearUploadSuccess(state) {
      state.uploadSuccess = false;
    },
    /**
     * Reset vendor resource state to initial values
     * @returns {Object} Initial state
     */
    resetVendorResource() {
      return initialState;
    },
    /**
     * Update attachments in the vendor request
     * @param {Object} state - Current state
     * @param {Object} action - Action object
     * @param {Object} action.payload - Payload data
     * @param {string|number} action.payload.id - Request ID
     * @param {Object} action.payload.attachment - Attachment data
     * @param {string} action.payload.attachment.key - Attachment key
     * @param {string} action.payload.attachment.filename - Attachment filename
     * @param {string} action.payload.attachment.uploadedAt - Upload timestamp
     * @param {number} action.payload.totalAttachments - Total attachments count
     */
    updateAttachments(state, { payload }) {
      const { id, attachment, totalAttachments } = payload;
      const request = state.requests.find((req) => req.id === id);

      if (request) {
        request.attachments.push(attachment);
        request.totalAttachments = totalAttachments;
      }
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
        state.isUpdating = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateVendorRequest.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateSuccess = true;
        const index = state.requests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(updateVendorRequest.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateSuccess = false;
        state.error = action.payload || action.error.message;
      })
      // Upload attachments cases
      .addCase(uploadAttachments.pending, (state) => {
        state.isUploading = true;
        state.error = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadAttachments.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadSuccess = true;

        const { id, attachment, totalAttachments } = action.payload || {};

        if (!id) {
          // console.error("Missing request ID in payload", action.payload);
          return;
        }

        const request = state.requests.find((req) => req.id === id);

        if (request) {
          request.attachments.push(attachment);
          request.totalAttachments = totalAttachments;
        }
      })
      .addCase(uploadAttachments.rejected, (state, action) => {
        state.isUploading = false;
        state.uploadSuccess = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Export actions
export const {
  clearError,
  clearUpdateSuccess,
  clearUploadSuccess,
  resetVendorResource,
} = vendorResourceSlice.actions;

// Selectors
export const selectVendorRequests = (state) => state.vendorResource.requests;
export const selectVendorLoading = (state) => state.vendorResource.isLoading;
export const selectVendorUpdating = (state) => state.vendorResource.isUpdating;
export const selectVendorUploading = (state) =>
  state.vendorResource.isUploading;
export const selectVendorUpdateSuccess = (state) =>
  state.vendorResource.updateSuccess;
export const selectVendorUploadSuccess = (state) =>
  state.vendorResource.uploadSuccess;
export const selectVendorError = (state) => state.vendorResource.error;
export const selectVendorPagination = (state) =>
  state.vendorResource.pagination;

// Export reducer
export default vendorResourceSlice.reducer;
