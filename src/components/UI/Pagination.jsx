import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div className="mt-6 w-full flex justify-between items-center bg-transparent text-foreground">
      {/* Mobile Pagination */}
      <div className="flex w-full justify-between sm:hidden">
        <button className="relative inline-flex items-center rounded-md border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all">
          Previous
        </button>
        <button className="relative ml-3 inline-flex items-center rounded-md border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all">
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex w-full items-center justify-between">
        <div>
          <p className="text-sm text-secondary">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">100</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md border border-border"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-secondary ring-1 ring-border hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all">
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Page Numbers */}
            {[...Array(Math.min(5, 10))].map((_, i) => (
              <button
                key={i}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-bold transition-all hover:bg-secondary/10 dark:hover:bg-secondary/20 border-r border-border ${
                  1 === i + 1
                    ? "z-10 bg-primary text-white dark:bg-primary-dark dark:text-black"
                    : "text-black dark:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Ellipsis */}
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-bold text-secondary dark:text-gray-400 focus:outline-offset-0 border-r border-border">
              ...
            </span>

            {/* Next Button */}
            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all">
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
