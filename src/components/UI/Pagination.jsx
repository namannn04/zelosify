import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function Pagination() {
  return (
    <div className="mt-6 flex items-center justify-between bg-white text-black dark:bg-[#0F172A] dark:text-gray-100">
      <div className="flex flex-1 justify-between sm:hidden">
        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
          Previous
        </button>
        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">100</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-600 dark:hover:bg-gray-700">
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {[...Array(Math.min(5, 10))].map((_, i) => (
              <button
                key={i}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-bold ${
                  1 === i + 1
                    ? "z-10 bg-black text-white dark:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-bold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-600">
              ...
            </span>
            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-600 dark:hover:bg-gray-700">
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
