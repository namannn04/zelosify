import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/shadcn/dialog";
import {
  Paperclip,
  Upload,
  FileText,
  Loader2,
  CheckCircle2,
} from "lucide-react";

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
   * Handles file upload process
   * @param {FileList|File[]} files - Files to upload
   */
  const handleUploadFiles = useCallback(
    async (files) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(validateFile);

      if (validFiles.length === 0) return;
      if (validFiles.length !== fileArray.length) {
        toast.warning("Some files were skipped", {
          description: "Only valid files will be uploaded",
        });
      }

      setUploadProgress({});

      try {
        // Simulate progress tracking since actual upload is handled by Redux
        validFiles.forEach((file, index) => {
          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
              const currentProgress = prev[file.name] || 0;
              const newProgress = Math.min(currentProgress + 10, 90);

              if (newProgress >= 90) {
                clearInterval(progressInterval);
              }

              return { ...prev, [file.name]: newProgress };
            });
          }, 200);
        });

        // Call the parent handler which uses Redux
        await handleManageAttachments(selectedRequestId, validFiles);

        // Complete progress
        setUploadProgress((prev) => {
          const completed = {};
          validFiles.forEach((file) => {
            completed[file.name] = 100;
          });
          return completed;
        });

        // Clear progress after showing completion
        setTimeout(() => {
          setUploadProgress({});
        }, 2000);
      } catch (error) {
        console.error("Upload error:", error);
        setUploadProgress({});
      }
    },
    [selectedRequestId, handleManageAttachments, validateFile]
  );

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
        handleUploadFiles(e.dataTransfer.files);
      }
    },
    [handleUploadFiles]
  );

  /**
   * Formats filename from S3 key
   */
  const formatAttachmentName = useCallback((attachmentKey) => {
    if (typeof attachmentKey === "object" && attachmentKey?.key) {
      attachmentKey = attachmentKey.key;
    }

    if (typeof attachmentKey !== "string") {
      console.error("Invalid attachmentKey: Expected a string", attachmentKey);
      return "Unknown Attachment";
    }

    try {
      return attachmentKey.split("/").pop() || attachmentKey;
    } catch (error) {
      console.error("Error formatting attachmentKey", { attachmentKey, error });
      return "Unknown Attachment";
    }
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="backdrop-blur-md max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Paperclip className="w-5 h-5 mr-2" />
            Manage Attachments for Request #{selectedRequestId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Drop Zone */}
          <div
            className={`border-dashed border-2 ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() =>
              !isUploading && document.getElementById("file-upload").click()
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !isUploading) {
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
          </div>

          {/* File Input */}
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Files
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-background hover:cursor-pointer hover:file:bg-primary/80 dark:file:bg-primary/80 dark:hover:file:bg-primary/60"
              onChange={(e) => handleUploadFiles(e.target.files)}
              disabled={isUploading}
              aria-describedby="file-upload-help"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
            />
            <p
              id="file-upload-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, images (max
              10MB each)
            </p>
          </div>

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
          <div className="flex justify-end pt-4">
            <button
              onClick={handleCloseDialog}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md hover:bg-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Close"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
