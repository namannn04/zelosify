import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import ReusableTable from "@/components/UI/ReusableTable";
import useVendorResource from "@/hooks/Dashboard/Vendor/useVendorResource";
import { BarChart3, Paperclip, Edit3 } from "lucide-react";
import { getRequestTypeColor } from "@/utils/Dashboard/Vendor/vendorResourceUtils";
import CircleLoader from "@/components/UI/loaders/CircleLoader";
import AttachmentManagement from "./AttachmentManagement";
import { formatDate } from "@/utils/Common/date";

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
    isUpdating,
    updateSuccess,
    error,
    pagination,
    fetchRequests,
    updateRequest,
    manageAttachments,
    handleClearError,
    handleClearUpdateSuccess,
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
   * Handle update success and error notifications
   */
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Request updated successfully", {
        description: "Pending with and comments have been saved.",
      });
      handleClearUpdateSuccess();
    }
  }, [updateSuccess, handleClearUpdateSuccess]);

  useEffect(() => {
    if (error && !isLoading) {
      toast.error("Action Failed", {
        description: error,
      });
    }
  }, [error, isLoading]);

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
        requestType: (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getRequestTypeColor(
              request.requestType
            )}`}
          >
            {request.requestType || "N/A"}
          </span>
        ),
        role: request.role,
        experience: `${request.experience?.min || "N/A"} - ${
          request.experience?.max || "N/A"
        } yrs`,
        requesterName: request.requester?.name || "N/A",
        requestReceivedDate: formatDate(request.requestReceivedDate),
        firstProfileProposedDate: formatDate(request.firstProfileProposedDate),
        agingSinceRequest: request.agingSinceRequest,
        agingSinceLastAction: request.agingSinceLastAction,
        pendingWith: (
          <div className="relative group">
            <input
              type="text"
              className={`border border-dashed border-gray-300 dark:border-gray-600 rounded px-2 py-1 pr-8 w-full text-sm bg-transparent hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-solid focus:border-primary transition-all duration-200 ${
                isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-text"
              }`}
              defaultValue={request.pendingWith || ""}
              placeholder="Click to edit pending with..."
              disabled={isUpdating}
              aria-label={`Pending With for request ${request.id}`}
              onBlur={(e) => {
                const newValue = e.target.value.trim();
                const currentValue = (request.pendingWith || "").trim();
                if (newValue !== currentValue) {
                  handleUpdateRequest(request.id, newValue, request.comments);
                }
              }}
            />
            <Edit3 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 group-hover:text-primary transition-colors pointer-events-none" />
          </div>
        ),
        comments: (
          <div className="relative group">
            <input
              type="text"
              className={`border border-dashed border-gray-300 dark:border-gray-600 rounded px-2 py-1 pr-8 w-full text-sm bg-transparent hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-solid focus:border-primary transition-all duration-200 ${
                isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-text"
              }`}
              defaultValue={request.comments || ""}
              placeholder="Click to edit comments..."
              disabled={isUpdating}
              aria-label={`Comments for request ${request.id}`}
              onBlur={(e) => {
                const newValue = e.target.value.trim();
                const currentValue = (request.comments || "").trim();
                if (newValue !== currentValue) {
                  handleUpdateRequest(
                    request.id,
                    request.pendingWith,
                    newValue
                  );
                }
              }}
            />
            <Edit3 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 group-hover:text-primary transition-colors pointer-events-none" />
          </div>
        ),
        attachments: (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center text-foreground">
              <Paperclip className="w-4 h-4 mr-2" />
              <span className="text-sm">
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
          <CircleLoader className="w-12 h-12 text-primary mx-auto mb-4" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div className="flex items-center justify-between">
            <div className="text-red-700 dark:text-red-300" role="alert">
              Error loading requests: {error}
            </div>
            <button
              onClick={handleClearError}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm underline"
              type="button"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && tableData.length === 0 && (
        <div className="flex-center h-[80vh] w-full">
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No requests found
            </h3>
            <p className="text-secondary mb-4">
              There are currently no vendor resource requests to display.
            </p>
          </div>
        </div>
      )}

      {/* Main Table */}
      {!isLoading && !error && tableData.length > 0 && (
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
        <AttachmentManagement
          isDialogOpen={isDialogOpen}
          handleCloseDialog={handleCloseDialog}
          selectedRequestId={selectedRequestId}
          handleManageAttachments={handleManageAttachments}
          requests={requests}
        />
      )}
    </div>
  );
}
