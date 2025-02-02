export default function SelectionToolbar({ selectedCount }) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-4">
      <button className="p-1 hover:bg-gray-800 rounded">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-sm">Selected: {selectedCount}</div>
      <button className="px-3 py-1.5 text-sm border border-gray-700 rounded-md hover:bg-gray-800">
        ↑ Export
      </button>
      <button className="px-3 py-1.5 text-sm border border-gray-700 rounded-md hover:bg-gray-800">
        🖨 Print
      </button>
      <button className="p-1 hover:bg-gray-800 rounded">•••</button>
    </div>
  );
}
