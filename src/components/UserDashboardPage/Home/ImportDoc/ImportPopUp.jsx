"use client";

import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/UI/shadcn/dialog";
import { Button } from "@/components/UI/shadcn/button";
import { Progress } from "@/components/UI/shadcn/progress";
import { toast } from "sonner";
import useAuth from "@/hooks/Auth/useAuth";
import useContractUpload from "@/hooks/Dashboard/Home/ContractImport/useContractUpload";
import ErrorComponent from "./Components/ErrorComponent";
import UploadComponent from "./Components/UploadComponent";

export default function ImportPopUp({ isOpen, onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadName, setUploadName] = useState("");
  const [visibleRoles, setVisibleRoles] = useState({
    vendorManager: false,
    businessStakeholder: false,
    admin: false,
  });
  const [selectAll, setSelectAll] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Get tenantId from auth hook
  const { getTenantId } = useAuth();
  const tenantId = getTenantId();

  // Use our PDF upload hook
  const {
    currentUploads,
    uploading,
    uploadComplete,
    handleUpload,
    resetUploadState,
    error,
    handleProcessContracts,
  } = useContractUpload();

  // Sync Redux error with local error state
  useEffect(() => {
    if (error) {
      setUploadError(error);
    }
  }, [error]);

  // Check for tenantId on mount
  useEffect(() => {
    if (isOpen && !tenantId) {
      toast.error("Tenant ID not found. Please reload the page.");
    }
  }, [isOpen, tenantId]);

  // Reset form state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedFiles([]);
      setUploadName("");
      setVisibleRoles({
        vendorManager: false,
        businessStakeholder: false,
        admin: false,
      });
      setSelectAll(false);
      setUploadError(null);
      resetUploadState();
    }
  }, [isOpen, resetUploadState]);

  // Close dialog after successful upload
  useEffect(() => {
    if (uploadComplete && !uploading) {
      onClose();
    }
  }, [uploadComplete, uploading, onClose]);

  const handleImport = async () => {
    // Clear any previous errors
    setUploadError(null);

    // Validate tenant ID
    if (!tenantId) {
      setUploadError("Tenant ID not found. Please reload the page.");
      return;
    }

    // Validate file selection
    if (selectedFiles.length === 0) {
      setUploadError("Please select at least one PDF file.");
      return;
    }

    // Validate upload name
    if (!uploadName.trim()) {
      setUploadError("Please enter a name for this upload.");
      return;
    }

    // Validate role selection
    const hasSelectedRole = Object.values(visibleRoles).some((value) => value);
    if (!hasSelectedRole) {
      setUploadError("Please select at least one role for visibility.");
      return;
    }

    // Convert visibleRoles object to array of role strings
    const visibleToRoles = [];
    if (visibleRoles.vendorManager) visibleToRoles.push("VENDOR_MANAGER");
    if (visibleRoles.businessStakeholder)
      visibleToRoles.push("BUSINESS_STAKEHOLDER");
    if (visibleRoles.admin) visibleToRoles.push("ADMIN");

    try {
      const result = await handleUpload({
        files: selectedFiles,
        uploadName,
        visibleToRoles,
      });

      if (result.success) {
        // Process contracts after all uploads are complete
        setTimeout(() => {
          handleProcessContracts();
        }, 6000);
      } else {
        let errorMessage = result.error || "Upload failed with unknown error";

        // Add more detailed error info if available
        if (result.results) {
          const failedUploads = result.results
            .filter(
              (r) =>
                r.status === "rejected" ||
                (r.status === "fulfilled" && !r.value?.success)
            )
            .map((r) => {
              if (r.status === "rejected")
                return r.reason?.fileName || "Unknown file";
              return r.value?.filename || "Unknown file";
            });

          if (failedUploads.length > 0) {
            errorMessage += `. Failed files: ${failedUploads.join(", ")}`;
          }
        }

        setUploadError(errorMessage);
      }
    } catch (error) {
      setUploadError(
        error.message || "An unexpected error occurred during upload."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={!uploading && onClose}>
      <DialogContent aria-label="Import new contracts" className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Import new contracts
          </DialogTitle>
          <DialogDescription className="text-sm">
            Supports PDF files only (up to 100MB per file)
          </DialogDescription>
        </DialogHeader>

        {!tenantId && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md mb-4">
            Tenant ID not found. Please reload the page to continue.
          </div>
        )}

        {!uploading ? (
          <UploadComponent
            uploading={uploading}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            setUploadName={setUploadName}
            uploadName={uploadName}
            visibleRoles={visibleRoles}
            selectAll={selectAll}
            setVisibleRoles={setVisibleRoles}
            setSelectAll={setSelectAll}
          />
        ) : (
          <div className="p-3 bg-muted rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Upload Summary</span>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">{uploadName}</span> •{" "}
                  {selectedFiles.length} file(s) •{" "}
                  <span>
                    {Object.entries(visibleRoles)
                      .filter(([_, value]) => value)
                      .map(([key]) => {
                        switch (key) {
                          case "vendorManager":
                            return "Vendor Manager";
                          case "businessStakeholder":
                            return "Business Stakeholder";
                          case "admin":
                            return "Admin";
                          default:
                            return key;
                        }
                      })
                      .join(", ")}
                  </span>
                </div>
              </div>
              <Button
                variant="link"
                onClick={resetUploadState}
                className="text-sm cancel-red"
              >
                Cancel Upload
              </Button>
            </div>
          </div>
        )}

        {uploading && (
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <p className="text-sm">Uploading files... please wait</p>
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.min(
                  Object.values(currentUploads).filter(
                    (upload) => upload.progress === 100
                  ).length,
                  selectedFiles.length
                )}{" "}
                of {selectedFiles.length} complete
              </span>
            </div>

            <div className="space-y-3">
              {selectedFiles.map((file) => (
                <div key={file.name} className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate font-medium">{file.name}</span>
                    {currentUploads[file.name] ? (
                      <span className="text-xs ml-2">
                        {currentUploads[file.name].status === "failed" ? (
                          <span className="text-destructive">Failed</span>
                        ) : (
                          <span>{currentUploads[file.name].progress}%</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-xs flex items-center">
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        Waiting...
                      </span>
                    )}
                  </div>

                  {currentUploads[file.name] ? (
                    <Progress
                      value={currentUploads[file.name].progress}
                      className={`h-2 ${
                        currentUploads[file.name].status === "failed"
                          ? "bg-destructive/20"
                          : ""
                      }`}
                    />
                  ) : (
                    <Progress value={0} className="h-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {uploadComplete && (
          <div className="p-4 bg-success/10 text-success rounded-md mt-4 flex items-center">
            <div className="rounded-full bg-success/20 p-2 mr-3">
              <Check size={16} />
            </div>
            <div>
              <p className="font-medium">Upload Completed</p>
              <p className="text-xs mt-1">All files uploaded successfully!</p>
            </div>
          </div>
        )}

        {uploadError && <ErrorComponent uploadError={uploadError} />}

        <DialogFooter>
          {!uploading && (
            <>
              <button
                className="px-4 py-2 text-sm text-primary"
                onClick={onClose}
                disabled={uploading}
              >
                Cancel
              </button>
              <Button
                type="button"
                onClick={handleImport}
                disabled={
                  selectedFiles.length === 0 ||
                  !uploadName.trim() ||
                  !tenantId ||
                  !Object.values(visibleRoles).some((role) => role)
                }
              >
                Upload Files
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
