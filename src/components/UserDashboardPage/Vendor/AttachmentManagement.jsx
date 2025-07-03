import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/shadcn/dialog";

export default function AttachmentManagement({
  isDialogOpen,
  handleCloseDialog,
  selectedRequestId,
  handleManageAttachments,
  requests,
}) {
  return (
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
            className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onDrop={(e) => {
              e.preventDefault();
              handleManageAttachments(selectedRequestId, e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            role="button"
            tabIndex={0}
            aria-label="Drag and drop files here or use file input below"
          >
            <div className="text-gray-600 dark:text-gray-300">
              Drag and drop files here or use the button below
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
              onChange={(e) =>
                handleManageAttachments(selectedRequestId, e.target.files)
              }
              aria-describedby="file-upload-help"
            />
            <p
              id="file-upload-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Select multiple files to upload
            </p>
          </div>

          {/* Current Attachments */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Attachments
            </h4>
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {(() => {
                const selectedRequest = requests?.find(
                  (request) => request.id === selectedRequestId
                );
                const attachments = selectedRequest?.attachments;

                if (Array.isArray(attachments) && attachments.length > 0) {
                  return attachments.map((attachment, index) => (
                    <span className="flex items-center" key={index}>
                      <span className="text-gray-700 dark:text-gray-300 mr-2">
                        {index + 1}.
                      </span>
                      <li
                        className="text-blue-600 dark:text-blue-400 text-sm cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                        role="button"
                        tabIndex={0}
                        aria-label={`Download ${attachment.split("/").pop()}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            // Handle download logic here
                          }
                        }}
                      >
                        {attachment.split("/").pop()}
                      </li>
                    </span>
                  ));
                }

                return (
                  <li className="text-gray-500 dark:text-gray-400 text-sm italic">
                    No attachments
                  </li>
                );
              })()}
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
  );
}
