import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import {
  generatePresignedUrls,
  uploadPdfFile,
  updateUploadProgress,
  resetUploads,
  setUploadError,
} from "@/redux/features/Dashboard/Home/contractUploadSlice";
import { toast } from "sonner";
import useAuth from "@/hooks/Auth/useAuth";

/**
 * Custom hook for managing PDF uploads
 * @returns {Object} Upload state and methods
 */
const useContractUpload = () => {
  const dispatch = useDispatch();
  const { getTenantId } = useAuth();
  const { presignedUrls, currentUploads, loading, error } = useSelector(
    (state) => state.contractUpload
  );
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  /**
   * Handles the complete PDF upload process
   * @param {Object} params - Upload parameters
   * @param {File[]} params.files - Array of PDF files to upload
   * @param {string} params.uploadName - Name for the batch upload
   * @param {string[]} params.visibleToRoles - Array of roles that can see the uploaded files
   * @returns {Promise<Object>} Upload result
   */
  const handleUpload = useCallback(
    async ({ files, uploadName, visibleToRoles }) => {
      try {
        const tenantId = getTenantId();

        if (!tenantId) {
          toast.error("Tenant ID not found. Please reload the page.");
          return { success: false, error: "Tenant ID not found" };
        }

        if (files.length === 0) {
          toast.error("Please select at least one PDF file.");
          return { success: false, error: "No files selected" };
        }

        if (!uploadName.trim()) {
          toast.error("Please enter a name for this upload.");
          return { success: false, error: "Upload name required" };
        }

        if (visibleToRoles.length === 0) {
          toast.error("Please select at least one role for visibility.");
          return { success: false, error: "No roles selected" };
        }

        setUploading(true);
        setUploadComplete(false);
        dispatch(resetUploads());

        // Step 1: Generate presigned URLs
        const filenames = files.map((file) => file.name);
        const presignResult = await dispatch(
          generatePresignedUrls({
            tenantId,
            filenames,
            uploadName,
            visibleToRoles,
          })
        ).unwrap();

        // Log the presign result for debugging
        console.log("Presign API response:", presignResult);
        console.log(
          "Upload tokens generated for:",
          presignResult.uploads.map((u) => u.filename)
        );

        // Step 2: Upload each file
        const uploadPromises = files.map(async (file) => {
          try {
            // Clean up filenames for comparison to ensure matching works correctly
            const cleanedFileName = file.name.toLowerCase().trim();

            // Try an exact match first
            let upload = presignResult.uploads.find(
              (u) => u.filename.toLowerCase().trim() === cleanedFileName
            );

            // If no match, try more flexible matching (remove spaces, etc.)
            if (!upload) {
              const normalizedFileName = cleanedFileName.replace(/\s+/g, "");
              upload = presignResult.uploads.find(
                (u) =>
                  u.filename.toLowerCase().trim().replace(/\s+/g, "") ===
                  normalizedFileName
              );
            }

            if (!upload) {
              console.error(
                `Failed to match file with presign result:
                - File name: "${file.name}" (cleaned: "${cleanedFileName}")
                - Available upload tokens for:`,
                presignResult.uploads.map((u) => `"${u.filename}"`)
              );
              throw new Error(`No upload token found for ${file.name}`);
            }

            // Debug log for token
            console.log(`Starting upload for ${file.name}:
              - Token exists: ${Boolean(upload.uploadToken)}
              - Token length: ${upload.uploadToken.length}
              - Upload endpoint: ${upload.uploadEndpoint || "Not provided"}
              - Matched with presign filename: "${upload.filename}"
            `);

            // Ensure the upload token is valid
            if (!upload.uploadToken) {
              throw new Error(
                `Upload token is missing or invalid for ${file.name}`
              );
            }

            const uploadResult = await dispatch(
              uploadPdfFile({
                tenantId,
                file,
                uploadToken: upload.uploadToken,
                onProgress: (progress) => {
                  dispatch(
                    updateUploadProgress({ filename: file.name, progress })
                  );
                },
              })
            ).unwrap();

            console.log(`Upload complete for ${file.name}:`, uploadResult);

            return {
              filename: file.name,
              success: true,
              response: uploadResult,
            };
          } catch (error) {
            console.error(`Upload error for ${file.name}:`, error);

            // Extract detailed error info
            const errorDetails = {
              message: error.message || "Upload failed",
              status: error.status,
              details: error.details || {},
            };

            dispatch(
              setUploadError({
                filename: file.name,
                error: errorDetails.message,
              })
            );

            return {
              filename: file.name,
              success: false,
              error: errorDetails,
              originalError: error,
            };
          }
        });

        const results = await Promise.allSettled(uploadPromises);

        // Check if all uploads succeeded
        const allSucceeded = results.every(
          (result) => result.status === "fulfilled" && result.value.success
        );

        setUploadComplete(true);

        if (allSucceeded) {
          toast.success("Contract Intelligence", {
            description: `Successfully uploaded ${files.length} ${
              files.length > 1 ? "files" : "file"
            }`,
          });
          return { success: true };
        } else {
          const failedCount = results.filter(
            (result) => result.status === "rejected" || !result.value?.success
          ).length;

          toast.error(`${failedCount} of ${files.length} uploads failed`);
          return {
            success: false,
            error: "Some uploads failed",
            results,
          };
        }
      } catch (error) {
        toast.error(`Upload failed: ${error.message || "Unknown error"}`);
        return { success: false, error: error.message || "Unknown error" };
      } finally {
        setUploading(false);
      }
    },
    [dispatch, getTenantId]
  );

  /**
   * Reset upload state
   */
  const resetUploadState = useCallback(() => {
    dispatch(resetUploads());
    setUploading(false);
    setUploadComplete(false);
  }, [dispatch]);

  return {
    // State
    presignedUrls,
    currentUploads,
    loading,
    error,
    uploading,
    uploadComplete,

    // Methods
    handleUpload,
    resetUploadState,
  };
};

export default useContractUpload;
