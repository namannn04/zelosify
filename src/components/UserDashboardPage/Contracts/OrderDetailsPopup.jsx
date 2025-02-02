export default function OrderDetailsPopup({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Order #4567</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
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
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Customer Info */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                EH
              </div>
              <div className="font-medium">Esther Howard</div>
            </div>
            <div className="text-sm text-gray-600 ml-11">
              brodrigues@gmail.com
            </div>
            <div className="text-sm text-gray-600 ml-11">+1 (415) 555-2671</div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b mb-4">
            <button className="px-1 py-2 border-b-2 border-gray-900 text-sm font-medium">
              Order items
            </button>
            <button className="px-1 py-2 text-sm text-gray-500">
              Delivery
            </button>
            <button className="px-1 py-2 text-sm text-gray-500">Docs</button>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">🔧</div>
              <div className="flex-grow">
                <div className="text-sm font-medium">
                  Stihl TS 800 cut-off machine incl.
                </div>
                <div className="text-sm text-gray-500">
                  5x diamond cutting discs
                </div>
                <div className="mt-1">
                  <span className="text-sm">1 × </span>
                  <span className="text-sm font-medium">$1,590.00</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">⚡</div>
              <div className="flex-grow">
                <div className="text-sm font-medium">
                  Gasoline generator EYG 7500i
                </div>
                <div className="text-sm text-gray-500">(inverter)</div>
                <div className="mt-1">
                  <span className="text-sm">1 × </span>
                  <span className="text-sm font-medium">$337.89</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-medium">$1,927.89</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              ↑ Export
            </button>
            <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              📋 Duplicate
            </button>
            <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              🖨 Print
            </button>
          </div>
          <button className="text-gray-400 hover:text-gray-600">•••</button>
        </div>
      </div>
    </div>
  );
}
