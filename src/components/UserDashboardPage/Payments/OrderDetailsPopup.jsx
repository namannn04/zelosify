import { Mail, Phone, Upload, Printer } from "lucide-react";

export default function OrderDetailsPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-black">
          <div className="flex items-center gap-3">
            <div className="text-sm text-white font-medium">Order #4567</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-gray-200 hover:text-gray-400"
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
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-700">
                EH
              </div>
              <div className="font-medium text-gray-900">Esther Howard</div>
            </div>
            <div className="ml-2 flex items-center gap-5 mb-2">
              <Mail className="h-4 w-4 text-gray-600" />
              <div className="text-sm text-gray-600">brodrigues@gmail.com</div>
            </div>
            <div className="ml-2 flex items-center gap-5 mb-2">
              <Phone className="h-4 w-4 text-gray-600" />
              <div className="text-sm text-gray-600">+1 (415) 555-2671</div>
            </div>
          </div>

          {/* Contract Details - Bullet List */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Contract Details :
            </h3>
            <ul className="list-disc pl-5 space-y-3 text-sm text-gray-800">
              <li>
                <span className="font-medium">
                  Stihl TS 800 cut-off machine
                </span>
                <br />
                <span className="text-gray-600">
                  Includes 5x diamond cutting discs
                </span>
                <br />
                <span className="font-medium">$1,590.00</span>
              </li>
              <li>
                <span className="font-medium">
                  Gasoline generator EYG 7500i
                </span>
                <br />
                <span className="text-gray-600">Inverter model</span>
                <br />
                <span className="font-medium">$337.89</span>
              </li>
            </ul>
          </div>

          {/* Total Section */}
          <div className="pt-4 border-t border-dashed">
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">Total:</span>
              <span className="font-medium text-gray-900">$1,927.89</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              <Upload className="h-4 w-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>
          <button className="text-gray-600">•••</button>
        </div>
      </div>
    </div>
  );
}
