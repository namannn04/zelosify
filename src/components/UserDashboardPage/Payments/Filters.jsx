import { Upload } from "lucide-react";
import React from "react";

export default function Filters() {
  return (
    <div className="flex justify-between items-center mb-6 text-sm">
      <div className="flex items-center gap-3">
        <button className="px-2 py-1 bg-gray-900 text-white rounded-md flex items-center gap-2">
          All<span className="text-xs">▼</span>
        </button>
        <button className="px-2 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
          Type <span className="text-xs">▼</span>
        </button>
        <button className="px-2 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
          Status <span className="text-xs">▼</span>
        </button>
        <button className="px-2 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
          Date <span className="text-xs">▼</span>
        </button>
      </div>
      <div className="flex gap-3">
        <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md flex items-center gap-2">
          <Upload className="h-4 w-4" /> Export
        </button>
      </div>
    </div>
  );
}
