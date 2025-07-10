import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/Axios/AxiosInstance";

// Async thunk for generating presigned URLs
export const generatePresignedUrls = createAsyncThunk(
  "pdfUpload/generatePresignedUrls",
  async (
    { tenantId, filenames, uploadName, visibleToRoles },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/pdf/${tenantId}/presign`, {
        filenames,
        uploadName,
        visibleToRoles,
      });

      // Confirm what we're returning to the state
      const result = response.data.data;

      return result;
    } catch (error) {
      console.error("Error getting presigned URLs:", error);

      // Log detailed error information
      if (error.response) {
        console.error("Error response:", {
          status: error.response.status,
          data: error.response.data,
        });
      }

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Network error occurred"
      );
    }
  }
);

// Async thunk for uploading a single file
export const uploadPdfFile = createAsyncThunk(
  "pdfUpload/uploadPdfFile",
  async ({ tenantId, file, uploadToken, onProgress }, { rejectWithValue }) => {
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadToken", uploadToken);

      // Use axios to upload with progress tracking
      const response = await axiosInstance.post(
        `/pdf/${tenantId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total && onProgress) {
              const percentComplete = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              onProgress(percentComplete);
              console.log(
                `Upload progress for ${file.name}: ${percentComplete}%`
              );
            }
          },
        }
      );

      console.log(`Upload response for ${file.name}:`, response.data);
      return response.data;
    } catch (error) {
      // Detailed error logging
      console.error(`Upload failed for file ${file.name}:`);

      if (error.response) {
        console.error(`Response status: ${error.response.status}`);
        console.error(`Response data:`, error.response.data);
      } else if (error.request) {
        console.error(`No response received for request:`, error.request);
      } else {
        console.error(`Error message:`, error.message);
      }

      // Return detailed error information
      return rejectWithValue({
        message:
          error.response?.data?.message || error.message || "Upload failed",
        status: error.response?.status,
        details: error.response?.data || {},
        fileName: file.name,
      });
    }
  }
);

const initialState = {
  presignedUrls: [],
  uploads: {},
  loading: false,
  error: null,
  currentUploads: {},
};

const contractUploadSlice = createSlice({
  name: "contractUpload",
  initialState,
  reducers: {
    updateUploadProgress: (state, action) => {
      const { filename, progress } = action.payload;
      state.currentUploads[filename] = {
        ...state.currentUploads[filename],
        progress,
      };
    },
    resetUploads: (state) => {
      state.presignedUrls = [];
      state.currentUploads = {};
      state.error = null;
      state.loading = false;
    },
    setUploadError: (state, action) => {
      const { filename, error } = action.payload;
      state.currentUploads[filename] = {
        ...state.currentUploads[filename],
        error,
        status: "failed",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle generatePresignedUrls
      .addCase(generatePresignedUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePresignedUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.presignedUrls = action.payload.uploads;

        // Initialize upload progress tracking
        action.payload.uploads.forEach((upload) => {
          state.currentUploads[upload.filename] = {
            progress: 0,
            status: "pending",
          };
        });
      })
      .addCase(generatePresignedUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle uploadPdfFile
      .addCase(uploadPdfFile.fulfilled, (state, action) => {
        const { filename } = action.meta.arg;
        state.currentUploads[filename] = {
          ...state.currentUploads[filename],
          status: "completed",
          progress: 100,
        };
      })
      .addCase(uploadPdfFile.rejected, (state, action) => {
        const { filename } = action.meta.arg;

        // Log detailed rejection information
        console.error(
          `Upload rejected for ${filename}:`,
          action.payload || action.error
        );

        state.currentUploads[filename] = {
          ...state.currentUploads[filename],
          status: "failed",
          error:
            action.payload?.message || action.error?.message || "Upload failed",
          details: action.payload || action.error,
        };
      });
  },
});

export const { updateUploadProgress, resetUploads, setUploadError } =
  contractUploadSlice.actions;

export default contractUploadSlice.reducer;
