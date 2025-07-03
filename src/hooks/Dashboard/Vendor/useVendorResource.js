import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  fetchVendorRequests,
  updateVendorRequest,
  uploadAttachments,
  clearError,
  clearUpdateSuccess,
  clearUploadSuccess,
  resetVendorResource,
  selectVendorRequests,
  selectVendorLoading,
  selectVendorUpdating,
  selectVendorUploading,
  selectVendorUpdateSuccess,
  selectVendorUploadSuccess,
  selectVendorError,
  selectVendorPagination,
} from "@/redux/features/Dashboard/vendorResourceSlice";

/**
 * Custom hook for managing vendor resource state and operations
 *
 * Provides:
 * - State selectors for requests, loading, error, and pagination
 * - Actions for fetching, updating, and managing vendor requests
 * - Error handling and state management utilities
 *
 * @returns {Object} Vendor resource state and action handlers
 */
const useVendorResource = () => {
  const dispatch = useDispatch();

  // State selectors
  const requests = useSelector(selectVendorRequests);
  const isLoading = useSelector(selectVendorLoading);
  const isUpdating = useSelector(selectVendorUpdating);
  const isUploading = useSelector(selectVendorUploading);
  const updateSuccess = useSelector(selectVendorUpdateSuccess);
  const uploadSuccess = useSelector(selectVendorUploadSuccess);
  const error = useSelector(selectVendorError);
  const pagination = useSelector(selectVendorPagination);

  /**
   * Fetch vendor requests with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 10)
   */
  const fetchRequests = useCallback(
    (page = 1, limit = 10) => {
      dispatch(fetchVendorRequests({ page, limit }));
    },
    [dispatch]
  );

  /**
   * Update vendor request pending with and comments
   * @param {string|number} id - Request ID
   * @param {string} pendingWith - Updated pending with value
   * @param {string} comments - Updated comments value
   */
  const updateRequest = useCallback(
    (id, payload) => {
      dispatch(updateVendorRequest({ id, payload }));
    },
    [dispatch]
  );

  /**
   * Upload and manage attachments for a vendor request
   * @param {string|number} id - Request ID
   * @param {FileList|File[]} files - Files to upload
   */
  const manageAttachments = useCallback(
    (id, files) => {
      dispatch(uploadAttachments({ id, files }));
    },
    [dispatch]
  );

  /**
   * Clear error state
   */
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Clear update success state
   */
  const handleClearUpdateSuccess = useCallback(() => {
    dispatch(clearUpdateSuccess());
  }, [dispatch]);

  /**
   * Clear upload success state
   */
  const handleClearUploadSuccess = useCallback(() => {
    dispatch(clearUploadSuccess());
  }, [dispatch]);

  /**
   * Reset vendor resource state to initial values
   */
  const handleResetState = useCallback(() => {
    dispatch(resetVendorResource());
  }, [dispatch]);

  return {
    // State
    requests,
    isLoading,
    isUpdating,
    isUploading,
    updateSuccess,
    uploadSuccess,
    error,
    pagination,
    // Actions
    fetchRequests,
    updateRequest,
    manageAttachments,
    handleClearError,
    handleClearUpdateSuccess,
    handleClearUploadSuccess,
    handleResetState,
  };
};

export default useVendorResource;
