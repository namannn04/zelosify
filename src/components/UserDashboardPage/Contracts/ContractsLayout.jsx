import { useState } from "react";
import OrderDetailsPopup from "./OrderDetailsPopup";
import SelectionToolbar from "./SelectionToolbar";

const orders = [
  {
    id: "#192541",
    customer: { initials: "EH", name: "Esther Howard" },
    type: "Shipping",
    status: "Paid",
    products: ["🔧", "⚡"],
    total: "$3,127.00",
    date: "Jun 19",
  },
  {
    id: "#192540",
    customer: { initials: "DM", name: "David Miller" },
    type: "Pickups",
    status: "Paid",
    products: ["🔧"],
    total: "$864.00",
    date: "Jun 19",
  },
  {
    id: "#192539",
    customer: { initials: "JM", name: "James Moore" },
    type: "Shipping",
    status: "Paid",
    products: ["⚡"],
    total: "$1,527.00",
    date: "Jun 19",
  },
  // Add more orders as needed
];

export default function ContractsLayout() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const handleOrderClick = (order) => {
    setActiveOrder(order);
    setShowOrderDetails(true);
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedOrders(e.target.checked ? orders.map((order) => order.id) : []);
  };

  return (
    <div className="flex h-screen bg-white rounded-lg">
      {/* Main Content */}
      <div className="flex-[0.75] overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Contracts</h1>
            <div className="flex gap-3">
              <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md flex items-center gap-2">
                ↑ Export
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6 text-sm">
            <button className="px-2 py-1 bg-gray-900 text-white rounded-md flex items-center gap-2">
              Type <span className="text-xs">▼</span>
            </button>
            <button className="px-2 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
              Status <span className="text-xs">▼</span>
            </button>
            <button className="px-2 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
              Order date <span className="text-xs">▼</span>
            </button>
            <button className="px-2 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
              All filters <span className="text-xs">▼</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedOrders.length === orders.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Order
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td
                      className="px-4 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                          {order.customer.initials}
                        </div>
                        <span className="text-xs text-gray-900">
                          {order.customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {order.type}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs text-green-700 bg-green-50 rounded-full">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      {order.products.join(" ")}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {order.total}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {order.date}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Statistics */}
      <div className="flex-[0.25] border-l border-gray-200 p-6">
        <div className="space-y-6">
          {/* Receipt of Goods */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              RECEIPT OF GOODS
            </h3>
            <div className="relative inline-block">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="#047857"
                  strokeWidth="8"
                  strokeDasharray="377"
                  strokeDashoffset="94"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">$2.2m</span>
                <span className="text-sm text-gray-500">242 orders</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xl font-semibold">$864,600</span>
              <p className="text-sm text-gray-500">95 shipments</p>
            </div>
            <div>
              <span className="text-xl font-semibold">$1.34m</span>
              <p className="text-sm text-gray-500">147 pickups</p>
            </div>
          </div>

          {/* Order Status */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                ORDERS STATUS
              </h3>
              <button className="text-sm text-gray-500 flex items-center">
                Active
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 flex rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: "89%" }}
                ></div>
                <div
                  className="bg-red-500 h-full"
                  style={{ width: "8%" }}
                ></div>
                <div
                  className="bg-gray-400 h-full"
                  style={{ width: "3%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Paid</span>
                </div>
                <span className="text-xs text-gray-600">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Cancelled</span>
                </div>
                <span className="text-xs text-gray-600">8%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-xs text-gray-600">Refunded</span>
                </div>
                <span className="text-xs text-gray-600">3%</span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">OVERVIEW</h3>
              <button className="text-sm text-gray-500">This month ▾</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xl font-semibold">$2,246.75</span>
                  <p className="text-sm text-gray-500">Average order</p>
                </div>
                <div>
                  <span className="text-xl font-semibold">$2.2m</span>
                  <p className="text-sm text-gray-500">Total revenue</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xl font-semibold">16 min</span>
                  <p className="text-sm text-gray-500">Processing time</p>
                </div>
                <div>
                  <span className="text-xl font-semibold">1.7</span>
                  <p className="text-sm text-gray-500">Avg. items/order</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xl font-semibold">0.32%</span>
                  <p className="text-sm text-gray-500">Pending orders</p>
                </div>
                <div>
                  <span className="text-xl font-semibold">0.51%</span>
                  <p className="text-sm text-gray-500">Reject rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popups and Toolbars */}
      {showOrderDetails && (
        <OrderDetailsPopup
          order={activeOrder}
          onClose={() => setShowOrderDetails(false)}
        />
      )}

      {selectedOrders.length > 0 && (
        <SelectionToolbar selectedCount={selectedOrders.length} />
      )}
    </div>
  );
}
