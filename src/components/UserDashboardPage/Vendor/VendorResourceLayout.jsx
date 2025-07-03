import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import ReusableTable from "@/components/UI/ReusableTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/shadcn/dialog";
import useVendorResource from "@/hooks/Dashboard/Vendor/useVendorResource";
import { Paperclip } from "lucide-react";

/**
 * VendorResourceLayout component for managing vendor resource requests
 *
 * Features:
 * - Display vendor requests in a table format
 * - Inline editing of pending with and comments
 * - Attachment management with upload dialog
 * - Pagination support
 * - Loading and error states
 */
export default function VendorResourceLayout() {
  const {
    requests,
    isLoading,
    error,
    pagination,
    fetchRequests,
    updateRequest,
    manageAttachments,
    handleClearError,
  } = useVendorResource();

  // Local state for dialog management
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const pathname = usePathname();
  const hasFetchedData = useRef(false);

  /**
   * Fetch resource data on component mount for specific route
   */
  useEffect(() => {
    if (pathname === "/user/resource" && !hasFetchedData.current) {
      fetchRequests();
      hasFetchedData.current = true;
    }
  }, [pathname, fetchRequests]);

  /**
   * Handle updating vendor request fields
   * @param {string|number} id - Request ID
   * @param {string} pendingWith - Updated pending with value
   * @param {string} comments - Updated comments value
   */
  const handleUpdateRequest = useCallback(
    (id, pendingWith, comments) => {
      updateRequest(id, pendingWith, comments);
    },
    [updateRequest]
  );

  /**
   * Handle attachment management
   * @param {string|number} id - Request ID
   * @param {FileList|File[]} files - Files to upload
   */
  const handleManageAttachments = useCallback(
    (id, files) => {
      manageAttachments(id, files);
    },
    [manageAttachments]
  );

  /**
   * Open attachment management dialog
   * @param {string|number} requestId - Request ID
   */
  const handleOpenDialog = useCallback((requestId) => {
    setSelectedRequestId(requestId);
    setIsDialogOpen(true);
  }, []);

  /**
   * Close attachment management dialog
   */
  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedRequestId(null);
  }, []);

  /**
   * Handle page change for pagination
   * @param {number} page - New page number
   */
  const handlePageChange = useCallback(
    (page) => {
      fetchRequests(page, pagination?.itemsPerPage || 10);
    },
    [fetchRequests, pagination?.itemsPerPage]
  );

  /**
   * Table column configuration
   */
  const tableColumns = [
    { key: "id", label: "ID" },
    { key: "requestType", label: "Request Type" },
    { key: "role", label: "Role" },
    { key: "experience", label: "Experience" },
    { key: "requesterName", label: "Requester Name" },
    { key: "requestReceivedDate", label: "Request Received Date" },
    { key: "firstProfileProposedDate", label: "First Profile Proposed Date" },
    { key: "agingSinceRequest", label: "Aging Since Request" },
    { key: "agingSinceLastAction", label: "Aging Since Last Action" },
    { key: "pendingWith", label: "Pending With" },
    { key: "comments", label: "Comments" },
    { key: "attachments", label: "Attachments" },
  ];

  /**
   * Transform requests data for table display
   * Includes inline editing components for pending with and comments
   */
  const tableData = Array.isArray(requests)
    ? requests.map((request) => ({
        id: request.id,
        requestType: request.requestType,
        role: request.role,
        experience: `${request.experience?.min || "N/A"} - ${
          request.experience?.max || "N/A"
        } yrs`,
        requesterName: request.requester?.name || "N/A",
        requestReceivedDate: request.requestReceivedDate,
        firstProfileProposedDate: request.firstProfileProposedDate || "N/A",
        agingSinceRequest: request.agingSinceRequest,
        agingSinceLastAction: request.agingSinceLastAction,
        pendingWith: (
          <input
            type="text"
            className="border border-border rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            defaultValue={request.pendingWith || ""}
            aria-label={`Pending With for request ${request.id}`}
            onBlur={(e) =>
              handleUpdateRequest(request.id, e.target.value, request.comments)
            }
          />
        ),
        comments: (
          <input
            type="text"
            className="border border-border rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            defaultValue={request.comments || ""}
            aria-label={`Comments for request ${request.id}`}
            onBlur={(e) =>
              handleUpdateRequest(
                request.id,
                request.pendingWith,
                e.target.value
              )
            }
          />
        ),
        attachments: (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center">
              <Paperclip className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">
                {request.attachments?.length || 0}
              </span>
            </div>
            <button
              onClick={() => handleOpenDialog(request.id)}
              aria-label={`Manage attachments for request ${request.id}`}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-background bg-foreground rounded-md hover:bg-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              type="button"
            >
              Manage
            </button>
          </div>
        ),
      }))
    : [];

  /**
   * Use pagination from API if available, otherwise use fallback
   * Ensures pagination is always available for the table component
   */
  const paginationData =
    pagination && pagination.totalItems !== undefined
      ? pagination
      : {
          currentPage: 1,
          totalPages: Math.max(1, Math.ceil(tableData.length / 10)),
          totalItems: Math.max(tableData.length, 1),
          itemsPerPage: 10,
        };

  return (
    <div className="px-6 py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Vendor Resource</h2>
        <p className="text-sm text-secondary mt-1">
          Manage vendor resource requests and track their progress
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-foreground">Loading vendor requests...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center justify-between">
            <div className="text-red-700" role="alert">
              Error loading requests: {error}
            </div>
            <button
              onClick={handleClearError}
              className="text-red-500 hover:text-red-700 text-sm underline"
              type="button"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Table */}
      {!isLoading && !error && (
        <ReusableTable
          data={tableData}
          columns={tableColumns}
          loading={isLoading}
          error={error}
          pagination={paginationData}
          onPageChange={handlePageChange}
        />
      )}

      {/* Attachment Management Dialog */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="backdrop-blur-md max-w-md">
            <DialogHeader>
              <DialogTitle>
                Manage Attachments for Request {selectedRequestId}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* File Drop Zone */}
              <div
                className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onDrop={(e) => {
                  e.preventDefault();
                  handleManageAttachments(
                    selectedRequestId,
                    e.dataTransfer.files
                  );
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                role="button"
                tabIndex={0}
                aria-label="Drag and drop files here or use file input below"
              >
                <div className="text-gray-600">
                  Drag and drop files here or use the button below
                </div>
              </div>

              {/* File Input */}
              <div>
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/80"
                  onChange={(e) =>
                    handleManageAttachments(selectedRequestId, e.target.files)
                  }
                  aria-describedby="file-upload-help"
                />
                <p id="file-upload-help" className="mt-1 text-xs text-gray-500">
                  Select multiple files to upload
                </p>
              </div>

              {/* Current Attachments */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Current Attachments
                </h4>
                <ul className="space-y-1 max-h-32 overflow-y-auto">
                  {(Array.isArray(requests) &&
                    requests
                      .find((request) => request.id === selectedRequestId)
                      ?.attachments?.map((attachment, index) => (
                        <li
                          key={index}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm underline"
                          role="button"
                          tabIndex={0}
                          aria-label={`Download ${attachment.split("/").pop()}`}
                        >
                          {attachment.split("/").pop()}
                        </li>
                      ))) || (
                    <li className="text-gray-500 text-sm italic">
                      No attachments
                    </li>
                  )}
                </ul>
              </div>

              {/* Dialog Actions */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleCloseDialog}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md hover:bg-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
