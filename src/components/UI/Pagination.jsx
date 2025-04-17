import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}) {
  // Calculate the start and end items being displayed
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display (show 5 pages max)
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);

      // Adjust if we're near the end
      if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - 2);
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="mt-6 w-full flex justify-between items-center bg-transparent text-foreground">
      {/* Mobile Pagination */}
      <div className="flex w-full justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex w-full items-center justify-between">
        <div>
          <p className="text-sm text-secondary">
            {totalItems > 0 ? (
              <>
                Showing <span className="font-medium">{startItem}</span> to{" "}
                <span className="font-medium">{endItem}</span> of{" "}
                <span className="font-medium">{totalItems}</span> results
              </>
            ) : (
              "No results found"
            )}
          </p>
        </div>
        {totalPages > 1 && (
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md border border-border"
              aria-label="Pagination"
            >
              {/* Previous Button */}
              <button
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-secondary ring-1 ring-border hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Page Numbers */}
              {pageNumbers.map((page, i) =>
                page === "ellipsis-start" || page === "ellipsis-end" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-bold text-secondary dark:text-gray-400 focus:outline-offset-0 border-r border-border"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-bold transition-all hover:bg-secondary/10 dark:hover:bg-secondary/20 border-r border-border ${
                      currentPage === page
                        ? "z-10 bg-primary text-white dark:bg-primary-dark dark:text-black"
                        : "text-black dark:text-white"
                    }`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
