import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/shadcn/dialog";
import {
  Paperclip,
  Upload,
  FileText,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/UI/shadcn/button";
import { formatAttachmentName } from "@/utils/Common/formatAttachment";

export default function AttachmentManagement({
  isDialogOpen,
  handleCloseDialog,
  selectedRequestId,
  handleManageAttachments,
  requests,
  isUploading = false,
}) {
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Find the selected request and its attachments
  const selectedRequest = requests?.find(
    (request) => request.id === selectedRequestId
  );
  const attachments = selectedRequest?.attachments || [];

  /**
   * Validates file before upload
   * @param {File} file - File to validate
   * @returns {boolean} - Whether file is valid
   */
  const validateFile = useCallback((file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];

    if (file.size > maxSize) {
      toast.error("File too large", {
        description: `${file.name} exceeds 10MB limit`,
      });
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: `${file.name} is not a supported file type`,
      });
      return false;
    }

    return true;
  }, []);

  /**
   * Handles file selection from input or drag-drop
   * @param {FileList|File[]} files - Files to select
   */
  const handleFileSelection = useCallback(
    (files) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(validateFile);

      if (validFiles.length === 0) return;
      if (validFiles.length !== fileArray.length) {
        toast.warning("Some files were skipped", {
          description: "Only valid files will be uploaded",
        });
      }

      setSelectedFiles(validFiles);
    },
    [validateFile]
  );

  /**
   * Handles file upload process on submit
   */
  const handleSubmitUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    setUploadProgress({});

    try {
      // Simulate progress tracking since actual upload is handled by Redux
      selectedFiles.forEach((file, index) => {
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            const currentProgress = prev[file.name] || 0;
            const newProgress = Math.min(currentProgress + 10, 90);

            if (newProgress >= 90) {
              clearInterval(progressInterval);
            }

            return { ...prev, [file.name]: newProgress };
          });
        }, 4000);
      });

      // Call the parent handler which uses Redux
      await handleManageAttachments(selectedRequestId, selectedFiles);

      // Complete progress
      setUploadProgress((_) => {
        const completed = {};
        selectedFiles.forEach((file) => {
          completed[file.name] = 100;
        });
        return completed;
      });

      // Clear progress and selected files after showing completion
      setTimeout(() => {
        setUploadProgress({});
        setSelectedFiles([]);
      }, 4000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadProgress({});
    }
  }, [selectedFiles, selectedRequestId, handleManageAttachments]);

  /**
   * Handles drag events
   */
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  /**
   * Handles drop event
   */
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files);
      }
    },
    [handleFileSelection]
  );

  /**
   * Handles file input change
   */
  const handleFileChange = useCallback(
    (e) => {
      handleFileSelection(e.target.files);
    },
    [handleFileSelection]
  );

  /**
   * Removes a selected file
   */
  const handleRemoveFile = useCallback((index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="backdrop-blur-md max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold">
            <Paperclip className="w-6 h-6 mr-2" />
            Manage Attachments for Request #{selectedRequestId}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Supports: PDF, DOC, DOCX, PPT, PPTX, TXT, images (max 10MB each)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Drop Zone - Hidden during upload */}
          {!isUploading && (
            <div
              className={`border-dashed border-2 ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload").click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("file-upload").click();
                }
              }}
              aria-label="Drag and drop files here or click to upload"
            >
              <Upload
                className={`w-10 h-10 mx-auto mb-2 ${
                  dragActive ? "text-primary" : "text-gray-400"
                } transition-colors`}
              />
              <div className="text-gray-600 dark:text-gray-300">
                <p className="font-medium">
                  {dragActive ? "Drop files here" : "Drag and drop files here"}
                </p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>

              {/* Hidden file input for click functionality */}
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
              />
            </div>
          )}

          {/* Selected Files Display - Hidden during upload */}
          {!isUploading && selectedFiles.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected Files ({selectedFiles.length})
              </label>
              <div className="max-h-36 overflow-y-auto space-y-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="space-y-2 mt-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                {isUploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                )}
                Upload Progress
              </h4>
              {Object.entries(uploadProgress).map(([filename, progress]) => (
                <div key={filename} className="text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="truncate max-w-[200px] text-gray-600 dark:text-gray-300">
                      {filename}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-500">{progress}%</span>
                      {progress === 100 && (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        progress === 100 ? "bg-green-500" : "bg-primary"
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current Attachments */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Attachments ({attachments.length})
            </h4>
            <div className="max-h-40 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
              {attachments.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {attachments.map((attachment, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span
                            className="text-blue-600 dark:text-blue-400 text-sm hover:text-blue-700 dark:hover:text-blue-300 hover:underline truncate max-w-[220px]"
                            title={formatAttachmentName(attachment)}
                          >
                            {formatAttachmentName(attachment)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-4 px-2 text-center text-gray-500 dark:text-gray-400 text-sm italic">
                  No attachments yet
                </div>
              )}
            </div>
          </div>

          {/* Dialog Actions */}

          <DialogFooter>
            <button
              onClick={handleCloseDialog}
              className="px-4 py-2 text-sm text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={isUploading}
            >
              Cancel
            </button>
            <Button
              type="button"
              onClick={handleSubmitUpload}
              disabled={isUploading || selectedFiles.length === 0}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
