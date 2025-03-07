import { Printer, Upload, X } from "lucide-react";

export default function SelectionToolbar({ selectedCount }) {
  return (
    <div className="fixed bottom-4 left-1/2 border border-border transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-4">
      <button className="p-1 hover:bg-gray-800 rounded">
        <X className="h-5 w-5 text-white" />
      </button>
      <div className="text-sm">Selected: {selectedCount}</div>
      <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-700 rounded-md hover:bg-gray-800">
        <Upload className="h-4 w-4" /> Export
      </button>
      <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-700 rounded-md hover:bg-gray-800">
        <Printer className="h-4 w-4" /> Print
      </button>
      <button className="p-1 hover:bg-gray-800 rounded">•••</button>
    </div>
  );
}
